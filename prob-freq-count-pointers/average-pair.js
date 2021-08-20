/** Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

Constraints:

Time Complexity: O(N)

Examples:

averagePair([1, 2, 3], 2.5); // true
averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8); // true
averagePair([-1, 0, 3, 4, 5, 6], 4.1); // false
averagePair([], 4); // false */

function averagePair(arr, targetAvg) {
  if (arr.length <= 1) return false;
  let left = 0;
  let right = arr.length - 1;
  let avg = 0;
  while (left < right) {
    avg = (arr[left] + arr[right]) / 2;
    if (avg - targetAvg === 0) {
      return true;
    } else if (avg < targetAvg) {
      // left moves up one idx
      left++;
    } else {
      // right moves up one idx
      right--;
    }
  }
  return false;
}

module.exports = averagePair;
