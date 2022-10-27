class mySetting{
    constructor(){
        this.HOST = "http://192.168.1.15:3333"
        this.API = this.HOST+"/api";
        this.AUTH = this.HOST+"/auth";
        this.CHAT = this.HOST+"/chat";
        this.getChats = this.CHAT+"/getchats";
        this.USERS = this.AUTH+"/getusers";
        this.loginAPI = this.AUTH+"/signin";
        this.signupAPI = this.AUTH+"/signup";
        this.ACCESS_TOKEN ="access_token"
        this.IS_SOCKET_CONNECTED ="is_socket_connected"
        this.SOCKET="socket"
    }
}
export default (new mySetting)
