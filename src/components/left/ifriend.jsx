import { Component, useState } from "react";
class IFriend extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var srcAvatarFriend = '/avatar.jpg'
    var nameFriend = 'Dm moi'
    var lastestMessageFriend = "Dm thang moi"
    var idFriend =""
    var timeLastestMessageFriend ="Mon Sep 19 2022 10:11:40 GMT+0700 (Giờ Đông Dương)"
    if (this.props.obj!=null) {
      idFriend = this.props.obj.id
      srcAvatarFriend = this.props.obj.src_AvatarFriend
      nameFriend = this.props.obj.t_nameFriend
      lastestMessageFriend = this.props.obj.t_lastMessFriend
      timeLastestMessageFriend = this.props.obj.time_timeLastMessFriend
    }
    if (timeLastestMessageFriend!=null&& new Date(timeLastestMessageFriend)!='Invalid Date') {
      var currentDate = new Date();
      var lastDate = new Date(timeLastestMessageFriend);
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
    }
    return (
      <div id={idFriend} className={"item-friend-container p-2.5 h-17 box-border hover:bg-f2f2f2 hover:rounded-lg cursor-pointer first-line:"+ this.props.className}>
        <div className="item-friend w-full h-full flex flex-row">
          <div className="friend-avatar w-1/5 pr-2.5 ">
            <img
              className="w-12 h-12 rounded-full box-border"
              src={srcAvatarFriend}
              alt="avatar"
            />
          </div>
          <div className="friend-info w-4/5 flex flex-col">
            <span className="name-friend text text-base">{nameFriend}</span>
            <div className="h-2"></div>
            <div className="lastest-message flex flex-row">
              <span className="short-text-latest-message max-w-fit w-4/6 text-xs font-light whitespace-nowrap truncate">
                {lastestMessageFriend}
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
export default IFriend;
