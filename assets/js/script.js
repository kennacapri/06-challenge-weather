let city = "";
let lat;
let lon;
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidity = $("#humidity");
let currentWSpeed = $("#wind-speed");
let cardTitle = $(".card-title");
let cardTemp = $(".card-temp");
let cardWind = $(".card-wind");
let cardHumidity = $(".card-humidity");
let sCity = [];

// set up API key for weather
let APIKey = "ca533f6fcb708ad09226db03d7e31056";

function displayWeather(color) {
  console.log(color);
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}
// 5 day forecast data
function createFiveDayForecast(forecastData) {
  for (let i = 0; i < forecastData.list.length; i += 8) {
    console.log(forecastData.list[i].dt_txt);
    // only need date, wind, humidity and temperature
    const dailyForecast = forecastData.list[i];
    const id = `day${i / 8}`;
    document.getElementById(id).innerHTML = `
            
            <p class="dayOfWeek1 text-center">Monday 10/23/22</p>
              <img class="card-img-top" src="./assets/img/weather icon.png" />
              <div class="card-body">
                <p class="card-temp1">Temperature: ${dailyForecast.main.temp}°F</p>
                <p class="card-wind1">Wind: ${dailyForecast.wind.speed} MPH</p>
                <p class="card-humidity1">Humidity: ${dailyForecast.main.humidity} %</p>
              </div>
            `;
  }
}

function handleLocalStorage(cityData, cityName) {
  if (cityData.cod == 200) {
    sCity = JSON.parse(localStorage.getItem("cityName"));
    console.log(sCity);
    if (sCity == null) {
      sCity = [];
      sCity.push(cityName.toUpperCase());
      localStorage.setItem("cityName", JSON.stringify(sCity));
      addToList(cityName);
    } else {
      if (find(cityName) > 0) {
        sCity.push(cityName.toUpperCase());
        localStorage.setItem("cityName", JSON.stringify(sCity));
        addToList(cityName);
      }
    }
  }
}

function currentWeather(city) {
  const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial" +
    "&APPID=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    createFiveDayForecast(response);
    currentDayForecast(response.city.id);
    handleLocalStorage(response, response.city.name);

    // const weatherIcon = response.weather[0].icon;
    // const iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
    // const date = new Date(response.dt * 1000).toLocaleDateString();
    // $(currentCity).html(
    //   response.name + "(" + date + ")" + "<img src=" + iconURL + ">"
    // );

    // display current humidity, temp and wind speed
    // const temp = (response.main.temp - 284.71) * 1.8 + 32;
    // $(currentTemperature).html(tempF.toFixed(2));
    // $(currentHumidity).html(response.main.humidity + "%");
    // const ws = response.wind.speed;
    // const windsMPH = (ws * 2.237).toFixed(1);
    // $(currentWSpeed).html(windsMPH + "MPH");
    // UVIndex(response.coord.lon, response.coord.lat);
  });
}

async function fetchCoords(cityID) {
  const queryForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityID +
    "&appid=" +
    APIKey;
  let coordsData = await $.ajax({
    url: queryForecastURL,
    method: "GET",
  }).then(function (response) { 
    return response;
  });
    
    return coordsData;
}
// possibly an async/await problem ***
async function currentDayForecast(cityID) {
  let coordsData = await fetchCoords(cityID);
  console.log(coordsData);
  lat = coordsData.city.coord.lat;
  lon = coordsData.city.coord.lon;
  console.log(lat);
  console.log(lon);

}

// local storage city search
function citySearchHistory(city) {
  let history = getSearchHistory();
  let newHistory = [];

  if (history) {
    newHistory = history.filter(function (item) {
      console.log(item);
      return item !== city;
    });
  }

  newHistory.unshift(city);
  if (newHistory.length > 10) newHistory.pop();
  localStorage.setItem("history", JSON.stringify("history")) || [];

  return history;
}

function searchSubmitHandler() {
  const search = $("#search-input").val();

  if (search) {
    forecastSearch(search);
  }
}

function refreshHistory() {
  const history = JSON.parse(localStorage.getItem("history"));

  $("#history-container").html("");

  if (history) {
    history.forEach((item) => {
      const html = `<button class='hist-btn btn btn-primary m-2 col-10'>${item}</button>`;

      $("#history-container").append(html);
    });
  }

  $(".hist-btn").on("click", function (e) {
    forecastSearch($(this).html());
  });
}

refreshHistory();
$("#search-form").submit(function (e) {
  e.preventDefault();

  searchSubmitHandler();
});

// $("#search-button").on("click", displayWeather);
// $(document).on("click", invokePastSearch);
// $(window).on("load", loadLastCity);
// $("#clear-history").on("click", clearHistory);
