import {React, useEffect, useRef} from "react";
import { BrowserRouter, Routes , Route ,useParams, useNavigate } from "react-router-dom";
import Messages from "./pages/Message";
import Test from "./pages/Test"
import Login from "./pages/login";
import Register from "./pages/register";
import myGlobalSetting from "./pages/myGlobalSetting";
import MessageWId from "./MessageRouter"
import { ToHome } from "./navToHome";
import { io } from "socket.io-client";
// import { socket } from "./pages/service/socket";


function ToLogin() {
    const navigate = useNavigate()
    return useEffect(() => {
        navigate('/m')
    })
}
function ToRoute(path) {
    const navigate = useNavigate()
    return useEffect(() => {
        navigate(path.url)
    })
}

function Logout(){
    sessionStorage.removeItem(myGlobalSetting.ACCESS_TOKEN)
    const socket = sessionStorage.getItem(myGlobalSetting.SOCKET)
    socket.current?.disconnect()
    return <ToHome />
}
export default function MyRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/m/:id" exact element={<MessageWId />} />
                <Route path="/m" exact element={<MessageWId />}/>
                <Route path="" exact element={<ToHome />}/>
                {/* <Route path="/test/:id" exact element={<Test id={'123'}/>}/>
                <Route path="/test/login" element={<Login />}/> */}
                <Route path="/login" element={<Login />}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/register" element={<Register />}/>
            </Routes>
        </BrowserRouter>
    )
}