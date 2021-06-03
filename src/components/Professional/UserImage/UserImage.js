import React, { useState, useEffect } from "react";
import { app } from "../../Base/Base";
import moment from "moment";

const db = app.firestore().collection("Users");

function UserImage({ Time, postedBy }) {
  const [naming, setNaming] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      db.doc(postedBy)
        .get()
        .then((doc) => {
          setNaming(doc.data());
        });
    }
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src={naming && naming.Photo}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: "silver",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div style={{ marginLeft: "10px" }}>{naming && naming.name}</div>
          <div
            style={{ color: "silver", marginLeft: "10px", fontSize: "12px" }}
          >
            {" "}
            {moment(naming && naming.Time).calendar()};
          </div>
        </div>
      </div>
    </>
  );
}

export default UserImage;
