const form = document.querySelector(".js-nameForm"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greeting");

const USER_LS = "current user";
const CLASSNAME = "showing";

function getGreeting() {
    const date = new Date(),
        hour = date.getHours();
    if (hour < 6) {
        return "Good Night";
    } else if (hour < 12) {
        return "Good Morning";
    } else if (hour < 18) {
        return "Good Afternoon";
    } else {
        return "Good Evening";
    }
}

function paintGreeting(name) {
    const greetWord = getGreeting();
    greeting.innerHTML = `${greetWord}, ${name}`;
    form.classList.remove(CLASSNAME);
    greeting.classList.add(CLASSNAME);
}

function saveName(name) {
    localStorage.setItem(USER_LS, name);
    paintGreeting(name);
}

function handleSubmit(event) {
    event.preventDefault();
    const newName = input.value;
    saveName(newName);
    input.value = "";
}

function askName() {
    form.classList.add(CLASSNAME);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();