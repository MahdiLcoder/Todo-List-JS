function addTodo() {
  let todoText = input.value;

  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerText = todoText;
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      saveTodos();
    });
    todoEl.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      todoEl.remove();
      saveTodos();
    });
    ul.appendChild(todoEl);
    input.value = "";
    saveTodos();
  }
}

function saveTodos() {
  const todos = [];
  const todoEls = ul.children;
  for (let i = 0; i < todoEls.length; i++) {
    const todoEl = todoEls[i];
    const todo = {
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed")
    };
    todos.push(todo);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      const todoEl = document.createElement("li");
      todoEl.innerText = todo.text;
      if (todo.completed) {
        todoEl.classList.add("completed");
      }
      todoEl.addEventListener("click", () => {
        todoEl.classList.toggle("completed");
        saveTodos();
      });
      todoEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        todoEl.remove();
        saveTodos();
      });
      ul.appendChild(todoEl);
    }
  }
}

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

loadTodos();