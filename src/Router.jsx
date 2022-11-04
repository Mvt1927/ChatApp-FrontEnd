import {React, useEffect, useRef} from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Register from "./pages/Register.jsx";
import myGlobalSetting from "./myGlobalSetting";
import MessageWId from "./MessageRouter"
import Message from "./pages/Message";


export default function MyRouter(){
    const socket = useRef();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" exact element={<Login />}/>
                <Route path={myGlobalSetting.ROUTE.REGISTER} element={<Register />}/>
                <Route path={myGlobalSetting.ROUTE.LOGIN} element={<Login />}/>
                <Route path={myGlobalSetting.ROUTE.LOGOUT} element={<Logout socket={socket} />}/>
                <Route path={myGlobalSetting.ROUTE.MESSAGE} exact element={<Message socket={socket}/>}/>
                <Route path={myGlobalSetting.ROUTE.MESSAGE_ID} exact element={<Message socket={socket}/>} />
            </Routes>
        </BrowserRouter>
    )
}