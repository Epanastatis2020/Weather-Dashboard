//Declare global variables here
const APIkey = "&appid=4d90ce9f0a7bd1882a4f86d3d0c1088b";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
const oneCallAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=";
const geoAPI = navigator.geolocation;
const units = "&units=metric";
const getWeatherIcon = "http://openweathermap.org/img/wn/";
let city;
let cityName;
//Local storage variables
let lastSearch;
let lastFiveSearches;

//Document ready initialiser
$(document).ready(function () {
  init();

  function init() {
    $("#errorDiv").hide();
    $("#todayForecast").hide();
    $("#5dayDiv").hide();
  }

  //Event listeners
  $("#searchBtn").click(search);
  $("#clearBtn").click(clearHistory);
});

//Search function
function search() {
  city = $("#searchInput").val().trim();

  if (city === "") {
    return;
  }
  $("#searchInput").val("");
  retrieveForecast(city);
}

//Retrieve forecast function

function retrieveForecast(search) {
  var result = retrieveWeather(search);
  retrieveUVI;
}

//Function to retrieve data from Weather API

function retrieveWeather(search) {
  let queryURL = weatherAPI + "q=" + search + units + APIkey;

  $.ajax({
    url: queryURL,
    method: "GET",
    // Manage 404 to show error message and hide forecast divs
    statusCode: {
      404: function () {
        $("#errorDiv").show();
        $("#todayForecast").hide();
        $("#5dayDiv").hide();
      },
    },
  }).then(function (response) {
    $("#errorDiv").hide();
    $("#todayForecast").show();
    $("#5dayDiv").show();

    let name = response.name;
    let tempMin = Math.round(response.main.temp_min);
    let tempMax = Math.round(response.main.temp_max);
    let hum = response.main.humidity;
    let ws = response.wind.speed;
    let date = new Date(response.dt * 1000).toLocaleDateString("en-AU");
    let weatherImg = response.weather[0].icon;
    let weatherImgURL = getWeatherIcon + weatherImg + ".png";

    saveHistory(name);

    $("#cityNameDisplay").text(name + " (" + date + ") ");
    $("#weatherImg").attr("src", weatherImgURL);
    $("#tempMin").html("<b>Minimum Temperature: </b>" + tempMin + " °C");
    $("#tempMax").html("<b>Maximum Temperature: </b>" + tempMax + " °C");
    $("#hum").html("<b>Humidity: </b>" + hum + "%");
    $("#ws").html("<b>Wind Speed: </b>" + ws + " km/h");

    let lat = response.coord.lat;
    let lon = response.coord.lon;
    cityName = response.name;

    // saving search term to local Storage
    let savedJSONObject = {
      name: cityName,
    };

    localStorage.setItem("lastSearch", JSON.stringify(savedJSONObject));
    lastFiveSearches = JSON.parse(
      window.localStorage.getItem("lastFiveSearches")
    );
    if (lastFiveSearches === null) {
      lastFiveSearches = [];
    }
    lastFiveSearches.push(savedJSONObject);
    localStorage.setItem("lastFiveSearches", JSON.stringify(lastFiveSearches));

    retrieveUVI(lat, lon);
    retrieve5DayWeather(lat, lon);
  });
}

//Function to retrieve data from UVI API

function retrieveUVI(lat, lon) {
  let queryURLforUVI = oneCallAPI + lat + "&lon=" + lon + APIkey;

  $.ajax({
    url: queryURLforUVI,
    method: "GET",
  }).then(function (responseUVI) {
    let UVI = responseUVI.current.uvi;
    $("#uvi").html(
      "<b>UV Index: <b>" +
        '<span class="badge badge-pill badge-info">' +
        UVI +
        "</span>"
    );
  });
}

//Function to retrieve 5-day forecast data from Forecast API

function retrieve5DayWeather(lat, lon) {
  let queryURLfor5DayWeather =
    oneCallAPI + lat + "&lon=" + lon + units + APIkey;

  $.ajax({
    url: queryURLfor5DayWeather,
    method: "GET",
  }).then(function (responseForecast) {
    let forecasted = responseForecast;
    for (var i = 1; i < 6; i++) {
      let forecastDate = forecasted.daily[i].dt;
      let forecastDateFormatted = new Date(
        forecastDate * 1000
      ).toLocaleDateString("en-AU");
      let forecastImg = forecasted.daily[i].weather[0].icon;
      let forecastImgRetrieved = getWeatherIcon + forecastImg + ".png";
      let forecastTempMin = Math.round(forecasted.daily[i].temp.min);
      let forecastTempMax = Math.round(forecasted.daily[i].temp.max);
      let forecastHum = forecasted.daily[i].humidity;
      let forecastUVI = forecasted.daily[i].uvi;

      $("#day" + i + "Date").text(forecastDateFormatted);
      $("#day" + i + "Img").attr("src", forecastImgRetrieved);
      $("#day" + i + "TempMin").text("Min Temp: " + forecastTempMin + " °C");
      $("#day" + i + "TempMax").text("Max Temp: " + forecastTempMax + " °C");
      $("#day" + i + "Hum").text("Humidity: " + forecastHum + "%");
      $("#day" + i + "UVI").text("UVI: " + forecastUVI);
    }
  });
}

//Function to show search history

function showHistory() {
    lastFiveSearches = JSON.parse(
        window.localStorage.getItem("lastFiveSearches")
      );
      if (lastFiveSearches === null) {
        lastFiveSearches = [];
      }
    for (var i = 0; i < 6, i++) {
        let newListItem = $("<li>").text(lastFiveSearches[i]);
        $("#searchHistoryList").prepend(newListItem);
    }
}

//Function to clear search history

function clearHistory() {
  localStorage.clear();
}