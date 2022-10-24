let weather = {
apiKey: "ca533f6fcb708ad09226db03d7e31056",
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
        const { speed } = data.wind;
        const { lat, long } = data;
        }
}






// function GetInfo(){
//     const newName = document.getElementById("cityInput");
//     const searchCity = document.getElementById("searchCity");
//     cityName.innerHTML ="--"+newName.value+"--"
// }

// fetch("http://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&appid=ca533f6fcb708ad09226db03d7e31056")
// .then(response => response.json())
// .then(data => {
//     for(i=0;i<5;i++) {
//         document.getElementById("day" +(i+1)+"Main").innerHTML = "Main:" +Number(data.list[i].main.temp -282.92).toFixed(1)+"°";
//     }
// })

// const d =new Date();
// const weekday =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"]

// function CheckDay(day){
//     if(day +d.getDay() > 6){
//         return day +day.getDay()-7;
//     }
//     else{
//         return day +d.getDay();
//         }
//     }

//     for(i=0;i<5;i++){
//         document.getElementById("day" +(i+1)+"Main").innerHTML = weekday[CheckDay(1)];
//     }
    


