 // Back to Top Button
 
 jQuery(document).ready(function($) {
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();

    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    };

    updateProgress();

    $(window).scroll(function () {
        updateProgress();
        if ($(this).scrollTop() > 50) {
            $('.progress-wrap').addClass('active-progress');
        } else {
            $('.progress-wrap').removeClass('active-progress');
        }
    });

    $('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 550);
        return false;
    });
});

// Hamburger Menu

document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
  navList.classList.toggle('active');
  document.body.classList.toggle('menu-open');
});
});

// Water Level

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("waterLevelChart").getContext("2d");

  // Function to fetch water level data for a specific river site
  const fetchData = async (siteCode, days) => {
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteCode}&indent=on&period=P${days}D&siteStatus=active&parameterCd=00065`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // Map over the returned data to create an array of objects with a date/time and value
      return data.value.timeSeries[0].values[0].value.map(item => ({
         dateTime: item.dateTime,
         value: parseFloat(item.value)
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null if there's an error
    }
  };

  // Function to update the chart with new data from the selected site.
  const updateChart = async (siteCode, days = 7) => {
    const waterData = await fetchData(siteCode, days);

    if (waterData) {
      // Create labels that reflect the actual date/time each measurement was gathered
      const labels = waterData.map(entry => new Date(entry.dateTime).toLocaleString());
      const values = waterData.map(entry => entry.value);

      // Chart configuration using the fetched labels and values
      const chartData = {
        labels: labels,
        datasets: [{
          label: "Water Level (ft)",
          data: values,
          backgroundColor: "rgba(0, 128, 255, 0.5)",
          borderColor: "rgba(0, 128, 255, 1)",
          borderWidth: 2,
          fill: true
        }]
      };

      const config = {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,  // Needed for auto fit resizing
          plugins: {
            legend: {
              position: "top",
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Water Level (ft)"
              }
            },
            x: {
              title: {
                display: true,
                text: "Date and Time"
              }
            }
          }
        }
      };

      // Clear previous chart if one exists and create a new Chart instance
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
      window.chartInstance = new Chart(ctx, config);
    } else {
      alert("Unable to retrieve water level data. Please try again later.");
    }
  };

  // Set a default site code from one of the header buttons (assumes at least one exists)
  const defaultSiteCode = document.querySelector('.buttons button').dataset.siteCode;
  updateChart(defaultSiteCode, 7);

  // Connect header buttons so clicking one updates the chart with that site's data
  document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
      const siteCode = button.dataset.siteCode;
      updateChart(siteCode, 7);
    });
  });
});


  document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.0809&longitude=-92.5716&daily=temperature_2m_min,temperature_2m_max,rain_sum&hourly=temperature_2m,rain,precipitation,showers&current=temperature_2m,rain,showers&timezone=America%2FChicago&temperature_unit=fahrenheit";

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    const updateWeatherUI = async () => {
        const data = await fetchWeatherData();
        if (!data) return;

        const container = document.getElementById("weatherData");
        container.innerHTML = "";

        // Current Weather Section
        const currentWeather = document.createElement("div");
        currentWeather.classList.add("data-item");
        currentWeather.innerHTML = `
            <h3>Current Weather</h3>
            <p><strong>Temperature:</strong> ${data.current.temperature_2m} °F</p>
            <p><strong>Rain:</strong> ${data.current.rain} inches</p>
            <p><strong>Showers:</strong> ${data.current.showers} inches</p>
        `;
        container.appendChild(currentWeather);

        // Weekly Forecast Section
        const forecastContainer = document.createElement("div");
        forecastContainer.classList.add("weekly-forecast");

        data.daily.time.forEach((day, index) => {
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-item");

            const formattedDate = new Date(day).toLocaleDateString("en-US", { weekday: 'long', month: 'numeric', day: 'numeric' });

            forecastItem.innerHTML = `
                <h3>${formattedDate}</h3>
                <p><strong>High:</strong> ${data.daily.temperature_2m_max[index]} °F</p>
                <p><strong>Low:</strong> ${data.daily.temperature_2m_min[index]} °F</p>
                <p><strong>Rain:</strong> ${data.daily.rain_sum[index]} inches</p>
            `;
            forecastContainer.appendChild(forecastItem);
        });

        container.appendChild(forecastContainer);
    };

    updateWeatherUI();
});

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=36.0809&longitude=-92.5716&daily=temperature_2m_min,temperature_2m_max,rain_sum&hourly=temperature_2m,rain,precipitation,showers&current=temperature_2m,rain,showers&timezone=America%2FChicago&temperature_unit=fahrenheit";

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    };

    const updateWeatherUI = async () => {
        const data = await fetchWeatherData();
        if (!data) return;

        const container = document.getElementById("weatherData");
        container.innerHTML = "";

        // Create ONE container for all weather items
        const forecastContainer = document.createElement("div");
        forecastContainer.classList.add("forecast-section");

        // Add current weather as the first item
        const currentWeather = document.createElement("div");
        currentWeather.classList.add("forecast-item");
        const currentHourIndex = new Date().getHours();
        const hourlyTemperature = data.hourly.temperature_2m[currentHourIndex];

        currentWeather.innerHTML = ` 
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${data.current.temperature_2m} °F</p>
        <p><strong>Hourly Forecast:</strong> ${hourlyTemperature} °F</p>
        <p><strong>Rain:</strong> ${data.current.rain} inches</p>
`      ;
      forecastContainer.appendChild(currentWeather);

      // Add the daily forecasts
      data.daily.time.forEach((day, index) => {
      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");

      const formattedDate = new Date(day).toLocaleDateString("en-US", { weekday: 'long', month: 'numeric', day: 'numeric' });

      forecastItem.innerHTML = `
        <h3>${formattedDate}</h3>
        <p><strong>High:</strong> ${data.daily.temperature_2m_max[index]} °F</p>
        <p><strong>Low:</strong> ${data.daily.temperature_2m_min[index]} °F</p>
        <p><strong>Rain:</strong> ${data.daily.rain_sum[index]} inches</p>
    `;
    forecastContainer.appendChild(forecastItem);
});

      container.appendChild(forecastContainer);

    };

    updateWeatherUI();
});
