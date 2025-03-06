$(document).ready(function () {
    $("#DisplayCurrency").click(GetCurrency);
    $("#Clear").click(ClearForm);
});

let myChart0; 

async function GetCurrency() {
    "use strict";

    let form = $("#myform");

    if (form.valid()) {
        let BaseCurrency = document.getElementById("BaseCurrency").value;
        let ConvertCurrency = document.getElementById("ConvertCurrency").value;
        let apiKey = "1jskOv89X78xC7cODOKkjT916wwZT2qS";
        let FromDate = document.getElementById("FromDate").value;
        let ToDate = document.getElementById("ToDate").value;

        let myURL = `https://api.polygon.io/v2/aggs/ticker/C:${BaseCurrency}${ConvertCurrency}/range/1/day/${FromDate}/${ToDate}?apiKey=${apiKey}`;
        let response = await fetch(myURL);

        if (response.ok) {
            let data = await response.json();

            if (!data.results || data.results.length === 0) {
                alert("No currency data found for the selected dates.");
                return;
            }

            /* Prepare data for Chart.js */
            let labels = [];
            let dataPoints = [];

            data.results.forEach(item => {
                let date = new Date(item.t);
                labels.push(`${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`);
                dataPoints.push(parseFloat(item.c).toFixed(3));
            });

            let ctx0 = document.getElementById("chartjs-0").getContext('2d');

            // Destroy old chart instance if exists
            if (myChart0) {
                myChart0.destroy();
            }

            // Create new chart
            myChart0 = new Chart(ctx0, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: `One (${BaseCurrency} to ${ConvertCurrency})`,
                        data: dataPoints,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: `${BaseCurrency} to ${ConvertCurrency}`
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: `${ConvertCurrency}`
                            },
                            ticks: {
                                callback: function (value) {
                                    return parseFloat(value).toFixed(3);
                                }
                            }
                        }]
                    }
                }
            });

        } else {
            alert("Currency data not found! Status: " + response.status);
        }
    }
}

function ClearForm() {
    "use strict";

    $("#BaseCurrency").val("");
    $("#ConvertCurrency").val("");
    $("#FromDate").val("");
    $("#ToDate").val("");
    

    if (myChart0) {
        myChart0.destroy();
        myChart0 = null;
    }
}
