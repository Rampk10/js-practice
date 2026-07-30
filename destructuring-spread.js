// Destructuring & Spread — the two most-used patterns in React code
// Destructuring: "unpack" values from objects/arrays into their own variables
// Spread: "expand" an object/array into a new one, often to copy + change

// ============================================
// PART 1: OBJECT DESTRUCTURING
// ============================================

const student = { name: "Ram", age: 30, city: "Madurai" };

// Old way (what you already know)
const name1 = student.name;
const age1 = student.age;

// Destructuring way - same result, less typing
const { name, age, city } = student;
console.log(name, age, city);

// TRY IT: given this object, destructure `title` and `pages` into
// their own variables in one line.
const book = { title: "Deep Work", author: "Cal Newport", pages: 280 };

const {title, pages} = book;
console.log(title,pages)

// ============================================
// PART 2: DESTRUCTURING WITH RENAMING
// ============================================

// Sometimes you want a different variable name than the key
const { name: studentName } = student;
console.log(studentName); // "Ram" - but stored in a variable called studentName

// TRY IT: destructure `title` from `book`, but store it in a variable
// called `bookTitle` instead.

const {title: bookTitle} = book;
console.log(bookTitle)

// ============================================
// PART 3: DESTRUCTURING WITH DEFAULT VALUES
// ============================================

const settings = { theme: "dark" };
const { theme, fontSize = 14 } = settings; // fontSize doesn't exist, so it falls back to 14
console.log(theme, fontSize); // "dark" 14

// TRY IT: given `const config = { volume: 80 };`, destructure `volume`
// and `brightness`, giving brightness a default of 50.
const config = { volume: 80 };
const {volume, brightness = 50 } = config;
console.log(volume,brightness);

// ============================================
// PART 4: ARRAY DESTRUCTURING
// ============================================

const colors = ["red", "green", "blue"];
const [first, second, third] = colors;
console.log(first, second, third); // "red" "green" "blue"

// You can skip elements with a comma
const [, , thirdOnly] = colors;
console.log(thirdOnly); // "blue"

// TRY IT: given `const coords = [10, 20, 30];`, destructure just the
// first and third values (skip the second), into variables x and z.
const coords = [10, 20, 30];
const [x, ,z] = coords;
console.log(x,z)

// ============================================
// PART 5: DESTRUCTURING FUNCTION PARAMETERS (the big React use case)
// ============================================

// Instead of this:
function printUserOld(user) {
  console.log(user.name, "is", user.age, "years old");
}

// You destructure directly in the parameter list:
function printUser({ name, age }) {
  console.log(name, "is", age, "years old");
}
printUser({ name: "Priya", age: 28 });

// This is EXACTLY how React components read props:
// function Greeting({ name, age }) { return <p>Hi {name}</p> }

// TRY IT: write a function `printBook({ title, author })` that logs
// "title by author", then call it with the `book` object from Part 1.

function printBook( {title, author}) {
  console.log(title, " by ", author);
}

printBook({title:"OMG", author: "Ram"});

// ============================================
// PART 6: SPREAD - copying and merging objects
// ============================================

const original = { name: "Ram", role: "Tester" };

// Spread creates a NEW object with the same key-values copied in
const copy = { ...original };
console.log(copy); // { name: "Ram", role: "Tester" }

// Spread + override - this is the React pattern for "updating state"
const updated = { ...original, role: "Developer" }; // same name, new role
console.log(updated); // { name: "Ram", role: "Developer" }
console.log(original); // unchanged! { name: "Ram", role: "Tester" }

// TRY IT: given `const car = { brand: "Toyota", year: 2020 };`, create
// a new object `updatedCar` using spread, changing only the year to 2024.
// Then log both `car` and `updatedCar` to confirm the original didn't change.

const car = { brand: "Toyota", year: 2020 };
const newCar = {...car, year:2024};
console.log(car);
console.log(newCar);

// ============================================
// PART 7: SPREAD - copying and combining arrays
// ============================================

const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

const combined = [...nums1, ...nums2];
console.log(combined); // [1,2,3,4,5,6]

const withNew = [...nums1, 99]; // add a value while copying
console.log(withNew); // [1,2,3,99]
console.log(nums1); // unchanged! [1,2,3]

// TRY IT: given `const fruits = ["apple", "banana"];`, create a new
// array `moreFruits` using spread, adding "mango" to the end without
// changing the original `fruits` array.

const fruits = ["apple", "banana"];
const moreFruits = [...fruits, "mango"];

console.log(fruits);
console.log(moreFruits);

// ============================================
// PART 8: PUTTING IT TOGETHER - real-world shape
// ============================================

// This is the exact pattern you'll use constantly in React:
// "take existing state, change ONE field, without mutating the original"

const userProfile = { name: "Ram", email: "ram@example.com", theme: "light" };

function updateTheme(profile, newTheme) {
  return { ...profile, theme: newTheme };
}

const newProfile = updateTheme(userProfile, "dark");
console.log(userProfile); // unchanged
console.log(newProfile);  // theme is now "dark"


// ============================================
// PART 9: EXERCISES
// ============================================

// 1. Destructure `id`, `name2`, and `price` from this object in one line,
// then log all three.
const item = { id: 1, name2: "Keyboard", price: 1500, inStock: true };
const {id, name2 ,price} = item;

console.log(id, name2, price)


// 2. Write a function `formatOrder({ id, item, price })` that logs
// "Order #id: item - ₹price". Call it with:
const order = { id: 101, item: "Mouse", price: 500 };

function formatOrder({id, item, price}) {
  console.log("Order #", id, ":", item, " - ₹",price)
}

formatOrder(order);

// 3. Given this array, destructure the first two values into `firstDestructure`
// and `secondDestructure`, and skip the third entirely.
const nums = [100, 200, 300];

const [firstDestructure,secondDestructure] = nums;

console.log(firstDestructure,secondDestructure);


// 4. Using spread, create a new object `updatedItem` from `item` (defined
// above in exercise 1), changing only `inStock` to false. Confirm `item`
// itself is unchanged by logging both.

const updatedItem = {...item, inStock: false}

console.log(item);
console.log(updatedItem);

// 5. Given this array of tags, use spread to create a new array `moreTags`
// that adds "urgent" to the end, WITHOUT modifying the original.
const tags = ["bug", "frontend"];
const moreTags = [...tags, "urgent"];

console.log(tags);
console.log(moreTags);

// 6. Write a function `mergeSettings(defaults, overrides)` that takes two
// objects and returns a new object with overrides applied on top of
// defaults (hint: spread both, in the right order). Test it with:
const defaults = { theme: "light", fontSize: 14, notifications: true };
const overrides = { theme: "dark" };
// expect result: { theme: "dark", fontSize: 14, notifications: true }

function mergeSettings(defaults, overrides) {
  return {...defaults, ...overrides}
}

console.log(mergeSettings(defaults, overrides));

// 7. Real-world style: given an array of task objects, write a function
// `markAllComplete(tasks)` that returns a NEW array where every task has
// `completed: true`, without mutating the original tasks or their objects.
// (Hint: you'll need .map() combined with spread on each task object.)
const tasks = [
  { id: 1, title: "Write tests", completed: false },
  { id: 2, title: "Fix bug", completed: false },
];

function markAllComplete(tasks) {
  // const filterTasks = tasks.filter((task)=> task.completed === true).map((task)=> task)
  // return filterTasks;

    const filterTasks = tasks.map((task)=> {return {...task, completed: true}});
  return filterTasks;

}

console.log(markAllComplete(tasks));