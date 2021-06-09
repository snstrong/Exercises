/**
 * Write a function called findRotatedIndex
 * which accepts a rotated array of sorted numbers and an integer.
 * The function should return the index of num in the array.
 * If the value is not found, return -1.
 * Examples:
 * findRotatedIndex([3,4,1,2],4) // 1
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8) // 2
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3) // 6
 * findRotatedIndex([37,44,66,102,10,22],14) // -1
 * findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12) // -1
 */
function findRotatedIndex(arr, num) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  let middleIdx = Math.floor((leftIdx + rightIdx) / 2);

  while (leftIdx <= rightIdx) {
    if (arr[leftIdx] === num) {
      return leftIdx;
    } else if (arr[rightIdx] === num) {
      return rightIdx;
    } else if (arr[middleIdx] === num) {
      return middleIdx;
    } else if (arr[middleIdx] > num && num > arr[rightIdx]) {
      rightIdx = middleIdx - 1;
    } else if (arr[middleIdx] > num && num < arr[rightIdx]) {
      leftIdx = middleIdx + 1;
    } else if (arr[middleIdx] < num) {
      leftIdx = middleIdx + 1;
    } else {
      return -1;
    }
    middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  }
  return -1;
}

module.exports = findRotatedIndex;
