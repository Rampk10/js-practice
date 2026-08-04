// // Promises & Async/Await — the two related ways JS handles things that
// // take time (API calls, timers, file reads). This is genuinely one of
// // the trickier concepts, similar to reduce — take your time.

// // ============================================
// // PART 1: WHY DO WE NEED THIS?
// // ============================================

// // Normal code runs top to bottom, instantly. But some things take time:
// // fetching data from a server, waiting for a timer, reading a file.
// // JS doesn't "pause and wait" for these by default - it keeps going,
// // which causes problems if you need the result before continuing.

// console.log("1. Start");
// setTimeout(() => {
//   console.log("2. This runs LATER, after 1 second");
// }, 1000);
// console.log("3. This runs BEFORE the timeout, even though it's written after it!");

// // Run this file and notice the order: 1, 3, 2 - NOT 1, 2, 3.
// // This is the core problem promises and async/await solve: how do we
// // write code that waits for something, in a way that's readable?


// // ============================================
// // PART 2: WHAT IS A PROMISE?
// // ============================================

// // A Promise is an object representing "a value that will exist LATER."
// // It has three states: pending -> fulfilled (success) or rejected (failure)

// const myPromise = new Promise((resolve, reject) => {
//   const success = true;
//   setTimeout(() => {
//     if (success) {
//       resolve("Data loaded successfully!"); // this becomes the "fulfilled" value
//     } else {
//       reject("Something went wrong!"); // this becomes the "rejected" reason
//     }
//   }, 1000);
// });

// // .then() runs when the promise succeeds, .catch() runs when it fails
// myPromise
//   .then((result) => console.log("SUCCESS:", result))
//   .catch((error) => console.log("ERROR:", error));

// console.log("This logs immediately, before the promise resolves");


// // ============================================
// // PART 3: ASYNC/AWAIT - a cleaner way to write the same thing
// // ============================================

// // async/await is just a nicer SYNTAX for working with promises -
// // it doesn't replace promises, it's built on top of them.

// function fetchDataPromise() {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve("Here is your data"), 1000);
//   });
// }

// // Using .then() (Part 2 style):
// fetchDataPromise().then((data) => console.log("Got:", data));

// // Using async/await (same result, reads top-to-bottom like normal code):
// async function loadData() {
//   const data = await fetchDataPromise(); // "pause" here until the promise resolves
//   console.log("Got (async version):", data);
// }
// loadData();

// // KEY RULE: `await` can only be used INSIDE a function marked `async`.


// // ============================================
// // PART 4: HANDLING ERRORS WITH ASYNC/AWAIT
// // ============================================

// function riskyOperation(shouldFail) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldFail) {
//         reject("Operation failed!");
//       } else {
//         resolve("Operation succeeded!");
//       }
//     }, 500);
//   });
// }

// async function tryIt() {
//   try {
//     const result = await riskyOperation(false);
//     console.log(result);
//   } catch (error) {
//     console.log("Caught an error:", error);
//   }
// }
// tryIt();

// // TRY IT: call tryIt-style logic but pass `true` to riskyOperation so it
// // fails, and confirm your catch block runs correctly.


// // ============================================
// // PART 5: REAL FETCH EXAMPLE (this is what you'll actually do in React)
// // ============================================

// // fetch() returns a Promise. Getting the actual data needs TWO awaits:
// // one for the response, one for parsing the JSON body.

// async function getUsers() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();
//     console.log("First user name:", data[0].name);
//   } catch (error) {
//     console.log("Fetch failed:", error);
//   }
// }
// getUsers();

// // This exact shape (try/await/await/catch) is what you'll write constantly
// // in React components to load data from an API.


// ============================================
// PART 6: EXERCISES
// ============================================

// 1. Write a function `delay(ms)` that returns a promise which resolves
// after `ms` milliseconds with the message "Done waiting!". Call it with
// async/await and log the result.

function delay(ms) {
  return new Promise((resolve)=> {
    setTimeout(()=> resolve("Done waiting!"), ms)
  })
}

async function callDelay() {
  let result = await delay(1000);
  console.log(result);
}

callDelay()

// // 2. Write a function `checkAge(age)` that returns a promise: resolves
// // with "You are an adult" if age >= 18, otherwise rejects with
// // "You are a minor". Call it with try/catch using async/await, once with
// // age 20 and once with age 15, and confirm both paths work correctly.

function checkAge(age) {

  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      if (age >= 18) {
        resolve("You are an adult");
      } else {
        reject ("You are a minor");
      }
    }, 1000)
  })
}

async function verifyAge(age) {
  try {
    let result = await checkAge(age);
    console.log(result);
  } catch(error) {
    console.log("Caught an error:", error);
  }
}

verifyAge(20);
verifyAge(15);


// 3. Write an async function `loadTwoThings()` that awaits TWO separate
// delay(1000) calls, one after another, and logs "First done" after the
// first, then "Second done" after the second. Notice how long this takes
// in total (hint: it should take about 2 seconds, since they run one
// after another, not at the same time).

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done waiting!"), ms);
  });
}

async function loadTwoThings() {
  await delay(1000);
  console.log("First done");

  await delay(1000);
  console.log("Second done");
}

loadTwoThings();

// 4. Now write `loadTwoThingsParallel()` using Promise.all() to run two
// delay(1000) calls AT THE SAME TIME instead of one after another. This
// should take about 1 second total, not 2. Research Promise.all() if
// you haven't seen it before - it takes an array of promises and waits
// for all of them together.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done waiting!"), ms);
  });
}

async function loadTwoThingsParallel() {
  const [first, second] = await Promise.all([delay(1000), delay(1000)]);

  console.log("First done");
  console.log("Second done");

}

loadTwoThingsParallel()

// 5. Real-world style: write an async function `fetchUserPosts(userId)`
// that fetches from "https://jsonplaceholder.typicode.com/posts?userId="
// + userId, parses the JSON, and logs how many posts were returned
// (data.length). Wrap it in try/catch and log a friendly error message
// if the fetch fails.


async function fetchUserPosts(userId) {

  try {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    let data = await response.json();
    console.log("The length of the Data is ", data.length)
  } catch (error) {
    console.log("Catch the error", error)
  }
}

fetchUserPosts(1);

// /*
//   Common mistakes to watch for as you work through these:
//   - Forgetting `async` on a function that uses `await` inside it
//   - Forgetting to `await` the fetch() call itself (you get a pending
//     Promise object instead of the actual response)
//   - Forgetting the SECOND await for response.json() (fetch only gives you
//     the raw response first; parsing the body is a separate async step)
//   - Putting code that depends on the awaited result OUTSIDE the
//     try block or after the async function call, expecting it to already
//     have finished (it won't have, unless you also await the function call
//     or use .then())
// */
