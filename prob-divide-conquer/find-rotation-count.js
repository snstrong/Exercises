/**
 * Write a function called findRotationCount
 * which accepts an array of distinct numbers
 * sorted in increasing order.
 * The array has been rotated counter-clockwise n number of times.
 * Given such an array, find the value of n.
 *
 * Examples:
 *
 * findRotationCount([15, 18, 2, 3, 6, 12]) // 2
 * findRotationCount([7, 9, 11, 12, 5]) // 4
 * findRotationCount([7, 9, 11, 12, 15]) // 0
 */

function findRotationCount() {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  let middleIdx = Math.floor((leftIdx + rightIdx) / 2);

  console.log(
    `leftIdx: ${leftIdx}, middleIdx: ${middleIdx}, rightIdx: ${rightIdx}`
  );
}

module.exports = findRotationCount;
