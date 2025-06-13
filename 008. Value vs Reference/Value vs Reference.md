So far, one thing that we have talked about is that in Javascript, everything is an object.

And we saw this in the Inheritance section where we saw that the final prototype for everything in the prototype chain was the Object prototype.

But, there is one thing that we have not talked about yet and that's the "Primitives" in Javascript. There are actually two types of values in Javascript. There are "Objects" which we have been dealing with so far, and there are "Primitives" which are the basic building blocks of data in Javascript.

When we say "Primitives", we are talking about the following types of values:

    - string
    - number
    - boolean
    - null
    - undefined
    - symbol
    - bigint

When we say "Objects", we are talking about everything else that is not a primitive value. This includes arrays, functions, and any other object that you create. 

There is a big difference between these two types and that difference is in how they are stored in memory and how they are passed around in your code.

To understand this, let's say we have - 

    const a = 1;
    const b = 2;

What if we compare them - 

    a === b; // false

Of course, they are not equal. What if we do -

    const a = 1;
    const b = 1;
    a === b; // true

Yep, they are equal.

So, this means, if we have - 

    const a = [1];
    const b = [1];
    a === b;

This should also give us "true", right? Because both of them have the same value. But, if you check this, you will see that it gives you "false".

And that's a really important thing to understand about how Javascript works. 

# STACK VS HEAP IN JAVASCRIPT

In Javascript, there are two types of memory where values are stored - the "stack" and the "heap".

The 'stack' is used for static memory allocation, which means that the size of the data is known at compile time. This is where primitive values are stored. When you create a primitive value, it is stored directly in the stack.

The heap is for dynamic memory allocation, which means that the size of the data can change at runtime. This is where objects are stored. When you create an object, it is stored in the heap. But, Javascript will also store the reference to that object in the stack. By reference, we mean that the memory address of the object.

So, if we have let's say these variables -

    const name = 'John';
    const age = 23;
    const person = {
        name: name,
        age: age
    };

Here, 'name' and 'age' have primitive values, so they are stored in the stack. So, we can say stack now looks like -

    +-----------------+
    | name = 'John' |
    +-----------------+
    | age = 23 |
    +-----------------+

Now, it's time for the 'person' object. Since it is not a primitive value, it is stored in the heap. So, the heap looks like -

    +-----------------+
    | {               |
        name: 'John'  |
    |   age: 23       |
    |  }              |
    +-----------------+

Let's say that this object is stored at a memory address or "xyz". So, the stack will now look like this -

    +-----------------+
    | name = 'John'   |
    +-----------------+
    | age = 23        |
    +-----------------+
    | person = xyz    |
    +-----------------+

This is the important part. We see that 'person' does not store the object directly. Instead, it has the memory address of the object in the heap.

# COPY BY VALUE VS COPY BY REFERENCE

Now comes the fun part. Let's say we do -

    const a = 10;
    const b = a;

What is happening here?

We create a new variable 'b' that is equal to 'a'. All good so far. 

So, what if we change the value of 'b' to 20?

    const a = 10;
    const b = a;
    b = 20; 

Now, since 'b' is equal to 'a', does it mean that 'a' is also now changed? Well, no! That's not how it works. Since we are dealing with 'primitives', Javascript will copy the value of 'a' into 'b'. This means even if we do b = a, 'a' has a different '10' and 'b' has a different '10'.

That's why, if we do -

    b = 20;

This simply updates 'b'. It has nothing to do with 'a'. So, if we check the values of 'a' and 'b', we will see that 'a' is still 10 and 'b' is now 20.

This is called "copy by value". Changes to one variable do not affect the other. And this applies to all the primitive types in Javascript.

When we talk about 'objects', however, things are different. As we already saw above, objects are stored in the heap and the stack only has a reference to that object. So, let's say we have -

    const a = [1];
    const b = a;

    b.push(2);

What is happening here? Well, initially, we create a new array and since it is an 'object' type it is stored in the heap. Then, the variable 'a' simply has the memory address of that array in the heap.

When we create a new variable 'b' and assign it the value of 'a', we are not copying the array. Instead, we are copying the reference to that array. This basically means, after above, the stack looks like this -

    +-----------------+
    | a = xyz         |
    +-----------------+
    | b = xyz         |
    +-----------------+

Where 'xyz' is the memory address of the array in the heap. So, both 'a' and 'b' are pointing to the same array in the heap.

And this means, if we change the array by doing something like -

    b.push(2);

This will actually change the array in the heap. So, if we check the value of 'a' and 'b', we will see that both of them now have the value [1, 2].

This is called "copy by reference". It means the memory address (reference) of the object is copied, not the object itself.

This applies to all the non-primitive types in Javascript, which includes arrays, functions, and any other object that you create.

We can also say that in case of 'objects', the 'reference' is copied by value. In simpler words, JavaScript does 'copy by value' for both primitives and objects, but the value being copied is different. For primitives, the value itself is copied, while for objects, the reference to the object is copied.

# PASS BY VALUE VS PASS BY REFERENCE

Just like the copying of values, the same thing applies when we pass values to functions. As we know, functions can take parameters and we can pass values to them. But, how does this work with primitives and objects?

Let's say we have this code - 

    let a = 10;

    function foo(a) {
        a = 30;
    }

What will happen when we write -

    foo(a);

As we can see, inside the function, we are changing the value of "a". But, remember that 'a' has a 'primitive' value. And when we deal with 'primitives', we are dealing with "copy by value". 

This means, the value 'a' that is passed to the function is the copy of the original value. And so, changing it inside the function will not affect the original value of 'a' outside the function. So, even after the execution of the function, the value of 'a' outside the function will still be 10.

This is called "pass by value". When you pass a primitive to a function, JavaScript passes a copy of the value. Changes made to the parameter inside the function do not affect the original variable.

When it comes to objects, however, things are different. Let's say we have this code - 

    const obj = { name: 'John' };

    function foo(obj) {
        obj.name = 'Doe';
    }

What will happen when we write -    

    foo(obj);

Here, we are passing an object to the function. And since objects are stored in the heap and we are dealing with "copy by reference", what happens is that the reference to the object is passed to the function.

This means, inside the function, we are changing the original object. So, when we do obj.name = 'Doe', we are actually changing the original object.

This is called "pass by reference". When you pass an object (or array/function), JavaScript still passes by value, but that value is the reference (memory address) to the object. So the function gets access to the same object in memory, and changes do affect the original object.

While it is not related to the topic of "Value vs Reference", it is worth mentioning that in functional programming, what we did above is called a side effect. A side effect is when a function modifies some state outside its local environment. In this case, the function 'foo' modifies the 'obj' object that was passed to it. This is not done in functional programming, where functions are expected to be pure and not modify any external state. Anyways, that is a topic for another day.

But, it is worth mentioning that if we reassign the object inside the function - 

    const obj = { name: 'John' };

    function foo(obj) {
        obj = { name: 'Doe' };
    }

    foo(obj);

This will not change the original object. The original object still has the name as 'John'. 

This is because inside the function, we are reassigning the parameter 'obj' to a new object. This does not affect the original obj outside the function. All we did was changed the reference of the parameter 'obj' so it now points to a new object in the heap. 