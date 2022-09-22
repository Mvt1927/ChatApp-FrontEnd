import { Component } from "react";

class FriendCard extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={`${this.props.className} flex flex-row items-center hover:bg-f2f2f2 rounded-lg cursor-pointer`}>
                <div className="h-12 p-1.5 cursor-pointer flex items-center">
                    <img
                    className="w-9 h-9 rounded-full"
                    src="/avatar.jpg"
                    alt="avatar"
                    />
                </div>
                <div className="flex flex-col p-1.5 pl-0.5">
                    <span className="name-friend text text-sm">Quốc Việt</span>
                    <span className="time-receive-latest-message w-1/6 text-xs font-light whitespace-nowrap">
                        hoat dong 5 ngay truoc
                    </span>
                </div>
            </div>
        )
    }
}
export default FriendCard