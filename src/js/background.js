const body = document.querySelector("body");

const IMG_NUMBER = 9;
const BG_CN = "bg-image";

function paintBg(imgNum) {
    const num = imgNum + 1;
    const image = new Image();
    image.src = `./src/images/${num}.jpg`;
    image.classList.add(BG_CN);
    body.prepend(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNum = genRandom();
    paintBg(randomNum);
}

init();