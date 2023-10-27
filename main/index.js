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

function showAllTodos(){
    todos_list_body.innerHTML = "";
    if (todos.length === 0){
      todos_list_body.innerHTML = 
      `<tr>
        <td colspan="5" class="text-center">No task found</td>
      </tr>`;
    }
    else{
        todos.forEach((todo) => {
            todos_list_body.innerHTML += `
                    <tr class="todo-item" data-id="${todo.id}">
                        <td class="divScroll-1">${todo.task}</td>
                        <td>${todo.dueDate || "No due date"}</td>
                        <td>${todo.status}</td>
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

