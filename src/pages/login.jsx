import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mySetting from "./myGlobalSetting"

export default function Login() {
    const loginRoute = mySetting.loginAPI;
    const navigate = useNavigate();
    const token = sessionStorage.getItem(mySetting.ACCESS_TOKEN)
    if (token) {
        useEffect(() => {
            navigate('/m')
        });
        return <></>
    }
    const [values, setValues] = useState({ username: "", password: "" });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
            // console.error("Email and Password is required.");
            toast.error("Email and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            // console.error("Email and Password is required.");
            toast.error("Email and Password is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username: username,
                password: password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
                // console.log(data.msg)
            }
            if (data.status === true) {
                sessionStorage.setItem(mySetting.ACCESS_TOKEN,data.access_token);
                // console.log(sessionStorage.getItem(mySetting.ACCESS_TOKEN));
                navigate("/m");
            }
        }
    };

    return (
        <><div className="flex content-center justify-center h-screen flex-col items-center">
            <div className="login-card w-full sm:w-3/4 md:w-2/3 lg:w-1/3 h-fit min-h-3/4" >
                <form className="flex flex-col h-full justify-between" action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="text-center p-4 flex justify-center">
                        <h1 className="text-5xl w-fit text-blue-600">Login</h1>
                    </div>
                    <div className="flex flex-col w-full mt-4 mb-4 justify-start h-full">
                        <input
                            className="p4 border-solid text-black placeholder:text-slate-600 pl-5 focus:placeholder:text-slate-400 focus:border-blue-700 focus:border-2 focus:outline-none p-2 mb-2 mt-4 mx-4 border-blue-700 rounded-lg border text-lg"
                            type="text"
                            autoComplete="true"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                            min="3"
                        />
                        <input
                            className="p4 border-solid text-black placeholder:text-slate-600 pl-5 focus:placeholder:text-slate-400 focus:border-blue-700 focus:border-2 focus:outline-none p-2 mx-4 mb-4 mt-2 border-blue-700 rounded-lg border text-lg"
                            autoComplete="true"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex justify-center flex-col items-center my-4">
                        <button className="px-4 mb-2 py-2 w-fit flex flex-row items-center text-white bg-blue-300 hover:bg-blue-400 rounded-lg cursor-pointer" type="submit">Log In</button>
                        <div className="text-center">
                            <span className="text-base">
                                Don't have an account ? <Link className="text-blue-500" to="/register">Create One.</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            <ToastContainer className={"text-base"} />
        </>
    );
}
