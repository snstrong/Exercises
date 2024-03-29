/** Write a function called separatePositive which accepts an array of non-zero integers. Separate the positive integers to the left and the negative integers to the right. The positive numbers and negative numbers need not be in sorted order. The problem should be done in place (in other words, do not build a copy of the input array).

Examples:

separatePositive([2, -1, -3, 6, -8, 10]) // [2, 10, 6, -3, -1, -8]
separatePositive([5, 10, -15, 20, 25]) // [5, 10, 25, 20, -15]
separatePositive([-5, 5]) // [5, -5]
separatePositive([1, 2, 3]) // [1, 2, 3] */

// [1, -1]
// [-1, 1]
// [-1, -1]
// [1, 1]

function separatePositive(arr) {
  let start = 0;
  let end = arr.length - 1;
  let temp = 0;

  while (start < end) {
    if (arr[start] < 0 && arr[end] > 0) {
      // switch places
      temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      // both pointers move
      start++;
      end--;
    } else if (arr[start] < 0 && arr[end] < 0) {
      end--;
    } else if (arr[start] > 0 && arr[end] > 0) {
      start++;
    } else {
      start++;
      end--;
    }
  }

  return arr;
}

module.exports = separatePositive;
