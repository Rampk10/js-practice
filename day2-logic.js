// Day 2 — Logic & Problem Solving
// Slightly harder than Day 1. Still avoid array methods where noted — use loops.

// 1. Check if two strings are anagrams of each other (same letters, different order)
function isAnagram(str1, str2) {
  const firstWord ={};
  const arr1 = str1.split("");
  const arr2 = str2.split("");
  let allZero = true;
  if(str1.length !== str2.length) {
    return false;
  }

  for(let i=0; i<arr1.length; i++) {
    const ch = arr1[i];
    if (ch in firstWord) {
      firstWord[ch] = firstWord[ch] +1;
    } else {
      firstWord[ch] = 1
    }
  }

  for (let j=0; j< arr2.length; j++) {
    const th = arr2[j];
    if (th in firstWord) {
      firstWord[th] = firstWord[th] - 1;
    } else {
     return false
    }
  }
  
  for (let key in firstWord) {
    if (firstWord[key] !== 0) {
      allZero = false;
      break;
    }
  }

  return allZero;
}
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false


// 2. Find the missing number in an array of 1 to N (one number is missing)
function findMissingNumbers(arr, n) {
  const missing = [];
  for(let i=1; i<=n; i++) {
    if(!arr.includes(i)){
      missing.push(i);
    }
  }
  return missing;
}
console.log(findMissingNumbers([1, 2, 4, 5], 5)); // [3]


// 3. Print a number pyramid pattern for a given number of rows
// For rows = 4:
// *
// * *
// * * *
// * * * *
function printPyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let row = "";

    for (let j = 1; j <= i; j++) {
      row += "*";
    }

    console.log(row);
  }
}
printPyramid(4);


// 4. Given an array of numbers, find all pairs that add up to a target sum
function findPairsWithSum(arr, target) {
  // e.g. arr = [2,4,3,5,7], target = 7 -> [[2,5],[4,3]] (order may vary)
  const output = [];
  for(let i=0; i< arr.length; i++){
    for(let j = i+1; j< arr.length; j++){
      if(arr[i]+arr[j] === target){
        output.push([arr[i], arr[j]])
      }
    }
  }
  return output;
}
console.log(findPairsWithSum([2, 4, 3, 5, 7,1,6], 7));


// 5. Flatten a nested array by ONE level, without using .flat()
function flattenOneLevel(arr) {
  const output = [];
  for (let i=0; i< arr.length; i++) {
    if(Array.isArray(arr[i])){
      for(let j=0; j< arr[i].length; j++){
        output.push(arr[i][j])
      }
    } else {
    output.push(arr[i])
    }
  }
  return output;
}
console.log(flattenOneLevel([1, [2, 3], [4, [5, 6]]]));


// 6. Given an array of login timestamps (numbers, in minutes), find the
// longest gap in minutes between two consecutive logins
function longestGap(timestamps) {
  let gap = -Infinity;
  let longestGaps = -Infinity;

  for (let i=timestamps.length-1; i > 0; i--){
    gap = timestamps[i] - timestamps[i-1];
    if(gap > longestGaps ) {
      longestGaps = gap;
    }
  }

  return longestGaps;
}
console.log(longestGap([10, 15, 40, 42, 100]));


// 7. Real-world style: given an array of test case results like
// [{name: "login test", passed: true}, {name: "signup test", passed: false}, ...]
// return only the names of the failed tests.
// (Try this WITH array methods this time — filter + map)
function getFailedTestNames(results) {
  const output = results.filter((item)=> item["passed"] === false).map(a=> a.name)
  return output;
}
console.log(getFailedTestNames([
  { name: "login test", passed: true },
  { name: "signup test", passed: false },
  { name: "logout test", passed: false },
]));

/*
  Tip: Problem 6 and 7 are closer to real work — automation/test result summaries.
  This is where your QA background gives you an edge: you already understand
  the DATA shapes involved (test results, timestamps) even if the code is new.
*/
