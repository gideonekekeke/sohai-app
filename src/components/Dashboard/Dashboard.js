import React from "react";
import "./Dashboard.css";
import NavLink from "../LinkNav/HomeHead";
import ProductCard from "../ProductCard/ProductCard";
import ProductHeader from "../ProductHeader/ProductHeader";
import ProfesionalCard from "../ProfessionalCard/ProfesionalCard";

function Dashboard() {
  return (
    <div className="componentWrapper">
      <div className="leftNav">
        <ProductHeader />
        <ProductCard />
      </div>
      <div className="middleNav">
        <NavLink />
      </div>
      <div className="rightNav">
        <ProductHeader />
        <ProfesionalCard />
      </div>
    </div>
  );
}

export default Dashboard;
