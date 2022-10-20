import { Component} from "react";

class UserCardContainer extends Component {
  constructor(props) {
    super(props);
    this.selectID = ""
    this.userInformation = {
      srcAvatar : '/avatar.jpg',
      username : 'Username',
      lastMsg : "lastest message",
      id : "",
      timeLastMsg : "",
      timeAway: "",
    }
    this.navigate =()=> {}
  }
  
  componentDidMount(){
    const navigate = this.props.navigate
    this.navigate = navigate||this.navigate
  }

  handleOnClick = (e,id) =>{
    this.navigate("/m/"+id)
  }
  render() {
    
    if (this.props.obj!=null) {
      this.userInformation.id = this.props.obj.id || this.userInformation.id
      this.selectID = this.props.selectID || this.selectID
      this.userInformation.username = this.props.obj.username || this.userInformation.username
      this.userInformation.srcAvatar = this.props.obj.srcAvatar || this.userInformation.srcAvatar
      this.userInformation.lastMsg = this.props.obj.lastestMsg || this.userInformation.lastMsg
      this.userInformation.timeLastMsg = this.props.obj.timeLastestMsg|| this.userInformation.timeLastMsg
    }
    if (this.userInformation.timeLastMsg!==""&& new Date(this.userInformation.timeLastMsg)!='Invalid Date') {
      var currentDate = new Date();
      var lastDate = new Date(this.userInformation.timeLastMsg);
      var text_year = ' year'
      var text_week = ' week'
      var text_day = ' day'
      var text_hour =' hour'
      var text_minute =' minute'
      var text_second = ' second'
      var timeAway = 
      ((currentDate - lastDate)/1000)>60 /**s */
      ?((currentDate - lastDate)/1000/60)>60 /** m */
      ?((currentDate - lastDate)/1000/60/60)>24 /** h */
      ?((currentDate - lastDate)/1000/60/60/24)>7 /** d */
      ?((currentDate - lastDate)/1000/60/60/24/7)>53 /**w */
      ?parseInt((currentDate - lastDate)/1000/60/60/24/365)+""+text_year 
      :parseInt((currentDate - lastDate)/1000/60/60/24/7)+""+text_week
      :parseInt((currentDate - lastDate)/1000/60/60/24)+""+text_day
      :parseInt((currentDate - lastDate)/1000/60/60)+""+text_hour
      :parseInt((currentDate - lastDate)/1000/60)+""+text_minute
      :parseInt((currentDate - lastDate)/1000)+""+text_second
      this.userInformation.timeAway = timeAway || this.userInformation.timeAway
    }
    return (
      <div id={this.userInformation.id} className={(this.selectID == this.userInformation.id?" select ":"") +" item-friend-container p-2.5 h-17 box-border hover:bg-f2f2f2 hover:rounded-lg cursor-pointer "+ this.props.className} onClick={(event) => this.handleOnClick(event, this.userInformation.id)}>
        <div className="item-friend w-full h-full flex flex-row">
          <div className="friend-avatar w-1/5 pr-2.5 ">
            <img
              className="w-12 h-12 rounded-full box-border"
              src={this.userInformation.srcAvatar}
              alt=""
            />
          </div>
          <div className="friend-info w-4/5 flex flex-col">
            <span className="name-friend text text-base">{this.userInformation.username}</span>
            <div className="h-2"></div>
            <div className="lastest-message flex flex-row">
              <span className="short-text-latest-message max-w-fit w-4/6 text-xs font-light whitespace-nowrap truncate">
                {this.userInformation.lastMsg}
              </span>
              <p className="text-xs">&nbsp;</p>
              <p className="text-xs"> · </p>
              <p className="text-xs">&nbsp;</p>
              <span className="time-receive-latest-message w-1/6 text-xs font-light whitespace-nowrap">
                {timeAway}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserCardContainer;
