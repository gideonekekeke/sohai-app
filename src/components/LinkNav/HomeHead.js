import React, { useState, useEffect } from "react";
import "./HomeHead.css";
import Home from "./Image/home.png";
import Chat from "./Image/chat.png";
import Noti from "./Image/notification.png";
import { Link } from "react-router-dom";
import Chats from "../Chats/Chats";
import Homes from "../Home/Home";
import Notification from "../Alerts/Alerts";
import SignOut from "../SignOutForm/SignOut";

function HomeHead() {
  const [homeBtn, setHomeBtn] = useState(true);
  const [chatBtn, setChatBtn] = useState(false);
  const [notifyBtn, setNotifyBtn] = useState(false);

  const homeFeed = () => {
    setHomeBtn(true);
    setChatBtn(false);
    setNotifyBtn(false);
    console.log("Homes");
    console.log(homeBtn);
  };

  const chatFeed = () => {
    setHomeBtn(false);
    setChatBtn(true);
    setNotifyBtn(false);
    console.log("Chats");
    console.log(chatBtn);
  };

  const notifyFeed = () => {
    setHomeBtn(false);
    setChatBtn(false);
    setNotifyBtn(true);
    console.log("Notification");
    console.log(notifyBtn);
  };

  return (
    <div
      className="feedContainer"
      style={{
        justifyContent: "center",
        flex: 1,
        width: "100%",
        padding: "10px",
        // backgroundColor: "brown",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "5px",
          height: "50px",
          width: "100%",
          justifyContent: "space-around",
          justifySelf: "center",
          alignItems: "center",
          border: "1px solid #fbd2d7",
          borderRadius: "5px",
          // backgroundColor: "green",
        }}
      >
        <div className="first">
          <div
            className="iconWrapper"
            style={{
              display: "flex",
              height: "30px",
              width: "30px",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid pink",
              cursor: "pointer",
            }}
            onClick={homeFeed}
          >
            {/* <Link to="/Dashboard"> */}
            <img
              src={Home}
              alt="Home"
              style={{
                height: "20px",
                width: "20px",
              }}
            />
            {/* </Link> */}
          </div>
        </div>

        <div className="second">
          <div
            style={{
              display: "flex",
              height: "30px",
              width: "30px",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid pink",
              cursor: "pointer",
            }}
            onClick={chatFeed}
          >
            {/* <Link to="/Dashboard"> */}
            <img
              src={Chat}
              alt="Home"
              style={{
                height: "20px",
                width: "20px",
              }}
            />
            {/* </Link> */}
          </div>
        </div>

        <div className="third">
          <div
            style={{
              display: "flex",
              height: "30px",
              width: "30px",
              borderRadius: "100px",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid pink",
              cursor: "pointer",
            }}
            onClick={notifyFeed}
          >
            <img
              src={Noti}
              alt="Home"
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="feedsContents">
        {homeBtn ? (
          <div>
            <div>Home Feeds</div>
            <SignOut />
            <Homes />
          </div>
        ) : chatBtn ? (
          <div>
            <div>Chat Feeds</div>
            <Chats />
          </div>
        ) : notifyBtn ? (
          <div>
            <div>Notification feeds</div>
            <Notification />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HomeHead;
