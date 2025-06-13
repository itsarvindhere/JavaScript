One of the fundamental concepts in JavaScript is closures.

Simply put, A 'closure' in JavaScript happens when a function remembers the variables from where it was created — even if it's used outside of that place.

Whenever we talk about closures, we usually talk about two functions - an outer function and an inner function. The inner function is defined inside the outer function and has access to the outer function's variables.

Let's say we have this code -

    function human(name) {
        function sayHello() {
            console.log(`Hello, my name is ${name}`);
        }
        return sayHello;
    }

    const greet = human('John');
    greet(); // Hello, my name is John

Here, the 'sayHello' function is which is passed to the 'human' function. 

Note that when we call human() function and store the returned 'sayHello' function in 'greet' variable, the job of human() function is basically done which means ideally, we should not be able to access the 'name' variable anymore.

But still, it doesn't matter when you call 'greet' function, it will still have access to the 'name' variable. That's all because of closures.

Again, A closure is when a function can still use variables from where it was created, even after that outer function has finished.

But, you can also say what's the use of this inner function? Cannot we simply create a standalone function named sayHello() outside of human() function? And then we can simply accept a 'name' parameter in it and use it like this -

    function sayHello(name) {
        console.log(`Hello, my name is ${name}`);
    }

    sayHello('John'); // Hello, my name is John

Yes, we can do that, but this is not the point of closures. The point of closures is to create functions that can remember their environment.

What if there is a scenario where we want to remember a value such that we do not have to pass it every time we call the function?

Well, closures can help us with that.

    function human(name) {
        function sayHello() {
            console.log(`Hello, my name is ${name}`);
        }
        return sayHello;
    }

    const greet = human('John');
    greet(); // Hello, my name is John

That's exactly what is happening in the above example.

In the example, the 'sayHello' function is able to remember the 'name' variable from its outer function 'human', even after 'human' has finished executing. This allows us to create functions that can maintain state or context without needing to pass that state explicitly every time we call the function.

    const greetJohn = human('John');
    greet(); // Hello, my name is John

    const greetAlice = human('Alice');
    greet(); // Hello, my name is Alice

Another big benefit of closures is that they can help us create private variables.

This is something we saw in the section where we discussed Factory Functions. Let's say we have a factory function like this -

    function createCounter() {
        let count = 0;

        return {
            increment: function() {
                count++;
                console.log(`Count: ${count}`);
            },
            decrement: function() {
                count--;
                console.log(`Count: ${count}`);
            },
            getCount: function() {
                return count;
            }
        };
    }

Here, the createCounter() function has a variable 'count' that is used in the inner functions 'increment', 'decrement', and 'getCount'. And then, we return an object containing these inner functions.

Now, when we say -

    const counter = createCounter();

While the 'createCounter' function has finished executing, the inner functions still have access to the 'count' variable because of closures. 

The benefit?

We can use the returned 'counter' object to increment, decrement, or get the count but, there is no way to directly access or modify the 'count' variable from outside the 'createCounter' function. This effectively makes 'count' a private variable.

    counter.increment(); // Count: 1
    counter.increment(); // Count: 2
    counter.decrement(); // Count: 1
    console.log(counter.getCount()); // 1

We cannot do -

    console.log(counter.count); // undefined
    counter.count = 10; // This won't change the count variable inside createCounter

And that's one of the biggest benefits of closures in JavaScript. They allow us to create private variables and encapsulate state within functions, which can help us write cleaner and more maintainable code.

Let's take another example. Let's say we have this HTML -

    <button id="size-12">12px</button>
    <button id="size-14">14px</button>
    <button id="size-16">16px</button>

One way to attack the click handler to each of these such that on click of each, the body's font size is updated, we can do -

    document.getElementById('size-12').onclick = function() {
        document.body.style.fontSize = '12px';
    };

    document.getElementById('size-14').onclick = function() {
        document.body.style.fontSize = '14px';
    };

    document.getElementById('size-16').onclick = function() {
        document.body.style.fontSize = '16px';
    };

Of course there is code duplication here. Maybe we can have a single function that takes the size as an argument and updates the font size of the body element, right? Let's try that.

    function clickHandler(size) {
        document.body.style.fontSize = size + 'px';
    }

    document.getElementById('size-12').onclick = clickHandler(12);
    document.getElementById('size-14').onclick = clickHandler(14);
    document.getElementById('size-16').onclick = clickHandler(16);

But, this won't work as expected. Remember that 'onclick' expects a function, but 'clickHandler(12)' will immediately execute the function. We do not want that. we want to give 'onclick' a function that, when called, will execute the logic to change the font size.

Of course we cannot do -

    document.getElementById('size-12').onclick = clickHandler;

Because now, there is no way to pass the size to the 'clickHandler' function when the button is clicked.

And so, now, it's time to use closures and Higher Order Functions together.

We can create a function that returns another function, which will have access to the size variable from its outer scope.

    function makeClickHandler(size) {
        return function() {
            document.body.style.fontSize = size + 'px';
        };
    }

And now, we can use it like this -

    document.getElementById('size-12').onclick = makeClickHandler(12);
    document.getElementById('size-14').onclick = makeClickHandler(14);
    document.getElementById('size-16').onclick = makeClickHandler(16);
    
And that's a really good practical example of how closures and higher order functions can work together to create more flexible and reusable code.

So, the conclusion is -

    Closures are like memory: the function remembers the data it was created with.

    They help in creating customized, protected, and reusable logic.

