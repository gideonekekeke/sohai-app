import React from "react";
import "./Dashboard.css";
import NavLink from "../LinkNav/HomeHead";

function Dashboard() {
  return (
    <div className="componentWrapper">
      <div className="leftNav">left nav</div>
      <div className="middleNav">
        <NavLink />
      </div>
      <div className="rightNav">right nav</div>
    </div>
  );
}

export default Dashboard;
