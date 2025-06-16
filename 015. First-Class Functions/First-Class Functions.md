In general term, when we say 'First Class' citizen, it means a person that receives equal rights and privileges as any other person.

Similarly, in programming, when we say 'First Class' functions, it means that functions are treated as first class citizens. That is, like any other data type.

This means that functions can be passed as arguments to other functions, returned from other functions, and assigned to variables.

In JavaScript, functions are first class citizens. This means that you can do the following:

    1. Assign a function to a variable
    2. Pass a function as an argument to another function
    3. Return a function from another function
    4. Store a function in a data structure (like an array or an object)

## 1. ASSIGN A FUNCTION TO A VARIABLE

In JavaScript, we can do something like this -

    const a =  function() {
        console.log("Hello World");
    }

But, why is this useful?

Let's ask ourselves. Why do we store data in variables? To use it later, right?

Similarly, we can store functions in variables to use them later. This is useful when we want to create a function that can be reused multiple times. So, Reusability is one of the key benefits of first class functions.

Let's say we have a function that returns the current time -

    const getTime = function() {
        const now = new Date();
        return ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }

So, anywhere in the code where we want to get the current time, we can just call the 'getTime' function.

Another benefit of this is readability. When we store a function in a variable, we can give it a meaningful name that describes what the function does. This makes the code more readable and easier to understand.

## 2. PASS A FUNCTION AS AN ARGUMENT TO ANOTHER FUNCTION

This is something we have seen earlier when we discussed callbacks and Higher Order Functions.

In JavaScript, we can pass a function as an argument to another function. This is useful when we want to create a function that can be customized based on the behavior of the passed function.

Passing a function allows us to delegate the responsibility of executing a specific task to another function. This is often used in event handling, where we pass a function to be executed when an event occurs.

For example, let's say we have a 'processData' function like this -

    function processData(data, callback) {
        return callback(data);
    }

All it does is take some data and a callback function, and then it calls the callback function with the data.

We can call it like this -

    const toUppercase = str => str.toUpperCase();
    console.log(processData("hello world", toUppercase)); // Output: "HELLO WORLD"

So, the 'processData function does not care how the data is processed. It just calls the callback function with the data. That is, it delegates the responsibility of processing the data to the callback function.

You might have worked with Array functions like 'map', 'filter', and 'reduce'. These functions take a callback function as an argument and apply it to each element of the array. This is a common pattern in functional programming.

    const array = [1, 2, 3, 4, 5];
    const doubleArray = array.map(item => item * 2);

In this example, the 'map' function takes a callback function that doubles each element of the array. The 'map' function then applies this callback to each element of the array and returns a new array with the doubled values.

We can also store the doubling logic in a variable and pass it to the 'map' function like this -

    const double = item => item * 2;
    const doubleArray = array.map(double);

Now, the 'double' function is reusable and can be passed to other functions as well.

In Async JS, we know that we can pass a function to be executed after an asynchronous operation is completed. This is often done using callbacks or promises. For example, the 'setTimeout' function takes a callback function that is executed after a specified delay.

    setTimeout(() => {
        console.log("This message is displayed after 2 seconds");
    }, 2000);

We can also give control to the user by allowing them to pass a function that will be executed when a certain condition is met. This is often done in event handling, where we pass a function to be executed when an event occurs.

For example  -

    function onEvent(callback) {
        console.log("Event triggered!");
        callback(); // user-defined behavior
    }

Here, the 'onEvent' function takes a callback function as an argument and calls it when the event is triggered. This allows the user to define their own behavior when the event occurs.

## 3. RETURN A FUNCTION FROM ANOTHER FUNCTION

We can create customized version of a function by returning a function from another function. This is often used in functional programming to create functions that are tailored to specific needs.

This is also known as 'Function Factory'. It allows us to create functions that are specialized for a particular task or behavior.

For example, let's say we have this piece of code -

    function createMultiplier(factor) {
        return function(number) {
            return number * factor;
        };
    }

Here, the 'createMultiplier' function takes a 'factor' as an argument and returns a new function that multiplies a number by that factor. This allows us to create specialized multiplier functions based on the factor we provide.

So, we can now have -

    const double = createMultiplier(2);
    const triple = createMultiplier(3);

    console.log(double(5)); // Output: 10
    console.log(triple(5)); // Output: 15

So, we used the same 'createMultiplier' function to create two different functions - 'double' and 'triple'. Each of these functions is specialized for a particular factor.

Another benefit is 'Currying'.

This is a technique in functional programming where a function is transformed into a sequence of functions, each taking a single argument. This allows us to create specialized functions by partially applying arguments.

For example, let's say we have a function that takes two arguments -

    function add(a, b) {
        return a + b;
    }

We can transform it into a curried function like this -

    function add(a) {
        return function(b) {
            return a + b;
        };
    }

Now, let's say we want to create a function that adds 5 to any number. We can do this by partially applying the argument like this -

    const add5 = add(5);

Now, we can call this  function with a single argument -

    console.log(add5(10)); // Output: 15

Again, the benefit is 'Reusability'. We can create specialized functions by partially applying arguments, and we can use these functions multiple times in our code. It also works well with 'function composition', where we can combine multiple functions to create a new function.

This also avoids repetition of code. Instead of writing the same logic multiple times, we can create a specialized function and use it wherever needed.

Finally, there are also 'Closures' which are a powerful feature of JavaScript that allows us to create functions with private variables. When we return a function from another function, the returned function has access to the variables of the outer function, even after the outer function has finished executing.

We have discussed closures in detail in the 'Closures' section. But, to give you a brief idea, let's say we have this code -

    function createCounter() {
        let count = 0;
        return function() {
            count++;
            return count;
        };
    }

Here, the 'createCounter' function returns a new function that increments and returns the 'count' variable. The 'count' variable is private to the returned function, and it is not accessible from outside.

So, we cannot change the value of 'count' directly. We can only access it through the returned function.

    const counter = createCounter();
    console.log(counter()); // Output: 1
    console.log(counter()); // Output: 2

## 4. STORE A FUNCTION IN A DATA STRUCTURE

Since functions are first class citizens in JavaScript, we can store them in data structures (arrays or objects). This allows us to create collections of functions that can be executed later.

This means, we can treat logic like data. We can store functions in arrays or objects, and we can iterate over them, filter them, or perform any other operation that we can do with data.

For example, let's say we have three functions are we want to call them one after another. We can store them in an array like this -

    const functions = [
        function() { console.log("Function 1"); },
        function() { console.log("Function 2"); },
        function() { console.log("Function 3"); }
    ];

Now, we can simply iterate over the array and call each function like this -

    functions.forEach(func => func());

Quite useful for step-based logic, middlewares, pipelines, etc.

There is something called a 'Strategy Pattern' where  we can store different strategies (functions) in an object and then execute the appropriate strategy based on some condition.

For example, maybe we have this -

    const strategies = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b
    };

So, we have  different strategies for performing arithmetic operations. We can then execute the appropriate strategy based on the operation we want to perform.

    function calculate(a, b, operation) {
        return strategies[operation](a, b);
    }

Now, we can call the 'calculate' function with different operations like this -

    console.log(calculate(10, 5, 'add')); // Output: 15
    console.log(calculate(10, 5, 'subtract')); // Output: 5
    console.log(calculate(10, 5, 'multiply')); // Output: 50
    console.log(calculate(10, 5, 'divide')); // Output: 2

This means the code is now clean and extensible. If we want to add a new operation, we can simply add a new function to the 'strategies' object without changing the 'calculate' function.

Moreover, instead of writing how to do something, we can just write what to do. This is often referred to as 'Declarative Programming'.