import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import axios from "axios";

const Deck = () => {
  const BASE_URL = "https://deckofcardsapi.com/api";
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  // Set the deck
  useEffect(() => {
    async function getDeck() {
      const res = await axios.get(`${BASE_URL}/deck/new/shuffle`);
      setDeck(res.data);
    }
    getDeck();
  }, [setDeck]);

  // Draw cards
  useEffect(() => {
    async function getCard() {
      try {
        if (deck) {
          let { deck_id } = deck;
          const res = await axios.get(
            `${BASE_URL}/deck/${deck_id}/draw/?count=1`
          );
          if (res.data.remaining === 0) {
            setAutoDraw(false);
            throw new Error("no cards remaining!");
          }
          setDrawnCards([...drawnCards, { ...res.data.cards[0] }]);
        } else {
          console.log("hey");
          setDrawnCards([]);
        }
      } catch (err) {
        alert(err);
      }
    }
    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoDraw, setAutoDraw, drawnCards, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw((auto) => !auto);
  };

  const cards = drawnCards.map((c) => (
    <Card
      id={c.code}
      key={c.code}
      name={`${c.value} of ${c.suit}`}
      srcUrl={c.image}
    />
  ));

  return (
    <div className="Deck">
      <h1>Pick a Card</h1>
      {deck ? (
        <button className="Deck-drawBtn" onClick={toggleAutoDraw}>
          {autoDraw ? "Stop Drawing" : "Start Drawing"}
        </button>
      ) : null}
      <div>{cards}</div>
    </div>
  );
};

export default Deck;
