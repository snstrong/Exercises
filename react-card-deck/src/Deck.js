import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

/**
 * From API, need deck id (useRef?)
 */

const Deck = () => {
  const BASE_URL = "https://deckofcardsapi.com/api";
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);

  // Set the deck
  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
      setDeck(res.data);
    }
    getDeck();
  }, [setDeck]);

  // Pick a card
  useEffect(() => {
    async function getCard() {
      if (deck) {
        let { deck_id } = deck;
        const res = await axios.get(
          `${BASE_URL}/deck/${deck_id}/draw/?count=1`
        );
        console.log(res.data.cards[0]);
        setDrawnCards([...drawnCards, res.data.cards[0]]);
      } else {
        console.log("hey");
        setDrawnCards([]);
      }
    }
    getCard();
  }, [setDeck, deck]);

  const cards = drawnCards.map((c) => (
    <Card key={c.id} name={c.name} srcUrl={c.image} />
  ));

  return (
    <div>
      <h1>Pick a Card</h1>
      {deck ? <button>Pick a Card</button> : <p>"No deck set!"</p>}
      <div>{cards}</div>
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
