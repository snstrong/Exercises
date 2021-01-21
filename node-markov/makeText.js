const { MarkovMachine } = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

/** Command-line tool to generate Markov text. */

/** handle output: generate and print MarkovMachine text */
//
function handleOutput(text) {
  try {
    let m = new MarkovMachine(text);
    console.log(m.makeText());
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

/** read file at path and generate MarkovMachine text. */
//
function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data);
    }
  });
}

/** read page at URL and generate MarkovMachine text. */
//
async function webCat(url) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

/** Determine whether the desired source for MarkovMachine text is a file or url
 ** and call functions to generate text accordingly. */
//
let inType = process.argv[2];
let path = process.argv[3];

if (inType === "file") {
  cat(path);
} else if (inType === "url") {
  webCat(path);
} else {
  console.log(
    "Only accepted input types are 'file' and 'url'. Please try again."
  );
  process.exit(1);
}
