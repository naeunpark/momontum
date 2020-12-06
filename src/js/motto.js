const mottoForm = document.querySelector(".js-motto"),
    mottoInput = mottoForm.querySelector("input"),
    encourage = document.querySelector(".js-encourage");

const MOTTO_LS = "motto";
const SHOW_CN = "showing";

function paintMotto(motto) {
    encourage.innerHTML = `"${motto}"`;
    mottoForm.classList.remove(SHOW_CN);
    encourage.classList.add(SHOW_CN);
}

function saveMotto(motto) {
    localStorage.setItem(MOTTO_LS, motto);
    paintMotto(motto);
}

function handleSubmit(event) {
    event.preventDefault();
    const newMotto = mottoInput.value;
    saveMotto(newMotto);
    mottoInput.value = "";
}

function askMotto() {
    mottoForm.classList.add(SHOW_CN);
    mottoForm.addEventListener("submit", handleSubmit);
}

function loadMotto() {
    const currentMotto = localStorage.getItem(MOTTO_LS);
    if (currentMotto === null) {
        askMotto();
    } else {
        paintMotto(currentMotto);
    }
}

function init() {
    loadMotto();
}

init();