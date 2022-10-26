import React, { useEffect, useRef, useState } from "react";
import FunctionButton from "../funBtn";
import UserCardTopContainer from "./userCardTopContainer";
import { v4 as uuidv4 } from "uuid";
import myGlobalSetting from "../../pages/myGlobalSetting";
import axios from "axios"
import jwtDecode from "jwt-decode";
import Menu from "@mui/material/Menu"
import Picker from "emoji-picker-react";

export default function ChatsContainer({ id, currentChat, socket, arrivalMessage, setArrivalMessage }) {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();
    // const [arrivalMessage, setArrivalMessage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = (e) => {
        handleAvatarClick(e)
        setShowEmojiPicker(!showEmojiPicker);
    };

    useEffect(() => {
        const getChat = async () => {
            // console.log(currentChat)
            const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            if (token && id) {
                const chats = await axios.post(myGlobalSetting.getChats, {
                    receiverId: Number(id),
                }, config).then(({ data }) => {
                    if (data.status) {
                        return data.chats
                    } else return []
                }).catch(({ response }) => {
                    console.log(response.data)
                    return []
                });
                setMessages(chats);
            }
            // else console.warn("ChatWeb_Client\src\components\Chats\chatsContainer.jsx: token:" + token + " id: " + id)
        }
        setShowEmojiPicker(false)
        getChat()
    }, [currentChat, id]);

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
        setShowEmojiPicker(false)
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
    const handleSendMsg = async (msg) => {
        const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
        const payload = await jwtDecode(token);
        // console.log(payload)
        // console.log(id)
        socket.current.emit("sendMessage", {
            access_token: token,
            to: id,
            msg: msg,
        });
        const msgs = [...messages];
        msgs.push({ from: Number(payload.id), to: Number(id), msg: msg });
        setMessages(msgs);
    };
    const handleEnter = (e) => {
        if (e.code == 'Enter') {
            sendChat(e);
        }
    }
    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        // console.log(emojiObject)
        // console.log(emojiObject.getImageUrl())
        message += emojiObject.emoji;
        // message += `<img height="16" width="16" alt="🙂" referrerpolicy="origin-when-cross-origin" src="https://static.xx.fbcdn.net/images/emoji.php/v9/ta5/1.5/16/1f642.png">`;
        setMsg(message);
    };


    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <div id={id} className="right-container flex flex-col h-full">
            <div className="friend-top-right-container border-b border-border-color h-14">
                <div className="friend-container h-full flex flex-row justify-between px-2.5 py-1">
                    <UserCardTopContainer obj={currentChat} />
                    <div className="fun-btn flex flex-row w-fit items-center">
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-phone text-lg"
                            size={36}
                        />
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-video text-lg"
                            size={36}
                        />
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-ellipsis text-lg"
                            size={36}
                        />
                    </div>
                </div>
            </div>
            <div className="message-mid-right-container -h-h-14">
                <div className="message-mid-container flex flex-col justify-between h-full ">
                    <div className="message-interface-container -h-h-14 overflow-hidden ">
                        <div className="message-interface h-full flex flex-col justify-end">
                            <div className="chat-messages h-fit overflow-auto px-4 py-4 gap-1.5">
                                {
                                    messages.map((message, index) => {
                                        // console.log(message)
                                        return (
                                            <div className="message-container" ref={scrollRef} key={uuidv4()}>

                                                {message.to == id
                                                    ? <div className="message sender flex justify-end" >
                                                        <div className={`content w-fit bg-blue-400 rounded-3xl px-3 py-2 break-words 
                                                    ${messages[index - 1]?.to == id ? "rounded-tr-md my-[1px]" : "my-0.5 "}
                                                    ${messages[index + 1]?.to == id ? "rounded-br-md my-[1px]" : "my-0.5 "}`}>
                                                            <p className="w-fit max-w-[50vw] sm:max-w-[30vw] text-base font-light text-white">{message.msg}</p>
                                                        </div>
                                                    </div>
                                                    : <div className="message reciver flex" >
                                                        <div className={`content w-fit bg-[#E4E6EB] rounded-3xl px-3 py-2 break-words 
                                                    ${messages[index - 1]?.from == id ? "rounded-tl-md my-[1px] " : "my-0.5"} 
                                                    ${messages[index + 1]?.from == id ? "rounded-bl-md my-[1px]" : "my-0.5"}`}>
                                                            <p className="w-fit max-w-[50vw] sm:max-w-[30vw] text-base font-light">{message.msg}</p>
                                                        </div>
                                                    </div>}
                                            </div>
                                        );
                                    })}
                            </div>
                            {showEmojiPicker &&
                        <div style={{bottom:68, right:64}} className="absolute hidden text-xs w-[30vw] md:flex emoji-container">
                            <Picker width={"30vw"} height={"50vh"} disableAutoFocus={true} suggestedEmojisMode={false} defaultSkinTone onEmojiClick={handleEmojiClick} />
                        </div>}
                        </div>
                    </div>
                    <div className="message-fuc-btn-container h-14 border-t border-f2f2f2">
                        <div className="message-fuc-btn p-2.252 h-full flex items-center">
                            <div className="fuc-btn-left flex flex-row w-fit items-center">
                                <FunctionButton
                                    className="fa-solid text-lg fa-circle-plus text-blue-400"
                                    size={36}
                                />
                                <FunctionButton
                                    className="fa-regular text-lg fa-image text-blue-400"
                                    size={36}
                                />
                                <FunctionButton
                                    className="fa-solid text-lg fa-gif text-blue-400"
                                    size={36}
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
                                    onKeyPress={e => { handleEnter(e) }}
                                    value={msg}
                                />
                                <FunctionButton
                                    onClick={handleEmojiPickerhideShow}
                                    className="fa-solid fa-face-smile text-lg text-blue-400 hover:bg-[#dddddd]"
                                    size={36}
                                />
                            </div>
                            <div className="fun-send-btn-end w-15 flex justify-center">
                                <FunctionButton
                                    onClick={sendChat}
                                    className="text-lg fa-solid fa-paper-plane-top text-blue-400"
                                    size={36}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}