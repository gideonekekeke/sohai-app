import React from "react";
import "./ProductForm.css";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { app } from "../Base/Base";

const db = app.firestore().collection("Product Ad");
function ProductForm() {
  const [productImage, setProductImage] = React.useState(null);
  const [companyLogo, setCompanyLogo] = React.useState(null);
  const [companyName, setCompanyName] = React.useState("");
  const [companyURL, setCompanyURL] = React.useState("");
  const [productDiscription, setProductDiscription] = React.useState("");

  const PostProductImage = async (e) => {
    const fileRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const childRef = storageRef.child(fileRef.name);
    await childRef.put(fileRef);
    setProductImage(await childRef.getDownloadURL());
  };

  const PostProductLogo = async (e) => {
    const fileRef = e.target.files[0];
    const storageRef = app.storage().ref();
    const childRef = storageRef.child(fileRef.name);
    await childRef.put(fileRef);
    setCompanyLogo(await childRef.getDownloadURL());
  };

  const PostAllProductFile = async () => {
    await db.doc().set({
      companyName,
      productDiscription,
      companyURL,
      AdvertImage: await productImage,
      ProductLogo: await companyLogo,
    });
    setCompanyLogo("");
    setCompanyName("");
    setCompanyURL("");
    setProductDiscription("");
    setProductImage("");
  };

  return (
    <div className="FormMain">
      <div className="SubFormMain">
        <strong>Ad Image</strong>
        <Input
          type="file"
          style={{ width: "280px", marginTop: "5px", marginBottom: "5px" }}
          onChange={PostProductImage}
        />
        <strong>Company Logo</strong>
        <Input
          type="file"
          style={{ width: "280px", marginTop: "5px", marginBottom: "5px" }}
          onChange={PostProductLogo}
        />
        <Input
          placeholder="Name Of Company"
          style={{ width: "280px", marginTop: "10px", marginBottom: "10px" }}
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
          }}
        />
        <Input
          placeholder="URL Of Company"
          style={{ width: "280px", marginTop: "10px", marginBottom: "10px" }}
          value={companyURL}
          onChange={(e) => {
            setCompanyURL(e.target.value);
          }}
        />
        <TextArea
          placeholder="Short Discription Of Product"
          style={{ width: "280px", marginTop: "10px", marginBottom: "10px" }}
          value={productDiscription}
          onChange={(e) => {
            setProductDiscription(e.target.value);
          }}
        />
        <Button
          onClick={PostAllProductFile}
          style={{
            marginTop: "10px",
            width: "100px",
            backgroundColor: "rgb(46, 99, 235)",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default ProductForm;
