const clock = document.querySelector(".js-clock"),
    title = clock.querySelector(".js-title");

function getTime() {
    const date = new Date(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    title.innerHTML = `${hour < 10 ? `0${hour}` : `${hour}`}:${min < 10 ? `0${min}` : `${min}` }:${sec < 10 ? `0${sec}` : `${sec}`}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();