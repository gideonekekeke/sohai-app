import React, { useState, useEffect } from "react";
import { app } from "../Base/Base";
import ImageViewForComment from "./ImageViewForComment";
import SingleComment from "./SingleComment";
import moment from "moment";

const posting = app.firestore().collection("Posts");
const db = app.firestore().collection("Users");

const CommentFewEntry = ({ id }) => {
  const [comment, setComment] = useState([]);

  const getComment = async () => {
    const gotCom = await app.auth().currentUser;

    if (gotCom) {
      await posting
        .doc(id)
        .collection("comment")
        // .orderBy("dateTime", "asc")
        .limit(2)
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setComment(i);
        });
    }
  };

  useEffect(() => {
    getComment();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "brown",
        alignItems: "center",
      }}
    >
      {comment.map(({ id, com, poster }) => (
        <div
          key={id}
          style={{
            // width: "400px",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "tomato",
            padding: "5px",
            border: "none",
            borderRadius: "5px",
            marginBottom: "5px",
            // backgroundColor: "green",
          }}
        >
          <div
            style={{
              marginBottom: 5,
              marginRight: 40,
              fontSize: 14,
              color: "#EBEBEA",
              // backgroundColor: "green",
            }}
          >
            {" "}
            Most recent Comment{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "grey",
              padding: "5px",
              width: "100%",
            }}
          >
            <div>
              <ImageViewForComment poster={poster} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // paddingTop: "5px",
                // paddingLeft: "10px",
                // paddingBottom: "5px",
                // backgroundColor: "red",
                width: "100%",
                borderRadius: "30px",
                marginLeft: "5px",
              }}
            >
              <div
                style={{
                  // width: "100%",
                  // backgroundColor: "pink",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  paddingTop: "5px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingBottom: "5px",
                }}
              >
                <SingleComment poster={poster} id={id} />
                <div
                  style={{
                    width: "100%",
                    // backgroundColor: "#F0F2F5",
                    fontSize: "13px",
                  }}
                >
                  {com}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentFewEntry;
