Declarative and Imperative are the two different ways in which we write and think about the code.

In very simple terms - 

    1. Declarative programming is about 'what' you want.
    2. Imperative programming is about 'how' you want it.

This means, in 'Declarative programming', we just care about the final result. We do not care about how it is achieved. We just declare what we want.

On the other hand, in 'Imperative programming', we care about the steps and procedures to achieve the result. We write down the instructions that tell the computer how to do something.

Let's see some examples to understand the difference better.

## EXAMPLE #1

Let's take a simple example in which we manipulate a list of numbers.

Let's say we have a list of numbers and we want to double them.

    const array = [1, 2, 3, 4, 5];

First, let's see the 'Imperative' way of doing this. This means, we will manually iterate over the entire array, take each element, double it, and then push it to a new array.

    const array = [1, 2, 3, 4, 5];
    const doubledArray = [];

    for (let i = 0; i < array.length; i++) {
        doubledArray.push(array[i] * 2);
    }

This is an imperative way of doing it because we are explicitly telling the computer how to double each number in the array.

So, how do we do it in a declarative way? Well, we can use the 'map' method to do this. Because in 'map', all we do is tell JavaScript what is the data and what operation to perform on each element of the data. We do not care how that operation is done. We just care about the final result.

    const array = [1, 2, 3, 4, 5];
    const doubledArray = array.map(num => num * 2);

## EXAMPLE #2

Now, let's take an example of 'DOM Manipulation'.

Let's create a new button element, add it to the DOM, and also attach a 'click' event listener to it.

First, let's do it in an 'Imperative' way:

    const button = document.createElement('button');

    button.innerText = 'Click Me';

    button.addEventListener('click', () => {
        alert('Button Clicked!');
    });

    document.body.appendChild(button);


So, here, we are telling the browser step by step how to create a button, set its text, add an event listener, and finally append it to the body of the document.

What if we want to make it declarative? Well, we simply define the button element in the HTML.

    <button onclick="alert('Button Clicked!')">Click Me</button>

In this case, we are not writing any JavaScript code to create the button or add an event listener. We are just declaring what we want in the HTML, and the browser takes care of the rest.

Yes, HTML is a declarative language. It allows us to describe the structure and content of the web page without specifying how to create or manipulate those elements programmatically.

Even in some framework like Angular, we can write declarative code to create components and handle events without explicitly writing the imperative code. For example, in Angular, we can write -

    <button (click)="onButtonClick()">Click Me</button>

Here, we are not writing the imperative code to create the button or add an event listener. We are just declaring what we want, and Angular takes care of the rest.

## EXAMPLE #3

Let's take another example of 'DOM Manipulation' where we will create an unordered list and add some list items to it.

First, let's see the 'Imperative' way of doing this:

    const ul = document.createElement('ul');

    const items = ['Item 1', 'Item 2', 'Item 3'];

    for (let i = 0; i < items.length; i++) {
        const li = document.createElement('li');
        li.innerText = items[i];
        ul.appendChild(li);
    }

    document.body.appendChild(ul);

We can write it in a declarative way using HTML:

    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>

Or, like this in JavaScript -

    const items = ['Item 1', 'Item 2', 'Item 3'];
    const ul = `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;

    document.body.innerHTML += ul;

## EXAMPLE #4

Let's say we have a button in the HTML and then we want to add a click listener to it so that when we click it, a new paragraph element is created and added to the DOM.

Here is the imperative way of doing it:

    const button = document.querySelector('#button');

    button.addEventListener('click', () => {
        const p = document.createElement('p');
        p.innerText = 'This is a new paragraph!';
        document.body.appendChild(p);
    });

We can do it in a declarative way using HTML and a framework like Angular -

    <button (click)="showParagraph()">Click Me</button>
    <p *ngIf="showParagraph">This is a new paragraph!</p>

And in the component's template we can have -

    showParagraph() {
        this.showParagraph = true;
    }

## EXAMPLE #5

Let's now take an example of CSS.

Is CSS declarative or imperative?

We can have a code like this in our JS file -

    const div = document.querySelector('#myDiv');
    div.style.backgroundColor = 'red';
    div.style.width = '100px';
    div.style.height = '100px';

This is imperative because we are telling the browser how to find the element and then how to apply the styles programmatically. We are specifying each step to achieve the final result.

But, using CSS, we can simply do -

    #myDiv {
        background-color: red;
        width: 100px;
        height: 100px;
    }

So here, the CSS is declarative because we are just declaring the styles we want for the element without specifying how to apply those styles programmatically. We are not telling the browser how to find the element and then how to apply the styles. We are just declaring what styles we want for the element.

# BENEFITS OF DECLARATIVE PROGRAMMING

So, after looking at all these examples, what even is the benefit of using declarative programming?

## 1. READABILITY

Of course one of the biggest benefits is that it is more readable and easier to understand. When we write declarative code, we focus on the 'what' rather than the 'how', which makes the code cleaner and more concise.

Take the 'map' method we saw above. It is much more readable than the imperative way of doing it. We can easily understand that we are mapping over the array and doubling each number.

So, in 'Declarative Programming', the code looks closer to natural language or the business logic itself, making it easier to read and maintain.

## 2. BETTER ABSTRACTION & REUSABILITY

Declarative programming allows us to abstract away the implementation details and focus on the high-level logic. This leads to better abstraction and reusability of code.

Coming back to the 'map' example, we do not need to know how the 'map' method works internally. We just need to know that it takes an array and applies a function to each element, returning a new array. This allows us to reuse the 'map' method in different parts of our code without worrying about its implementation.

And it is not just limited to JavaScript. For example, in SQL, we can write a query like this:

    SELECT * FROM users WHERE age > 18;

Here, we are declaring what we want to retrieve from the database without specifying how the database should execute the query. The database engine takes care of the implementation details.

## 3. ENCOURAGES FUNCTIONAL PROGRAMMING PRINCIPLES

In one of the sections earlier, we learnt about 'Functional Programming'. Declarative programming encourages the use of functional programming principles, such as immutability and pure functions.

And all of this leads to a more predictable code that is also easier to test and debug.

## 4. MORE DECLARATIVE = BETTER OPTIMIZATION

When we write declarative code, it allows the underlying system or framework to optimize the execution. Since we are not specifying how to achieve the result, the system can choose the best way to do it based on its own optimizations.

For example, in Angular or React, when we write declarative code to create components or handle events, the framework can optimize the rendering and updates based on its own algorithms. This can lead to better performance and efficiency.

# BENEFITS OF IMPERATIVE PROGRAMMING

Of course it does not mean that imperative programming is bad or should not be used. It has its own benefits and use cases.

## 1. FINE-GRAINED CONTROL

The biggest benefit is that you directly control the flow of execution and can optimize the performance for specific use cases. You can write code that is tailored to your specific needs and requirements.

If you want to manage how things happen step by step, imperative programming gives you that control. You can write code that is optimized for performance and efficiency based on your specific use case.

For example, maybe you have some loop and you want to optimize it for performance. In that case, you can write the loop in an imperative way to control how it executes and optimize it for your specific needs.

## 2. NO NEED TO LEARN ABSTRACTIONS OR FRAMEWORKS

Imperative programming does not require you to learn any abstractions or frameworks. You can write code in a straightforward way without relying on any libraries or frameworks.

This can be particularly beneficial for beginners who are just starting to learn programming concepts. They can focus on the basics of coding without getting overwhelmed by additional layers of complexity introduced by frameworks or abstractions.

## 3. BETTER FOR MUTABLE STATE or SIDE EFFECTS

Sometimes, you need to work with mutable state or side effects (for example, logging, modifying a file, making network calls etc), and imperative programming allows you to do that easily. You can directly manipulate variables and objects without worrying about immutability or pure functions.



