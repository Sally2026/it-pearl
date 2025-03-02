$(document).ready(function() {
    $("#DisplayCurrency").click(GetCurrency);
});

async function GetCurrency() {
    "use strict";

    // Get a reference to the form - Use the ID of the form
    let form = $("#myform");
    
    // If all of the form elements are valid, the get the form values
    if (form.valid()) {
        
        let BaseCurrency = document.getElementById("BaseCurrency").value;
        let ConvertCurrency = document.getElementById("ConvertCurrency").value;
        let apiKey = "1jskOv89X78xC7cODOKkjT916wwZT2qS"
        let FromDate = document.getElementById("FromDate").value;
        let ToDate = document.getElementById("ToDate").value;  
 
        /* URL for AJAX Call */
        let myURL = `https://api.polygon.io/v2/aggs/ticker/C:${BaseCurrency}${ConvertCurrency}/range/1/day/${FromDate}/${ToDate}?apiKey=${apiKey}`;
        let response = await fetch(myURL);

            /* Check the status */
            if (response.ok) {            
                let responseText = await response.text();
                // Parse the JSON string into an object
                let data = JSON.parse(responseText);

                /* Ensure response contains results */
                if (!data.results || data.results.length === 0) {
                    alert("No currency data found for the selected dates.");
                    return;
                }

                /* Prepare data for Chart.js */
                let labels = [];
                let dataPoints = [];

                data.results.forEach(item => {
                    labels.push(new Date(item.t).toLocaleDateString());
                    dataPoints.push(item.c);
                });
    
            let ctx0 = document.getElementById("chartjs-0");
            let myChart0 = new Chart(ctx0, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Stock Close",
                        data: dataPoints,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        lineTension: 0.1
                    }]
                },
                "options":{ 
                    responsive: false,
                    maintainAspectRatio: true,
                    }
                }
            );
                

        } else {
            /* Handle errors - invalid request */
            alert("Currency data not found! Status: " + response.status);
        }
    }
}

function ClearForm() {
    "use strict;"

    document.getElementById("BaseCurrency").value = "";
    document.getElementById("BaseCurrencyError").innerHTML = "";
    document.getElementById("ConvertCurrency").value = "";
    document.getElementById("ConvertCurrencyError").innerHTML = "";
  
    document.getElementById("FromDate").value = "";
    document.getElementById("FromDateError").innerHTML = "";
    document.getElementById("ToDate").value = "";
    document.getElementById("ToDateError").innerHTML = "";
   
   
    /* Ugly Code to Erase Canvas */
    let canvas0 = document.getElementById("chartjs-0");
    let context0 = canvas0.getContext('2d');    
    context0.clearRect(0, 0, canvas0.width, canvas0.height);
}