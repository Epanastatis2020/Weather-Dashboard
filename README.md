# Weather-Dashboard

This is a simple weather dashboard which allows the user to input a city, and receive the current and 5-day forecast weather data for that city.

The application saves the past 5 searches so the user can quickly refer to them in subsequent days and see the updated forecast.

This has been achieved using the [OpenWeather API](https://openweathermap.org/api).

## Contents

<p>
The app is composed of 1 page, index.html. It includes a javascript file sciprt.js, which provides all the functionality. There is also a style.css sheet which provides minimal auxiliary styling, as most of the styling is done via Bootstrap.
</p>

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

## Built With

​

- [VScode](https://code.visualstudio.com/) - The editor of choice
- [Git for Windows](https://gitforwindows.org/) - Brings the full feature set of Git SCM to Windows
- [jQuery](https://jquery.com/) - jQuery is a fast, small, and feature-rich JavaScript library.
- [Bootstrap](https://getbootstrap.com/) - The world’s most popular front-end open source toolkit
- [FontAwesome](https://fontawesome.com/) - The web's most popular icon set and toolkit.
- [OpenWeather API](https://openweathermap.org/api) - Weather forecasts, nowcasts and history in fast and elegant way.
  ​

## Summary of project

In this assignment, we were tasked to create a weather dashboard that would dynamically update the page with live weather data for a location of the user's choice.

Surprisingly the OpenWeather API itself was very straightfoward and didn't really pose any issues - rather the challenge lay in passing the necessary returned values around in order to ensure the required functionality was met.

I used Bootstrap to style the app as this gave me an acceptable aesthetic while not consuming a lot of time or effort. I also used FontAwesome icons as my save and delete buttons.

In the future, I would like to update the app so that the background changes based on the weather conditions for the current searched city.

## Screenshots

![Weather Dashboard Landing Page](https://user-images.githubusercontent.com/65388616/94100462-17aa0780-fe71-11ea-8cf2-e257d2987774.png)

![Weather Dashboard Searches](https://user-images.githubusercontent.com/65388616/94100430-f812df00-fe70-11ea-9aec-b423dc261c1d.png)

![Weather Dashboard Dynamic UVI Colouring](https://user-images.githubusercontent.com/65388616/94100500-301a2200-fe71-11ea-8dd5-4c995e829809.png)

## Licence

​
No licence was required for this project.
​

## Link to the site

<a href="https://epanastatis2020.github.io/Weather-Dashboard/">Please visit the site on GitHub Pages</a>

## Acknowledgements

AskBCS was of assistance multiple times during this project, and I really appreciated their speedy responses to my questions.

## Authors

​

- **CON ANGELAKIS** -
  github.com/Epanastatis2020
  con.angelakis@gmail.com
