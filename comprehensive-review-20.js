// Comprehensive Review — 20 Problems
// Covers everything so far: loops, array methods, objects, destructuring,
// spread, recursion, sliding window, closures, two-pointer.
// No hints on which technique to use for each — figure that out yourself,
// which is the real test of whether it's actually sunk in.

// 1. Given an array of numbers, return the sum of only the even numbers.
function sumOfEvens(numbers) {

  const evens = numbers.filter((num)=> num%2===0);

  const sum = evens.reduce(((acc,cur)=> acc+cur),0)

  return sum;
}
console.log(sumOfEvens([1, 2, 3, 4, 5, 6])); // 12


// 2. Given an array of names, return a new array with each name capitalized
// (first letter uppercase, rest unchanged).
function capitalizeNames(names) {

  const capitalizedNames = names.map((name)=> {
    let spt = name.split("");
    spt[0] = spt[0].toUpperCase();
    spt = spt.join("");
    return spt;
  })

  return capitalizedNames;
}
console.log(capitalizeNames(["ram", "priya", "kumar"])); // ["Ram","Priya","Kumar"]


// 3. Check if a given string is a palindrome, ignoring case.
function isPalindromeIgnoreCase(str) {

  let input = str.toLowerCase().split("");

  for (let i=0; i<input.length/2; i++) {
    if (input[i] !== input[input.length - 1 - i]){
      return false;
    }
  }
  return true;
}
console.log(isPalindromeIgnoreCase("Madam")); // true


// 4. Given an array of student objects [{name, marks}], destructure each
// student in a loop and log "name scored marks".
const students = [
  { name: "Ram", marks: 88 },
  { name: "Priya", marks: 95 },
];
function logStudents(students) {
  for (let stu of students) {
    const {name, marks} = stu;
    console.log(name, "scored", marks)
  }
}
logStudents(students);


// 5. Write a function that returns the factorial of a number using recursion.
  function factorial(n) {

    if (n === 0 || n === 1) {
      return 1
    }

    return n * factorial(n-1)

  }
console.log(factorial(6)); // 720


// 6. Given a sorted array and a target sum, use the two-pointer technique
// to check if any pair adds up to the target.
function hasPairSum(sortedArr, target) {

  // for (let i = 0; i< sortedArr.length; i++) {
  //   for (let j = i+1; j < sortedArr.length; j++) {
  //     if(sortedArr[i]+sortedArr[j] === target) {
  //       return true
  //     }
  //   }
  // }
  // return false

  let left = 0;
  let right = sortedArr.length - 1;

  while (left < right) {
    const sum = sortedArr[right] + sortedArr[left];
    
    if(sum === target) {
      return true;
    }

    if(sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return false
}
console.log(hasPairSum([1, 3, 4, 6, 9], 10)); // true (1+9 or 4+6)


// 7. Group an array of numbers into "positive", "negative", and "zero"
// using reduce.
function groupBySign(numbers) {

  const output = {
    positive: [], 
    negative: [], 
    zero:[],
  }

  return numbers.reduce((acc,cur)=> {
    if(cur > 0) {
      acc.positive.push(cur)
    } else if ( cur < 0) {
      acc.negative.push(cur)
    } else {
      acc.zero.push(cur)
    }
    return acc;
  },output)
}
console.log(groupBySign([3, -2, 0, 5, -8, 0]));
// expect { positive: [3,5], negative: [-2,-8], zero: [0,0] }


// 8. Using object spread, write a function `mergeProfile(base, updates)`
// that returns a new object combining both, with `updates` taking priority.
function mergeProfile(base, updates) {

  const obj = {...base, ...updates}

  return obj;

}
console.log(mergeProfile({ name: "Ram", city: "Madurai" }, { city: "Chennai" }));
// expect { name: "Ram", city: "Chennai" }


// 9. Given an array of numbers, find the maximum sum of any 4 CONSECUTIVE
// numbers (sliding window).
function maxSumOfFourConsecutive(numbers) {
  if(numbers.length < 4) {
    return null;
  }

  let windowSum = numbers[0] + numbers[1] + numbers[2] + numbers[3]
  let maxSum = windowSum;
  
  for (let i = 4; i < numbers.length; i++){
    windowSum = windowSum- numbers[i - 4] + numbers [i];

    if(windowSum > maxSum) {
      maxSum = windowSum;
    }
  }

  return maxSum;
}
console.log(maxSumOfFourConsecutive([1, 4, 2, 10, 2, 3, 1, 0, 20])); // 24 (2+10+2+3? check by hand)


// 10. Write a function using CLOSURES that creates a simple bank account
// object with `deposit(amount)`, `withdraw(amount)`, and `getBalance()`.
function createAccount(startingBalance) {

  let balance = startingBalance;

  return {
    deposit(amount) {
      balance += amount;
    },

    withdraw(amount) {
      balance -= amount;
    },

    getBalance() {
      return balance;
    }
  }
}
const acc = createAccount(100);
acc.deposit(50);
acc.withdraw(30);
console.log(acc.getBalance()); // 120


// 11. Given an array of order objects [{id, item, price, qty}], use map
// and reduce together to calculate the total value of all orders
// (price * qty for each, summed).
const orders = [
  { id: 1, item: "Pen", price: 10, qty: 5 },
  { id: 2, item: "Notebook", price: 50, qty: 2 },
];
function totalOrderValue(orders) {

  const items = orders.map((item)=> item.price*item.qty).reduce(((acc,cur)=> acc+cur), 0)
  return items;
  
}
console.log(totalOrderValue(orders)); // 150


// 12. Remove duplicate objects from an array based on their `id` field
// (not primitive duplicates like Day 1 — this time it's objects).
const items = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" },
];
function removeDuplicateById(items) {
  
  const result =[];
  for (let i=0; i< items.length; i++) {
    let duplicates = false;
    for(let j=0; j< result.length; j++) {
      if(items[i].id === result[j].id ) {
        duplicates = true;
        break;
      }
    }
    if (!duplicates) {
      result.push(items[i]);
    }
  }

  return result;
}
console.log(removeDuplicateById(items)); // [{id:1,name:"A"},{id:2,name:"B"}]


// 13. Write a recursive function to reverse a string (no loops, no .reverse()).
function reverseString(str) {
  if (str.length <= 1) {
    return str;
  }

  return str[str.length - 1] + reverseString(str.slice(0, -1));

}
console.log(reverseString("hello")); // "olleh"


// 14. Given an array of login events [{user, timestamp}], find the user
// with the MOST logins (group + count + find max, similar spirit to
// slowestEndpoint from earlier).
const logins = [
  { user: "ram", timestamp: 1 },
  { user: "priya", timestamp: 2 },
  { user: "ram", timestamp: 3 },
  { user: "ram", timestamp: 4 },
];
function mostFrequentUser(logins) {

  let USERS = {};

  for ( let i = 0; i< logins.length; i++) {
    
    let detail = logins[i];

    if (!(detail.user in USERS)) {
      USERS[detail.user] = {
        total: 0
      }
    }
    USERS[detail.user].total += 1;
  }

  let highestName = "";
  let highestTotal = -Infinity;

  for ( let key in USERS) {
    if ( USERS[key].total > highestTotal) {
      highestTotal = USERS[key].total;
      highestName = key;
    }
  }

  return highestName;

}
console.log(mostFrequentUser(logins)); // "ram"


// 15. Using destructuring with default values, write a function
// `createUser({ name, role = "guest" })` that logs "name joined as role".
// Test it with and without providing a role.
function createUser({ name, role = "guest" }) {

  console.log(name, "joined as", role);
  
}
createUser({ name: "Kumar", role: "admin" }); // "Kumar joined as admin"
createUser({ name: "Anbu" }); // "Anbu joined as guest"


// // 16. Given an array of numbers, find the length of the longest streak of
// // consecutive numbers that are all above a given threshold (sliding window,
// // similar to the pass-streak problem but with a threshold instead of boolean).
function longestStreakAboveThreshold(numbers, threshold) {

  let count = 0;
  let highestStreak = 0;

  for (let i=0; i< numbers.length; i++) {
    if (numbers[i] > threshold) {
      count++
    } else {
      count = 0
    }

    if (count > highestStreak) {
      highestStreak = count;
    }
  }

  return highestStreak;
}
console.log(longestStreakAboveThreshold([2, 8, 9, 3, 10, 11, 12, 1], 5)); // 3 (10,11,12)


// 17. Write a function that takes an array of objects and a key name (string),
// and returns an array of just that key's values from every object
// (a mini version of what .map(o => o.key) does, but you build it manually
// with a plain loop AND bracket notation, since the key name is dynamic).
function pluck(objects, keyName) {
  const result = [];

  for (const obj of objects) {
    if (keyName in obj) {
      result.push(obj[keyName]);
    }
  }
  
  return result.length > 0 ? result : [];
}
console.log(pluck([{ a: 1, b: 2 }, { a: 3, b: 4 }], "a")); // [1, 3]


// 18. Fibonacci, but this time return an ARRAY of the first n fibonacci
// numbers (not just the nth one like before). You may use recursion or
// a loop — your choice.
function fibonacciSequence(n) {

  const result = [];

  for ( let i = 0; i < n; i++) {
    if(i === 0) {
      result.push(0)
    } else if( i === 1 ) {
      result.push(1)
    } else {
      result.push(result[i-1]+result[i-2])
    }
  }
  return result; 
}
console.log(fibonacciSequence(7)); // [0,1,1,2,3,5,8]


// 19. Real-world style: given an array of test results
// [{suite, name, status, duration}], write a function that returns an
// object summarizing PER SUITE: total tests, passed count, failed count,
// and total duration. (This combines grouping + multiple aggregations —
// the most involved problem in this set, take your time.)
const testResults = [
  { suite: "smoke", name: "login", status: "passed", duration: 100 },
  { suite: "smoke", name: "logout", status: "failed", duration: 80 },
  { suite: "regression", name: "checkout", status: "passed", duration: 200 },
  { suite: "regression", name: "cart", status: "passed", duration: 150 },
];
function summarizeBySuite(results) {

  let output = {};

  for (let i =0; i< results.length; i++) {
    let result = results[i];

    if (!(result.suite in output)) {
      output[result.suite] = {
        total: 0,
        passed: 0,
        failed: 0,
        duration: 0
      }
    }

    output[result.suite].total += 1;
    output[result.suite].duration += result.duration;
    if ( result.status === "passed") {
      output[result.suite].passed++
    } else {
      output[result.suite].failed++
    }

  }

  return output;

}
console.log(summarizeBySuite(testResults));
/* expect something like:
{
  smoke: { total: 2, passed: 1, failed: 1, duration: 180 },
  regression: { total: 2, passed: 2, failed: 0, duration: 350 }
}
*/


// 20. Combine destructuring + spread + array methods: given an array of
// products, write a function `applyDiscount(products, percent)` that
// returns a NEW array where every product has its `price` reduced by
// `percent`% (e.g. 10 means 10% off), without mutating the original array
// or its objects.
const productsList = [
  { name: "Pen", price: 100 },
  { name: "Bag", price: 500 },
];
function applyDiscount(products, percent) {

  const result = products.map((pro)=> {
    let {name, price} = pro;

    let discountedPrice = price * (1 - percent/100);

    price = discountedPrice;

    return {name, price}
  })
  return result;
}
console.log(applyDiscount(productsList, 10)); // [{name:"Pen",price:90},{name:"Bag",price:450}]
console.log(productsList); // unchanged - still 100 and 500

/*
  This file intentionally has no per-problem hints on which technique to
  use (reduce vs loop vs recursion vs two-pointer vs closures). Deciding
  the right tool for each problem IS the skill this file is testing —
  that decision-making is exactly what real work and interviews require.
  Take your time. No rush to finish this in one sitting.
*/
