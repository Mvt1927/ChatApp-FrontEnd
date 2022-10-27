import React, { Component, useEffect, useRef, useState } from "react";
import jwt_decode from 'jwt-decode';
import "./css/Message.css";
import myGlobalSetting from "./myGlobalSetting";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ContactsContainer from "../components/Contacts/contactsContainer"
import Welcome from "../components/Chats/Welcome";
import ChatsContainer from "../components/Chats/chatsContainer";
import axios from "axios";


export default function Message({ id }) {
    const socket = useRef();
    const [currentChatID, setCurrentChatID] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const navigate = useNavigate()
    const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)

    var status = true
    useEffect(() => {
        if (!token) {
            navigate("/login");
            status = false
        } else {
            try {
                setCurrentUser(
                    jwt_decode(token)
                );
            } catch (error) {
                sessionStorage.removeItem(myGlobalSetting.ACCESS_TOKEN)
                navigate("/login");
                status = false
            }
        }
    }, [token]);

    useEffect(() => {
        if (id) {
            setCurrentChatID(id)
            contacts.map((contact) => {
                if (contact.id == id) {
                    setCurrentChat(contact)
                }
            })
        }else {
            setCurrentChatID(undefined)
            setCurrentChat(undefined)
        }
    }, [id, contacts])

    useEffect(() => {
        const getData = async () => {
            if (currentUser) {
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
                    }
                }
                const users = await axios.get(
                    myGlobalSetting.USERS,
                    config
                ).then(({ data }) => {
                    if (data.status)
                        return data.users
                    else return []
                }).catch((e) => { 
                    console.log(e)
                    return [] })
                setContacts(users)
                sessionStorage.setItem(myGlobalSetting.SOCKET, socket.current)
            }
        }
        getData()
    }, [currentUser, arrivalMessage]);
    useEffect(() => {
        if (currentUser) {
            socket.current = io(myGlobalSetting.HOST, {
                extraHeaders: {
                    access_token: token,
                }
            });
            sessionStorage.setItem(myGlobalSetting.SOCKET, socket.current)
        }
    }, [currentUser]);

    const handleChatChange = (id, chat) => {
        setCurrentChatID(id)
        setCurrentChat(chat);
    };

    if (status)
        return (
            <div className="App flex flex-row">
                <ContactsContainer currentUser={currentUser} contacts={contacts} id={currentChatID} navigate={navigate} changeChat={handleChatChange} />

                <div className={`chat ${!currentChatID?'hidden':''} md:block`}>
                    {!currentChat ? <Welcome currentUser={currentUser} /> :
                        <ChatsContainer id={currentChatID} currentChat={currentChat} socket={socket} arrivalMessage={arrivalMessage} setCurrentChat={setCurrentChat} setCurrentChatID={setCurrentChatID} setArrivalMessage={setArrivalMessage} />
                    }
                </div>
            </div>
        );
}

