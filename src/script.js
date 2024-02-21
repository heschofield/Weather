// default city
const defaultCity = "Hamilton";

// Call get_weather_from_api with the default city when the page loads
window.addEventListener("DOMContentLoaded", () => {
  get_weather_from_api(defaultCity);
});

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  get_weather_from_api(searchInputElement.value);
}

function get_weather_from_api(city) {
  let city_encoded = encodeURIComponent(city);
  let apiKey = "77e2c1af0bb1ff636e0c2f40fade95to";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city_encoded}&key=${apiKey}&units=metric`;

  console.log(url);
  axios.get(url).then(handle_weather_result);
}

function handle_weather_result(data) {
  console.log("We are in the handle weather result");
  console.log(data);

  if (data.data.city) {
    console.log(
      "We found a city called " +
        data.data.city +
        " which is in " +
        data.data.country
    );

    let currentTemperature = Math.floor(data.data.temperature.current);
    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    );
    temperatureElement.innerHTML = currentTemperature;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = data.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${data.data.temperature.humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${data.data.wind.speed}km/h`;
  } else {
    alert(data.data.message);
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
