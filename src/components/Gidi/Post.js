import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../Base/Base";
import pic from "../../img/1.jpg";
import up from "../../img/my2.jpg";
import "./post.css";
import moment from "moment";

import {
  MoreOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import CommentModal from "./CommentModal";
import UserImage from "./UserImage/UserImage";
import CommentFewEntry from "./CommentFewEntry";
import ViewMoreComment from "./ViewMoreComment";

const posting = app.firestore().collection("Posts");

function Post() {
  const [backData, setBackData] = useState([]);
  const [needData, setNeedData] = useState([]);
  // const { currentData, current } = useContext(GlobalContext);

  const gettingData = async () => {
    const userData = await app.auth().currentUser;

    if (userData) {
      await posting.onSnapshot((snap) => {
        const item = [];
        snap.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setBackData(item);
      });
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <>
      {backData.map(({ id, createdBy, Time, text, uploadData, postedBy }) => (
        <div key={id} className="general" style={{ width: "600px" }}>
          <div
            className="general1"
            style={{
              margin: "10px",
              alignItems: "center",
              width: "100%",
              // height: "100%",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "black",
            }}
          >
            <div style={{ display: "flex", width: "600px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  display: "flex",
                  // backgroundColor: "red",
                  width: "600px",
                  justifyContent: "space-between",
                  padding: "5px",
                  // margin: "10px",
                }}
              >
                <UserImage postedBy={postedBy} Time={Time} />
              </div>
            </div>
            <div
              style={{
                width: "500px",
                fontSize: 12,
                display: "flex",
                justifyContent: "flex-start",
                padding: "5px",
                marginBottom: "3px",
                // backgroundColor: "green",
                textTransform: "capitalize",
              }}
            >
              {text}
            </div>
            <div
              style={{
                // backgroundColor: "black",
                // width: "400px",
                width: "500px",
                borderRadius: "10px",
                display: "flex",
              }}
            >
              <img className="imma" src={uploadData} />
            </div>

            <div
              style={{
                // flexDirection: "row",
                width: "500px",
                // backgroundColor: "red",
                marginLeft: 5,
                marginTop: 7,
                justifyContent: "space-around",
                fontSize: 13,
                display: "flex",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <HeartOutlined style={{ fontSize: 17 }} />
                <div style={{ fontSize: 10, marginLeft: 5 }}>2.5k</div>
              </div>

              <CommentModal id={id} postedBy={postedBy} />
            </div>
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                marginTop: 30,
                width: "600px",
              }}
            >
              <CommentFewEntry id={id} />
            </div>
            <ViewMoreComment id={id} postedBy={postedBy} />
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
