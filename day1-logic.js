// @ts-check
// Day 1 — Logic & Problem Solving
// Try solving each WITHOUT looking up syntax first. Write pseudocode on paper if stuck.
// Do not use array methods like map/filter/reduce here — use plain loops (for/while).
// This builds raw logic thinking, separate from syntax practice.

// 1. Find the largest number in an array without using Math.max
/**
 * @param {number[]} numbers
 */
function findLargest(numbers) {
  let largest = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }
  return largest;
}
console.log(findLargest([3, 7, 2, 9, 4])); // expect 9

/**
 * @param {string} str
 */
// 2. Count how many times each character appears in a string
function countChars(str) {
  const output = Object.create(null);
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch in output) {
      output[ch] = output[ch] + 1;
    } else {
      output[ch] = 1;
    }
  }
  return output;
}
console.log(countChars("banana"));

/**
 * @param {string} str
 */
// 3. Check if a string is a palindrome (reads the same forwards and backwards)
function isPalindrome(str) {
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }

  return true;
}
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false

/**
 * @param {number[]} arr
 */
// 4. Reverse an array, without using .reverse()
function reverseArray(arr) {
  const output = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    output.push(arr[i]);
  }
  return output;
}
console.log(reverseArray([1, 2, 3, 4, 5])); // [5,4,3,2,1]

/**
 * @param {number[]} numbers
 */
// 5. Find the second largest number in an array
function secondLargest(numbers) {
  let largest = numbers[0];
  let secLargest = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < largest && numbers[i] > secLargest) {
      secLargest = numbers[i];
    }
  }

  return secLargest;
}
console.log(secondLargest([10, 15, 8, 20, 3])); // expect 10


// 6. Remove duplicate values from an array without using Set
/**
 * @param {number[]} arr
 */
function removeDuplicates(arr) {
  /** @type {number[]} */
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    if (!output.includes(arr[i])) {
      output.push(arr[i]);
    }
  }
  return output;
}
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1,2,3,4,5]

/**
 * @param {number[]} numbers
 */
// 7. Given an array of numbers, split them into two arrays: evens and odds
function splitEvenOdd(numbers) {
  const evens = [];
  const odds = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      evens.push(numbers[i]);
    } else {
      odds.push(numbers[i]);
    }
  }
  return { evens: evens, odds: odds };
}
console.log(splitEvenOdd([1, 2, 3, 4, 5, 6]));


// 8. FizzBuzz — classic logic warm-up
// Print numbers 1 to 30. Multiples of 3 -> "Fizz", multiples of 5 -> "Buzz",
// multiples of both -> "FizzBuzz", else the number itself.
/**
 * @param {number} n
 */
function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}
fizzBuzz(30);


/*
  How to work through these:
  1. Read the problem twice before writing any code.
  2. Say the steps out loud or write them as comments first (this is the "thinking" part).
  3. Only then translate steps into code.
  4. If stuck for more than 10-15 min on one, move to the next and come back later.
*/
