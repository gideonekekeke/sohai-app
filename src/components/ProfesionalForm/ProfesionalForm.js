import React, { useState } from "react";
import "./ProfesionalForm.css";
import { useHistory } from "react-router-dom";
import {
  ContactsOutlined,
  PartitionOutlined,
  AuditOutlined,
  MailOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { ApiOutlined, TeamOutlined, CommentOutlined } from "@ant-design/icons";
import { app } from "../Base/Base";
import { Button, Input } from "antd";

const appreg = app.firestore().collection("Profesional");

function ProfesionalForm() {
  const [avatar, setavatar] = useState("");
  const [cover, setCover] = useState("");
  const [fullName, setfullName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setemail] = useState("");
  const [paswword, setpassword] = useState("");
  const [decs, setDes] = useState("");
  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  const clickHer = () => {
    setToggle(!toggle);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setavatar(await fileRef.getDownloadURL());
  };

  const uploadCover = async (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setCover(await fileRef.getDownloadURL());
  };

  const SignInUser = async () => {
    const newUser = await app
      .auth()
      .signInWithEmailAndPassword(email, paswword);
    if (newUser) {
      history.push("/dashboard");
    }
  };

  const SignUpUser = async () => {
    const newUser = await app
      .auth()
      .createUserWithEmailAndPassword(email, paswword);
    if (newUser) {
      await appreg.doc(newUser.user.uid).set({
        fullName,
        profession,
        email,
        paswword,
        decs,
        avatar: await avatar,
        cover: await cover,
      });
    }
  };

  return (
    <div>
      <div className="allReg">
        <div className="regNav">
          <div className="img_reg">
            <div className="back_img">
              <div
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "45px",
                  marginTop: "20px",
                }}
              >
                Smart Padi
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: "15px",
                  width: "300px",
                  textAlign: "center",
                }}
              >
                You can decide what you are going to think in any given
                situation. Your thoughts and feelings determine your actions and
                determine the results you get. It all starts with your thoughts
              </div>
            </div>
          </div>
          <div className="reg_con">
            <>
              <br />
              {toggle ? (
                <div className="allInputnav">
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "grey",
                        fontSize: "15px",
                        marginTop: "15px",
                      }}
                    >
                      Sign Out
                    </div>
                    <div
                      style={{
                        height: "2px",
                        width: "50px",
                        background: "#7C3468",
                        marginTop: "5px",
                      }}
                    ></div>
                  </div>
                  <div className="holderArrange">
                    <label
                      style={{
                        color: "grey",
                      }}
                    >
                      Profile image
                    </label>
                    <div className="divContent">
                      <Input
                        style={{
                          background: "none",
                        }}
                        placeholder="Avater"
                        type="file"
                        onChange={uploadImage}
                      />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <label
                      style={{
                        marginTop: "-10px",
                        color: "grey",
                      }}
                    >
                      Cover image
                    </label>

                    <div className="divContent">
                      <Input
                        style={{
                          background: "none",
                        }}
                        placeholder="cover"
                        type="file"
                        onChange={uploadCover}
                      />
                    </div>
                  </div>

                  <div className="holderArrange">
                    <div className="divContent">
                      <ContactsOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "grey",
                          marginTop: "2px",
                        }}
                      />
                      <Input
                        className="navInput"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => {
                          setfullName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <div className="divContent">
                      <PartitionOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "grey",
                          marginTop: "2px",
                        }}
                      />
                      <Input
                        className="navInput"
                        placeholder="Profession"
                        value={profession}
                        onChange={(e) => {
                          setProfession(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <div className="divContent">
                      <MailOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "grey",
                          marginTop: "2px",
                        }}
                      />
                      <Input
                        className="navInput"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <div className="divContent">
                      <ShoppingOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          marginTop: "2px",
                          color: "grey",
                        }}
                      />
                      <Input
                        className="navInput"
                        placeholder="Password"
                        value={paswword}
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <div className="divContent">
                      <AuditOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "grey",
                          marginTop: "2px",
                        }}
                      />
                      <textarea
                        className="inputPart"
                        placeholder="Description"
                        value={decs}
                        onChange={(e) => {
                          setDes(e.target.value);
                        }}
                      ></textarea>
                      {/* <Input
                          className="navInput"
                          placeholder="Type Your Company"
                        /> */}
                    </div>
                  </div>

                  <Button
                    className="button_nav"
                    onClick={() => {
                      SignUpUser();
                    }}
                  >
                    Sign Up
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "10px",
                      width: "300px",
                    }}
                  >
                    <div>Already have an Account,</div>
                    <div
                      style={{
                        marginLeft: "5px",
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={clickHer}
                    >
                      Sign In here
                    </div>
                  </div>
                </div>
              ) : (
                <div className="allInputnav">
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "grey",
                        fontSize: "15px",
                        marginTop: "15px",
                      }}
                    >
                      Sign In
                    </div>
                    <div
                      style={{
                        height: "2px",
                        width: "50px",
                        background: "#7C3468",
                        marginTop: "5px",
                      }}
                    ></div>
                  </div>
                  <div className="hollderLogin">
                    <div className="divcon">
                      <MailOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          color: "grey",
                          marginTop: "2px",
                        }}
                      />
                      <Input className="navInput" placeholder="Email" />
                    </div>
                  </div>
                  <div className="holderArrange">
                    <div className="divContent">
                      <ShoppingOutlined
                        style={{
                          fontSize: "20px",
                          marginRight: "10px",
                          marginTop: "2px",
                          color: "grey",
                        }}
                      />
                      <Input className="navInput" placeholder="Password" />
                    </div>
                  </div>

                  <Button
                    className="button_nav"
                    onClick={() => {
                      console.log("clicked");
                      SignInUser();
                    }}
                  >
                    Sign In
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "10px",
                      width: "300px",
                    }}
                  >
                    <div>Don't Have An Account,</div>
                    <div
                      style={{
                        marginLeft: "5px",
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                      onClick={clickHer}
                    >
                      Sign Up here
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfesionalForm;
