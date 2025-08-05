Defensive Programming is a mindset and set of practices that aim to ensure a program continues to function under unforeseen circumstances. It involves anticipating potential errors and handling them gracefully, rather than allowing the program to crash or behave unpredictably.

Imagine scenarios like when a user inputs unexpected data, or a network request fails. Defensive programming helps you write code that can handle such situations without breaking.

# 1. FAIL FAST

Let's say we have a function like this -

    function getUser(id) {
        // Log access
        // Check cache
        // Send Analytics
        // Finally, fetch the user
        // return fetch(`/users/${id}`);
    }

Since we are using JavaScript here, if we call this function without an 'id', there won't be any error shown in your IDE. This is because JavaScript is a dynamically typed language, meaning it doesn't enforce types at compile time.

So, we can call it like -

    getUser();

But the issue with this is, if we try to use the 'id' inside the function, it will be undefined, and that can lead to unexpected behavior or errors later in the code.

We know that if 'id' does not exist, we cannot do any of the work we are supposed to do in the function. 

And here, we can use the "fail fast" principle.

Fail Fast is a principle in software development where a system is designed to immediately report any condition that is likely to lead to failure, rather than allowing the system to continue in an erroneous or unstable state.

So, we can simply check if 'id' is provided, and if not, we can throw an error immediately.

    function getUser(id) {
        if (!id) {
            throw new Error("ID is required to fetch user");
        }
        // Log access
        // Check cache
        // Send Analytics
        // Finally, fetch the user
        // return fetch(`/users/${id}`);
    }

The benefit of this approach is that it allows us to catch errors early in the development process, making it easier to debug and fix issues. It also helps us to write more robust and reliable code.

# 2. CHECK FOR TYPES (NOT JUST TRUTHY)

What does that mean?

Let's say we have a function that returns te length of a string.

    function getStringLength(str) {
        return str.length;
    }

We can follow the 'fail-fast' principle here as well, right? Let's add a check for 'str' then -

    function getStringLength(str) {
        if (!str) {
            throw new Error("String is required");
        }
        return str.length;
    }

Cool! Now, if we call this function without a string, it will throw an error.

    getStringLength(); // Error: String is required

That's it, right? Well, not really.

What if we call this function with a number?

    getStringLength(123); // undefined

So, this time, there was no error thrown by our check, and we get 'undefined' as the output.

That's because our check only checks if 'str' is truthy. In JavaScript, 0, false, null, undefined, and an empty string are all considered falsy values. Everything else is considered truthy. But in our method, we are expecting 'str' to be a string, and if it is not, we should throw an error.

And that's why we should check for types, not just truthy values.

Since we specifically want 'str' to be a string, we can use the 'typeof' operator to check if it is a string.

    function getStringLength(str) {
        if (typeof str !== 'string') {
            throw new Error("str must be a string");
        }
        return str.length;
    }

# 3. SANITIZE AND VALIDATE

Let's say we have a function that takes the age as input which is a string and then converts it to a number.

    function parseAge(age) {
        return Number(age);
    }

So, if we call this function with a string that contains a number, it will work fine.

    parseAge("25"); // 25

But, what if we call it with a string that does not contain a number?

    parseAge("asdasd"); // NaN

Or, what if we call it with a string that contains a negative number?

    parseAge("-25"); // -25

Of course, age cannot be negative, and we should not allow that.

Remember that here, we are not passing different types of data, we are passing the same type of data (string), but with different values. And that's why we should validate those values.

So, before we return the number, we can check if the value is a valid age.

    function parseAge(age) {
        const parsedAge = Number(age);
        if (isNaN(parsedAge) || parsedAge < 0) {
            throw new Error("Invalid age");
        }
        return parsedAge;
    }

And this is what sanitizing and validating means.

# 4. USE DEFAULTS

Sometimes, we might want to provide a default value for a parameter if it is not provided. This can help us avoid errors and make our code more robust.

For example, let's say we have a function to greet a user -

    function greet(name) {
        return `Hello, ${name.toUpperCase()}!`;
    }

What if we call it without passing a name?

    greet(); // Error: Cannot read properties of undefined (reading 'toUpperCase')

Well, it will result in a runtime error because we are trying to call 'toUpperCase()' on 'undefined'.

To avoid this, we can provide a default value for 'name' if it is not provided.

    function greet(name = 'Guest') {
        return `Hello, ${name.toUpperCase()}!`;
    }

So here, we are providing a default value for 'name' as 'Guest'. This means that if we call the function without any arguments, it will use 'Guest' as the default value.

    greet(); // Hello, GUEST!

# 5. GUARD AGAINST STRUCTURE CHANGES

Let's say we have a function that takes an object as input and returns one of its nested properties.

    function getUserAddress(user) {
        return user.address.city;
    }

It means, if we have an object like this -

    const user = {
        name: "John",
        address: {
            city: "New York",
            state: "NY"
        }
    };

Then, we can call the function like this -

    getUserAddress(user); // "New York"

But, what if the structure of the object changes? For example, if the 'address' property is removed or renamed?

    const user = {
        name: "John",
        location: {
            city: "New York",
            state: "NY"
        }
    };

Well, now, we will get -

    TypeError: Cannot read properties of undefined (reading 'city')

Our function is still trying to access the 'city' property of 'address', but 'address' is no longer a property of the 'user' object.

We can use something called optional chaining to guard against such structure changes.

Optional chaining allows us to safely access deeply nested properties without having to check if each property in the chain exists.

We can use it like this -

    function getUserAddress(user) {
        return user?.address?.city || "Address not found";
    }

So, here, we are using the optional chaining operator (?.) to safely access the 'address' and 'city' properties. If either of them is undefined, we will get 'undefined' instead of an error. And we can also provide a default value if the address is not found.

# 6. AVOID SIDE EFFECTS

Let's say we have an array -    

    const numbers = [1, 2, 3, 4, 5];

And now, we create two new variables and b that are the same as the original array.

    const a = numbers;
    const b = numbers;

Let's say we have a method that adds a new number to the array -

    function addNumber(arr, num) {
        arr.push(num);
        return arr;
    }

We want to add an item to the array 'b' -

    const newB = addNumber(b, 6); // [1, 2, 3, 4, 5, 6]

Well, if we print the arrays now, we will see that both 'a' and 'b' have the new number added to them. In fact, the original array 'numbers' also has the new number added to it.

    console.log(numbers); // [1, 2, 3, 4, 5, 6]
    console.log(a); // [1, 2, 3, 4, 5, 6]
    console.log(b); // [1, 2, 3, 4, 5, 6]

But, we wanted to add the number only to 'b', not to 'a' or 'numbers'. That's called a side effect. A side effect is when a function or method modifies something outside its scope, which can lead to unexpected behavior.

Remember immutability & functional programming? In functional programming, we avoid side effects by creating pure functions that do not modify any external state. And that's what we should do here as well - 

    function addNumber(arr, num) {
        return [...arr, num];
    }

Now, instead of modifying the original array, we are returning a new array with the new number added to it. So, if we call the function like this -

    const newB = addNumber(b, 6);

Then, 'b' will remain unchanged, and 'newB' will be a new array with the new number added to it. And just like 'b', 'a' and 'numbers' will also remain unchanged.

    console.log(numbers); // [1, 2, 3, 4, 5]
    console.log(a); // [1, 2, 3, 4, 5]
    console.log(b); // [1, 2, 3, 4, 5]
    console.log(newB); // [1, 2, 3, 4, 5, 6]

By avoiding side effects, we can write more predictable and maintainable code.

# 7. LOCK DOWN YOUR PRECIOUS

If something should never change, then we should make sure it can never change.

Let's say there is some configuration object that holds some important settings for our application.

    const config = {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3
    };

Right now, anyone can change the properties of this object, which can lead to unexpected behavior in our application. If someone writes - 

    config.apiUrl = "https://malicious.example.com";

This will change the API URL to a malicious one, which can lead to security vulnerabilities.

What if we want to make sure that this object cannot be modified? We can use Object.freeze() to lock down the object.

    const config = Object.freeze({
        apiUrl: "https://api.example.com",
        timeout: 5000,
        retries: 3
    });

Now, if someone tries to change the properties of this object, it will throw an error in strict mode.

    config.apiUrl = "https://malicious.example.com"; // TypeError: Cannot assign to read only property 'apiUrl' of object '#<Object>'

But do note that Object.freeze() only makes the object itself immutable. If the object has nested objects, those nested objects can still be modified. To make sure everything is locked down, we can use a deep freeze function - 

    function deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((prop) => {
            if (obj[prop] !== null && typeof obj[prop] === 'object') {
                deepFreeze(obj[prop]);
            }
        });
        return obj;
    }

# 8. WRAP DANGEROUS CODE

What is dangerous code?

Dangerous code is any code that can potentially cause harm to the system, such as modifying global state, performing file operations, or executing external commands.

Let's have a simple function that parses a JSON string and returns the parsed object.

    function parseJson(jsonString) {
        return JSON.parse(jsonString);
    }

If we call this function with a valid JSON string, it will work fine.

But, what if we call it with a string that is not valid JSON?

    parseJson("Hellooooo"); // SyntaxError: Unexpected token 'H', "Hellooooo" is not valid JSON

Well, this will throw an error, and our application will crash if we don't handle it properly.

A better way is to wrap this in a try-catch block to handle the error gracefully.

    function parseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            return null; // or some default value
        }
    }

The try-catch blocks are a good examples of 'containment strategy' in software development. The idea is to isolate potentially dangerous code in a controlled environment, so that if it fails, it does not affect the rest of the application.

So, in the above example, if the JSON parsing fails, we catch the error and log it, but we don't let it crash the application. Instead, we return null or some default value, allowing the application to continue running smoothly.

# 9. ENUMERATE THE EXPECTED

When writing code, it's important to consider all the possible inputs and scenarios that can occur.

Let's say we have a function that takes a 'status' as input and then updated the UI -

    function handleStatus(status) {
        updateUI(status);
    }

Let's say our UI is supposed to handle three statuses - 'loading', 'success', and 'error'. But what if we call the function with a status that is not one of these three?

    handleStatus("unknown"); // The UI might not know how to handle this status

To avoid this, we can enumerate the expected statuses and handle them accordingly.

We can use a switch statement to handle each status separately.

    function handleStatus(status) {
        switch (status) {
            case 'loading':
            case 'success':
            case 'error':
                updateUI(status);
                break;
            default:
                throw new Error(`Unexpected status: ${status}`);
        }
    }

Now, if we call the function with a status that is not one of the expected ones, it will throw an error.

    handleStatus("unknown"); // Error: Unexpected status: unknown

And well, those were a few defensive programming techniques that can help you write more robust and reliable code. Remember, the goal of defensive programming is to anticipate potential issues and handle them gracefully, ensuring that your application continues to function correctly even in unexpected situations.

The above techniques are not the only ones, and there are many more that you can explore. The key is to always think about the possible edge cases and how your code can handle them.