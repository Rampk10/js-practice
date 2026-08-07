// Daily Practice — Set 1
// 15 mixed problems, no hints on technique. Deciding the right tool for
// each is part of the practice. Take whatever time you need — no rush
// to finish all 15 in one sitting.

// 1. Given an array of numbers, return only the numbers divisible by 3.
function divisibleByThree(numbers) {

  return numbers.filter((num)=> num%3===0);
}
console.log(divisibleByThree([3, 5, 6, 9, 10, 12])); // [3,6,9,12]


// 2. Given an object `settings = { volume: 70, brightness: 50 }`, destructure
// both values and log "Volume: X, Brightness: Y".
const settings = { volume: 70, brightness: 50 };

const {volume: X, brightness: Y} = settings;

console.log(X,Y)

// 3. Write a recursive function that returns the sum of all numbers from
// 1 to n.
function sumUpTo(n) {

  if (n === 0 || n===1) {
    return n;
  }

  return n + sumUpTo(n-1);

}
console.log(sumUpTo(5)); // 15


// 4. Given an array of employee objects [{name, salary}], use reduce to
// find the employee with the highest salary (return the whole object).
const employees = [
  { name: "Ram", salary: 60000 },
  { name: "Priya", salary: 75000 },
  { name: "Kumar", salary: 50000 },
];
function highestPaid(employees) {
  return employees.reduce((acc, cur) => {
    if (cur.salary > acc.salary) {
      return cur;
    }
    return acc;
  });
}

console.log(highestPaid(employees));


// 5. Using spread, write a function `addTag(tags, newTag)` that returns a
// new array with `newTag` added, without mutating the original.
function addTag(tags, newTag) {

  return [...tags, newTag]


}

console.log(addTag([1,2,3,4], 5));

// 6. Write an async function `delayedLog(message, ms)` that logs `message`
// after waiting `ms` milliseconds (use a Promise + setTimeout internally).
function delayedLog(message, ms) {

  return new Promise((resolve)=> {
    setTimeout(()=> {
      resolve(message)
    }, ms)
  })

}

async function callDelayedLog() {
  const result = await delayedLog("That's fine", 1000)
  console.log(result);
}

callDelayedLog();



// 7. Given a string, count how many vowels it contains (a, e, i, o, u).
function countVowels(str) {

  const vowels = ["a", "e", "i", "o", "u"];

  let count = 0;

  str = str.toLowerCase();

  for ( let i=0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      count++;
    }
  }

  return count;
}
console.log(countVowels("HELLO world")); // 3


// 8. Given an array of task objects [{title, priority}], sort them so
// "high" priority comes first, then "medium", then "low". (Hint: you can
// use .sort() with a custom compare function, or build the ordering
// manually with a loop - your choice.)
const tasks = [
  { title: "A", priority: "low" },
  { title: "B", priority: "high" },
  { title: "C", priority: "medium" },
];
function sortByPriority(tasks) {

  const priority = ["high", "medium", "low",];
  const result = [];

  for (let i = 0; i< priority.length; i++) {
    for (  let j =0; j < tasks.length; j++) {
      if (tasks[j].priority === priority[i]) {
        result.push(tasks[j])
      }
    }
  }
  
  return result;

}

console.log(sortByPriority(tasks));

// 9. Write a function using a CLOSURE that creates a simple toggle
// switch: `createToggle()` returns an object with `flip()` (switches
// true/false) and `getState()` (returns current state, starting false).
function createToggle() {

  let state = false;

  return {
      getState() {
        return state;
      },

      flip() {
        state = !state;
      }
  }
}

const toggle = createToggle();

console.log(toggle.getState()); // false

toggle.flip();
console.log(toggle.getState()); // true

toggle.flip();
console.log(toggle.getState()); // false

// 10. Given a sorted array, use two-pointer technique to check if it
// contains any pair of numbers with a DIFFERENCE (not sum) equal to a
// target value.
function hasPairWithDifference(sortedArr, target) {

  for ( let i = 0; i < sortedArr.length; i++) {
    for ( let j = i+1; j< sortedArr.length; j++) {
      if ((sortedArr[j] - sortedArr[i]) === target) {
        return true
      }
    }
  }
  return false;
}
console.log(hasPairWithDifference([1, 3, 5, 8, 12], 4)); // true (8-4? check by hand carefully)


// 11. Given an object `car = { brand: "Honda", model: "Civic" }`, write a
// function `updateCar(car, updates)` using spread that merges any updates
// in, without mutating the original.
const car = { brand: "Honda", model: "Civic" };
function updateCar(car, updates) {

  const updated = {...car, ...updates}

  return updated;

}

console.log(updateCar(car, {model: "Shift"}));


// 12. Given an array of numbers, find the length of the longest streak of
// consecutive EVEN numbers (sliding window style, similar to earlier
// streak problems).
function longestEvenStreak(numbers) {

  let longestStreak = 0;
  let count = 0;

  for ( let i=0; i<numbers.length; i++) {
    if (numbers[i]%2 === 0) {
      count++
    }
    if (numbers[i]%2 !== 0) {
      if(longestStreak < count) {
        longestStreak = count;
      }
      count = 0
    }  
  }
  
  if (count > longestStreak) {
    longestStreak = count;
  }

  return longestStreak;

}
console.log(longestEvenStreak([1, 2, 4, 6, 3, 8, 10, 12, 5])); // 3 (8,10,12)


// 13. Real-world style: given an array of API log objects
// [{endpoint, statusCode}], count how many requests were successful
// (statusCode 200-299) vs failed (anything else). Return an object
// { success: X, failed: Y }.
const apiLogs = [
  { endpoint: "/login", statusCode: 200 },
  { endpoint: "/data", statusCode: 404 },
  { endpoint: "/save", statusCode: 201 },
  { endpoint: "/delete", statusCode: 500 },
];
function countByStatus(logs) {
  let endpoints = { success: 0, failed: 0};

  return logs.reduce((acc,cur)=> {
    cur.statusCode <= 299 ? acc.success++ : acc.failed++;
    return acc;
  }, endpoints)
}
console.log(countByStatus(apiLogs)); // { success: 2, failed: 2 }


// 14. Write an async function `fetchAndCount(url)` that fetches from a
// given URL, parses JSON, and returns how many items are in the response
// array. Wrap it in try/catch. Test with:
// "https://jsonplaceholder.typicode.com/comments?postId=1"
async function fetchAndCount(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.length) ;
  } catch (error) {
    console.log("Catch the error :", error)
  }

}

fetchAndCount("https://jsonplaceholder.typicode.com/comments?postId=1");

// 15. Combine everything: given an array of student objects
// [{name, marks, subject}], write a function that returns an object
// grouping students BY SUBJECT, where each subject's value is an array
// of just the student NAMES who scored above 75 in that subject.
// (Combines: grouping, filtering condition, plucking a field.)
const studentRecords = [
  { name: "Ram", marks: 80, subject: "Math" },
  { name: "Priya", marks: 60, subject: "Math" },
  { name: "Kumar", marks: 90, subject: "Science" },
  { name: "Anbu", marks: 78, subject: "Science" },
];
function topStudentsBySubject(records) {

  const results = {};

  for ( let i=0; i < records.length; i++) {
    let record = records[i];
    if (record.marks > 75) {
          if (!(record.subject in results)) {
            results[record.subject] = [record.name]
          } else {
            results[record.subject].push(record.name);
          }
    }

  }
  return results;
}
console.log(topStudentsBySubject(studentRecords));
// expect { Math: ["Ram"], Science: ["Kumar", "Anbu"] }

/*
  Tomorrow's set will rotate through the same topics with different
  problems, so this isn't a one-time checklist - it's meant to be a
  repeatable daily format. No pressure to finish all 15 today; even
  5-6 done properly is a solid day's practice.
*/
