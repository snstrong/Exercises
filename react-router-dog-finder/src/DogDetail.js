import React from "react";
import { useParams } from "react-router-dom";

const DogDetail = ({ dogs }) => {
  const { name } = useParams();
  if (name) {
    return (
      <div>
        <p>This is the dog detail page for {name}.</p>
      </div>
    );
  }
  return null;
  // const dog = dogs.filter((dog) => {
  //   return dog.name.toLowerCase() === name;
  // });

  // const factList = facts.map((fact) => {
  //   return <p>{fact}</p>;
  // });
};

export default DogDetail;
