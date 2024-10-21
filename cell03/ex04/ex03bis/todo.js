// When the page loads, populate the to-do list from cookies
window.onload = function () {
  loadTodos();
};

// Reference to the list container
const ft_list = document.getElementById('ft_list');

// Event listener for creating new To-Do
document.getElementById('newTodoBtn').addEventListener('click', function () {
  let newTodo = prompt("Enter your new To-Do:");
  if (newTodo) {
    addTodo(newTodo);
    saveTodos();
  }
});

// Function to create a new To-Do and place it at the top
function addTodo(todoText) {
  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  todoItem.textContent = todoText;

  // Click event to remove the To-Do
  todoItem.addEventListener('click', function () {
    let confirmDelete = confirm("Do you want to delete this To-Do?");
    if (confirmDelete) {
      ft_list.removeChild(todoItem);
      saveTodos();
    }
  });

  // Add the new To-Do at the top
  ft_list.insertBefore(todoItem, ft_list.firstChild);
}

// Function to save the list to cookies
function saveTodos() {
  let todos = [];
  let todoItems = ft_list.children;
  for (let i = 0; i < todoItems.length; i++) {
    todos.push(todoItems[i].textContent);
  }
  document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

// Function to load the list from cookies
function loadTodos() {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith("todos=")) {
      let todos = JSON.parse(cookie.substring(6));
      for (let j = 0; j < todos.length; j++) {
        addTodo(todos[j]);
      }
    }
  }
}