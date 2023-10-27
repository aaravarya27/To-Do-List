const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date");
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// event listener for rendering the homepage
addEventListener("DOMContentLoaded", () => {
displayTodos(todos);
  if (!todos.length) {
    displayTodos([]);
  }
});

// function to generate random ID
function getRandomId(){
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// create an object with details of the todo to be created and push in array
function addToDo(task_input, date_input){
  let task = {
    id: getRandomId(),
    task: task_input.value,
    dueDate: date_input.value,
    completed: false,
    status: "pending",
  };
  todos.push(task);
}

// enter event listener for adding a task 
task_input.addEventListener("keydown", (e) => {
  if(key === "Enter" && task_input.value.length > 0) {
    addToDo(task_input, date_input);
    saveToLocalStorage();
    task_input.value = "";
    displayTodos(todos);
  }
});

// click event listener for add task button
add_btn.addEventListener("click", () => {
  if (task_input.value === "") showAlertMessage("Please enter a task", "error");
  else{
    addToDo(task_input, date_input); 
    saveToLocalStorage();
    displayTodos(todos);
    task_input.value = "";
    date_input.value = "";
    showAlertMessage("Task added successfully", "success");
  }
});

delete_all_btn.addEventListener("click", clearAllTodos);

// function to save todos in browser local storage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function to show alert messages with 2 seconds timeout
function showAlertMessage(message, type) {
  let alert_box = `
        <div class="alert alert-${type} shadow-lg mb-5 w-full">
            <div>
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `;
  alert_message.innerHTML = alert_box;
  alert_message.classList.remove("hide");
  alert_message.classList.add("show");
  setTimeout(() => {
    alert_message.classList.remove("show");
    alert_message.classList.add("hide");
  }, 2000);
}

// display all todos except the one selected i.e. delete that todo
function deleteTodo(id){
  todos = todos.filter((todo) => todo.id !== id);
  saveToLocalStorage();
  showAlertMessage("Todo deleted successfully", "success");
  displayTodos(todos);
}

// update a task through user input
function editTodo(id){
  let todo = todos.find((todo) => todo.id === id);
  task_input.value = todo.task;
  todos = todos.filter((todo) => todo.id !== id);
  add_btn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
  saveToLocalStorage();
  add_btn.addEventListener("click", () => {
    add_btn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
    showAlertMessage("Todo updated successfully", "success");
  });
}

// function to clear the array of todos
function clearAllTodos() {
  if (todos.length > 0){
    todos = [];
    saveToLocalStorage();
    showAlertMessage("All todos cleared successfully", "success");
    displayTodos(todos);
  } 
  else showAlertMessage("No todos to clear", "error");
  
}

// function mark/unmark a task as completed
function toggleStatus(id){
  let todo = todos.find((todo) => todo.id === id);
  todo.completed = !todo.completed;
  saveToLocalStorage();
  displayTodos(todos);
}

// create and pass a filtered array to displayTodos function
function filterTodos(status){
  let filteredTodos;
  switch (status){
    case "all":
      filteredTodos = todos;
      break;
    case "pending":
      filteredTodos = todos.filter((todo) => !todo.completed);
      break;
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed);
      break;
  }
  displayTodos(filteredTodos);
}

// display elements of the array passed
function displayTodos(todosArray){
  todos_list_body.innerHTML = "";
  if(todosArray.length === 0) todos_list_body.innerHTML = `
  <tr>
      <td colspan="5" class="text-center">
          No task found
      </td>
  </tr>`;
  else{
      todosArray.forEach((todo) => {
      todos_list_body.innerHTML += `
              <tr class="todo-item" data-id="${todo.id}">
                  <td class="divScroll-1">${todo.task}</td>
                  <td class="divScroll-2">${todo.dueDate || "No due date"}</td>
                  <td calss="divScroll-2">${todo.completed ? "Completed" : "Pending"}</td>
                  <td>
                      <button class="btn btn-warning btn-sm" onclick="editTodo('${todo.id}')">
                          <i class="bx bx-edit-alt bx-bx-xs"></i>    
                      </button>
                      <button class="btn btn-success btn-sm" onclick="toggleStatus('${todo.id}')">
                          <i class="bx bx-check bx-xs"></i>
                      </button>
                      <button class="btn btn-error btn-sm" onclick="deleteTodo('${todo.id}')">
                          <i class="bx bx-trash bx-xs"></i>
                      </button>
                  </td>
              </tr>
      `;
      });
  }
}