There are two ways in which the code can be executed in JavaScript. It either executes synchronously or asynchronously.

Synchronously means that the code is executed in a sequential manner, one line after another. Each line of code must complete before the next line can be executed. This is the default behavior in JavaScript. Let's say we have -

    console.log("Start");

    const result = slowFunction(); 

    console.log("End");

Here, if the slowFunction() takes, lets say, 5 seconds to complete, the output will be -

    Start
    (waits for 5 seconds)
    End

So, we can see that code literally pauses at the slowFunction() line until it completes, and then continues to the next line.

This is the biggest drawback of synchronous code execution. If a piece of code takes a long time to complete, it blocks the entire execution of the code, leading to a poor user experience.

It's like ordering a pizza and waiting for it to be delivered before you can do anything else. You can't watch TV, read a book, or even go to the bathroom until the pizza arrives.

The solution?  Asynchronous programming.

Asynchronous programming allows us to write code that can run in the background while the rest of the code continues to execute. This means that we can start a long-running task, and then continue executing other code without waiting for that task to complete.

A really good example is fetching some data from an API. We do not know how much time that will take and so we won't want to block the rest of the code execution while that is happening.

Let's say we have -

    console.log("Start");

    setTimeout(() => {
        console.log("Inside Timeout");
    }, 2000); // executes after 2 seconds, but doesn't block

    console.log("End");

Here, even though the setTimeout() function is set to execute after 2 seconds, the code does not block. The output will be -

    Start
    End
    (waits for 2 seconds)
    Inside Timeout

This is an example of asynchronous code execution. The setTimeout() function allows the code to continue executing while it waits for the timeout to complete.

But wasn't JavaScript a single-threaded language? How can it execute code asynchronously? Behind the scenes, a lot is going on but we will understand that in the next few sections. 

For now, just know that asynchronous code execution allows us to write code that can run in the background while the rest of the code continues to execute.

# REAL WORLD ANALOGY

1. Synchronous JavaScript

Imagine a small kitchen with one chef and the rule is:

    “The chef must fully cook and serve one dish before starting the next.”

Example:
    
    - Customer A orders pasta 🍝
    - The chef starts cooking pasta.
    - No other order can be started until pasta is ready.
    - Once pasta is served, the chef moves to the next order.

🔁 If one dish takes a long time, everyone else has to wait — just like blocking behavior in synchronous JavaScript.

2. Asynchronous JavaScript

Now, in a modern kitchen:

    - The chef receives an order.
    - If it takes time (like baking a cake), the chef sends it to the oven.
    - While the cake is baking, the chef works on other dishes.
    - When the cake is ready, the oven notifies the chef (like a callback), and the chef serves it.

This is asynchronous behavior:

    - Tasks that take time don’t block the kitchen.
    - The kitchen keeps processing new orders.
    - Once a delayed task is done, it comes back to be served.

# CALLBACKS

Let's say we have this code -

    let pizza;

    function orderPizza() {
        console.log("Ordering pizza...");
        setTimeout(() => {
            pizza = "🍕";
        }, 2000);
    }
    orderPizza();
    console.log(`Eat ${pizza}`);

Here, the orderPizza function simulates ordering a pizza. It uses setTimeout to simulate the delay in getting the pizza.

The issue with this code is that when we try to eat the pizza immediately after ordering it, the pizza variable is still undefined because the setTimeout function has not yet completed.

That's why, in the console, we will see:

    Ordering pizza...
    Eat undefined

One way to solve it is to move the console.log statement inside the setTimeout function, like this:

    let pizza;

    function orderPizza() {
        console.log("Ordering pizza...");
        setTimeout(() => {
            pizza = "🍕";
            console.log(`Eat ${pizza}`);
        }, 2000);
    }
    orderPizza();

Now, when we run this code, we will see:

    Ordering pizza...
    (waits for 2 seconds)
    Eat 🍕

But now the issue is, the orderPizza function is for ordering pizza, and the console.log statement is for eating pizza. They are not related to each other. 

One way to solve it is using a callback function. Remember the section on Higher Order Functions? We can pass a function to another function as an argument.

Here, we can pass a function to the orderPizza function that will be called when the pizza is ready.

Let's say we have a separate function called eatPizza that will be called when the pizza is ready:

    function eatPizza(pizza) {
        console.log(`Eat ${pizza}`);
    }

So, we can pass it as a callback to the orderPizza function:

    let pizza;

    function orderPizza(callback) {
        console.log("Ordering pizza...");
        setTimeout(() => {
            pizza = "🍕";
            callback(pizza);
        }, 2000);
    }

    orderPizza(eatPizza);

And now, when we run this code, we will see:

    Ordering pizza...
    (waits for 2 seconds)
    Eat 🍕

Awesome! That solves the issue. The 'eatPizza' function is called when the pizza is ready, and we can eat it.

# CALLBACK HELL

Imagine this is the flow - 

    1. We call the shop and wait for them to pick up the phone
    2. When they pick up the phone, we place an order
    3. Eat the pizza when it gets delivered

So, here, we have things that depend on each other. We can't place an order until the shop picks up the phone, and we can't eat the pizza until it is delivered.

So, let's write code to simulate this.

    function callShop() {
        console.log("Calling Pizza Shop...");
        setTimeout(() => {
            console.log("Pizza Shop picked up the phone");
        }, 2000);
    }

    function orderPizza() {
        console.log("Ordering Pizza...");
        setTimeout(() => {
            console.log("Pizza ordered");
        }, 2000);
    }

    function eatPizza() {
        console.log("Eating Pizza...");
    }

Here, we cannot write -

    callShop();
    orderPizza();
    eatPizza();

This will print -

    Calling Pizza Shop...
    Ordering Pizza...
    Eating Pizza...
    Pizza Shop picked up the phone
    Pizza ordered

So, the order matters. We have to wait for the shop to pick up the phone before we can order the pizza, and we have to wait for the pizza to be ordered before we can eat it.

Here, we can use callbacks so we can call the 'callShop' function, and then pass the 'orderPizza' function as a callback, and then pass the 'eatPizza' function as a callback to the 'orderPizza' function.

Something like this -

    function callShop(callback) {
        console.log("Calling Pizza Shop...");
        setTimeout(() => {
            console.log("Pizza Shop picked up the phone");
            callback();
        }, 2000);
    }

    function orderPizza(callback) {
        console.log("Ordering Pizza...");
        setTimeout(() => {
            console.log("Pizza ordered");
            callback();
        }, 2000);
    }

    function eatPizza() {
        console.log("Eating Pizza...");
    }

And finally, we can call the function like this:

    callShop(() => {
        orderPizza(eatPizza);
    });

And this will print -

    Calling Pizza Shop...
    Pizza Shop picked up the phone
    Ordering Pizza...
    Pizza ordered
    Eating Pizza...

But, there is one issue with this code. Imagine that instead of 3 things, we have 10 things to do, and each of them depends on the previous one. This means we will end up with callbacks inside callbacks inside callbacks and so on which will eventually get messy.

And this is something called 'Callback Hell' in JavaScript. It is a situation where we have too many nested callbacks, making the code hard to read and maintain.

So, what the solution? Is there another way to write asynchronous code without using callbacks? Well, there is a way to do that, and it is using 'Promises'.

We will learn about Promises in the next section.