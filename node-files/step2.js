// Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.

// Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

const fs = require("fs");
const axios = require("axios");
const validUrl = require("valid-url");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`${data}`);
  });
}

function webCat(url) {
  try {
    axios.get(url).then(function (resp) {
      console.log(resp.data.slice(0, 80), "...");
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

function checkIfURL(text) {
  try {
    if (validUrl.isUri(text)) {
      webCat(text);
    } else {
      cat(text);
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

cat("dickinson.txt");

webCat("http://www.google.com");

checkIfURL("http://google.com");

checkIfURL("dickinson.txt");

// Should throw TypeError
// checkIfURL(49);
