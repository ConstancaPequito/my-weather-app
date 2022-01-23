function getData(city) {
let apiKey = "b3a8eb2418e5e4cf6a6ab375ca013626";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

axios.get(apiUrl).then(displayTemperature)