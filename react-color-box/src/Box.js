import React from "react";
import "./Box.css";

const Box = ({ width = 100, height = 100, backgroundColor, id, removeBox }) => {
  const boxStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: backgroundColor,
  };
  const handleRemove = () => removeBox(id);
  return (
    <div className="Box" id={id}>
      <div className="Box-color-box" style={boxStyle}></div>
      <button className="Box-button" onClick={handleRemove}>
        x
      </button>
    </div>
  );
};

export default Box;
