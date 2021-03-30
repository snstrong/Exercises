/*
Pokedex
Is provided, via props, an array of objects describing different pokemon, and renders a sequence of Pokecard components.
 **/

import React from "react";
import Pokecard from "./Pokecard.js";
import "./Pokedex.css";
const Pokedex = (props) => {
  return (
    <div className="Pokedex">
      <h2 className="Pokedex-title">Pokedex</h2>
      <div className="Pokedex-cards">
        {props.pokemon.map((p) => {
          return <Pokecard {...p} />;
        })}
      </div>
    </div>
  );
};

export default Pokedex;
