import React, { useEffect, useRef, useState } from "react";
import FunctionButton from "../funBtn";
import UserCardTopContainer from "./userCardTopContainer";
import { v4 as uuidv4 } from "uuid";
import myGlobalSetting from "../../pages/myGlobalSetting";
import axios from "axios"
import jwtDecode from "jwt-decode";

export default function ChatsContainer({ id, currentChat, socket, arrivalMessage, setArrivalMessage }) {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    // const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        const getChat = async () => {
            const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
            if (token&&id) {
                const chats = await axios.post(myGlobalSetting.getChats, {
                    token: token,
                    to: Number(id),
                }).then(({data})=>{
                    if (data.status) {
                        return data.chats
                    }else return []
                }).catch((e)=>{
                    console.log(e)
                    return []
                });
                setMessages(chats);
            }
        }
        getChat()
    }, [currentChat]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("reciveMessage", (data) => {
                setArrivalMessage(data);
            });
        }
    }, []);
    
    useEffect(() => {
        if (arrivalMessage) {
            if (arrivalMessage.from == currentChat.id) {
                arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
            }
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
    const handleSendMsg = async (msg) => {
        const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
        const payload = jwtDecode(token);
        socket.current.emit("sendMessage", {
            access_token: token,
            to: id,
            msg,
        });
        const msgs = [...messages];
        msgs.push({ from: Number(payload.id), to: Number(id) ,msg:msg });
        setMessages(msgs);
    };
    const handleEnter = (e) =>{
        if (e.code == 'Enter') {
            sendChat(e);
        }
    }
    return (
        <div id={id} className="right-container flex flex-col h-full">
            <div className="friend-top-right-container border-b border-border-color h-14">
                <div className="friend-container h-full flex flex-row justify-between px-2.5 py-1">
                    <UserCardTopContainer obj={currentChat} />
                    <div className="fun-btn flex flex-row w-fit">
                        <FunctionButton
                            className="call-right text-blue-400"
                            wight="9"
                            height="9"
                            iconClassName="fa-solid fa-phone "
                            iconSize="text-lg"
                        />
                        <FunctionButton
                            className="video-call-button-right text-blue-400"
                            wight="9"
                            height="9"
                            iconClassName="fa-solid fa-video"
                            iconSize="text-lg"
                        />
                        <FunctionButton
                            className="more-button-right text-blue-400"
                            wight="9"
                            height="9"
                            iconClassName="fa-solid fa-ellipsis"
                            iconSize="text-lg"
                        />
                    </div>
                </div>
            </div>
            <div className="message-mid-right-container -h-h-14">
                <div className="message-mid-container flex flex-col justify-between h-full">
                    <div className="message-interface-container -h-h-14 overflow-hidden ">
                        <div className="message-interface h-full flex flex-col justify-end">
                            <div className="chat-messages h-fit overflow-auto px-4 py-4 gap-1.5">

                                {messages.map((message, index) => {
                                    return (
                                        <div className="message-container" ref={scrollRef} key={uuidv4()}>
                                            
                                            {message.to == id
                                                ? <div className="message sender flex justify-end" >
                                                    <div className={`content w-fit bg-blue-400 px-3 py-2 rounded-full break-words max-w-5/12 
                                                    ${messages[index - 1]?.to == id ? "rounded-tr-[3000px] my-[1px]" : "my-0.5"}
                                                    ${messages[index + 1]?.to == id ? "rounded-br-[3000px] my-[1px]" : "my-0.5 "}`}>
                                                        <p className="w-fit text-base font-light text-white">{message.msg}</p>
                                                    </div>
                                                </div>
                                                : <div className="message reciver flex" >
                                                    <div className={`content w-fit bg-[#E4E6EB] px-3 py-2 rounded-full break-words max-w-5/12  
                                                    ${messages[index - 1]?.from == id ? "rounded-tl-[3000px] my-[1px] " : "my-0.5"} 
                                                    ${messages[index + 1]?.from == id ? "rounded-bl-[3000px] my-[1px]" : "my-0.5"}`}>
                                                        <p className="w-fit text-base font-light">{message.msg}</p>
                                                    </div>
                                                </div>}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="message-fuc-btn-container h-14 border-t border-f2f2f2">
                        <div className="message-fuc-btn p-2.252 h-full flex items-center">
                            <div className="fuc-btn-left flex flex-row w-fit items-center">
                                <FunctionButton
                                    className="add-file-button-right text-blue-400 text hover:bg-[#e9e9e9]"
                                    wight="9"
                                    height="9"
                                    iconClassName="fa-solid fa-circle-plus"
                                    iconSize="text-lg"
                                />
                                <FunctionButton
                                    className="add-file-button-right text-blue-400 hover:bg-[#e9e9e9]"
                                    wight="9"
                                    height="9"
                                    iconClassName="fa-regular fa-image"
                                    iconSize="text-lg"
                                />
                                <FunctionButton
                                    className="add-file-button-right text-blue-400 hover:bg-[#e9e9e9]"
                                    wight="9"
                                    height="9"
                                    iconClassName="fa-solid fa-gif"
                                    iconSize="text-lg"
                                />
                            </div>
                            <div className="input-mid-container ml-2.5 pl-2.5 rounded-full flex flex-row justify-items-center h-full bg-f2f2f2">
                                <input
                                    type="text"
                                    className="text-sm font-light h-full w-full p-2.252 rounded-full bg-f2f2f2 
                        placeholder:text-sm placeholder:text-7C676B 
                        focus:outline-none"
                                    onChange={(e) => setMsg(e.target.value)}
                                    placeholder="Aa"
                                    onKeyPress={e=>{handleEnter(e)}}
                                    value={msg}
                                />
                                <div className="w-9 h-9">
                                    <FunctionButton
                                        className="add-file-button-right text-blue-400 hover:bg-[#dddddd]"
                                        wight="9"
                                        height="9"
                                        hascolor="true"
                                        iconClassName="fa-solid fa-gif"
                                        iconSize="text-lg"
                                    />
                                </div>
                            </div>
                            <button onClick={e => { sendChat(e) }}  className="fun-send-btn-end w-15 flex justify-center">
                                <FunctionButton
                                    className="send-message-button-right text-blue-400 hover:bg-[#e9e9e9]"
                                    wight="9"
                                    height="9"
                                    iconClassName="fa-solid fa-paper-plane-top"
                                    iconSize="text-lg"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}