const task_input = document.querySelector("input");
const date_input = document.querySelector(".schedule-date");
const add_btn = document.querySelector(".add-task-button");
const todos_list_body = document.querySelector(".todos-list-body");
const alert_message = document.querySelector(".alert-message");
const delete_all_btn = document.querySelector(".delete-all-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

addEventListener("DOMContentLoaded", () => {
  showAllTodos();
  if (!todos.length) {
    displayTodos([]);
  }
});

function getRandomId(){
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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

task_input.addEventListener("keydown", (e) => {
  if(key === "Enter" && task_input.value.length > 0) {
    addToDo(task_input, date_input);
    saveToLocalStorage();
    task_input.value = "";
    showAllTodos();
  }
});

add_btn.addEventListener("click", () => {
  if (task_input.value === "") showAlertMessage("Please enter a task", "error");
  else{
    addToDo(task_input, date_input); 
    saveToLocalStorage();
    showAllTodos();
    task_input.value = "";
    date_input.value = "";
    showAlertMessage("Task added successfully", "success");
  }
});

delete_all_btn.addEventListener("click", clearAllTodos);