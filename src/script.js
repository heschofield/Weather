function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  //At this point we should out and set the actual weather
  get_weather_from_api(searchInputElement.value);
}

function get_weather_from_api(city) {
  //First we need to encode the city
  let city_encoded = encodeURIComponent(city);
  let apiKey = "6tb6ab3978170b6e78fecf434o460ab9";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city_encoded}&key=${apiKey}&units=metric`;

  console.log(url);
  axios.get(url).then(handle_weather_result);
}

function handle_weather_result(data) {
  console.log("We are in the handle weather result");
  console.log(data);

  //Let's see if we got a city back
  if (data.data.city) {
    console.log(
      "We found a city called " +
        data.data.city +
        " which is in " +
        data.data.country
    );

    let currentTemerature = data.data.temperature.current;
    let temperatureElement = document.querySelector(
      ".current-temperature-value"
    );
    temperatureElement.innerHTML = currentTemerature;
  } else {
    // didnt get a city so there is likely an error.
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
