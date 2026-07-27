// Day 4 — Logic & Problem Solving
// Building on Day 1-3: loops, reduce/filter/map, two-pointer, grouping.
// New ideas today: recursion (basic), sliding window, and one small
// object-oriented style problem.

// 1. Factorial using RECURSION (a function that calls itself)
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
function factorial(n) {
  if(n === 1 || n === 0){
    return 1
  }
  
  return n * factorial(n-1)

}
console.log(factorial(5)); // 120


// 2. Fibonacci sequence using recursion
// fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2)
function fibonacci(n) {
  if(n === 0) {
    return 0
  }

  if(n === 1) {
    return 1
  }

  return fibonacci(n-1) + fibonacci(n-2)

}
console.log(fibonacci(6)); // 8  (0,1,1,2,3,5,8)


// 3. Sum of digits using recursion
// sumDigits(1234) -> 1+2+3+4 = 10
function sumDigits(n) {
  // Hint: base case -> if n < 10, return n
  // recursive case -> last digit (n % 10) + sumDigits(rest of number, n / 10 rounded down)
  if (n < 10){
    return n
  }

  return n%10 + sumDigits(Math.floor(n/10))
}
console.log(sumDigits(1234)); // 10


// 4. Sliding window: find the maximum sum of any 3 CONSECUTIVE numbers in an array
// This is more efficient than checking every possible group with nested loops.
function maxSumOfThreeConsecutive(numbers) {
  if (numbers.length < 3) {
    return null;
  }

  // Sum of the first 3 elements
  let windowSum = numbers[0] + numbers[1] + numbers[2];
  let maxSum = windowSum;

  // Slide the window
  for (let i = 3; i < numbers.length; i++) {
    windowSum = windowSum - numbers[i - 3] + numbers[i];

    if (windowSum > maxSum) {
      maxSum = windowSum;
    }
  }

  return maxSum;
}
console.log(maxSumOfThreeConsecutive([1, 2, 5, 2, 8, 1, 5])); // expect 15 (2+8+1=11, 5+2+8=15, 8+1+5=14)


// 5. Sliding window: find the length of the longest streak of consecutive
// "passed" test results in an array of booleans
function longestPassStreak(results) {
  // e.g. [true, true, false, true, true, true, false] -> 3
  let longStreak = 0;
  let count = 0;
  for (let i=0;i<results.length;i++) {
    if(results[i] === true){
      count++;
    }
    if(results[i] === false){
      if(longStreak < count) {
        longStreak = count;
      }
      count = 0;
    }
  }
  if (count > longStreak) {
    longStreak = count;
  }

  return longStreak;
}
console.log(longestPassStreak([true, true, false, true, true, true, false])); // 3


// 6. Basic object-oriented style: create a simple "Counter" object using
// a function that returns an object with methods (closures)
function createCounter() {
  let count = 0;
  return {
    increment: function () {
      // increase count by 1
      return ++count;
    },
    decrement: function () {
      // decrease count by 1
      return --count;
    },
    getValue: function () {
      // return current count
      return count;
    },
  };
}
const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.getValue()); // expect 2


// 7. Real-world style: given an array of test run objects
// [{suite, duration}], group by suite and return the suite with the
// LONGEST total duration (similar spirit to Day 3's slowestEndpoint,
// but this time try it using reduce instead of plain loops)
function longestRunningSuite(runs) {
  // your code here, using reduce

  const output = {}
  let maxTotal = -Infinity;
  let longestSuite = "";
  const totals = runs.reduce((acc,cur)=>{
    if(!(cur.suite in output)) {
      output[cur.suite] = {
        total: 0
      }
    }
    output[cur.suite].total += cur.duration
    return acc;
  },output);
  for (const key in totals) {
    if (totals[key].total > maxTotal) {
        maxTotal = totals[key].total;
        longestSuite = key;
    }
  }
  return longestSuite;
}
console.log(longestRunningSuite([
  { suite: "smoke", duration: 120 },
  { suite: "regression", duration: 300 },
  { suite: "smoke", duration: 90 },
  { suite: "regression", duration: 250 },
]));
// expect "regression" (300+250=550 vs smoke 120+90=210)

/*
  New ideas introduced today:
  - Recursion: a function calling itself, with a base case to stop
  - Sliding window: efficiently looking at a moving "window" of elements
    instead of recomputing everything from scratch each time
  - Closures for simple object-like behavior (private state + methods)
  - Reapplying Day 3's grouping pattern, but forcing yourself to use
    reduce this time instead of plain loops
*/
