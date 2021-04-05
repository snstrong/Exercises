/* 
Magic Eight Ball component

The EightBall takes a single property, answers, which should be an array of objects, with each object having a key for msg and color.

When you click on the ball, it should choose a random answer & the matching color for that answer. 


**/

import React, { useState } from "react";
import "./EightBall.css";

const defaultAnswers = [
  { msg: "It is certain.", color: "green" },
  { msg: "It is decidedly so.", color: "green" },
  { msg: "Without a doubt.", color: "green" },
  { msg: "Yes - definitely.", color: "green" },
  { msg: "You may rely on it.", color: "green" },
  { msg: "As I see it, yes.", color: "green" },
  { msg: "Most likely.", color: "green" },
  { msg: "Outlook good.", color: "green" },
  { msg: "Yes.", color: "green" },
  { msg: "Signs point to yes.", color: "goldenrod" },
  { msg: "Reply hazy, try again.", color: "goldenrod" },
  { msg: "Ask again later.", color: "goldenrod" },
  { msg: "Better not tell you now.", color: "goldenrod" },
  { msg: "Cannot predict now.", color: "goldenrod" },
  { msg: "Concentrate and ask again.", color: "goldenrod" },
  { msg: "Don't count on it.", color: "red" },
  { msg: "My reply is no.", color: "red" },
  { msg: "My sources say no.", color: "red" },
  { msg: "Outlook not so good.", color: "red" },
  { msg: "Very doubtful.", color: "red" },
];
const EightBall = ({ answers = defaultAnswers }) => {
  const getAnswer = () => {
    const randIdx = Math.floor(Math.random() * answers.length);
    return answers[randIdx];
  };
  const [msg, setMsg] = useState("Think of a question...");
  const [color, setColor] = useState("black");

  const handleClick = (evt) => {
    const { msg, color } = getAnswer();
    setMsg(msg);
    setColor(color);
    setTimeout(() => {
      setMsg("Think of a question...");
      setColor("black");
    }, 3500);
  };

  return (
    <div
      className="EightBall"
      onClick={handleClick}
      style={{ backgroundColor: color }}
    >
      <p className="EightBall-text">{msg}</p>
    </div>
  );
};

export default EightBall;
