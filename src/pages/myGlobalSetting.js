class mySetting{
    constructor(){
        this.HOST = "http://127.0.0.1:3333"
        this.API = this.HOST+"/api";
        this.AUTH = this.HOST+"/auth";
        this.loginAPI = this.AUTH+"/signin";
        this.signupAPI = this.AUTH+"/signup";
        this.ACCESS_TOKEN ="access_token"
    }
}
export default (new mySetting)
