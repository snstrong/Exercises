/** Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

Examples:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false
*/

function digitCounter(int) {
  let freq = {};
  let intStr = String(int);
  for (let digit of intStr) {
    freq[digit] = freq[digit] + 1 || 1;
  }
  return freq;
}

function sameFrequency(int1, int2) {
  if (String(int1).length !== String(int2).length) return false;
  let int1Freq = digitCounter(int1);
  let int2Freq = digitCounter(int2);
  if (Object.keys(int1Freq).length !== Object.keys(int2Freq).length)
    return false;
  for (let key in int1Freq) {
    if (!int2Freq[key] || int2Freq[key] !== int1Freq[key]) return false;
  }
  return true;
}

console.log(sameFrequency(3589578, 5879385));

module.exports = sameFrequency;
