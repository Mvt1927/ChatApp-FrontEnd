import { Component } from "react";

class UserCardTopContainer extends Component {
    constructor(props) {
        super(props);
        this.className = ""
        this.userInformation = {
            srcAvatar: '/avatar.jpg',
            username: 'Username',
            id: "",
            online: false,
        }
    }
    render() {
        if (this.props.obj != null) {
            this.userInformation.id = this.props.obj.id || this.userInformation.id
            this.userInformation.username = this.props.obj.username || this.userInformation.username
            this.userInformation.srcAvatar = this.props.obj.srcAvatar || this.userInformation.srcAvatar
            this.userInformation.online = this.props.obj.online || this.userInformation.online
            this.className = this.props.obj.className || this.className
        }
        return (
            <div className={`${this.className} justify-start w-fit min-w-1/4 flex flex-row items-center hover:bg-f2f2f2 rounded-lg cursor-pointer`}>
                <div className="h-12 p-1.5 w-fit cursor-pointer justify-center flex items-center">
                    <img
                        className="max-w-[2.25rem] object-cover rounded-full"
                        src="/avatar.jpg"
                        alt="avatar"
                    />
                </div>
                <div className="flex flex-col p-1.5 pl-0.5">
                    <div className="name-friend text text-sm whitespace-nowrap">{this.userInformation.username}</div>
                    <div className="time-receive-latest-message text-xs font-light whitespace-nowrap">
                        {this.userInformation.online ? "online" : "offline"}
                    </div>
                </div>
            </div>
        )
    }
}
export default UserCardTopContainer;
