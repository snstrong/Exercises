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
  // calculation from
  // http://www.tutorialspoint.com/calculating-median-of-an-array-javascript

  const sorted = nums.slice().sort((a, b) => {
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

let testNums = [3, 5, 4, 4, 1, 1, 2, 3];

function calculateMode(nums) {
  // Calculation from
  // https://jonlabelle.com/snippets/view/javascript/calculate-mean-median-mode-and-range-in-javascript

  // as result can be bimodal or multi-modal,
  // the returned result is provided as an array
  // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]

  let modes = [],
    count = [],
    i,
    number,
    maxIndex = 0;

  for (i = 0; i < nums.length; i += 1) {
    number = nums[i];
    count[number] = (count[number] || 0) + 1;
    if (count[number] > maxIndex) {
      maxIndex = count[number];
    }
  }

  for (i in count)
    if (count.hasOwnProperty(i)) {
      if (count[i] === maxIndex) {
        modes.push(Number(i));
      }
    }

  return modes;
}

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
  let mean = calculateMean(arr);
  console.log("The mean of these numbers is: ", mean);
  let response = {
    operation: "mean",
    value: mean,
  };
  console.log(response);
  return res.json(response);
});

app.get("/median", (req, res) => {
  let nums = req.query.nums;
  let arr = getQueryInts(nums);
  let median = calculateMedian(arr);
  let response = {
    operation: "median",
    value: median,
  };
  return res.json(response);
});

app.get("/mode", (req, res) => {
  let nums = req.query.nums;
  let arr = getQueryInts(nums);
  let mode = calculateMode(arr);
  let response = {
    operation: "mode",
    value: mode,
  };
  return res.json(response);
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
