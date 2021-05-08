import React from "react";
import { useParams, useHistory } from "react-router-dom";

const DogDetail = ({ dogs }) => {
  const { name } = useParams();
  const history = useHistory();

  if (name) {
    const filtered = dogs.filter((dog) => {
      return dog.name.toLowerCase() === name;
    });
    if (filtered.length < 0) {
      const { name, age, src, facts } = filtered[0];
      const factList = facts.map((fact) => {
        return <li>{fact}</li>;
      });
      return (
        <div>
          <h2>{name}</h2>
          <p>Age: {age}</p>
          <img src={src}></img>
          <h3>Get to know {name}!</h3>
          <ul>{factList}</ul>
        </div>
      );
    }
  }
  history.push("/dogs");
  return null;
};

export default DogDetail;
