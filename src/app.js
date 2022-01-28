function getData(city) {
let apiKey = "b3a8eb2418e5e4cf6a6ab375ca013626";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)
}

function displayTemperature(response) {
    let temperatureDegrees = document.querySelector("#degrees");
    let city = document.querySelector("#cityValue");
    let humidity = document.querySelector("#humidityValue");
    let wind = document.querySelector("#windValue");
    let description = document.querySelector("#descriptionValue");
    let date = document.querySelector("#dateValue");

    temperatureDegrees.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
    description.innerHTML = `${response.data.weather[0].description}, ${response.data.weather[1].description}`;
    date.innerHTML = formatDate(response.data.dt * 1000);
}

function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
    let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
    return `${day} ${hours}:${minutes}`;
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);