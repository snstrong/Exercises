const express = require("express");
const ExpressError = require("./expressError");

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

function getInts(nums) {
  if (!nums) {
    throw new ExpressError("Numbers are required", 400);
  }
  let arr = nums.split(",");
  arr.forEach((num, index, arr) => {
    if (parseInt(num)) {
      arr[index] = parseInt(num);
    } else {
      throw new ExpressError(`${num} is not a number`, 400);
    }
  });
  return arr;
}

app.get("/:all", (req, res, next) => {
  try {
    let operation = req.params.all;
    let fn;
    if (operation === "mean") {
      fn = calculateMean;
    } else if (operation === "median") {
      fn = calculateMedian;
    } else if (operation === "mode") {
      fn = calculateMode;
    } else {
      throw new ExpressError("Page not found", 404);
    }
    let nums = req.query.nums;
    let arr = getInts(nums);
    let val = fn(arr);
    let response = {
      operation: operation,
      value: val,
    };
    return res.json(response);
  } catch (e) {
    next(e);
  }
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
