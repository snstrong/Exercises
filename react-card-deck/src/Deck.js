import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

/**
 * From API, need deck id (useRef?)
 */

const Deck = ({ name = "Elie", color = "purple" }) => {
  const BASE_URL = "https://deckofcardsapi.com/api";
  const [deck, setDeck] = useState(null);

  // Set the deck
  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
      setDeck(res.data);
    }
    fetchDeck();
    console.log(deck);
  }, []);

  return (
    <div>
      <h1>Pick a Card</h1>
    </div>
  );

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   async function loadProfile() {
  //     const res = await axios.get(`https://api.github.com/users/${name}`);
  //     setData(res.data.name);
  //   }
  //   loadProfile();
  // }, [name]);

  // return <h3 style={{ color }}>{data ? data : "Loading..."}</h3>;
};

export default Deck;
