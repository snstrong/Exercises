const express = require("express");

const app = express();

app.use(express.json());

function calculateMean(nums) {
    let total;
    for (let num in nums) {
        total = total + num;
    }
    return total / nums.length - 1;
}

function calculateMedian(nums) {
    // https://www.tutorialspoint.com/calculating-median-of-an-array-javascript
    
    const sorted = arr.slice().sort((a, b) => {
        return a - b;
     });
     if(sorted.length % 2 === 0){
        const first = sorted[sorted.length / 2 - 1];
        const second = sorted[sorted.length / 2];
        return (first + second) / 2;
     }
     else{
        const mid = Math.floor(sorted.length / 2);
        return sorted[mid];
     };
}

function calculateMode(nums) {
    // Logic: https://www.mathsisfun.com/mode.html

}

app.get("/mean", (req, res) => {
    // res.json(CANDIES);
  });
app.get("/median", (req, res) => {
    // res.json(CANDIES);
  });
app.get("/mode", (req, res) => {
    // res.json(CANDIES);
  });



// const CANDIES = [
//   { name: "snickers", qty: 43, price: 1.5 },
//   { name: "skittles", qty: 26, price: 0.99 },
// ];

// app.get("/candies", (req, res) => {
//   res.json(CANDIES);
// });

// app.post("/candies", (req, res) => {
//   if (req.body.name.toLowerCase() === "circus peanuts") {
//     res
//       .status(403)
//       .json({ msg: "HORRIBLE CHOICE.  CIRCUS PEANUTS FORBIDDEN!" });
//   }
//   CANDIES.push(req.body);
//   res.status(201).json(CANDIES);
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
});
