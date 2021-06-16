import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import { app } from "../Base/Base";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "antd";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";

import pic from "../../img/1.jpg";
import up from "../../img/my2.jpg";
import "./cas.css";
import {
  MoreOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { GlobalContext } from "../AuthState/GlobalContext";
import DisplayMessage from "./DisplayMessage";
// import DisplayComent from "./dispalyComent";
// import ImageDisplay from "./ImageDisplay";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    // border: "2px solid #000",
    // backgroundImage: "linear-gradient(#4c87df, #1854b1, #2233ac)",
    backgroundColor: "white",
    // color: "white",

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",

    display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
}));

const db = app.firestore().collection("Profesional");

function ProffesionalMessage({ id }) {
  const { current, currentData } = useContext(GlobalContext);
  const classes = useStyles();
  // const { id } = useParams();

  const [data, setData] = useState([]);
  const [needData, setNeedData] = useState([]);
  const [com, setCom] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPack = async () => {
    const docRef = await db.doc(id);
    const docData = await docRef.get();

    setData(docData.data());
  };

  const comenting = async () => {
    const commentingUser = await app.auth().currentUser;

    if (commentingUser) {
      await db.doc(id).collection("comment").doc().set({
        poster: commentingUser.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        timer: firebase.firestore.FieldValue.serverTimestamp(),
        com,
      });
      setCom("");
    }
  };

  const getComment = async () => {
    const gotCom = await app.auth().currentUser;

    if (gotCom) {
      await db
        .doc(id)
        .collection("comment")
        // .orderBy("dateTime", "asc")
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setNeedData(i);
        });
    }
  };

  useEffect(() => {
    getPack();
    getComment();
    console.log("this is for proffessionals", data);
  }, []);

  return (
    <>
      <Button
        onClick={handleOpen}
        style={{
          height: "30px",
          marginTop: "5px",
          background: "none",
          border: "2px solid lightblue",
          cursor: "pointer",
        }}
      >
        Message
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div initial={{ y: "-100vh" }} animate={{ y: 0 }} className="thin">
            <div className="modal_body">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  display: "flex",
                  // backgroundColor: "red",
                  width: "100%",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  // margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={data && data.avatar}
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
                    <div style={{ marginLeft: "10px" }}>
                      {data && data.fullName}
                    </div>
                    <div
                      style={{
                        color: "silver",
                        marginLeft: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {" "}
                      {/* {moment(data.timer).calendar()}; */}
                    </div>
                  </div>
                </div>
                <CloseIcon
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    handleClose();
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginTop: "0px",
                }}
                className="station"
              >
                {data && data.decs}
              </div>

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  // backgroundColor: "red",
                  margin: "20px",
                }}
              >
                <img
                  src={currentData && currentData.Photo}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: "silver",
                    objectFit: "cover",
                  }}
                />

                <input
                  value={com}
                  onChange={(e) => {
                    setCom(e.target.value);
                  }}
                  placeholder="type..."
                  style={{ height: "40px", marginTop: "px", width: "60%" }}
                />

                <SendIcon
                  onClick={comenting}
                  style={{
                    // marginLeft: "-20px",
                    // height: "15px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </div>
              {needData.map(({ id, timer, com, createdAt, poster }) => (
                <div>
                  <DisplayMessage
                    // timer={timer}
                    com={com}
                    createdAt={createdAt}
                    poster={poster}
                  />
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default ProffesionalMessage;
