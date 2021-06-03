import React, { useEffect, useState } from "react";
import "./SignOut.css";
import { app } from "../Base/Base";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
// import { FaKey } from "react-icons/fa";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
// import { LockRoundedIcon } from "@material-ui/icons";

const db = app.firestore().collection("Users");
function SignOut() {
  const [backendData, setBackendData] = useState([]);

  const gettingBackendData = async () => {
    const user = await app.auth().currentUser;

    if (user) {
      await db
        .doc(user.uid)
        .get()
        .then((doc) => {
          setBackendData(doc.data());
        });
    }
  };
  useEffect(() => {
    gettingBackendData();
  });

  const history = useHistory();
  const signUserOut = async () => {
    const user = await app.auth().currentUser;

    if (user) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("signed out successfully");
          history.push("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="signoutWrapper">
      <div className="signoutImageContainer">
        <img
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "1000px",
          }}
          src={backendData && backendData.Photo}
          alt="user image"
        />
      </div>
      <div className="signoutTextContainer">
        <div
          className="signoutContainer"
          onClick={() => {
            signUserOut();
          }}
        >
          <div className="signoutText">
            <LockRoundedIcon className="lockIcon" />
          </div>
        </div>
        <div className="signoutName">{backendData && backendData.name}</div>
      </div>
    </div>
  );
}

export default SignOut;
