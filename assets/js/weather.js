let city = "";
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidity = $("#humidity");
let currentWSpeed = $("#wind-speed");
let currentUvIndex = $("#uv-index");
let sCity = [];

function find(c) {
  for (var i = 0; i < sCity.length; i++) {
    if (sCity.toUpperCase() === sCity[i]) {
      return -1;
    }
  }
  return 1;
}

// set up API key for weather
let APIKey = "ca533f6fcb708ad09226db03d7e31056";

function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}

// function to display current weather
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
    console.log(response);

    // from api- server side
    const weatherIcon = response.weather[0].icon;
    const iconURL =
      "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    const date = new Date(response.dt * 1000).toLocaleDateString();
    $(currentCity).html(
      response.name + "(" + date + ")" + "<img src=" + iconURL + ">"
    );

    // parse response to display current weather
    const tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $(currentTemperature).html(tempF.toFixed(2) + "&#8457");
    $(currentHumidity).html(response.main.humidity + "%");

    const ws = response.wind.speed;
    const windsMPH = (ws * 2.237).toFixed(1);
    $(currentWSpeed).html(windsMPH + "MPH");
    currentUvIndex(response.coord.lon, response.coord.lat);
    currentDayForecast(response.id);
    if (response.cod == 200) {
      sCity = JSON.parse(localStorage.getItem("cityName"));
      console.log(sCity);
      if (sCity == null) {
        sCity = [];
        sCity.push(city.toUpperCase());
        localStorage.setItem("cityName", JSON.stringify(sCity));
        addToList(city);
      } else {
        if (find(city) > 0) {
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityName", JSON.stringify(sCity));
          addToList(city);
        }
      }
    }
  });
}
function UVIndex(ln, lt) {
    const uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
    $.ajax({
        url: uvqURL,
        method: "POST",
    }).then(function(response) {
        $(currentUvIndex).html(response.value); 
    });
    }

    // displaying 5 day forecast
    function forecast(cityId) {
        const dayOver = false;
        const queryForecastURL = 
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityId +
        "&appid" +
        APIKey;
        $.ajax({
            url: queryForecastURL,
            method: 'GET',
        }).then(function (response) {
            for (i = 0; i < 5; i ++) {
                const date = new Date(
                 response.list[(i + 1) * 8 - 1].dt * 1000   
                ).toLocaleDateString();
                const iconCode = response.list[(i + 1) * 8 - 1].weather[0].con;
                const iconURL = "https://openweathermap.org/img/wn" + iconCode + ".png";
                const tempK = response.list[(i + 1) * 8 - 1].main.temp;
                const tempF = ((tempK - 273.5) * 1.8 +32).toFixed(2);
                const humidity = response.list[(i + 1) * 8 - 1].main.humidity;

                $("#fDate" + i).html(date);
                $("#fImg" + i).html("<img src" + iconURL + ">");
                $("#fTemp" + i).html(tempF + "&#8457");
                $("#fHumidity" + i).html(humidity + "%");
            }
        });
    }
    
        function addToList(c) {
            const listEl = $("<li>" + c.toUpperCase() + "</li>");
            $(listEl).attr("class", "list-group-item");
            $(listEl).attr("data-value", c.toUpperCase());
            $(".list-group").append(listEl);
        }

        function invokePastSearch(event) {
            const liEl = event.target;
            if (event.target.matches("li")) {
                city = liEl.textContent.trim();
                currentWeather(city);
            }
        }

        function loadLastCity() {
            $("ul").empty();
            const sCity = JSON.parse(localStorage.getItem("cityName"));
            if (sCity !== null) {
                sCity = JSON.parse(localStorage.getItem("cityName"));
                for (i = 0; i < sCity.length; i++) {
                    addToList(sCity[i]);
        }
        city = sCity[i-1];
        currentWeather(city);
    }
}
        function clearHistory(event) {
            event.preventDefault();
            sCity = [];
            localStorage.removeItem("cityname");
            document.location.reload();
        }

        // click handlers
        $("#search-button").on("click", displayWeather);
        $(document).on("click", invokePastSearch);
        $(window).on("load", loadLastCity);
        $("#clear-history").on("click", clearHistory);
