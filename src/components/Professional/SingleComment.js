import React, { useState, useEffect } from "react";
import firebase from "firebase";
import moment from "moment";
import { app } from "../Base/Base";

const posting = app.firestore().collection("Posts");
const db = app.firestore().collection("Users");

const SingleComment = ({ poster, id }) => {
  const [data, setData] = useState([]);

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
          setData(i);
        });
    }
  };

  const [naming, setNaming] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await db
        .doc(poster)
        .get()
        .then((doc) => {
          setNaming(doc.data());
        });
    }
  };

  useEffect(() => {
    // getUser();
    getName();
    getComment();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{naming && naming.name}</div>
      <div>
        <div style={{ color: "grey", marginLeft: "5px", fontSize: "10px" }}>
          {" "}
          {moment(naming.timer).calendar()};
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
