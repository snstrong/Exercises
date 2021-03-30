/* Pokecard
Shows a single Pokemon, with their name, image, and type. **/

import React from "react";
import "./Pokecard.css";
const BASEURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;

const Pokecard = (props) => {
  return (
    <div className="Pokecard">
      <h2 className="Pokecard-title">{props.name}</h2>
      <img
        className="Pokecard-image"
        src={`${BASEURL}/${props.id}.png`}
        alt={props.name}
      />
      <p className="Pokecard-data">Type: {props.type}</p>
      <p className="Pokecard-data">EXP: {props.base_experience}</p>
    </div>
  );
};

export default Pokecard;
