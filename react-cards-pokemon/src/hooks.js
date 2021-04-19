import { useState } from "react";
import axios from "axios";
import uuid from "uuid";

const useFlip = () => {
  const [isFacingUp, setIsFacingUp] = useState(true);
  const flipCard = () => {
    setIsFacingUp((isUp) => !isUp);
  };
  return [isFacingUp, flipCard];
};

const useAxios = (url) => {
  const [cards, setCards] = useState([]);
  const addCard = async (urlOptions) => {
    let completeUrl;
    typeof urlOptions === "string"
      ? (completeUrl = url + urlOptions)
      : (completeUrl = url);
    console.log(completeUrl);
    const response = await axios.get(completeUrl);
    console.log(response);
    setCards((cards) => [...cards, { ...response.data, id: uuid() }]);
  };
  return [cards, addCard];
};

export { useFlip, useAxios };
