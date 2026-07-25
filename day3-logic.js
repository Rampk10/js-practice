// Day 3 — Logic & Problem Solving (+ map/filter/reduce woven in)
// From today, use array methods (map/filter/reduce/find) where they fit naturally —
// you've built enough loop fundamentals in Day 1-2 to lean on them now.

// 1. Given an array of numbers, return a new array with only the numbers
// greater than the average of the whole array.
function aboveAverage(numbers) {
  let avg = numbers.reduce((acc,cur)=> acc+cur, 0)/numbers.length;
  const aboveavg = numbers.filter((a)=> a > avg);
  return aboveavg;
}
console.log(aboveAverage([10, 20, 30, 40, 50, 60])); // avg = 30 -> [40, 50, 60]
 

// 2. Given an array of words, return the longest word.
// Try WITHOUT array methods first (loop), then try again WITH reduce.
function longestWord(words) {
  //WITHOUT array methods first (loop)
  // let longest = words[0].length;
  // let longWord = words[0];
  // for (let i=1;i< words.length; i++){
  //   if(words[i].length > longest) {
  //     longest = words[i].length;
  //     longWord = words[i];
  //   }
  // }
  // return longWord;

  // WITH reduce
  return words.reduce((longest, current)=> {
    if ( current.length > longest.length) {
      longest = current;
    }
    return longest;
  })

}
console.log(longestWord(["cat", "elephant", "dog", "hippopotamus"])); // "hippopotamus"


// 3. Group an array of numbers into "even" and "odd" using reduce
// (you did this with loops in Day 1 — now do it with reduce, returning
// an object like { even: [...], odd: [...] })
function groupEvenOdd(numbers) {
  const output = {
    even: [],
    odd: []
  }
  return numbers.reduce((acc, cur)=>{
    cur%2===0 ? acc.even.push(cur) : acc.odd.push(cur);
    return acc;
  }, output);
}
console.log(groupEvenOdd([1, 2, 3, 4, 5, 6]));


// 4. Given an array of student objects [{name, marks}], use map to add
// a "grade" field: marks >= 90 -> "A", >= 75 -> "B", >= 50 -> "C", else "F"
// Then filter to only students who passed (grade !== "F")
function gradeAndFilterPassed(students) {
  const passed =  students.map((stu)=> {
    if(stu.marks >= 90) {
      stu.grade = "A"
      return stu;
    } else if(stu.marks >= 75){
      stu.grade = "B"
      return stu;
    } else if(stu.marks >= 50){
      stu.grade = "C"
      return stu;
    } else {
      stu.grade = "F"
      return stu;
    }
  });

  const output = passed.filter((stu)=> stu.grade !== "F")
  return output;
}
console.log(gradeAndFilterPassed([
  { name: "Ram", marks: 92 },
  { name: "Kumar", marks: 60 },
  { name: "Priya", marks: 40 },
]));


// 5. Two-pointer pattern: given a SORTED array, find if any two numbers
// add up to a target sum, WITHOUT nested loops (O(n) approach, not O(n^2)
// like Day 2's findPairsWithSum). Use two pointers, one from the start,
// one from the end, moving inward.
function hasPairWithSumSorted(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length-1;

  while(left < right){
    let sum = sortedArr[left] + sortedArr[right];

    if(sum > target) {
      right = right-1
    }

    if(sum < target) {
      left = left+1
    }

    if(sum === target){
      return true 
    }
  }

  return false

}
console.log(hasPairWithSumSorted([1, 2, 4, 6, 8, 11], 10)); // true (2+8 or 4+6)
console.log(hasPairWithSumSorted([1, 2, 4, 6, 8, 11], 50)); // false


// 6. Real-world style: given an array of API response logs
// [{endpoint, status, responseTime}], find the endpoint with the
// SLOWEST average response time. (Group by endpoint, average each group,
// find the max.) This is intentionally a bit meaty — take your time.
function slowestEndpoint(logs) {
  const endpoints = {};

  // Step 1: Group by endpoint
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];

    if (!(log.endpoint in endpoints)) {
      endpoints[log.endpoint] = {
        total: 0,
        count: 0,
      };
    }

    endpoints[log.endpoint].total += log.responseTime;
    endpoints[log.endpoint].count++;
  }

  // Step 2: Find the highest average
  let slowest = "";
  let highestAverage = -Infinity;

  for (let endpoint in endpoints) {
    const average =
      endpoints[endpoint].total / endpoints[endpoint].count;

    if (average > highestAverage) {
      highestAverage = average;
      slowest = endpoint;
    }
  }

  return slowest;
}

console.log(slowestEndpoint([
  { endpoint: "/login", status: 200, responseTime: 120 },
  { endpoint: "/login", status: 200, responseTime: 100 },
  { endpoint: "/search", status: 200, responseTime: 300 },
  { endpoint: "/search", status: 200, responseTime: 340 },
]));
// expect "/search" (avg 320 vs /login avg 110)

/*
  New ideas introduced today:
  - Combining reduce for aggregation (average, grouping) with filter/map
  - Two-pointer technique — an efficient alternative to nested loops
  - Grouping + aggregating real-world-shaped data (like #6), which mirrors
    dashboards/reporting you may have seen in test automation or monitoring tools
*/
