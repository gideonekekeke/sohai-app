import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./Upload.css";
import { useHistory } from "react-router-dom";
import { app } from "../Base/Base";
import UserImage from "./UserImage/UserImage";
import TextArea from "antd/lib/input/TextArea";

// creating database reference of the post collection
const posting = app.firestore().collection("Posts");
const db = app.firestore().collection("Users");

// function to upload a post
function Upload() {
  const hist = useHistory();
  const [uploadData, setUploadData] = useState(null);
  const [text, setText] = useState("");

  // function to upload an image
  const UploadFile = async (e) => {
    const File = e.target.files[0];
    const store = app.storage().ref();
    const child = store.child(File.name);
    await child.put(File);
    setUploadData(await child.getDownloadURL());
  };

  // functional component for post upload
  const Uploading = async () => {
    // get current user data
    const UploadUser = await app.auth().currentUser;

    if (UploadUser) {
      await posting.doc().set({
        text,
        uploadData,
        postedBy: UploadUser.uid,
        // Time: new Date().toLocaleString(),
        Time: firebase.firestore.FieldValue.serverTimestamp(),
        CreatedBy: Date.now().toString(),
      });
      // setText("");
      hist.push("/Dashboard");
    }
  };

  return (
    <div className="uploadPostContainer">
      <div className="formContainer">
        <input className="filePart" onChange={UploadFile} type="file" />
        <TextArea
          className="inputPart"
          type={text}
          placeholder="Enter your post"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          style={{ color: "#FF6347", fontWeight: "bold", fontSize: "16px" }}
          className="buttonPart"
          onClick={() => {
            Uploading();
            // this function is not yet working
            setText("");
          }}
        >
          <div className="buttonText">Post</div>
        </button>
      </div>
    </div>
  );
}

export default Upload;
