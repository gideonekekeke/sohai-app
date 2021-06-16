import React from "react";
import pic1 from "../../img/1.jpg";
import pic3 from "../../img/3.jpg";
import { Button } from "antd";
import "./ProfessionalCard.css";
import { app } from "../Base/Base";
import ProffesionalMessage from "../ProffessionalMessage/ProffesionalMessage";

const GetBase = app.firestore().collection("Profesional");
function ProfesionalCard() {
  const [getFiles, setGetFiles] = React.useState([]);

  const GetingFiles = async () => {
    await GetBase.onSnapshot((snapshot) => {
      const GetBaseFiles = [];
      snapshot.forEach((doc) => {
        GetBaseFiles.push({ ...doc.data(), id: doc.id });
      });
      setGetFiles(GetBaseFiles);
    });
  };

  React.useState(() => {
    GetingFiles();
  }, []);
  return (
    <div className="profesionalParent">
      {getFiles.map(({ id, avatar, cover, decs }) => (
        <div key={id} className="thePro">
          <div className="thePro_holder">
            <div
              style={{
                height: "100px",
                width: "300px",
                borderBottom: "2px solid lightblue",
              }}
            >
              <img
                src={cover}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "0px 30%",
                  // borderRadius: "5px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "90%",

                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  // marginTop: "-30px",
                  marginLeft: "10px",
                  margin: "10px",
                  // backgroundColor: "lightblue",
                }}
              >
                <img
                  src={avatar}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    marginTop: "-30px",
                    // objectPosition: "1000px 50%",
                    borderRadius: "50px",
                    border: "3px solid lightblue",
                  }}
                />
              </div>

              <ProffesionalMessage id={id} />
            </div>
            <div style={{ margin: "10px", width: "95%", marginTop: "-30px" }}>
              {" "}
              {decs}
              {/* Let's help you pick from our pool of verified, highly qualified,
              ready-to-work teachers to fill that teaching role. */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfesionalCard;
