

api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}
// ad8dcabcbbd445dccabf781166e41cf5 //


var APIKey = ca533f6fcb708ad09226db03d7e31056;
var city;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
"&appid=" + APIKey;

fetch(queryURL);