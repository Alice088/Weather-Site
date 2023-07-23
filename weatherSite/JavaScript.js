const apiKey = `875279f6a1a0e9c9502b368be8aaab68` 
let city;

function getValue() {
  city = document.getElementById(`city`).value;

  let element = document.querySelector(`.main__element-2`);
  element.style.display = `flex`;

  revalWeather();
}

function getTemperature(t) {
  let res = t.main.temp - 273.15;
  return res.toFixed(1);
}

function getTemperatureFeel(t) {
  let res = t.main.feels_like - 273.15;
  return res.toFixed(1);
}

async function fetchWeatherData() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Ошибка при получении данных о погоде:", error);
  }
}

async function revalWeather() {
  let response;

  try {
    response = await fetchWeatherData();
  } catch (err) {
    alert(`Ошибка: ${err}`);
  }

  // input
  if (response.weather[0].main == `Rain`) {
    const removeParent = document.querySelector(`#rain-time`);
    removeParent.removeChild(removeParent.lastChild);
    //remove old <p>

    let p = document.createElement(`p`);
    let parent = document.querySelector(`#rain-time`);
    let time;

    for (let key in response.rain) {
      time = key;
    }

    p.className = `timeRain`;

    p.innerHTML = `Rain time: ${time.at(0)}H`;

    parent.append(p);
  }
  // if will be rain
  //timer raim

  document.getElementById(
    `property-weather-1`
  ).textContent = `Feel like: ${getTemperatureFeel(response)}°C`;
  // feel like

  document.getElementById(
    `property-weather-2`
  ).textContent = `Temperature: ${getTemperature(response)}°C`;
  // temperature

  document.getElementById(
    `property-weather-3`
  ).textContent = `humidity: ${response.main.humidity}%`;
  // humidity

  document.getElementById(
    `propetry-weather-4`
  ).textContent = `pressure: ${response.main.pressure} Pa`;
  //pressure

  document.getElementById(
    `country`
  ).textContent = `Country: ${response.sys.country}`;
  //country

  document.getElementById(
    `property-weather-5`
  ).textContent = `wind speed: ${response.wind.speed}m/s`;
  //wind speed

  document.getElementById(
    `property-weather-6`
  ).textContent = `wind degree: ${response.wind.deg}°`;
  //wind deg

  fIconWeather(response.weather[0].main, response.weather[0].description);
}

function fIconWeather(x, y) {
  let img;

  switch (x) {
    case `Rain`:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/rain.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;

    case `Clear sky`:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/clear-sky.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;

    case `Snow`:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/snow.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;

    case `Mist`:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/mist.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;

    case `Thunderstorm`:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/thunder.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;

    default:
      img = document.getElementById(`icon-weather`);
      img.src = `/icon/other.png`;
      document.getElementById(`weather`).textContent = x;
      document.getElementById(`wetherDescription`).textContent = y;

      break;
  }
}
