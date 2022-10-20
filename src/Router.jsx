import {React, useEffect} from "react";
import { BrowserRouter, Routes , Route ,useParams, useNavigate } from "react-router-dom";
import Messages from "./pages/Message";
import Test from "./pages/Test"
import Login from "./pages/login";
import Register from "./pages/register";
import myGlobalSetting from "./pages/myGlobalSetting";



function MessageWId() {
    const params = useParams();
    const navigate = useNavigate()
    // console.log(params.id==null);
    // console.log(params.id);
    if(params.id==null) return <Messages noid={true}/>;
    const id = Number(params.id)
    if (id) return <Messages id={params.id}/>;
    return useEffect(() => {
        navigate('/m')
    })
}
function ToHome() {
    const navigate = useNavigate()
    return useEffect(() => {
        navigate('/m')
    })
}

function Logout(){
    const navigate = useNavigate()
    sessionStorage.removeItem(myGlobalSetting.ACCESS_TOKEN)
    return useEffect(() => {
        navigate('/m')
    })
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