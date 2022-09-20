import { useState } from "react";
import reactLogo from "./assets/react.svg";
import IFriend from "./components/left/ifriend";
import FunctionButton from "./components/funBtn";
import FriendCard from './components/right/cardFriend'
import "./App.css";


function App() {
  var testObj = {
    src_AvatarFriend:'https://scontent.fdad3-3.fna.fbcdn.net/v/t39.30808-1/274667595_105812578700442_338875092787591085_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=cBP3MkrBkPgAX9qG4uG&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdad3-3.fna&oh=00_AT8cbdCEnkhRh2axzNXmwhYO3YrJp2SvlZprALU1jD47dg&oe=632DD10D',
    t_nameFriend: 'Quốc Việt',
    t_lastMessFriend: 'Việt đã gọi cho bạn.' ,
    time_timeLastMessFriend: 'Mon Sep 10 2021 21:24:40 GMT+0700 (Giờ Đông Dương)',
  }
  var checkScroll = (e)=>{
    e.preventDefault();
    var element = document.getElementById("under_line")
    if (e.currentTarget.scrollTop > 5) {
      element.className  = "border-b border-border-color";
    } else {
      element.className = "";
    }
  }
  return (
    <div className="App flex flex-row">
      <div className="left border-r border-border-color flex flex-col flex-shrink-0 flex-grow-0">
        <div className="user-top-left flex flex-col px-4 py-2.5 h-14">
          <div className="user flex flex-row pad">
            <div className="avatar-left w-3/12 flex">
              <div className="w-9 h-9 hover:bg-[#00000020] hover:opacity-100 rounded-full cursor-pointer">
                <img
                  className="w-9 h-9 rounded-full hover:mix-blend-overlay hover:bg-black"
                  src="./public/avatar.jpg"
                  alt="avatar"
                />
              </div>
            </div>
            <div className="app-name-mid w-6/12 self-center">
              <p className="text-center text-base">Chat</p>
            </div>
            <div className="fun-btn-right w-3/12 text-center flex flex-row justify-center">
              <FunctionButton 
                className="meeting-button-left" 
                wight='9' 
                height='9' 
                iconClassName="fa-light fa-video-plus"
                iconSize="text-lg"
                />
              <FunctionButton 
                className="new-button-right" 
                wight='9' 
                height='9' 
                iconClassName="icon bi bi-pencil-square"
                iconSize="text-lg"
                />
            </div>
          </div>
        </div>
        <div className="search-mid h-14 px-4 pb-3 pt-1.5">
          <div className="search-box flex flex-row rounded-full bg-f2f2f2 h-full">
            <div className="search-icon-left flex items-center justify-end w-1/12">
              <i className="fa-light fa-magnifying-glass text-base"></i>
            </div>
            <input
              className="search-input-right px-1.5 pt-2.252 pb-1.752 text-sm font-light w-full rounded-r-full bg-f2f2f2 placeholder:text-sm placeholder:text-7C676B focus:outline-none"
              type={"search"}
              placeholder="Tìm kiếm trên Messenger"
              aria-label="Tìm kiếm trên Messenger"
            />
          </div>
        </div>
        <div id="under_line"></div>
        <div className="list-friend-bottom overflow:hidden h-10/12">
          <div onScroll={checkScroll} className="overflow-scroll px-1.5 max-h-full"  >
            <IFriend className="selection" obj={testObj}/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
            <IFriend/>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="right-container flex flex-col h-full">
          <div className="friend-top-right-container border-b border-border-color h-14">
            <div className="friend-container h-full flex flex-row justify-between px-2.5 py-1">
              <FriendCard className="justify-start w-fit " obj={testObj}/>
              <div className="fun-btn flex flex-row w-fit">
                <FunctionButton 
                  className="call-right text-blue-400" 
                  wight='9' 
                  height='9' 
                  iconClassName="fa-solid fa-phone "
                  iconSize="text-lg"
                  />
                <FunctionButton 
                  className="video-call-button-right text-blue-400" 
                  wight='9' 
                  height='9' 
                  iconClassName="fa-solid fa-video"
                  iconSize="text-lg"
                  />
                <FunctionButton 
                  className="more-button-right text-blue-400" 
                  wight='9' 
                  height='9' 
                  iconClassName="fa-solid fa-ellipsis"
                  iconSize="text-lg"
                  />
              </div>
            </div>
          </div>
          <div className="message-mid-right-container -h-h-14">
              <div className="message-mid-container flex flex-col justify-between h-full">
                <div className="message-interface-container -h-h-14 overflow-hidden">
                  <div className="message-interface overflow-y-scroll max-h-full flex flex-col-reverse">
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                    <IFriend/>
                  </div>
                </div>
                <div className="message-fuc-btn-container h-14 border-t border-f2f2f2">
                  <div className="message-fuc-btn p-2.252 h-full flex items-center">
                    <div className="fuc-btn-left flex flex-row w-fit items-center">
                      <FunctionButton 
                      className="add-file-button-right text-blue-400 text" 
                      wight='9' 
                      height='9' 
                      iconClassName="fa-solid fa-circle-plus"
                      iconSize="text-lg"
                      />
                      <FunctionButton 
                      className="add-file-button-right text-blue-400 " 
                      wight='9' 
                      height='9' 
                      iconClassName="fa-regular fa-image"
                      iconSize="text-lg"
                      />
                      <FunctionButton 
                      className="add-file-button-right text-blue-400 " 
                      wight='9' 
                      height='9' 
                      iconClassName="fa-solid fa-gif"
                      iconSize="text-lg"
                      />
                    </div>
                    <div className="input-mid-container ml-2.5 pl-2.5 rounded-full flex flex-row justify-items-center h-full bg-f2f2f2">
                      <input 
                      type="text" 
                      className="text-sm font-light h-full w-full p-2.252 rounded-full bg-f2f2f2 
                        placeholder:text-sm placeholder:text-7C676B 
                        focus:outline-none" 
                      placeholder="Aa" />
                      {/* <textarea name="text" rows="14" cols="10" wrap="soft" maxlength="40" style={{overflow:"hidden", resize:"none"}}></textarea> */}
                      <div className="w-9 h-9"> 
                      <FunctionButton 
                      className="add-file-button-right text-blue-400 hover:bg-[#dddddd]"
                      wight='9' 
                      height='9' 
                      hascolor='true' 
                      iconClassName="fa-solid fa-gif"
                      iconSize="text-lg"
                      />
                      </div>
                    </div>
                    <div className="fun-send-btn-end w-15 flex justify-center">
                    <FunctionButton 
                      className="send-message-button-right text-blue-400"
                      wight='9' 
                      height='9'
                      iconClassName="fa-solid fa-paper-plane-top"
                      iconSize="text-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
