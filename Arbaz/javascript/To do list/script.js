const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

// add todo

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write somthing in todo list")
        return false;
    }

    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";

    }
    else {
        // p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        // edit btn 
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn)

        // delete btn 
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn)


        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// edit/delete todo
const updateTodo = (e) => {
    // console.log(e.target.innerHTML)
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }

}

// save localstorage
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// get from localstorage
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            // p tag
            const li = document.createElement('li');
            const p = document.createElement('p');
            p.innerHTML = todo;
            li.appendChild(p);

            // edit btn 
            const editBtn = document.createElement("button");
            editBtn.innerHTML = "Edit";
            editBtn.classList.add("btn", "editBtn")
            li.appendChild(editBtn)

            // delete btn 
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn)


            todoList.appendChild(li);
        });
    }
}

// delete from localstorage
const deleteLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));


}

// edit form localstorage
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todoIndex);
}


document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);