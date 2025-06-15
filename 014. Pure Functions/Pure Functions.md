Well, we are back to 'Functions' again.

So far, we talked about different types of functions in JavaScript. We started with the normal functions, then the named functions, object methods, anonymous functions, and then the arrow functions. We also discussed the concept of 'this' in JavaScript and how it behaves differently in different contexts.

In this section, we will talk about 'Pure Functions'.

So, what is a 'Pure Function'?

A pure function is a function that follows two main principles:

    1. Given the same inputs, it always returns the same output.
    2. It does not produce any side effects.

The characteristics of pure functions are -

    - No access to global state
    - No mutation of input parameters
    - No DOM manipulation or API calls
    - No logging or printing

Let's look at both of the principles in detail.

## 1. **Given the same inputs, it always returns the same output.**

Let's start with a simple 'greet' function that returns a greeting message -

    function greet() {
        return `Hello John!`;
    }

Well, this is a pretty generic  function. It is not dynamic. Let's make it better. What if we have -

    let name = 'John';
    function greet() {
        return `Hello ${name}!`;
    }

Well, now, the function is dynamic. It accesses a variable 'name' that is outside its scope.

    let name = 'John';
    function greet() {
        return `Hello ${name}!`;
    }

    greet(); // Hello John!

    let name = 'Mike';
    greet(); // Hello Mike!

    let name = 'Joe';
    greet(); // Hello Joe!

    let name = 'John';
    greet(); // Hello John!

Is this a pure function now? Remember that 'given the same inputs, it should always returns the same output'.

Right now, our function does not take any input which means the input is basically 'undefined'. So, following the first principle, it means, if we call -

    greet();

And it returns 'Hello John!', then it should always return 'Hello John!'. That's because it does not matter if we change the name variable outside the function, since the input to the function does not change. It remains undefined only.

But that's not the case for our function. If we change the name variable outside the function, it will return a different output. So, it is not a pure function.

Also, remember the first characteristic of pure functions that we discussed above? 'No access to global state'. 

Our function is accessing a variable 'name' that is outside its scope. So, it is not a pure function.

How do we make it a pure function?

Well, we can pass the name as an input parameter to the function. So, now we have -

    function greet(name) {
        return `Hello ${name}!`;
    }

Now, we can call the function with different names and it will always return the same output for the same input.

    greet('John'); // Hello John!
    greet('Mike'); // Hello Mike!
    greet('Joe'); // Hello Joe!

So, now, we are sure that no matter how many times we call it with 'John' as the input, it will always return 'Hello John!'.

Moreover, if we have -

    let name = 'John';
    function greet(name) {
        return `Hello ${name}!`;
    }

    greet('Mike'); // Hello Mike!

So, our function does not care about the variable 'name' outside its scope. It only cares about the input parameter 'name'. So, it is not accessing any global state. It is a pure function.

So, what are the benefits of this first principle?

Of course the very first benefit is that the function is predictable. It will always return the same output for the same input. This makes it easier to test and debug.

Also, if we have some heavy functions that take a lot of time to execute, we can cache the output for a given input. This is possible because we know that if 'input' is the same as before, then 'output' will be the same as before. So, if we call the function again with the same input, we can return the cached output instead of executing the function again. This can improve the performance of our application.

Pure Functions do not interfere with each other. So, we can call them in any order and they will not affect each other's output.

Pure Functions are also portable because  they do not depend on any external state. So, we can easily move them around in our codebase without worrying about the state of the application.

There is a term called 'Referential Transparency' that is used to describe pure functions. It means that we can replace a function call with its output value without changing the behavior of the program. This is possible because pure functions always return the same output for the same input.

So, if we have -

    function add(a, b) {
        return a + b;
    }

    let result = add(2, 3); // 5

We can replace the function call with its output value like this -

    let result = 5; // 5

And since 'add' is a pure function, it will not change the behavior of the program. This is what we mean by 'Referential Transparency'.

## 2. **It does not produce any side effects.**

The second principle of pure functions is that they do not produce any side effects. What do we mean by side effects?

Any interaction of a function with the outside world is basically a side-effect. This can be as simple as logging something to the console. Since the function interacted with the console which is outside the function, it is a side effect.

Here are examples of the side effects -

    - Logging to the console
    - Modifying a global variable
    - Making an API call
    - Changing the DOM
    - Writing to a file or a database
  
The simplest way to understand this is when we have a function that changes something outside its scope.

For example, let's say we have an increment function like this -

    let count = 0;
    function increment() {
        count++;
        return 'Count is now ' + count;
    }

What if we cll this function three times?

    console.log(increment()); // Count is now 1
    console.log(increment()); // Count is now 2
    console.log(increment()); // Count is now 3

This seems to be working just as expected right?

But, what if we now check the value of 'count' after we called the increment function three times?

    console.log(count); // 3

Well, this means even though the 'count' variable was defined with a value of '1', it was changed inside the 'increment' function. And this means, this function produced a side effect. It changed the value of a variable outside its scope. That's why it is not a pure function.

Moreover, remember that this function accepts no input parameter so whatever it returned initially should always be the same (First principle). But now, if we call the increment function again, it will return a different output.

    console.log(increment()); // Count is now 4

And so, it is not a pure function.

In some real project, we won't call the increment function three times in a row at the single place. Maybe, we call it in different places in our codebase. So, we can never be sure what the value of 'count' will be at any point in time. This makes it hard to predict the output of the function.

We will have to find all the places where the 'increment' function is called and then check the value of 'count' at that point in time. This makes it hard to test and debug.

So, how can we make it pure?

What if we do -

    function increment(count) {
        return count + 1;
    }

Now, we can call the function with different values of 'count' and it will always return the same output for the same input.

    console.log(increment(0)); // 1
    console.log(increment(1)); // 2
    console.log(increment(2)); // 3

No matter how many times we call it with '0' as the input, it will always return '1'. So, it follows the first principle.

If we have -

    let count = 0;
    function increment(count) {
        return count + 1;
    }

    increment(count); // 1

    console.log(count); // 0 <== Still 0, did not change

So, the function did not change the value of 'count'. It just returned a new value. So, it does not produce any side effects.

So, it is a pure function.

Why this is useful? What is the benefit of this?

Just like the first principle, this makes the function predictable. It will always return the same output for the same input. This makes it easier to test and debug.

Due to no side-effects, there are no hidden bugs. For example -

    let count = 0;
    function add() {
        count += 1;
        return count;
    }

    let newCount = add(count); // 1

    console.log(count); // 1 <== count changed!

This function can cause bugs if 'count 'variable is used in other parts of the codebase. We can never be sure what the value of 'count' will be at any point in time. This makes it hard to test and debug. But if we had -
    
    let count = 0;
    function add(count) {
        return count + 1;
    }

    let newCount = add(count); // 1

    console.log(count); // 0 <== count is the same!

Now, we can be sure that the function won't change the value of 'count' variable. It will just return a new value. So, we can easily test and debug the function.

# FUNCTIONAL PROGRAMMING

Functional programming is a programming paradigm where you:

    - Write code using pure functions
    - Avoid changing state or mutating data
    - Emphasize immutability, function composition, and declarative code

So, we can say that 'Pure Functions' are the building blocks of functional programming.

# NOT EVERY FUNCTION NEEDS TO BE PURE

Of course it is not necessary that every function in your codebase needs to be pure. There are many cases where you will need to interact with the outside world, like making API calls, changing the DOM, etc. In those cases, you will have to write impure functions.

You can’t avoid side effects in code like this:

    function fetchUser(id) {
        return fetch(`/api/users/${id}`);
    }

This is impure because it makes a network call — but we need this to build a real app!

But, it is a good practice to write pure functions whenever possible. This will make your codebase more predictable, easier to test and debug, and also improve the performance of your application.

Think of it like this -

    1. Pure functions: Ideal for business logic, calculations, data transformation — anything that can be computed from input alone.

    2. Impure functions: Necessary for real-world effects like:

        - Updating the DOM
        - Fetching from an API
        - Logging to console
        - Storing data in a database
        - Reading from localStorage

We can’t avoid impure functions, but we can isolate them — and that’s where the real power of pure functions comes in.

What does it mean by 'isolate'?

It means to keep all the side-effect-causing code (impure functions) at the edges of your application, while keeping the core logic pure.

For example, we have -

    function calculateTotal(items) {
        return items.reduce((sum, item) => sum + item.price, 0);
    }

    function showTotalOnUI(total) {
        document.getElementById("total").textContent = total; // DOM = side effect
    }

    function main() {
        const cart = [{ price: 100 }, { price: 200 }];
        const total = calculateTotal(cart);  // pure
        showTotalOnUI(total);                // impure (but isolated)
    }

Here, 'calculateTotal' is a pure function that does not cause any side effects. It just takes an input and returns an output. On the other hand, 'showTotalOnUI' is an impure function that interacts with the DOM, which is outside its scope.

So, Isolating impure functions means separating them from your core logic, so your main code stays clean, testable, and reliable — while still being able to interact with the outside world when needed.

And that's all about 'Pure Functions'! They are the building blocks of functional programming and help us write predictable, testable, and reliable code. Remember to use them whenever possible, but also know when to use impure functions for real-world effects.