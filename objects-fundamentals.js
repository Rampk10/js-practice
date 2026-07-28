// Objects Deep-Dive — Creation, Adding, Fetching
// Objects store data as key-value pairs, unlike arrays which store
// ordered lists. Think of an object like a labeled box: each label (key)
// points to one value.

// ============================================
// PART 1: CREATING objects
// ============================================

// 1a. Create an object directly with values already in it
const person = {
  name: "Ram",
  age: 30,
  role: "Technical Lead",
};
console.log(person);

// 1b. Create an EMPTY object, then add values one by one
const car = {};
car.brand = "Toyota"; // dot notation
car["model"] = "Corolla"; // bracket notation - same result as dot notation
car.year = 2022;
console.log(car);

// TRY IT: create an empty object called `book`, then add
// title, author, and pages to it one line at a time.

const book = {
  title: "MyLife",
  author: "Ram",
  pages: 85,
}
// ============================================
// PART 2: FETCHING (reading) values
// ============================================

// 2a. Dot notation - use when you know the exact key name in advance
console.log(person.name);   // "Ram"
console.log(car.brand);     // "Toyota"

// 2b. Bracket notation - use when the key is stored in a variable,
// or when the key has spaces/special characters
const key = "age";
console.log(person[key]);   // 30 - reads whatever `key` holds

// This is the big difference to remember:
// person.key   -> looks for a property LITERALLY named "key" (wrong!)
// person[key]  -> looks up the VALUE stored in the variable `key` (right)

// TRY IT: fetch `car.model` using bracket notation instead of dot notation.

console.log(car.model)
console.log(car["model"])

// ============================================
// PART 3: UPDATING and ADDING new values
// ============================================

person.age = 31; // update existing value
person.city = "Madurai"; // add a brand new key that didn't exist before
console.log(person);

// TRY IT: update `car.year` to 2024, then add a new key `car.color`.

car.year = 2024;
car.color = "Red";
console.log(car)

// ============================================
// PART 4: CHECKING if a key exists
// ============================================

console.log("name" in person);      // true
console.log("salary" in person);    // false - key doesn't exist

if ("city" in person) {
  console.log("City is set to:", person.city);
}

// TRY IT: write an if-check for whether `car` has a key called "color"

if("color" in car) {
  console.log("color is set to:", car.color)
}

// ============================================
// PART 5: LOOPING through an object's keys and values
// ============================================

for (let key in person) {
  console.log(key, "->", person[key]);
}
// Notice: inside the loop, you MUST use bracket notation (person[key]),
// since `key` is a variable holding the key name, not the key itself.

// TRY IT: loop through `car` the same way and print each key/value.

for(let key in car) {
  console.log(key, "->", car[key])
}

// ============================================
// PART 6: OBJECTS INSIDE ARRAYS (this is the real-world shape)
// ============================================

const employees = [
  { name: "Ram", dept: "Engineering" },
  { name: "Priya", dept: "QA" },
  { name: "Kumar", dept: "Engineering" },
];

// Fetching a value from one object inside the array
console.log(employees[0].name); // "Ram" - index into array, then dot into object

// Looping through an array of objects
for (let i = 0; i < employees.length; i++) {
  console.log(employees[i].name, "works in", employees[i].dept);
}

// TRY IT: add a 4th employee object to the `employees` array using .push(),
// then loop through and print all names again to confirm it was added.

employees.push({name: "Anbu", dept: "Childcare"});
for(let i=0;i<employees.length;i++){
  console.log(employees[i].name, "works in", employees[i].dept)
}
// ============================================
// PART 7: SMALL EXERCISES - do these without looking above
// ============================================

// 7a. Create an object `product` with keys: name, price, inStock (true/false)
// 7b. Update the price to a new value
// 7c. Add a new key `discount` to it
// 7d. Write an if-check: if inStock is true, log "Available", else log "Out of stock"
// 7e. Given an array of product objects, find the total price of all IN-STOCK products
//     (loop through, check inStock, add up price if true)

const products = [
  { name: "Pen", price: 10, inStock: true },
  { name: "Notebook", price: 50, inStock: false },
  { name: "Bag", price: 500, inStock: true },
];
products[0].price = 30;
for(let i=0;i<products.length; i++) {
  products[i].discount = "5%"
}

for (let key in products) {
  if(products[key].inStock === true) {
    console.log(products[key].name, "product is Available")
  } else {
    console.log(products[key].name, "product is Out of stock")
  }
}

function totalInStockPrice(products) {
  let sum = 0;
  for (let key in products) {
    if(products[key].inStock === true) {
      sum = sum + products[key].price;
    }
  }
  return sum;
}
console.log(totalInStockPrice(products)); // expect 530 (30 + 500)


// ============================================
// PART 8: 10 EXERCISES — do these in order
// ============================================

// 1. Basic creation
// Create an object called `movie` with keys title, year, rating.
// Log the whole object.

const movie = {
  title: "Once Upon a time in Hollywood",
  year: 2018,
  rating: "9.2"
}

console.log(movie)


// 2. Fetch with dot notation
// Log just movie's title using dot notation.
console.log(movie.title)


// 3. Fetch with bracket notation using a variable
const field = "rating";
// log movie's rating using bracket notation and the `field` variable
console.log(movie[field])

// 4. Add and update
// Add a new key `director` to movie. Then update `year` to a different value.
movie.director = "QT";
movie.year = 2019;

// 5. Existence check
// If movie has a key called `genre`, log its value; otherwise log "Genre not set"
if("genre" in movie) {
  console.log(movie.genre);
} else {
  console.log("Genre not set")
}

// 6. Loop through an object
const scores = { math: 80, science: 92, english: 75 };
// loop through scores and log each subject with its score, like "math: 80"

for (let key in scores) {
  console.log(key, ":", scores[key])
}

// 7. Sum all values in an object
// Using scores, write a function that returns the total of all values
// (without hardcoding key names — use a loop)
function sumScores(scores) {
  // your code here
  let sum = 0;
  for(let key in scores) {
    sum = sum + scores[key];
  }
  return sum;
}
console.log(sumScores(scores)); // expect 247


// 8. Objects inside an array — fetch
const books = [
  { title: "Atomic Habits", pages: 320 },
  { title: "Deep Work", pages: 280 },
];
// Log the pages of the second book (books[1].pages), then loop through
// and log every title

console.log(books[1].pages);
for(let key in books) {
  console.log(books[key].title)
}

// 9. Objects inside an array — filter + count
// Write a function that returns only the books with pages greater than 300
function booksOverPages(books, minPages) {
  const output = []
  for (let key in books) {
    if(books[key].pages > minPages) {
      output.push(books[key])
    }
  }
  return output;
}
console.log(booksOverPages(books, 300)); // expect [{title: "Atomic Habits", pages: 320}]


// 10. Combine everything — real-world shape
const orders = [
  { id: 1, item: "Laptop", price: 50000, status: "delivered" },
  { id: 2, item: "Mouse", price: 500, status: "pending" },
  { id: 3, item: "Keyboard", price: 1500, status: "delivered" },
];
// Write totalDeliveredValue(orders): sum of price for all orders where
// status is "delivered". (Deliberately similar to totalInStockPrice above —
// repetition on this exact pattern is worth it since it's extremely common
// in real work.)
function totalDeliveredValue(orders) {
  // your code here
  let sum = 0;
  for(let key in orders) {
    if(orders[key].status === "delivered") {
      sum = sum + orders[key].price;
    }
  }
  return sum;
}
console.log(totalDeliveredValue(orders)); // expect 51500 (50000 + 1500)
