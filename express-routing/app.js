const express = require("express");

const app = express();

app.use(express.json());

function calculateMean(nums) {
  let total = 0;
  for (let num of nums) {
    total = total + num;
  }
  return total / nums.length;
}

function calculateMedian(nums) {
  // https://www.tutorialspoint.com/calculating-median-of-an-array-javascript

  const sorted = arr.slice().sort((a, b) => {
    return a - b;
  });
  if (sorted.length % 2 === 0) {
    const first = sorted[sorted.length / 2 - 1];
    const second = sorted[sorted.length / 2];
    return (first + second) / 2;
  } else {
    const mid = Math.floor(sorted.length / 2);
    return sorted[mid];
  }
}

function calculateMode(nums) {
  // See https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript
}

let testNums = "1,2,3,4,5";

function getQueryInts(nums) {
  let arr = nums.split(",");
  console.log(arr);
  arr.forEach((num, index, arr) => {
    arr[index] = parseInt(num);
  });
  return arr;
}

app.get("/mean", (req, res) => {
  // res.json(CANDIES);
  let nums = req.query.nums;
  let arr = getQueryInts(nums);
  console.log(arr);
  let mean = calculateMean(arr);
  console.log("The mean of these numbers is: ", mean);
  res.send("This is the MEAN route");
});
app.get("/median", (req, res) => {
  // res.json(CANDIES);
  res.send("This is the MEDIAN route");
});
app.get("/mode", (req, res) => {
  // res.json(CANDIES);
  res.send("This is the MODE route");
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
