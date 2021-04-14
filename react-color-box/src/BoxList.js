import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "./BoxList.css";

const BoxList = () => {
  const INITIAL_STATE = [
    // { id: uuid(), backgroundColor: "cyan" },
    // { id: uuid(), backgroundColor: "magenta" },
    // { id: uuid(), backgroundColor: "yellow" },
  ];
  const [boxes, setBoxes] = useState(INITIAL_STATE);
  const addBox = (newBox) => {
    setBoxes((boxes) => [...boxes, { ...newBox, id: uuid() }]);
  };
  const removeBox = (id) => {
    setBoxes((boxes) => boxes.filter((box) => box.id !== id));
  };

  return (
    <div className="BoxList">
      <h1 className="BoxList-title">BoxList</h1>
      <NewBoxForm addBox={addBox} />
      <div>
        {boxes.map(({ width, height, backgroundColor, id }) => (
          <Box
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            id={id}
            key={id}
            removeBox={removeBox}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxList;
