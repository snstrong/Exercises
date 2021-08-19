/** Write a function called constructNote,
 * which accepts two strings, a message and some letters.
 * The function should
 * return true if the message can be built with the letters that you are given;
 * otherwise, it should return false.

Assume that there are only lowercase letters and no space or special characters in both the message and the letters.

Constraints:

Time Complexity: O(M + N) - If M is the length of message and N is the length of letters:

Examples:

constructNote('aa', 'abc') // false
constructNote('abc', 'dcba') // true
constructNote('aabbcc', 'bcabcaddff') // true
 * 
 */

function countCharFreq(str) {
  let charFreq = new Map();
  for (let char of str) {
    charFreq.set(char, charFreq.get(char) + 1 || 1);
  }
  return charFreq;
}

function constructNote(message, letters) {
  let mCharFreq = countCharFreq(message);
  let lCharFreq = countCharFreq(letters);
  for (let key of mCharFreq.keys()) {
    if (lCharFreq.size < mCharFreq.size) return false;
    if (!lCharFreq.get(key) || lCharFreq.get(key) < mCharFreq.get(key))
      return false;
  }
  return true;
}

module.exports = constructNote;
