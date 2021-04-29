import React from "react";
import { Link } from "react-router-dom";

const VendingMachine = () => {
  return (
    <div className="VendingMachine">
      <h1>What can I vend ya?</h1>
      <div style={{ width: "90%" }}>
        <img
          src="http://web.mit.edu/2.744/studentSubmissions/humanUseAnalysis/keval/vm.jpg"
          style={{ float: "left" }}
        ></img>
        <div style={{ width: "200px", float: "left" }}>
          <h2>
            <Link to="/glazed-pecans">Glazed Pecans</Link>
          </h2>
          <h2>
            <Link to="/fig-bars">Fig Bars</Link>
          </h2>
          <h2>
            <Link to="/kettle-chips">Kettle Chips</Link>
          </h2>
          <h2>
            <Link to="/pirates-booty">Pirate's Booty</Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
