const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTodo() {
  if (inputBox.value === "") {
    alert("Please enter your Task : ");
    return;
  } else {
    const newTodo = document.createElement("LI");
    newTodo.classList.add("task-item");

    // Checkbox
    const status = document.createElement("input");
    status.setAttribute("type", "checkbox");
    status.setAttribute("class", "status");

    // Task description (input field)
    const todoDesc = document.createElement("input");
    todoDesc.setAttribute("type", "text");
    todoDesc.setAttribute("class", "title");
    todoDesc.value = inputBox.value;
    todoDesc.setAttribute("readonly", true); // Make the task description read-only initially

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit");
    editBtn.textContent = "Edit";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "delete");
    deleteBtn.textContent = "Delete";

    //Append
    newTodo.appendChild(status);
    newTodo.appendChild(todoDesc);
    newTodo.appendChild(editBtn);
    newTodo.appendChild(deleteBtn);

    // Add the new to-do item to the list
    listContainer.appendChild(newTodo);

    // Clear the input
    inputBox.value = "";

    setTimeout(() => {
      newTodo.classList.add("added");
    }, 100);

    deleteBtn.addEventListener("click", function () {
      deleteTodo(newTodo);
    });
    editBtn.addEventListener("click", function () {
      editTodo(newTodo, todoDesc, editBtn, deleteBtn);
    });
  }
}

// Delete function
function deleteTodo(todoItem) {
  todoItem.remove(); // Remove the entire to-do
}

// Edit function
function editTodo(todoItem, todoDesc, editBtn, deleteBtn) {
  todoDesc.removeAttribute("readonly");
  todoDesc.focus();

  const saveBtn = document.createElement("button");
  saveBtn.setAttribute("class", "save");
  saveBtn.textContent = "Save";

  editBtn.style.display = "none";
  deleteBtn.style.display = "none";
  todoItem.appendChild(saveBtn);

  // Add event listener for Save button
  saveBtn.addEventListener("click", function () {
    saveTodo(todoItem, todoDesc, editBtn, deleteBtn, saveBtn);
  });
}

// Save function
function saveTodo(todoItem, todoDesc, editBtn, deleteBtn, saveBtn) {
  todoDesc.setAttribute("readonly", true);

  saveBtn.remove();
  editBtn.style.display = "inline-block";
  deleteBtn.style.display = "inline-block";
}
