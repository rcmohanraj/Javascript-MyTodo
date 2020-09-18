/* Selectors */
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

/* Event Listeners */
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo);

//Load all the todos from the local storage
window.addEventListener('DOMContentLoaded', getTodos);

/* Functions */

/* 
Motive for this function is to create structure like this
<div class="todo">
    <li></li>
    <button>delete</button>
    <button>checked</button>
</div>
*/
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    console.log("Adding Todo");
    //Create Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li tag
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add Todo to localstorage
    saveLocalTodos(todoInput.value);

    //Create checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append to the ul list
    todoList.appendChild(todoDiv);

    //Clear the todoInput value after appending
    todoInput.value = '';
}

function deleteAndCheck(event) {
    const item = event.target;
    //Delete TODO
    if(item.classList[0] === 'delete-btn') { //Getting the first class from the classList
        const todo = item.parentElement;    //Getting the parent which is div, for the entire removal of div tag
        //Animation
        todo.classList.add('fall');
        removeLocalTodo(todo);
        //call the remove once the animation has ended
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }

    //Mark TODO as completed
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
   
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });    
}

function saveLocalTodos(todo) {
    //Checking already todo exist in storage
    let todos;
    const storage = localStorage.getItem('todos');
    if (storage === null) {
        todos = [];
    } else {
        todos = JSON.parse(storage);
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    const storage = localStorage.getItem('todos');
    if (storage === null) {
        todos = [];
    } else {
        todos = JSON.parse(storage);
    }
    todos.forEach(function(todo){
        reloadTodos(todo)
    });
}

function reloadTodos(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li tag
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Create checked button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"> </i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //Append to the ul list
    todoList.appendChild(todoDiv);
}

function removeLocalTodo(todo) {
    let todos;
    const storage = localStorage.getItem('todos');
    if (storage === null) {
        todos = [];
    } else {
        todos = JSON.parse(storage);
    }
    const text = todo.children[0].innerText;
    const index = todos.indexOf(text);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}