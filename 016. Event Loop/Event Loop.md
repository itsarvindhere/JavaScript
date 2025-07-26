The Event Loop in JavaScript is a mechanism that handles asynchronous operations like 'setTimeout', 'Promises', 'fetch', and more, despite JavaScript being single-threaded.

Let's take an example to understand how synchronous code can be blocking.

Let's say we have this code -   

    function getCoffee() {
        console.log("Getting coffee...");
        doSyncStuff(3000);
        console.log("Coffee is here!");
    }

    function singASong() {
        console.log("Singing a song");
    }

    function doSyncStuff(ms) {
        const start = Date.now();
        while (Date.now() - start < ms) {
            // Just looping — nothing async, nothing productive
        }
    }


Do not worry about the 'doSyncStuff' function, it is just a blocking function that simulates a synchronous operation.

Basically, our code inside 'doSyncStuff' is blocking the main thread for 3 seconds, which means that during this time, no other code can run.

If you run this code in the browser console, you will see that when 'Getting Coffee...' is logged, the browser will not respond to any user input until 'Coffee is here!' is logged after 3 seconds.

In these 3 seconds, you can not even interact with the page you are on, which is a bad user experience.

This is called a blocking operation, and it is not ideal for user experience. And this happens because JavaScript is single-threaded, meaning it can only do one thing at a time.

But, if that's the case, then what happens when we have to do things like adding a delay or making api calls and more? As we have already seen in previous sections, for that, we have various options like 'setTimeout', 'Promises', 'async/await', and more.

But if JavaScript is single-threaded, how do these asynchronous operations work without blocking the main thread?

And that's where the Event Loop comes in. It is all the magic behind how JavaScript handles asynchronous operations.

Let's convert above code to use 'setTimeout' to simulate a non-blocking operation:

    function getCoffee() {
        console.log("Getting coffee...");
        doAsyncStuff(() => {
            console.log("Coffee is here!");
        });
    }

    function singASong() {
        console.log("Singing a song");
    }

    function doAsyncStuff(callback) {
        setTimeout(callback, 3000); // Simulating async operation with a delay
    }

Now, if you run this code in the browser console, you will see that when 'Getting Coffee...' is logged, the browser remains responsive, and you can interact with the page. Immediately after logging 'Getting Coffee...', the browser will log 'Singing a song' without waiting for the coffee to be ready. And after 3 seconds, it will log 'Coffee is here!'.

So, if JavaScript is single-threaded, how does it manage to run the 'setTimeout' callback after 3 seconds without blocking the main thread?

Let's talk about how the Event Loop works.

# EVENT LOOP

There are actually four things -   

    1. Event Loop
    2. Call Stack
    3. Web APIs
    4. Task Queue

## CALL STACK
   
The 'Call Stack' keeps track of what is currently being executed. As the name suggests, this is a 'stack' or a 'Last In First Out (LIFO)' structure, meaning the last function that was added to the stack is the first one to be executed.

When a function gets called, it is pushed to the top of the 'Call Stack'. And when the execution of that function is complete, it is popped off the 'Call Stack'.

### EXAMPLE 1

Let's say we have a code like this -

    function first() {
        console.log("First function");
    }

    function second() {
        console.log("Second function");
    }

    first();
    second();

So here, when we call 'first()', it gets pushed to the top of the 'Call Stack'. Remember that 'second()' won't be pushed to the 'Call Stack' because the code inside 'first()' is still executing.

So, the 'Call Stack' will look like this:

    Call Stack:
    [first]

Then, 'first()' calls the 'console.log' function, which is a built-in function in JavaScript. This function will also be pushed to the 'Call Stack'. The stack now looks like this: 

    Call Stack:
    [console.log, first]

Since 'console.log' is a synchronous function, it will execute and log "First function". After that, it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [first]

Since there are no more statements in 'first()', it will also be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

Similarly, 'second()' will be pushed to the 'Call Stack', and it will execute and log "Second function". After that, it will be popped off the 'Call Stack', and the 'Call Stack' will look like this:

    Call Stack:
    []

So, eventually, we get this in the console -

    First function
    Second function

### EXAMPLE 2

Now, what if 'first' was called inside 'second' like this -

    function first() {
        console.log("First function");
    }

    function second() {
        first();
        console.log("Second function");
    }
    second();

So, here, when we call 'second()', it gets pushed to the 'Call Stack'. The stack becomes -

    Call Stack:
    [second]

Now, while JavaScript is executing 'second()', it encounters a call to 'first()'. So, it will push 'first()' to the top of the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [first, second]

Now, inside 'first()', we have a 'console.log' statement that will also be pushed to the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [console.log, first, second]

And now, 'console.log' will execute and log "First function". After that, it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [first, second]

Now, since there are no more statements in 'first()', it will also be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [second]

Now, JavaScript will continue executing 'second()' and log "Second function". After that, 'second()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

So, eventually, we get this in the console -

    First function
    Second function
    
And from this example, we can see why do we even need a 'stack' data structure here. Because most of the time, we call other functions inside a function, so we need to keep track of which function is currently being executed and what needs to be executed next.

### EXAMPLE 3

Let's take three function calls now - 

    function fun1() {
        fun2();
    }

    function fun2() {
        fun3();
    }

    function fun3() {
        // Does nothing
    }

    fun1();

So, here, when we call 'fun1()', it gets pushed to the 'Call Stack'. The stack becomes -

    Call Stack:
    [fun1]

Inside 'fun1()', we have a call to 'fun2()'. So, 'fun2()' will be pushed to the top of the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [fun2, fun1]

Now, inside 'fun2()', we have a call to 'fun3()'. So, 'fun3()' will be pushed to the top of the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [fun3, fun2, fun1]

And in 'fun3()', there are no statements to execute, so it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [fun2, fun1]

Now, since there are no more statements in 'fun2()', it will also be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [fun1]

Finally, since there are no more statements in 'fun1()', it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

### EXAMPLE 4

Let's also take the example we saw in the very beginning - 

    function getCoffee() {
        console.log("Getting coffee...");
        doSyncStuff(3000);
        console.log("Coffee is here!");
    }

    function singASong() {
        console.log("Singing a song");
    }

    function doSyncStuff(ms) {
        // Some synchronous code that takes 3 seconds to execute
    }

    getCoffee();
    singASong();

So, here, when we call 'getCoffee()', it gets pushed to the 'Call Stack'. The stack becomes -

    Call Stack:
    [getCoffee]

Should we also push the 'singASong()' function to the 'Call Stack'? No, because the code inside 'getCoffee()' is still executing.

Inside 'getCoffee()', we have a console.log statement that will also be pushed to the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [console.log, getCoffee]

The console.log will execute and log "Getting coffee...". After that, it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [getCoffee]

Then, we have a call to 'doSyncStuff(3000)'. So, 'doSyncStuff()' will be pushed to the top of the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [doSyncStuff, getCoffee]

Inside 'doSyncStuff()', we have some synchronous code that takes 3 seconds to execute. So, the 'Call Stack' will be blocked for 3 seconds, and no other code can run during this time.

So, Nothing else can run during this time — no other function, no UI update, no event handling

And this is the reason why the browser becomes unresponsive during this time. Because remember that it is the call stack that executes the code, and if it is blocked, no other code can run.

Now, after 3 seconds, 'doSyncStuff()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [getCoffee]

Then, the next console.log statement in 'getCoffee()' will execute and log "Coffee is here!". After that, 'getCoffee()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

And only now, the 'singASong()' function will be pushed to the 'Call Stack', and it will execute and log "Singing a song". After that, 'singASong()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

So, we get this in the console -

    Getting coffee...
    <blocked for 3 seconds>
    Coffee is here!
    Singing a song

## WEB APIS

### EXAMPLE 5

So, what happens when we have an async code like this -

    function getCoffee() {
        console.log("Getting coffee...");
        doAsyncStuff(() => {
            console.log("Coffee is here!");
        });
    }

    function singASong() {
        console.log("Singing a song");
    }

    function doAsyncStuff(callback) {
        setTimeout(callback, 3000); // Simulating async operation with a delay
    }

    getCoffee();
    singASong();

So, when we call 'getCoffee()', it gets pushed to the 'Call Stack'. The stack becomes -

    Call Stack:
    [getCoffee]

Inside 'getCoffee()', we have a console.log statement that will also be pushed to the 'Call Stack' and be executed immediately. It will log 'Getting coffee...'. The stack now looks like this:

    Call Stack:
    [getCoffee]

Then, we have a call to 'doAsyncStuff()'. So, 'doAsyncStuff()' will be pushed to the top of the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [doAsyncStuff, getCoffee]

Inside 'doAsyncStuff()', we have a call to 'setTimeout()'. This is where the magic happens. The 'setTimeout()' function is a Web API provided by the browser, and it is not part of the JavaScript language itself.

Yes, 'setTimeout' is not part of the JavaScript language, it is a Web API provided by the browser. So, when we call 'setTimeout()'.

So, when we call 'setTimeout()', it is not executed immediately. It simply registers the callback function in the 'Web APIs' to be executed after a certain delay (in this case, 3000 milliseconds) and then returns immediately.

And that's why, the code is not blocked, and the 'Call Stack' will look like this:

    Call Stack:
    [doAsyncStuff, getCoffee]

Now, 'doAsyncStuff()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    [getCoffee]

Since there are no more operations in 'getCoffee()', it will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

Now, the 'singASong()' function will be pushed to the 'Call Stack', and it will execute and log "Singing a song". After that, 'singASong()' will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

After 3 seconds, the timer in the Web API expire and so, the callback is now pushed to the call stack to be executed. So, the callback function will be pushed to the 'Call Stack'. (Yes there is a Task queue in between so we will discuss that shortly) The stack now looks like this:

    Call Stack:
    [callback]

Inside the callback function, we have a console.log statement that will be executed and log "Coffee is here!". After that, the callback function will be popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

So eventually, we get this in the console -

    Getting coffee...
    Singing a song
    <after 3 seconds>
    Coffee is here!

And even though the callback function was registered to be executed after 3 seconds, it did not block the main thread, and the browser remained responsive during that time.

This is how the 'Web APIs' allow us to perform asynchronous operations without blocking the main thread.

## TASK QUEUE

The thing is, external things like Web APIs cannot push things directly to the 'Call Stack'. They can only notify the JavaScript engine that something is ready to be executed.

In our case above, when our callback's timer finishes, the Web API cannot just push the callback directly to the 'Call Stack'.

So, there has to be some sort of a 'waiting area' where the Web API can put the callback function to be executed later. This is where the 'Task Queue' comes in.

It is also called a 'Callback Queue' or a 'Macrotask Queue'. It is a waiting line of functions or callbacks that are ready to be executed but cannot be pushed to the 'Call Stack' immediately.

Whenever an asynchronous operation completes, its callback is queued — but it can’t run immediately. Instead, it gets added to the Task Queue.

Unlike a 'stack' which is a 'Last In First Out (LIFO)' structure, the 'Task Queue' is a 'First In First Out (FIFO)' structure, meaning the first function that was added to the queue is the first one to be executed.

But, when are these waiting functions executed? They are executed when the 'Call Stack' is empty.

But, how are they moved from the 'Task Queue' to the 'Call Stack'? This is where the 'Event Loop' comes in.

## EVENT LOOP

The 'Event Loop' is a mechanism that continuously checks if the 'Call Stack' is empty and if there are any functions in the 'Task Queue'. If the 'Call Stack' is empty, it will take the first function from the 'Task Queue' and push it to the 'Call Stack' for execution.

This is the only job of the 'Event Loop' — to keep checking if the 'Call Stack' is empty and if there are any functions in the 'Task Queue'.

And this whole mechanism is the reason why asynchronous JavaScript can be non-blocking and efficient, allowing for smooth user experiences even during long-running operations.

Let's take some more examples.

### EXAMPLE 6

    btn.addEventListener("click", () => {
        console.log("Button clicked!");
    });

    console.log('Start script');

    setTimeout(() => {
        console.log("Timeout 1");
    }, 1000);

    setTimeout(() => {
        console.log("Timeout 2");
    }, 500);

    console.log('End script');

So, in the above code, we have an event listener for a button click, two 'setTimeout' calls, and some console logs.

Let's now see how this code will execute step by step.

So, initially, the call stack is empty, the 'Task Queue' is empty, and the 'Event Loop' is waiting.

The code starts executing and the first line is the event listener for the button click. So, it is added to the 'Call Stack'. The stack now looks like this:

    Call Stack:
    [addEventListener]

Just like 'setTimeout', the 'addEventListener' is also part of the Web APIs.

So, just like 'setTimeout', it registers the callback function in the Web APIs and returns immediately. The 'Call Stack' will look like this:

    Call Stack:
    []

Next, we get to the console.log('Start script'). This will be pushed to the 'Call Stack' and executed immediately, logging "Start script". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

Next, we have a 'setTimeout' call with a delay of 1000 milliseconds. So, it will be pushed to the 'Call Stack'.

    Call Stack:
    [setTimeout]


And just like before, it registers the callback function in the Web APIs and returns immediately. The 'Call Stack' will look like this:

    Call Stack:
    []

Note that this callback is set to be executed after 1000 milliseconds, but it is not executed yet.

Behind the scenes, the Web API is now waiting for 1000 milliseconds before it can push the callback to the 'Task Queue'.

Next, we have another 'setTimeout' call with a delay of 500 milliseconds. So, it will be pushed to the 'Call Stack'.

    Call Stack:
    [setTimeout]

Again, it registers the callback function in the Web APIs and returns immediately. The 'Call Stack' will look like this:

    Call Stack:
    []

Now, the Web API is waiting for 500 milliseconds before it can push the callback to the 'Task Queue'.

Finally, we have the console.log('End script'). This will be pushed to the 'Call Stack' and executed immediately, logging "End script". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

At this point, the synchronous code has finished executing, and the 'Call Stack' is empty.

Let's say 500ms pass. So, the first 'setTimeout' callback is ready to be executed. But, it cannot be pushed to the 'Call Stack' directly. So, it will be pushed to the 'Task Queue'.

    Task Queue:
    [Timeout 2 callback]

Since the 'Call Stack' is empty, the Event Loop will take the first function from the 'Task Queue' and push it to the 'Call Stack'. So, "Timeout 2" will be logged to the console.

Let's say before 1000ms pass, the user clicks the button. So, the event listener callback will be pushed to the task queue.

    Task Queue:
    [button click callback]

And since the 'Call Stack' is still empty, the Event Loop will take the first function from the 'Task Queue' and push it to the 'Call Stack'. So, "Button clicked!" will be logged to the console.

And after 1000ms, the second 'setTimeout' callback is ready to be executed. So, it will be pushed to the 'Task Queue'.

    Task Queue:
    [Timeout 1 callback]

Since the 'Call Stack' is still empty, the Event Loop will take the first function from the 'Task Queue' and push it to the 'Call Stack'. So, "Timeout 1" will be logged to the console.

So, the final output will be -

    Start script
    End script
    Timeout 2
    Button clicked! (Considering the user clicked the button before 1000ms and after 500ms)
    Timeout 1

### EXAMPLE 7

Let's see an interesting example -

    console.log('1');

    setTimeout(() => {
        console.log('2');
    }, 0);

    console.log('3');

So, here, we have a console log, a 'setTimeout' with a delay of 0 milliseconds, and another console log.

What do you think will be logged to the console?

Will it be -

    1
    2
    3

Well, not really. Let's see how this code will execute step by step.

First, the console.log('1') will be pushed to the 'Call Stack' and executed immediately, logging "1". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

Next, there is a 'setTimeout' call with a delay of 0 milliseconds. So, it will be pushed to the 'Call Stack'.

    Call Stack:
    [setTimeout]

Now, even though there is a delay of 0 milliseconds, it still has to register the callback function in the Web APIs. Once it does that, it returns immediately. The 'Call Stack' will look like this:

    Call Stack:
    []

The 0ms means that the web API will push the callback to the 'Task Queue' as soon as possible. 

But here comes the twist.

Even though the call stack is empty, the 'Task Queue' is not checked immediately. The 'Event Loop' will only check the 'Task Queue' after the current execution context is complete. The current execution context is the synchronous code that is currently being executed.

--------------------------------------------------

It is very important to understand that JavaScript has a "run-to-completion" model for its synchronous code. This means that once the engine starts executing a script, it will not be interrupted until the very last line of that script has been processed and the Call Stack is empty.

So, the engine treats your entire initial script as one single, synchronous job. When it encounters 'setTimeout' or '.then()' or similar stuff, it doesn't pause. It simply hands the callback function to the browser environment to be placed in the appropriate queue (Macrotask or Microtask) later. The engine then immediately moves to the next line of your script.

The Event Loop only gets its chance to check the queues after the entire script has finished and the Call Stack is confirmed to be empty.

So, even if the setTimeout timer finishes instantly, its callback must wait patiently in the Macrotask Queue until the main script is completely done. ✅

--------------------------------------------------

So, all the synchronous code has to finish executing first before the 'Event Loop' can check the 'Task Queue'.

And as we can see above, we still have a console.log('3') to execute. So, it will be pushed to the 'Call Stack' and executed immediately, logging "3". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

And now, all the synchronous code has finished executing, and the 'Call Stack' is empty.

And since there is a callback in the 'Task Queue', the 'Event Loop' will take the first function from the 'Task Queue' and push it to the 'Call Stack'. So, "2" will be logged to the console.

And so, the final output will be -

    1
    3
    2

This means, even setTimeout(..., 0) doesn’t mean immediate. It means:

    “Run this code after the current synchronous code is done and the stack is empty.”

So it’s always deferred, even with 0ms.

# MICROTASK QUEUE

So far, we have seen asynchronous operations like 'setTimeout', which are added to the 'Task Queue'. But there is another queue called the 'Microtask Queue'. This one is for the 'Promises' and 'MutationObserver' callbacks.

The 'Microtask Queue' has a higher priority than the 'Task Queue'. This means that whenever the 'Call Stack' is empty, the 'Event Loop' will first check the 'Microtask Queue' before checking the 'Task Queue'.

### EXAMPLE 8

    console.log('Script start');

    setTimeout(() => {
        console.log('setTimeout');
    }, 0);

    fetch('someApi.com').then(() => {
        console.log('Promise 1');
    }).then(() => {
        console.log('Promise 2');
    });

    console.log('Script end');

Here, along with the 'setTimeout', we also have a 'fetch' method.

So, let's see how this code will execute step by step.

First, we have a console.log('Script start'). This will be pushed to the 'Call Stack' and executed immediately, logging "Script start". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

Next, we have a 'setTimeout' call with a delay of 0 milliseconds. So, it will be pushed to the 'Call Stack'.

    Call Stack:
    [setTimeout]

This will register the callback function in the Web APIs and return immediately. The 'Call Stack' will look like this:

    Call Stack:
    []

The Web API will push the callback to the 'Task Queue' after 0 milliseconds.

Next, we have a 'fetch('someApi.com')' call. This will be pushed to the 'Call Stack' -

    Call Stack:
    [fetch]

Since we do not know when the 'fetch' request will complete, it will not block the main thread.

First, the first 'then' callback is registered in the 'WebAPI' which immediately pushes it to the 'Microtask Queue'.

And then, the second 'then' callback is also registered in the 'WebAPI', which will also be pushed to the 'Microtask Queue'. Then, fetch is popped off the 'Call Stack', and the stack will look like this:

    Call Stack:
    []

The microtask and task queues are like this -

    Microtask Queue:
    [Promise 1 callback, Promise 2 callback]

    Task Queue:
    [setTimeout callback]

Finally, we have a console.log('Script end'). This will be pushed to the 'Call Stack' and executed immediately, logging "Script end". Then, it will be popped off the stack. The stack now looks like this:

    Call Stack:
    []

Now, the event loop sees that the 'Call Stack' is empty and all the synchronous code has finished executing, so it will first check the 'Microtask Queue'. Remember that a 'Microtask Queue' has a higher priority than the 'Task Queue'.

So, it picks the first function from the 'Microtask Queue' and pushes it to the 'Call Stack'. So, "Promise 1" will be logged to the console. 

The 'Microtask Queue' will now look like this:

    Microtask Queue:
    [Promise 2 callback]

Since the microtask queue is not yet empty, the event loop will again pick the first function from the 'Microtask Queue' and push it to the 'Call Stack'. So, "Promise 2" will be logged to the console.

And now, the microtask queue is empty, so the event loop will check the 'Task Queue'. It will take the first function from the 'Task Queue' and push it to the 'Call Stack'. This will log "setTimeout" to the console.

So, the final output will be -

    Script start
    Script end
    Promise 1
    Promise 2
    setTimeout
