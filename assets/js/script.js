//Declare global variables here
const APIkey = '&appid=4d90ce9f0a7bd1882a4f86d3d0c1088b';
const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?';
const uviAPI = 'https://api.openweathermap.org/data/2.5/uvi?lat=';
const forecastAPI = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const geoAPI = navigator.geolocation;
const units = '&units=metric';
const getWeatherIcon = 'http://openweathermap.org/img/wn/';
let city;

//Document ready initialiser
$(document).ready(function() {
    //init();

    //function init() {

    //}

    //Event listeners
    $('#searchBtn').on('click', search());
});



//Search function
function search() {
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
    let queryURL = weatherAPI + 'q=' + search + units + APIkey;

    $.ajax({
        url: queryURL,
        method: 'GET',

    }).then(function(response) {
        console.log(response);
    })
}

//Function to detect current user geolocation

//Function to create history array

//Function to save search history

//Function to show search history

//Function to clear search history

//Function to retrieve forecast from history