import React from "react";
import "./Home.css";
import NewPost from "../Gidi/Upload";
import AllPost from "../Gidi/Post";

function Home() {
  return (
    <div className="homeContainer">
      <div>
        <NewPost />
      </div>
      <div>
        <h3>All post components for commenting will be here</h3>
      </div>
      <div>
        <AllPost />
      </div>
    </div>
  );
}

export default Home;
