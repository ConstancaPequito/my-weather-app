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
    let icon = document.querySelector("#icon-input");
    
    celciusDegrees = response.data.main.temp;

    temperatureDegrees.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = response.data.wind.speed;
    description.innerHTML = `${response.data.weather[0].description}`;
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", `${response.data.weather[0].description}`);
    date.innerHTML = formatDate(response.data.dt * 1000);
}

function formatDate() {
    let date = new Date();
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
    getData(cityInput.value);
}

getData("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let search = document.querySelector("#search-button");
search.addEventListener("click", handleSubmit);

function displayCelcius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degrees");
    temperatureElement.innerHTML = Math.round(celciusDegrees);
}

function displayFahrenheint(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#degrees");
    let fahrenheintTemperature = (celciusDegrees*9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheintTemperature);
}

let celciusDegrees = null;

let celciusTemperature = document.querySelector("#celcius-link");
celciusTemperature.addEventListener("click",displayCelcius);

let fahrenheintTemperature = document.querySelector("#fahrenheit-link");
fahrenheintTemperature.addEventListener("click",displayFahrenheint);

function formatForecastDay() {
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
    let forecastResponse = response.data.daily;
    
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecastResponse.forEach(function(forecastDay, index) {
        
      if (index < 6) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="weather-forecast-date">
            ${formatForecastDay(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" class="forecast-image">
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">
              ${Math.round(forecastDay.temp.max)} °C
            </span>
            <span class="weather-forecast-temperature-min">
            ${Math.round(forecastDay.temp.min)} °C
            </span>
          </div>
        </div>
      </div>
        `;}
    });

    forescastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    displayForecast();
}