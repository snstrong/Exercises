import React from "react";
import DogCard from "./DogCard";
const DogList = ({ dogs }) => {
  const dogCards = dogs.map((dog) => {
    return (
      <DogCard name={dog.name} src={dog.src} age={dog.age} facts={dog.facts} />
    );
  });
  return <div style={{ width: "100%" }}>{dogCards}</div>;
};

export default DogList;
