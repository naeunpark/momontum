const div = document.querySelector(".js-weather"),
    p = div.querySelector("p");

const COORDS = "coords";
const API_KEY = "";

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("error!");
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            const temp = json.main.temp;
            const place = json.name;
            const icon = json.weather[0].icon;
            const image = new Image();
            image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            div.prepend(image);
            p.innerHTML = `${temp} °C @ ${place}`;
        })
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();