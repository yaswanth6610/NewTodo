const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let todos = [];
let count = 1;

window.onload = function () {
  getTodosFromLocalStorage();
};

//state
function addTodo() {
  if (inputBox.value === "") {
    alert("Please enter your task :");
    return;
  }

  todos.push({
    id: count,
    status: false,
    title: inputBox.value,
  });

  count++;
  inputBox.value = "";
  renderTodos();
  saveTodosToLocalStorage();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  saveTodosToLocalStorage();
}

function editTodo(id) {
  //focus content of todo
  const todoElement = document.getElementById(`todo-${id}`);
  console.log(todoElement);

  if (todoElement) {
    const textInput = todoElement.querySelector("input.content");
    const editButton = todoElement.querySelector("button.edit");
    const deleteButton = todoElement.querySelector("button.delete");
    const saveButton = todoElement.querySelector("button.save");

    console.log(textInput, editButton, deleteButton, saveButton);
    textInput.readOnly = false;
    editButton.style.display = "none";
    deleteButton.style.display = "none";
    saveButton.style.display = "inline";
    textInput.focus();
  }
}

function saveTodo(id) {
  const todoElement = document.getElementById(`todo-${id}`);

  if (todoElement) {
    const textInput = todoElement.querySelector("input.content");
    const editButton = todoElement.querySelector("button.edit");
    const deleteButton = todoElement.querySelector("button.delete");
    const saveButton = todoElement.querySelector("button.save");
    // save new title
    const todo = todos.find((t) => t.id === id);
    console.log(todo);

    todo.title = textInput.value;

    // replace save buttton with edit and delete
    saveButton.style.display = "none";
    editButton.style.display = "inline-block";
    deleteButton.style.display = "inline-block";

    saveTodosToLocalStorage();
  }
}

// component
function createTodo(todo) {
  //create a li
  const newTodo = document.createElement("li");
  newTodo.setAttribute("id", "todo-" + todo.id);

  //create a checkbox for status
  const checked = document.createElement("input");
  checked.setAttribute("type", "checkbox");
  checked.setAttribute("class", "status");

  //task description
  const todoDesc = document.createElement("input");
  todoDesc.setAttribute("type", "text");
  todoDesc.setAttribute("class", "content");
  todoDesc.setAttribute("readonly", true);
  todoDesc.value = todo.title;

  //edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.addEventListener("click", () => editTodo(todo.id));

  //delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.className = "save";
  saveBtn.style.display = "none";
  saveBtn.addEventListener("click", () => saveTodo(todo.id));

  //append
  newTodo.appendChild(checked);
  newTodo.appendChild(todoDesc);
  newTodo.appendChild(editBtn);
  newTodo.appendChild(deleteBtn);
  newTodo.appendChild(saveBtn);

  return newTodo;
}

//Rendering
function renderTodos() {
  listContainer.innerHTML = "";
  todos.forEach((task) => {
    const newTodo = createTodo(task);
    listContainer.appendChild(newTodo);
    setTimeout(() => {
      newTodo.classList.add("added");
    }, 100);
  });
}

//local Storage
function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));

  if (storedTodos) {
    todos = storedTodos;
    count = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    console.log(count);
    renderTodos();
  }
}
