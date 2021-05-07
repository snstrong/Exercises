import React from "react";

const DogCard = ({ name, age, facts, src }) => {
  //   const factList = facts.map((fact) => {
  //     return <p>{fact}</p>;
  //   });
  return (
    <div
      style={{
        width: "250px",
        marginRight: "15px",
        padding: "10px",
        float: "left",
      }}
    >
      <h3
        style={{
          lineHeight: "1rem",
          marginBottom: "0.25rem",
          paddingBottom: "0px",
        }}
      >
        {name}
      </h3>
      <p style={{ marginTop: "0px", marginBottom: "0.25rem" }}>Age: {age}</p>
      {src ? <img src={src} style={{ height: "225px" }} /> : null}
    </div>
  );
};

export default DogCard;
