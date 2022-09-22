import React from "react";
import { BrowserRouter, Routes , Route ,useParams } from "react-router-dom";
import Message from "./pages/Message";
import Test from "./pages/Test"

function MessageWId() {
    const params = useParams();
    console.log(params.id==null);
    console.log(params.id);
    if(params.id==null) return <></>
    return <Message id={params.id} />;
}
export default function MyRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/m/:id" exact element={<MessageWId />} />
                <Route path="/m" exact element={<MessageWId />}/>
                <Route path="/test/:id" exact element={<Test id={'123'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}