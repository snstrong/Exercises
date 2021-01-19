/** Textual markov chain generator */

const fs = require("fs");

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // let
    let result = {};
    for (let i = 0; i < this.words.length; i++) {
      let next;
      if (this.words[i + 1]) {
        next = this.words[i + 1];
      } else {
        next = null;
      }
      if (result && this.words[i] in result) {
        result[this.words[i]].push(next);
      } else {
        result[this.words[i]] = [];
        result[this.words[i]].push(next);
      }
    }
    console.log(result);
    return result;
  }

  /** return random text from chains */
  makeText(numWords = 100) {
    // TODO
    let firstWord = this.words[Math.floor(Math.random() * this.words.length)];
    console.log(firstWord);
  }
}

let m = new MarkovMachine(
  "Shall I compare thee to a summer’s day? Thou art more lovely and more temperate: Rough winds do shake the darling buds of May, And summer’s lease hath all too short a date."
);
