import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import Nav from "./Nav";
import whiskeyImg from "./dogs/whiskey.jpg";
import dukeImg from "./dogs/duke.jpg";
import perryImg from "./dogs/perry.jpg";
import tubbyImg from "./dogs/tubby.jpg";

const dogs = [
  {
    name: "Whiskey",
    age: 5,
    src: whiskeyImg,
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!",
    ],
  },
  {
    name: "Duke",
    age: 3,
    src: dukeImg,
    facts: [
      "Duke believes that ball is life.",
      "Duke likes snow.",
      "Duke enjoys pawing other dogs.",
    ],
  },
  {
    name: "Perry",
    age: 4,
    src: perryImg,
    facts: [
      "Perry loves all humans.",
      "Perry demolishes all snacks.",
      "Perry hates the rain.",
    ],
  },
  {
    name: "Tubby",
    age: 4,
    src: tubbyImg,
    facts: [
      "Tubby is really goofy.",
      "Tubby does not like walks.",
      "Angelina used to hate Tubby, but claims not to anymore.",
    ],
  },
];

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Adopt a Dog</h1>
        <Nav />
        <Routes />
      </BrowserRouter>
    </div>
  );
  //
}

export default App;
export { dogs };
