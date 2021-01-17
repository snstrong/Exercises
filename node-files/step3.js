// Add a feature where, on the command line,
// you can optionally provide an argument to output to a file
// instead of printing to the console. The argument should look like this:
//  --out output-filename.txt readfile-or-url.

const fs = require("fs");
const axios = require("axios");
const validUrl = require("valid-url");
const process = require("process");

async function cat(path) {
  var contents;
  // Do I need to await this? Does this need to be an async function?
  await fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // The following line works, but when I try to console.log the return value of this function, it logs nothing to the console.
    // See ln 78.
    // console.log(`${data}`);

    // When attempt to log this, it is undefined.
    contents = `${data}`;

    // When logged, this is blank.
    contents = data;
  });
  return contents;
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    resp.then(function (resp) {
      console.log(resp.data.slice(0, 80), "...");
      return resp;
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

function checkIfURL(path) {
  if (validUrl.isUri(path)) {
    return true;
  } else {
    return false;
  }
}

// Command line args to write to a file:
// process.argv[2] : --out
// 3 : output-filename.txt
// 4 : readfile-or-url

async function parseArgs(argArr) {
  if (argArr[2] === "--out") {
    let data;
    if (checkIfURL(argArr[4])) {
      data = await webCat(argArr[4]);
    } else {
      data = await cat(argArr[4]);
    }
    fs.writeFile(argArr[3], data, "utf8", (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log(data);
      }
    });
  } else {
    if (checkIfURL(argArr[2])) {
      data = await webCat(argArr[2]);
    } else {
      data = await cat(argArr[2]);
    }
    console.log(data);
  }
}

// This prints nothing to the console when called with a valid filepath.
// cat(process.argv[2]).then((data) => console.log(data));

// This gives me a SyntaxError: await is only valid in async function.
// let data = await cat(process.argv[2]);
// data.then((resolved) => console.log(resolved));

// This prints Promise { <pending> } to the console.
// let data = cat(process.argv[2]);
// console.log(data);

// SyntaxError: await is only valid in async function
// let data = await cat(process.argv[2]);
// console.log(data);

// Another attempt; prints nothing to the console
// async function printIt(path) {
//   let data = await cat(path);
//   console.log(`${data}`);
// }
// printIt(process.argv[2]);
// printIt("dickinson.txt");
