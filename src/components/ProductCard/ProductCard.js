import React from "react";
import "./ProductCard.css";
// import CompLogo from "../Img/cokeLo.png";
// import CompAd from "../Img/coke.jpg";
import { app } from "../Base/Base";
import { useHistory, Link } from "react-router-dom";

const GetBase = app.firestore().collection("Product Ad");
function ProductCard() {
  const history = useHistory();
  const [getProductFiles, setGetProductFiles] = React.useState([]);

  const GettingBase = async () => {
    await GetBase.onSnapshot((snapshot) => {
      const GetBaseFiles = [];
      snapshot.forEach((doc) => {
        GetBaseFiles.push({ ...doc.data(), id: doc.id });
      });
      setGetProductFiles(GetBaseFiles);
    });
  };

  React.useState(() => {
    GettingBase();
  }, []);

  return (
    <div className="ProductContainer">
      {getProductFiles.map(
        ({
          id,
          companyName,
          productDiscription,
          companyURL,
          AdvertImage,
          ProductLogo,
        }) => (
          <a href={companyURL} target="_blank">
            <div className="MainProductCard">
              <img src={AdvertImage} alt="" className="CompanyAdDiv" />
              <div className="SubProductCard">
                <div className="CompanyLogoName">
                  <img src={ProductLogo} alt="" className="CompanyLogoDiv" />
                  <div className="CompanyNameDiv"> {companyName} </div>
                </div>
                <div className="ShortDiscriptionDiv">{productDiscription}</div>
              </div>
            </div>
          </a>
        )
      )}
    </div>
  );
}

export default ProductCard;
