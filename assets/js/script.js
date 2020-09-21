//Declare global variables here
const APIkey = '&appid=4d90ce9f0a7bd1882a4f86d3d0c1088b';
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
const uviAPI = 'https://api.openweathermap.org/data/2.5/uvi?lat=';
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const geoAPI = navigator.geolocation;
const units = '&units=metric';
const getWeatherIcon = 'http://openweathermap.org/img/wn/';
let city;
let cityName;
let country;
let lat;
let lon;

//Document ready initialiser
$(document).ready(function() {
    //init();

    //function init() {

    //}

    //Event listeners
    $('#searchBtn').click(search);
});


//Search function
function search() {
    debugger;
    city = $('#searchInput')
        .val()
        .trim();
    
    if (city === "") {
        return;
    }
    $('#searchInput').val("");
    retrieveForecast(city);
};

//Retrieve forecast function

function retrieveForecast(search) {
    retrieveWeather(search);
    retrieveUVI(search);
    retrieve5DayWeather(search);
}

//Function to retrieve data from Weather API

function retrieveWeather(search) {
    let queryURL = weatherAPI + 'q=' + search + units + APIkey;

    $.ajax({
        url: queryURL,
        method: 'GET',
        // Manage 404 to show error message and hide forecast divs
        statusCode: {
            404: function() {
                $('#errorDiv').show();
                $('#todayForecast').hide();
                $('#5dayDiv').hide();
            }
        }
    }).then(function(response) {
        $('#errorDiv').hide();
        $('#todayForecast').show();
        $('#5dayDiv').show();

        let name = response.name;
        let temp = Math.floor(response.main.temp);
        let hum = response.main.humidity;
        let ws = response.wind.speed;
        let date = new Date(response.dt * 1000).toLocaleDateString('en-AU');
        let weatherImg = response.weather[0].icon;
        let weatherImgURL = getWeatherIcon + weatherImg + '.png';
        
        saveHistory(name);

        $('#cityNameDisplay').text(name + ' (' + date + ') ');
        $('#weatherImg').attr('src', weatherImgURL);
        $('#temp').html('<b>Temperature: </b>' + temp + ' °C');
        $('#hum').html('<b>Humidity: </b>' + hum + '%');
        $('#ws').html('<b>Wind Speed: </b>' + ws + ' km/h');

        lat = response.coord.lat;
        lon = response.coord.lon;
        cityName = response.name;
        country = response.sys.country;
    });
};

//Function to retrieve data from UVI API

function retrieveUVI (search) {
    let queryURLforUVI = uviAPI + lat + '&lon=' + lon + APIkey;

    $.ajax({
        url: queryURLforUVI,
        method: 'GET'
    }).then(function(response) {
        let UVI = response.value;
        $('#uvi').html(
            '<b>UV Index: <b>' + '<span class="badge badge-pill badge-info">' +
            uvi +
            '</span>'
        );
    })
}

//Function to retrieve 5-day Forecast data from Forecast API

function retrieve5DayWeather(search) {

}

//Function to detect current user geolocation

//Function to create history array

function createHistory() {

}

//Function to save search history

function saveHistory() {

}

//Function to show search history

function showHistory() {

}

//Function to clear search history

function clearHistory() {

}

//Function to retrieve forecast from history

function retrieveHistory() {

}