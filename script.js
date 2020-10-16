$(document).ready(function () {
  // this is the api Key.
  var APIKey = "100ea10c1f1db96d42a65493df31b77f";
  // this array holds the  cities created by the user search.
  var cities = ["Atlanta"];
  // these hide current weather and five day forecast until needed.
  fiveDayCont.style.display = "none";

  currentWeather.style.display = "none";
  // this function renders the buttons generated by user input.
  function renderButtons() {
    $("#buttonArea").empty();
    // loops through the array of buttons.
    for (var i = 0; i < cities.length; i++) {
      var button = $("<button>");
      button.text(cities[i]);
      button.addClass("searchBtn");
      $("#buttonArea").prepend(button);
    }
    // onclick event for the user generated buttons.
    $(".searchBtn").on("click", function (event) {
      oneDay($(this).text());

      fiveDay($(this).text());
    });
  }
  // onclick event for the main submit button.
  $("#button-addon2").on("click", function (event) {
    var city = $("#searchField").val();
    cities.push(city);

    renderButtons();

    oneDay(city);

    fiveDay(city);
  });
  // this function populates the current weather.
  function oneDay(city) {
    currentWeather.style.display = "block";

    // Here we are building the URL we need to query the current weather
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";

    // we create the ajax call to get the information we need from the API.
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // these append current weather to the screen.
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text("Temp: " + response.main.temp + " ºF");
      // these variables hold the lattitude and longitude from the current weather so they can be reused to get the UV index
      var lat = response.coord.lat;

      var lon = response.coord.lon;
      // this query is for the UV index
      var uvUrl =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey;

      $.ajax({
        url: uvUrl,
        method: "GET",
      }).then(function (response) {
// these appends the UV Index  to thw current weather to the screen.
        $(".uvIndex").text("UV Index: ").append("<span class='uv'>"+ response.value +'</span>');
// these conditionals change the background color of the UV index depending on how high the index is.
        if (response.value <= 3) {
          $(".uv").attr("class", "low");
        }
        //when is it past?
        if (response.value >= 7) {
          $(".uv").attr("class", "high");
        }

        if (response.value > 3 && response.value < 7) {
          $(".uv").attr("class", "med");
        }


      });

      // these variables reformat the date as well as hold query for the weather icons
      var date = new Date(response.dt * 1000).toLocaleDateString();
      var weatherIcon = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

      $.ajax({
        url: iconURL,
        method: "GET",
      }).then(function (response) {});
      // this appends city name weather icon and current date to the current weather.
      $(".city").html(
        "<h3>" + response.name + " (" + date + ")" + "<img src=" + iconURL + ">"
      );
    });
  }
  // this function populates the five day forecast.
  function fiveDay(city) {
    fiveDayCont.style.display = "block";
    // this variables holds the query for the five day forecast
    var fiveDayQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";

    $.ajax({
      url: fiveDayQueryURL,
      method: "GET",
    }).then(function (response) {
      // these append the five day forecast to the screen.
      $(".zeroDate").html(
        new Date(response.list[3].dt * 1000).toLocaleDateString()
      );
      $(".zeroIcon").html(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          response.list[3].weather[0].icon +
          ".png" +
          ">"
      );
      $(".zeroTemp").text("Temp: " + response.list[3].main.temp + " ºF");
      $(".zeroHumidity").text(
        "Humidity: " + response.list[3].main.humidity + "%"
      );

      $(".oneDate").html(
        new Date(response.list[11].dt * 1000).toLocaleDateString()
      );
      $(".oneIcon").html(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          response.list[11].weather[0].icon +
          ".png" +
          ">"
      );
      $(".oneTemp").text("Temp: " + response.list[11].main.temp + " ºF");
      $(".oneHumidity").text(
        "Humidity: " + response.list[11].main.humidity + "%"
      );

      $(".twoDate").html(
        new Date(response.list[19].dt * 1000).toLocaleDateString()
      );
      $(".twoIcon").html(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          response.list[19].weather[0].icon +
          ".png" +
          ">"
      );
      $(".twoTemp").text("Temp: " + response.list[19].main.temp + " ºF");
      $(".twoHumidity").text(
        "Humidity: " + response.list[19].main.humidity + "%"
      );

      $(".threeDate").html(
        new Date(response.list[27].dt * 1000).toLocaleDateString()
      );
      $(".threeIcon").html(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          response.list[27].weather[0].icon +
          ".png" +
          ">"
      );
      $(".threeTemp").text("Temp: " + response.list[27].main.temp + " ºF");
      $(".threeHumidity").text(
        "Humidity: " + response.list[27].main.humidity + "%"
      );

      $(".fourDate").html(
        new Date(response.list[35].dt * 1000).toLocaleDateString()
      );
      $(".fourIcon").html(
        "<img src=" +
          "https://openweathermap.org/img/wn/" +
          response.list[35].weather[0].icon +
          ".png" +
          ">"
      );
      $(".fourTemp").text("Temp: " + response.list[35].main.temp + " ºF");
      $(".fourHumidity").text(
        "Humidity: " + response.list[35].main.humidity + "%"
      );
    });
  }
  // these functions are called when the page loads.
  // I have Atlanta already in the array so that it will populate once the page loads and the page is not blank.
  renderButtons();
  oneDay("Atlanta");
  fiveDay("atlanta");
});