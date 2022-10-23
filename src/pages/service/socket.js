import io from "socket.io-client";
import myGlobalSetting from "../myGlobalSetting";

const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)

export const socket = io(myGlobalSetting.HOST, {
    auth: {
        access_token: token,
    },
});
sessionStorage.setItem(myGlobalSetting.IS_SOCKET_CONNECTED,socket.connected)
socket.connected