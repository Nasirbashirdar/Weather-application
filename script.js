import { apiKey } from "./api.js";
// Replace with your API key

// Function to fetch weather by city name
function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  fetchWeatherData(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
}

// Function to fetch weather by user's location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
      },
      () => {
        alert("Location access denied. Please enable location services.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Function to fetch weather data from API
function fetchWeatherData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayWeather(data))
    .catch((error) => alert("Error fetching weather data"));
}

// Function to display weather data
function displayWeather(data) {
  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById(
    "temperature"
  ).textContent = `🌡 Temperature: ${data.main.temp}°C`;
  document.getElementById(
    "weatherCondition"
  ).textContent = `☁ Condition: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).textContent = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById(
    "windSpeed"
  ).textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  document.getElementById("weatherData").classList.remove("hidden"); // Show data
}
