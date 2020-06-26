// Maps and Sets Exercise

// Quick Question #1
// What does the following code return?
new Set([1,1,2,2,3,4]) // {1, 2, 3, 4}

// Quick Question #2
// What does the following code return?
[...new Set("referee")].join("") // "ref"

// Quick Questions #3
// What does the Map m look like after running the following code?
let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
// Map m has one array key [1,2,3] that is set to the value true, and one array key [1,2,3] that is set to the value false.

// hasDuplicate
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate
// hasDuplicate([1,3,2,1]) // true
// hasDuplicate([1,5,-1,4]) // false
function hasDuplicate(arr) {
    let checkArr = new Set(arr);
    return checkArr.size < arr.length;
}

// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.
// vowelCount('awesome') // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
// vowelCount('Colt') // Map { 'o' => 1 }

const isVowel = function(char) {
	return "aeiou".indexOf(char) != -1;
}

function vowelCount(str) {
    const lowerCased = Array.from(str.toLowerCase());
    const justVowels = lowerCased.filter(isVowel);
    const vowels = Array.from("aeiou");
    let mapr = new Map();
    vowels.forEach(function(vowel) {
        let count = 0;
        justVowels.forEach(function(char) {   
            if (char === vowel) {
                count++;
            }
        });
        if (count != 0) mapr.set(vowel, count); 
    });
    return mapr;
}