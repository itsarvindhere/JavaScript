In Javascript, we can create a function that returns an object. This function is called a 'factory function'.

The reason we call it a 'factory' function is because it 'creates' and 'returns' an object, similar to how a factory creates and returns products.

But wait, cannot we just create an object directly? 

Maybe like - 

    const object1 = {...}

Yes, we can!

But what if we want to create multiple objects that have the same structure but differ only in some values?

Do we go and manually create each object like -

    const object1 = {...}
    const object2 = {...}
    const object3 = {...}
    const object4 = {...}
    const object5 = {...}

Of course not!

That's where we can use a factory function.

Let's take a very simple example where we want create some objects that represent some people and each object has a "talk" function which will return a string with the name of that person.

Let's create one object "me" -

    const me = {
        name: 'Arvind',
        talk() {
            return `My name is ${this.name}!`
        }
    }

Let's also create another object "ben" -

    const ben = {
        name: 'Ben',
        talk() {
            return `My name is ${this.name}!`
        }
    }

Maybe also an object named "john" -

    const john = {
        name: 'John',
        talk() {
            return `My name is ${this.name}!`
        }
    }

See the problem here? We are repeating ourselves a lot!

There are two issues now. First is of course the fact that we are repeating ourselves a lot. The second issue is that we do not want someone to change the name of the person in the object. So we want to ensure that "name" is set only once and cannot be changed later.

At this point, we can do -

    me.name = "Some new Name"

The fact that the "name" property is allowed to be overwritten is a problem. In real-world applications, we may want to ensure that some specific properties of an object are not changed after they are created.

In simpler words, if we want truly private properties in an object, we can use factory functions. It is not easy to have 'truly' private properties with constructor functions.

Let's create one. The "factory functions" are just plain javascript functions that return an object. There is no special syntax or anything. We can create a factory function like this -

    function createPerson(name) {
        return {
            name,
            talk() {
                return `My name is ${this.name}!`
            }
        }
    }

Now, we have a function named "createPerson" which takes the name as an argument and returns an object with the name and a talk function.

We can now create as many objects as we want using this function. 

Let's create the same three objects again -

    const me = createPerson('Arvind');
    const ben = createPerson('Ben');
    const john = createPerson('John');

See how many lines of code we saved?

We can now create as many objects as we want using this function.

And we are not limited to just one argument. We can add as many arguments as we want to the factory function and create objects with different properties.

But still, the issue is that the "name" property is still not private. We can still change it like this -

    me.name = "Some new Name"

The reason is that we are returning the "name" property as a normal property of the object. So it is not private. What we can instead do is this -

    function createPerson(name) {
        return {
            talk() {
                return `My name is ${name}!`
            }
        }
    }

Notice how we are not using "this" keyword here to access the name property. We are using the "name" variable directly.

So, now, even if we write -

    me.name = "Some new Name"

This won't change the behavior of the "talk" function. The "name" variable will always be the same as the one that was passed to the factory function.

So we can say that the "name" property is truly private now.

Let's take another example of a factory function that returns a counter object which has increment and decrement methods.

    function createCounter() {
        let count = 0; // private variable

        return {
            increment() {
                count++;
                console.log(count);
            },

            getCount() {
                return count;
            }
        };
    }

So here, the function returns an object with two methods - 'increment' and 'getCount'. The count variable is private and cannot be accessed from outside the function. We can only read it through the methods of the object. We cannot change it directly.

So, the bottom-line is that whenever you want encapsulation or truly private variables then factory functions are the way to go. They are simple and easy to use as we do not need the "new" keyword when using them. They are just plain functions that return an object. So, we can use them in any way we want. We can pass them as arguments to other functions, return them from other functions, etc.