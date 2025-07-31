Immutability basically means once a value is created, it cannot be changed.

In JavaScript, immutability is not achieved by default. There is no built-in immutable data structure like in some other languages.

However, there are techniques and libraries that can help you work with immutable data structures.

First thing first, it is important to note that the 'Primitive' data types in JavaScript (like numbers, strings, booleans, null, undefined, and symbols) are immutable. This means that when you change a primitive value, you are actually creating a new value rather than modifying the existing one.

Immutability is something we talk in context of 'Non-Primitive' data types like Objects and Arrays. When you modify an object or an array, you are changing the original value, which is mutable.

For example -

    const obj = { name: 'John' };

Even though 'obj' is a constant, you can still change its properties - 

    obj.name = 'Doe'; // This is allowed, obj is mutable

In fact, you can even add new properties to it - 

    obj.age = 30; // This is also allowed, obj is still mutable

The only thing you cannot do here is reassign the variable 'obj' to a new object - 

    obj = { name: 'Jane' }; // This will throw an error, obj is a constant

The reason why we are able to change properties of an object is that the object itself is a reference type. The variable 'obj' holds a reference to the object in memory, and when we change its properties, we are modifying the object at that reference. We are not changing the reference itself.

But this can cause issues in applications because remember that Objects and Arrays are passed by reference in JavaScript. This means that if you pass an object or an array to a function, and that function modifies it, the original object or array will be changed as well. And that can cause side effects that are hard to track down.

Take this code snippet as an example:

    const a = { name: 'Alice' };
    const b = a; // b is a reference to the same object as a

    b.name = 'Bob'; // This modifies the object that both a and b reference

And the same thing is true for arrays:

    const arr1 = [1, 2, 3];
    const arr2 = arr1; // arr2 is a reference to the same array as arr1

    arr2.push(4); // This modifies the array that both arr1 and arr2 reference

So, what can we do?

# VARIOUS TECHNIQUES TO ACHIEVE IMMUTABILITY

## SPREAD OPERATOR

What if instead of modifying the original object or array, we create a new one with the changes applied?

The simplest way to achieve this in JavaScript is to use the spread operator. 

So, we can do -

    const obj = { name: 'John' };
    const newObj = { ...obj }; // Creates a new object with the same properties

    newObj.name = 'Doe'; // This modifies the new object, not the original

So, instead of referencing the same object, we create a new object with the same properties. This way, the original object remains unchanged.

Remember that we are not stopping any changes to occur, we are just creating a new object with the changes applied.

We can use a spread operator with arrays as well:

    const arr1 = [1, 2, 3];
    const arr2 = [...arr1]; // Creates a new array with the same elements

    arr2.push(4); // This modifies the new array, not the original

## OBJECT.ASSIGN

There is also a method named 'Object.assign()' that can be used to achieve immutability.

This is the syntax -

    Object.assign(target, ...sources)

So, we provide it with a target object and one or more source objects. The properties from the source objects are copied to the target object, and the target object is returned.

So, we can use it in the same way as the spread operator:

    const obj = { name: 'John' };
    const newObj = Object.assign({}, obj); // Creates a new object with the same properties

    newObj.name = 'Doe'; // This modifies the new object, not the original

## OBJECT.FREEZE

There is also a method named 'Object.freeze()' that can be used to make an object immutable. When an object is frozen, it cannot be modified in any way (i.e., no new properties can be added, existing properties cannot be removed or changed).

Here's an example:

    const obj = { name: 'John' };
    Object.freeze(obj);

    obj.name = 'Doe'; // This will not have any effect
    console.log(obj.name); // John

But, this comes with a caveat. 'Object.freeze()' only makes the top-level properties of the object immutable. If the object contains nested objects or arrays, those nested structures can still be modified.

    const obj = { name: 'John', address: { city: 'New York' } };
    Object.freeze(obj);

    obj.address.city = 'Los Angeles'; // This will modify the nested object
    console.log(obj.address.city); // Los Angeles

## SHALLOW VS DEEP CLONING

It is important to note that both the spread operator and 'Object.assign()' perform a shallow copy of the object or array. This means that if the object or array contains nested objects or arrays, those nested structures will still be mutable.

For example -

    const obj = { name: 'John', address: { city: 'New York' } };
    const newObj = { ...obj };

Here, even though 'newObj' is a new object, the 'address' property is still a reference to the same object as in 'obj'. If we do -

    newObj.address.city = 'Los Angeles';

This will also modify 'obj.address.city'. And that's because the spread operator only creates a shallow copy of the object. 

This is the case with 'Object.assign()' as well.

What can we do? Well, we can use a technique called 'deep cloning' to create a new object or array with all nested structures also copied.

One way to deep clone is to manually copy each nested structure, but that can be tedious and error-prone. We can use recursion to achieve this, but it can be complex and not very efficient. Something like this -

    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;

        if (Array.isArray(obj)) {
            return obj.map(deepClone);
        }

        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key]);
            }
        }
        return result;
    }

While this will work for plain objects and arrays, it can become cumbersome for more complex structures. For example, if there are Dates, Maps, Sets, or circular references, this method will not work as expected.

There are helper libraries like 'lodash' that provide a method called 'cloneDeep()' which can be used to deep clone an object or array.

There is also a more modern way to deep clone objects or arrays in Javascript and that is using the 'structuredClone()' method. This method creates a deep clone of the object, including all nested structures. So, we do not have to manually copy each nested structure -

    const obj = { name: 'John', address: { city: 'New York' } };
    const deepClone = structuredClone(obj);

    deepClone.address.city = 'Los Angeles';

Now, even though we modified 'deepClone.address.city', the original 'obj.address.city' remains unchanged.

Another way which you will see in a lot of codebases is to use the 'JSON.parse(JSON.stringify())' method to deep clone an object or array. This works by converting the object to a JSON string and then parsing it back to an object.

However, this method has limitations, such as not being able to handle functions, undefined values, Maps, Sets, Dates, Symbols, or circular references. In short, if you have a complex object, don't use this method for deep cloning.

    const obj = { name: 'John', address: { city: 'New York' } };
    const deepClone = JSON.parse(JSON.stringify(obj));

    deepClone.address.city = 'Los Angeles';

    console.log(obj.address.city); // 'New York'
    console.log(deepClone.address.city); // 'Los Angeles'

# BENEFITS OF IMMUTABILITY

The biggest benefit is of course fewer bugs. When we work with immutable data, we can be sure that our changes won't inadvertently affect other parts of the code. This makes it easier to reason about our code and reduces the likelihood of introducing bugs.

Our code is also more predictable. When we create a new object or array with the changes applied, we can be sure that the original object or array remains unchanged.

In frameworks like React or Angular, immutability is a key concept. It allows these frameworks to optimize rendering and improve performance by detecting changes more efficiently. When the data is immutable, the framework can easily determine if a component needs to be re-rendered or not.

Finally, immutability encourages pure functions and functional programming principles. Pure functions are functions that always return the same output for the same input and do not have side effects.

# TRADE-OFFS OF IMMUTABILITY

While immutability has many benefits, it also comes with trade-offs. One of the main trade-offs is performance. Creating new objects or arrays instead of modifying existing ones can lead to increased memory usage and slower performance, especially for large data structures.

Another trade-off is complexity. Working with immutable data can require a different mindset and may involve more boilerplate code. Developers need to be aware of how to properly create and manage immutable data structures, which can add to the learning curve.

Finally, immutability can make certain operations more cumbersome. For example, if we need to update a deeply nested property, we may need to create multiple copies of the object along the way, which can be tedious and error-prone.

Despite these trade-offs, the benefits of immutability often outweigh the downsides, especially in large and complex applications.