import { React} from "react";
import {useParams} from "react-router-dom";
import Messages from "./pages/Message";
import { ToHome } from "./navToHome"; 
export default function MessageWId() {
    const params = useParams();
    if (params.id == null) return <Messages noid={true} />;
    const id = Number(params.id)
    if (id||id==0) return <Messages id={params.id} />;
    // else console.log("test")
    return <ToHome />
}