const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    pContainer = document.querySelector(".pending"),
    pending = pContainer.querySelector("ul"),
    cContainer = document.querySelector(".complete"),
    complete = cContainer.querySelector("ul");

const PENDING_LS = "Pending List",
    COMPLETE_LS = "Complete List";

let todos = [];
let completeTodos = [];
let i = 1;

function saveTodo(type, updateTodo) {
    localStorage.setItem(type, JSON.stringify(updateTodo));
}

function handleDel(event) {
    const target = event.target.parentNode;
    pending.removeChild(target);
    const cleanTodos = todos.filter((todo) => target.id != todo.id);
    todos = cleanTodos;
    saveTodo(PENDING_LS, todos);
}

function handleComDel(event) {
    const target = event.target.parentNode;
    complete.removeChild(target);
    const cleanCompletes = completeTodos.filter((todo) => target.id != todo.id);
    completeTodos = cleanCompletes;
    saveTodo(COMPLETE_LS, completeTodos);
}

function moveToComplete(event) {
    const target = event.target.parentNode;
    const targetTodo = todos.filter((todo) => target.id == todo.id);
    handleDel(event);
    completeTodo(targetTodo[0].todo);
}

function moveToPending(event) {
    const target = event.target.parentNode;
    const targetTodo = completeTodos.filter((todo) => target.id == todo.id);
    handleComDel(event);
    pendingTodo(targetTodo[0].todo);
}

function pendingTodo(item) {
    const pendingItem = generalTodo(item),
        del = document.createElement("span"),
        checkToComplete = document.createElement("span");

    del.innerHTML = "❌";
    checkToComplete.innerHTML = "⭕";
    del.addEventListener("click", handleDel);
    checkToComplete.addEventListener("click", moveToComplete);
    pendingItem.prepend(del);
    pendingItem.prepend(checkToComplete);
    pending.append(pendingItem);
    const newTodo = {
        id: i,
        todo: item
    };
    todos.push(newTodo);
    saveTodo(PENDING_LS, todos);
    i++;
}

function completeTodo(item) {
    const completeItem = generalTodo(item),
        del = document.createElement("span"),
        checkToPending = document.createElement("span");

    del.innerHTML = "❌";
    checkToPending.innerHTML = "↩️";
    del.addEventListener("click", handleComDel);
    checkToPending.addEventListener("click", moveToPending);
    completeItem.prepend(del);
    completeItem.prepend(checkToPending);
    complete.append(completeItem);
    const newTodo = {
        id: i,
        todo: item
    };
    completeTodos.push(newTodo);
    saveTodo(COMPLETE_LS, completeTodos);
    i++;
}

function generalTodo(item) {
    const li = document.createElement("li"),
        text = document.createElement("span");
    newId = i;
    li.id = newId;
    text.innerHTML = item;
    li.append(text);
    return li;
}

function handleSubmit(event) {
    event.preventDefault();
    const todo = todoInput.value;
    pendingTodo(todo);
    todoInput.value = "";
}

function loadTodos() {
    const currentTodos = localStorage.getItem(PENDING_LS);
    if (currentTodos !== null) {
        const parsedTodos = JSON.parse(currentTodos);
        parsedTodos.forEach(function(item) {
            pendingTodo(item.todo);
        });
    }

    const currentCompletes = localStorage.getItem(COMPLETE_LS);
    if (currentCompletes !== null) {
        const parsedCompleteTodos = JSON.parse(currentCompletes);
        parsedCompleteTodos.forEach(function(item) {
            completeTodo(item.todo);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();