So far, we talked about the 'Anonymous Functions', 'Named Functions', 'Factory Functions', 'Constructor Functions', 'Object Methods', and the 'Arrow Functions'.

In the 'Arrow Functions' section, we saw some functions such as the 'setTimeout' that accept a callback function as an argument. This also means that in Javascript, functions can be passed as arguments to other functions. In short, they can be used as values. This is a very powerful feature of Javascript and based on this, there is a very popular concept you will hear called 'Higher Order Functions'.

So, what are these 'Higher Order Functions'?

A function that does at least one of these two things is called a 'Higher Order Function' -

    1. It takes one or more functions as arguments (callback functions).
    2. It returns a function as its result.

In case of 'setTimeout', we saw that it takes a callback function as an argument. So, it satisfies the first condition. That's why it is a higher order function.

So, what are other examples of higher order functions?

Well, there are a ton of methods available on the 'Array' prototype that are higher order functions. For example, the 'map', 'filter', and 'reduce' methods are all higher order functions. They take a callback function as an argument and return a new array or a single value based on the callback function.

For example, let's take the 'filter' method. If we have an array -

    const numbers = [1, 2, 3, 4];

And we want to filter out the even numbers, then without 'filter' we will probably do -

    const evenNumbers = [];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            evenNumbers.push(numbers[i]);
        }
    }

But, since we have a higher order function called 'filter', we can do this in a much cleaner way -

    const evenNumbers = numbers.filter((n) => n % 2 === 0);

Behind the scenes, the 'filter' method is doing the same thing as our for loop. It is iterating over the array and calling the callback function for each element. If the callback function returns true, then that element is included in the new array.

And here, we can see that when we call 'filter', we are not passing any primitive value like a number or a string. Because it is not possible to tell 'filter' what to do with a primitive argument like a number or a string. We might have a pretty complicated logic to filter and all of this needs to be defined in a function. So, we pass a function as an argument to 'filter'.

Also, note that we are using 'Arrow Function' syntax to define the callback function. This is not necessary, but it is a common practice to use 'Arrow Functions' for callbacks because they are more concise and easier to read.

But why use 'filter' when we can just use a for loop? Well, in our applications, we do the filtering of lists pretty often. And if we can write this in a cleaner way, then why not? Also, the 'filter' method is more readable and easier to understand. It clearly states that we are filtering the array based on a condition. 

Imagine if we have a list of names and we have to filter out the names that start with an "S". Then, we have to filter out the names that start with an "S" but are also more than 5 characters long. Maybe then, we have to take each name and convert it to uppercase or maybe create a new paragraph DOM element and set the text content to the name.

Now imagine how this will be done if we do this using for loops. The code will be pretty long for such a simple task. But with higher order functions, we can do this in a much cleaner way.

Just like 'filter', we have 'map' which takes a callback function and returns a new array with the results of calling the callback function on each element of the original array.

For example, if we want to double each number in an array, we can do this with 'map':

    const numbers = [1, 2, 3, 4];
    const doubledNumbers = numbers.map((n) => n * 2);

Behind the scenes, 'map' is doing the same thing as our for loop. It is iterating over the array and calling the callback function for each element. The result of the callback function is included in the new array.

One really nice thing about these functions is that they are chainable. This means that we can call multiple higher order functions on the same array in a single line of code. For example, we can filter the even numbers and then double them in a single line:

    const numbers = [1, 2, 3, 4];
    const doubledEvenNumbers = numbers.filter((n) => n % 2 === 0).map((n) => n * 2);

The reason why we are able to do this is because the 'filter', 'map', 'reduce', etc return a 'new array'. This is a very important thing about these higher order functions. They do not modify the original array. Instead, they return a new array with the results of the operation. This is called 'immutability' and it is a very important concept in functional programming.

Since they return a new array, it means, when we write -

    const doubledEvenNumbers = numbers.filter((n) => n % 2 === 0).map((n) => n * 2);

It simply says first "filter the even numbers from the 'numbers' array and then whatever new array is returned, call 'map' on it and double each number in that new array". So, the 'filter' method returns a new array of even numbers and then 'map' is called on that new array to double each number, and finally 'map' returns a new array that is then referenced by the variable 'doubledEvenNumbers'.

Yes, there are some exceptions. For example, the 'forEach' method is a higher order function that takes a callback function as an argument but does not return a new array.

Instead, it simply calls the callback function for each element in the array and returns 'undefined'. This is because 'forEach' is used for side effects, like logging to the console or updating the DOM, rather than transforming the array.

But that's not the point. The point is that higher order functions are a powerful feature of Javascript that allow us to write cleaner and more readable code. They are widely used in modern Javascript applications and are an essential part of the language.

# FUNCTIONS THAT RETURN FUNCTIONS

So far, we have seen higher order functions that take a function as an argument. But what about functions that return a function? Yes, these are also higher order functions.

Let's take an example. Let's say we have this HTML -

    <button onclick="onClick12">12px</button>
    <button onclick="onClick14">14px</button>
    <button onclick="onClick16">16px</button>

This is a simple HTML with three buttons. When we click on any of these buttons, we want to change the font size of the entire webpage to that specific font-size. So, if we click on the first button, we want to change the font size to 12px, if we click on the second button, we want to change the font size to 14px, and so on.

One way to do this is to create three separate functions for each button. 

    function onClick12() {
        document.body.style.fontSize = '12px';
    }

    function onClick14() {
        document.body.style.fontSize = '14px';
    }

    function onClick16() {
        document.body.style.fontSize = '16px';
    }

And this will work. 

But this is not a very clean solution. We are repeating the same code three times. 

What if we have to add more buttons in the future? We will have to create more functions and repeat the same code again.

Maybe we can abstract this logic of finding the element on which we have to make the change and then setting the font size. So, we can create a function that takes the font size as an argument and returns a function that will change the font size of the body element.

    function makeClickHandler(size) {
        return function() {
            document.body.style.fontSize = size + 'px';
        }
    }

And now, we can update our javascript to -

    const onclick12 = makeClickHandler(12);
    const onclick14 = makeClickHandler(14);
    const onclick16 = makeClickHandler(16);

And here, the 'makeClickHandler' function is a higher order function because it returns a function. The functions that take some arguments and return a function are also called 'function factories' because they create functions based on the arguments passed to them.

Don't confuse this with 'Factory Functions' that we saw in the previous section. Factory functions are functions that create objects, while function factories are functions that create functions.

Let's take another example where we return a function inside a function.

Let's say we want to create a function that logs something  to the console. So, it takes a message as an argument and logs the message to the console. In case of 'ERROR', it will prefix the message with 'ERROR: ' and in case of 'INFO', it will prefix the message with 'INFO: '.

Without HOF, we will create two functions like this -

    function errorLogger(message) {
        console.log('ERROR: ' + message);
    }

    function infoLogger(message) {
        console.log('INFO: ' + message);
    }

But here, all that's different in both is basically the prefix. What if we also have to log 'WARNING' messages? We will have to create another function and repeat the same code again.

And that's code duplication. We can avoid this by creating a higher order function that takes the prefix as an argument and returns a function that logs the message with that prefix.

    function makeLogger(prefix) {
        return function(message) {
            console.log(`[${prefix}] ${message}`);
        }
    }

And now, we can create our loggers like this -

    const errorLogger = makeLogger('ERROR');
    const infoLogger = makeLogger('INFO');

And we can use them like this -

    errorLogger('Something went wrong'); // [ERROR] Something went wrong
    infoLogger('All good'); // [INFO] All good

