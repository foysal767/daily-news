/* 
1. What is var, let and const in javascript?
Ans: 
var : It can be declared without initialization.
let : It can be declared without initialization.
const : It can not be declared without initialization.
 */

/* 
2. Qus : What is the difference between regular function and arrow function?

Ans : 
Understanding the differences between regular and arrow functions helps choose the right syntax for specific needs.

a) this value inside a regular function is dynamic and depends on the invocation. But this inside the arrow function is bound lexically and equals to this of the outer function.

b) arguments object inside the regular functions contains the list of arguments. The arrow function, on the opposite, doesn't define arguments (but you can easily access the arrow function arguments using a rest parameter ...args).

c) Examples: 
Regular function:
const greet = function(who) {
  return `Hello, ${who}`;
}

Arrow function:
const greet = (who) => {
  return `Hello, ${who}!`;
}
 */

/* 
3. Qus: What is map(), forEach(), filter() and find()?

Ans: 
map(): map() creates a new array from calling a function for every array element. map() does not execute the function for empty elements & not change the original array.

forEach(): The forEach() method executes a provided function once for each array element. This method is not executed for empty elements.

filter(): The filter() method creates a new array filled with elements that pass a test provided by a function. This method does not execute the function for empty elements & not change the original array.

find(): The find() method returns the value of the first element that passes a test. This method executes a function for each array element. It returns undefined if no elements are found.
 */
/* 
4. Qus: What is template string?
Ans: Template strings are a powerful feature of modern JavaScript released in ES6. It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements.
 */