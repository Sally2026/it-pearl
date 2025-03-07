
$(document).ready(function() {
    $("#DisplayTemp").click(getWeatherForecast);
  });
  
  async function getWeatherForecast() {
  "use strict";
  
  let form = $("#myform");
  
  if (form.valid()) {
    let locationInput = document.getElementById("location").value;
    if (!locationInput) {
      alert("Please enter a location");
      return;
    }
  
    let geocodeURL = `https://geocoding-api.open-meteo.com/v1/search?name=${locationInput}&count=10&format=json`;
  
    let geocodeResponse = await fetch(geocodeURL);
    if (geocodeResponse.status >= 200 && geocodeResponse.status <= 299) {
      let geocodeData = await geocodeResponse.json();
      if (!geocodeData.results || geocodeData.results.length === 0) {
        alert("No location found.");
        return;
      }
      let locationData = geocodeData.results[0];
  
      let weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=temperature_2m&temperature_unit=fahrenheit`;
      let weatherResponse = await fetch(weatherURL);
      if (weatherResponse.status >= 200 && weatherResponse.status <= 299) {
        let weatherData = await weatherResponse.json();
        let weatherHourly = weatherData.hourly;
  
        let forecastTable =
          "<table><tr><th>Date</th><th>Temperature (°F)</th></tr>";
        let labels = [];
        let temperatures = [];
  
        for (let i = 0; i < weatherHourly.time.length; i++) {
          let unixTime = Date.parse(weatherHourly.time[i]);
          let formattedTime = new Date(unixTime).toLocaleString();
          forecastTable += `<tr><td>${formattedTime}</td><td>${weatherHourly.temperature_2m[i]}</td></tr>`;
          labels.push(formattedTime);
          temperatures.push(weatherHourly.temperature_2m[i]);
        }
        forecastTable += "</table>";
        document.getElementById("forecast-table").innerHTML = forecastTable;
  
        if (window.myChart) {
          window.myChart.destroy();
        }
  
        let ctx = document.getElementById("forecast-chart").getContext("2d");
        window.myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Temperature (°F)",
                data: temperatures,
                borderColor: "blue",
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Date/Time" } },
              y: { title: { display: true, text: "Temperature (°F)" } }
            }
          }
        });
      } else {
        alert("Failed to fetch weather data.");
      }
    } else {
      alert("Failed to fetch location data.");
    }
  }
  }
  
  function clearForm() {
  "use strict";
  document.getElementById("location").value = "";
  document.getElementById("forecast-table").innerHTML = "";
  
  if (window.myChart) {
    window.myChart.destroy();
  }
  }
  