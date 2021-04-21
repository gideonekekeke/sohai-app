import React, { useState, useEffect } from "react";
import { app } from "../Base/Base";

const posting = app.firestore().collection("Posts");
const db = app.firestore().collection("Users");

const ImageViewForComment = ({ poster }) => {
  const [img, setImg] = useState("");

  const getImage = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await db
        .doc(poster)
        .get()
        .then((doc) => {
          setImg(doc.data());
        });
    }
  };

  useEffect(() => {
    getImage();
  }, []);
  return (
    <div>
      <img
        src={img && img.Photo}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: "silver",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ImageViewForComment;
