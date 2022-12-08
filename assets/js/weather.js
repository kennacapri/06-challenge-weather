let city = "";
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidity = $("#humidity");
let currentWSpeed = $("#wind-speed");
let currentUvindex = $("#uv-index");
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