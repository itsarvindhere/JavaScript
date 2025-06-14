document.body.setAttribute("class", "dark");
document.body.style.padding = "20px";

// const input = document.createElement('input');
// input.placeholder = 'Enter a task';

// const button = document.createElement('button');
// button.textContent = 'Add';

// document.body.appendChild(input);
// document.body.appendChild(button);

// button.addEventListener('click', () => {
//   const div = document.createElement('div');
//   div.textContent = input.value;
//   document.body.appendChild(div);
//   input.value = '';
// });

// SEMANTIC HTML

const form = document.createElement("form");
document.body.appendChild(form);

const input = document.createElement("input");
input.placeholder = "Enter a task";
input.name = "task";

input.style.padding = "10px";
input.style.border = "1px solid #ccc";
input.style.borderRadius = "5px";
input.style.marginRight = "10px";

form.appendChild(input);

const button = document.createElement("button");
button.textContent = "Add";

button.style.padding = "10px 20px";
button.style.backgroundColor = "#007bff";
button.style.color = "#fff";
button.style.border = "none";
button.style.borderRadius = "5px";
button.style.cursor = "pointer";

form.appendChild(button);

const ul = document.createElement("ul");
ul.style.listStyleType = "none";
ul.style.width = "max-content";
ul.style.padding = "0";

form.appendChild(ul);

const removeElement = (el) => el.remove();

form.onsubmit = (event) => {
  event.preventDefault();
  const li = document.createElement("li");
  li.textContent = input.value;
  li.onclick = removeElement.bind(null, li);

  li.style.backgroundColor = "#f8f9fa";
  li.style.padding = "10px";
  li.style.marginBottom = "5px";
  li.style.borderRadius = "5px";
  li.style.cursor = "pointer";

  li.onmouseover = () => (li.style.backgroundColor = "#e9ecef");
  li.onmouseout = () => (li.style.backgroundColor = "#f8f9fa");

  ul.appendChild(li);

  input.value = "";
};