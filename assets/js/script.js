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
let lastFiveSearches = [];

//Document ready initialiser
$(document).ready(function () {
  init();

  //Event listeners
  $("#searchBtn").click(search);
  $("#clearBtn").click(clearHistory);
});

function init() {
  lastSearch = JSON.parse(window.localStorage.getItem("lastSearch"));
  if (lastSearch === null) {
    $("#errorDiv").hide();
    $("#todayForecast").hide();
    $("#fiveDayDiv").hide();
  } else {
    retrieveWeather(lastSearch);
    showHistory();
  }
}

//Search function
function search(event) {
  event.preventDefault();
  city = $("#searchInput").val().trim();

  if (city === "") {
    return;
  }
  $("#searchInput").val("");
  retrieveWeather(city);
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
        $("#fiveDayDiv").hide();
      },
    },
  }).then(function (response) {
    $("#errorDiv").hide();
    $("#todayForecast").show();
    $("#fiveDayDiv").show();

    let name = response.name;
    let tempMin = Math.round(response.main.temp_min);
    let tempMax = Math.round(response.main.temp_max);
    let hum = response.main.humidity;
    let ws = response.wind.speed;
    let date = new Date(response.dt * 1000).toLocaleDateString("en-AU");
    let weatherImg = response.weather[0].icon;
    let weatherImgURL = getWeatherIcon + weatherImg + ".png";

    $("#cityNameDisplay").text(name + " (" + date + ") ");
    $("#weatherImg").attr("src", weatherImgURL);
    $("#tempMin").html("<b>Minimum Temperature: </b>" + tempMin + " °C");
    $("#tempMax").html("<b>Maximum Temperature: </b>" + tempMax + " °C");
    $("#hum").html("<b>Humidity: </b>" + hum + "%");
    $("#ws").html("<b>Wind Speed: </b>" + ws + " km/h");

    let lat = response.coord.lat;
    let lon = response.coord.lon;
    cityName = response.name;

    saveSearch(cityName);
    retrieveUVI(lat, lon);
    retrieve5DayWeather(lat, lon);
  });
}

//Function to save variables to localStorage

function saveSearch(cityName) {
  // saving search term to local Storage
  let savedJSONObject = cityName;
  localStorage.setItem("lastSearch", JSON.stringify(savedJSONObject));
  saveLastSearches(savedJSONObject);
}

//Function to get the saved array and ensure it only holds 5 values

function getSavedSearches() {
  //getting array of searched cities from local storage
  lastFiveSearches = JSON.parse(localStorage.getItem("lastFiveSearches"));
  if (lastFiveSearches === null) {
    lastFiveSearches = [];
  }
  if (lastFiveSearches.length > 4) {
    lastFiveSearches.shift();
  }
  return lastFiveSearches;
}

//Function to save the updated array and push to local storage

function saveLastSearches(savedJSONObject) {
  let arrayInit = getSavedSearches();
  if (arrayInit.includes(savedJSONObject) === false) {
    arrayInit.push(savedJSONObject);
    localStorage.setItem("lastFiveSearches", JSON.stringify(arrayInit));
  } else {
    return;
  }
}

//Function to retrieve data from UVI API

function retrieveUVI(lat, lon) {
  let queryURLforUVI = oneCallAPI + lat + "&lon=" + lon + APIkey;

  $.ajax({
    url: queryURLforUVI,
    method: "GET",
  }).then(function (responseUVI) {
    let UVI = responseUVI.current.uvi;
    if (UVI < 3) {
      $("#uvi").html(
        "<b>UV Index: <b>" +
          '<span class="badge badge-pill badge-success">' +
          UVI +
          "</span>"
      );
    } else if (UVI < 6) {
      $("#uvi").html(
        "<b>UV Index: <b>" +
          '<span class="badge badge-pill YellowUVI">' +
          UVI +
          "</span>"
      );
    } else if (UVI < 8) {
      $("#uvi").html(
        "<b>UV Index: <b>" +
          '<span class="badge badge-pill badge-warning">' +
          UVI +
          "</span>"
      );
    } else if (UVI < 11) {
      $("#uvi").html(
        "<b>UV Index: <b>" +
          '<span class="badge badge-pill badge-danger">' +
          UVI +
          "</span>"
      );
    } else if (UVI >= 11) {
      $("#uvi").html(
        "<b>UV Index: <b>" +
          '<span class="badge badge-pill PurpleUVI">' +
          UVI +
          "</span>"
      );
    }
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
  showHistory();
}

//Function to show search history

function showHistory() {
  $("#searchHistoryList").empty();
  $("#searchHistoryList").show();
  lastFiveSearches =
    JSON.parse(window.localStorage.getItem("lastFiveSearches")) || [];
  for (var i = 0; i < lastFiveSearches.length; i++) {
    let newListItem = $("<button>")
      .text(lastFiveSearches[i])
      .attr("class", "list-group-item list-group-item-action");
    $("#searchHistoryList").prepend(newListItem);
  }
  searchAgain();
}

//Function to display the weather for past searches

function searchAgain() {
  $("#searchHistoryList")
    .off("click")
    .on("click", "button", function () {
      historicalSearch = $(this).text();
      retrieveWeather(historicalSearch);
    });
}

//Function to clear search history

function clearHistory(event) {
  event.preventDefault();
  localStorage.clear();
  $("#searchHistoryList").hide();
}
