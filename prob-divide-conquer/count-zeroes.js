/* Given an array of 1s and 0s which has all 1s first followed by all 0s,
 *  write a function called countZeroes
 *  which returns the number of zeroes in the array.
 * E.g, countZeroes([1,1,1,1,0,0]) // 2
 **/
function countZeroes(arr) {
  let rightIdx = arr.length - 1;
  if (arr[rightIdx] !== 0) return 0;
  let leftIdx = 0;
  let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  while (arr[leftIdx] > 0) {
    if (arr[middleIdx] > 0) {
      leftIdx = middleIdx + 1;
    } else if (arr[middleIdx] === 0) {
      rightIdx = middleIdx;
    }
    middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  }
  return arr.length - leftIdx;
}

module.exports = countZeroes;
