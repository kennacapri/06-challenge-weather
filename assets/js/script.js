let weather = {
,
    fetchWeather: function (city) {
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=seattle&appid=ca533f6fcb708ad09226db03d7e31056"
            + city
            + "&units=metric&appid=" 
            + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather;
        const { temp, humidity } = data.main;
        const { lat, long } = data.coord;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".lat").innerText = lat;
        document.querySelector(".long").innerText = long;
        document.querySelector(".speed").innerText = "Wind Speed: " + speed + "mph";
        },
        search: function () {
            this.fetchWeather(document.querySelector(".search-bar").value);
        },
    };

document.querySelector(".search button")
.addEventListener("click", function () {
weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
if (event.key == "Enter") {
    weather.search();
}
});





let city="";
let searchCity + $("#search-city");
let searchButton = $("#search-button");
let clearButton = $("#clear-history");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidity= $("#humidity");
let currentWSpeed=$("#wind-speed");
let sCity=[];

function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}
// set up API key for weather 
let apiKey= "ca533f6fcb708ad09226db03d7e31056";

