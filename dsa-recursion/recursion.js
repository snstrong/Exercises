/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1;

  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length === 0) return 0;

  let head = words[0];
  let tail = words.slice(1);

  let longestTail = longest(tail);

  if (head.length > longestTail) {
    return head.length;
  } else {
    return longestTail;
  }
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let head = str[0];
  let tail = str.slice(2);

  if (tail.length === 0) {
    return head;
  } else {
    return `${head}${everyOther(tail)}`;
  }
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length === 0 || str.length === 1) return true;

  if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, str.length - 1));
  } else {
    return false;
  }
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (arr.length === i) return -1;
  if (arr[i] === val) return i;
  return findIndex(arr, val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = str.length - 1) {
  let newStr = str[i];
  if (i === 0) return newStr;
  return newStr + revString(str, i - 1);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, i = 0, arr = []) {
  let keys = Object.keys(obj);
  if (keys.length === 0) return null;

  let val = obj[keys[i]];

  if (typeof val === "string") {
    arr.push(val);
  } else if (typeof val === "object") {
    arr.push(...gatherStrings(val));
  }
  if (i === keys.length - 1) return arr;

  return gatherStrings(obj, i + 1, arr);
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
