In the last two sections, we learned about callbacks and promises, which are both ways to handle asynchronous operations in JavaScript.

We saw how 'Promises' solve the "callback hell" problem by allowing us to chain asynchronous operations in a more readable way.

But, even with Promises, we can still end up with deeply nested code if we have multiple asynchronous operations that depend on each other.

Let's say this is the function that returns some promise -

    function getData() {
        return new Promise(...);
    }

And as we learned, we can use 'then' and 'catch' to handle the resolved value or error:

    getData()
        .then(data => {
            // Handle data
        })
        .catch(error => {
            // Handle error
        });

Wouldn't it be great if we could write something like -

    const data = getData();

Well, we cannot do the above because we know that `getData()` returns a Promise, not direct data.

But, we can use the 'await' keyword here to write something like -

    const data = await getData();
    console.log(data);

So, is that it?

Well, if you execute this code in the browser, chances are it will print "10". But, you may also get an error saying "await is only valid in async functions and the top level bodies of modules".

Most of the time, we will be using 'await' inside an 'async' function. What is an 'async' function?

Well, an 'async' function will have an 'async' keyword before the function declaration. For example:

    async function fetchData() {
       ...
    }

And inside this 'async' function, we can use the 'await' keyword.

So, we can write something like -

    async function fetchData() {
        const data = await getData();
        console.log(data);
    }

And then call the function like this:

    fetchData();

What would happen if we have a console log after the 'await' statement?

    async function fetchData() {
        const data = await getData();
        console.log(data);
        console.log("Hello there!");
    }

So far in the callbacks and promises section, we have seen that if there is any asynchronous operation, then the code after that operation will not wait for it to complete. It will execute immediately.

So, here, does the 'Hello there' gets printed to the console immediately or after the 'getData()' promise resolves? If you run the above code, it should print - 

    10
    Hello there!

Wait, does this mean that 'await' is blocking the code execution?

Well, it does not block the entire code execution. It only blocks the execution of the code inside the 'async' function until the Promise resolves.

And to verify this, you can actually have another console log after we called the 'fetchData()' function:

    async function fetchData() {
        const data = await getData();
        console.log(data);
        console.log("Hello there!");
    }
    fetchData();
    console.log("This will run before the data is fetched.");

Now, in the console, you should see the output like this:

    This will run before the data is fetched.
    10
    Hello there!

And this means that 'await' is only blocking the code execution inside the 'async' function, not the entire code execution.

So, that's the important part to remember about 'await' - it only pauses the execution of the code inside the 'async' function until the Promise resolves or is rejected. Once the promise resolves or is rejected, the code execution resumes.

So, why should we use 'async' and 'await' instead of just using Promises with 'then' and 'catch'?

This is the code using async and await -

    async function fetchData() {
        const data = await getData();
        console.log(data);
    }

To write the same code using Promises, we would have to write something like this:

    getData()
        .then(data => {
            console.log(data);
        });

Just by looking at the code, we can see that the 'async' and 'await' version is much more readable and easier to understand.

It is also worth mentioning that just like how returning any value inside 'then' will return a new Promise that resolves to that value, returning any value from an 'async' function will also return a Promise that resolves to that value.

    async function fetchData() {
        const data = await getData();
        console.log(data);
        return 20;
    }

In the above code, if we call the 'fetchData()' function, it will return a Promise that resolves to 20.

This means, we can do something like this:

    fetchData().then(value => {
        console.log(value); // 20
    });

# REAL WORLD EXAMPLE USING 'FETCH' API

In the previous sections, we have seen how the 'fetch' API works with Promises. As we now know that we can use 'async' and 'await' to handle asynchronous operations, let's see how we can use it with the 'fetch' API.

With promises, we were doing something like this -

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => console.log(data));

Let's do the same with 'async' and 'await':

    async function fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        console.log(data);
    }

While the promise version is already quite readable, the 'async' and 'await' version makes it even clearer that we are waiting for the response to be fetched and then waiting for the response to be converted to JSON. And only after that, we are logging the data to the console.

# ERROR HANDLING WITH 'ASYNC' AND 'AWAIT'

With Promises, we were using 'catch' to handle errors. With 'async' and 'await', we can use 'try' and 'catch' blocks to handle errors.

Let's say this is the function that returns a promise:

    function getData() {
        return new Promise((resolve, reject) => {
            // Simulating an asynchronous operation
            setTimeout(() => {
                reject("Error occurred while fetching data");
            }, 1000);
        });
    }

And let's say this is our async function -

    async function foo() {
        const result = await getData();
    }

    foo();

Well, this will result in an 'UnhandledPromiseRejection' because we are not handling the rejection of the promise returned by 'getData()'.

One way to handle this is to use the 'catch' method on the promise:

    async function foo() {
        const result = await getData().catch(error => {
            console.error(error); // Handle the error
        });
    }

But, this will work only if the function that returns a promise does not throw any error outside the returned Promise. In other words, what if we had -

    function getData() {
        throw new Error("Error outside the promise");
        return new Promise((resolve, reject) => {
            // Simulating an asynchronous operation
            setTimeout(() => {
                reject("Error occurred while fetching data");
            }, 1000);
        });
    }

Here, since we are throwing an error before we return the promise, it means the 'catch' method never executes which we have attached to the promise with 'await'.

There is another issue with attaching 'catch' like above. If we have the following code -

    async function foo() {
        const result = await getData().catch(error => {
            console.error(error); // Handle the error
        });

        // Some code that should not run if there is an error
        console.log("This will run even if there is an error in getData()");
    }

In this case, if there is an error in the 'getData()' function, the code after the 'await' statement will still execute. And that's one of the reasons why using 'catch' like this is not recommended when using 'async' and 'await'.

And that's why, it is generally recommended to handle errors using 'try' and 'catch' blocks when using 'async' and 'await'.

Something like this -

    async function foo() {
        try {
            const result = await getData();
            console.log("Some code that should run only if there is no error");
        } catch (error) {
            console.error(error); // Handle the error
        }
    }

    foo();

In the above code, if there is an error in the 'getData()' function, the code inside the 'catch' block will execute and the code after the 'await' statement will not execute.

Another benefit of this is that we are separating the success and error handling code, which makes it easier to read and maintain.

# TOP LEVEL AWAIT

We can actually use 'await' keyword without an 'async' function in the top-level code of a module. This is called "top-level await".

For example -

    const colors = fetch("../data/colors.json").then((response) => response.json());

    export default await colors;

In this case, any modules that include the above module will wait for the fetch to resolve before executing the rest of the code.

This is particularly useful when we want to load some data before executing the rest of the code in a module. Or you want to dynamically import a module.

    const module = await import('./someModule.js');
    module.run();

Using dynamic imports with 'await' allows us to load modules only when we need them, which can help reduce the initial load time of our application.

And well, those were the basics of 'async' and 'await' in JavaScript.