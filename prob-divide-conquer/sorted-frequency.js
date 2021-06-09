/**
 * Given a sorted array and a number,
 * write a function called sortedFrequency
 * that counts the occurrences of the number in the array.
 *
 * Examples:
 * sortedFrequency([1,1,2,2,2,2,3],2) // 4
 * sortedFrequency([1,1,2,2,2,2,3],3) // 1
 * sortedFrequency([1,1,2,2,2,2,3],1) // 2
 * sortedFrequency([1,1,2,2,2,2,3],4) // -1
 */

function sortedFrequency(arr, num) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  if (arr[leftIdx] > num || arr[rightIdx] < num) return -1;
  let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  // find first and last occurence of num in array, if any
  while (arr[leftIdx] < num || arr[rightIdx] > num) {
    if (arr[middleIdx] < num && arr[leftIdx] < num) {
      leftIdx = middleIdx + 1;
    } else if (arr[middleIdx] > num && arr[rightIdx] > num) {
      rightIdx = middleIdx - 1;
    } else if (arr[middleIdx] === num && arr[leftIdx] !== num) {
      leftIdx++;
    } else if (arr[middleIdx] === num && arr[rightIdx] !== num) {
      rightIdx--;
    } else if (arr[leftIdx] > num || arr[rightIdx] < num) {
      return -1;
    }
    middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  }
  return rightIdx - leftIdx + 1;
}

module.exports = sortedFrequency;
