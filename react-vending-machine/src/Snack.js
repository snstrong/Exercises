import React from "react";
import { Link } from "react-router-dom";

const Snack = ({ id, message, image }) => {
  return (
    <div className="Snack" id={id} style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "2rem" }}>{message}</h1>
      <img src={image} style={{ maxHeight: "500px", width: "auto" }}></img>
      <h2>
        <Link to="/">Go Back</Link>
      </h2>
    </div>
  );
};

export default Snack;
