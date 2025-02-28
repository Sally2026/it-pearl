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
        

                let ctx0 = document.getElementById("chartjs-0");
                let myChart0 = new Chart(ctx0, {
                    "type":"line",
                    "data": {
                        "labels": ,
                        "datasets":[{"label":"Stock Close",
                        "data": ,
                        "fill":false,
                        "borderColor":"rgb(75, 192, 192)",
                        "lineTension":0.1}]},
                        "options":{ 
                            responsive: false,
                            maintainAspectRatio: true,
                        }
                    }
                );
                

        else {
            /* AJAX completed with error - probably invalid stock ticker symbol */
            alert("Currency Not Found - Status: " + msg2Object.status)
            return
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
    let canvas1 = document.getElementById("chartjs-1");
    let context1 = canvas1.getContext('2d');    
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
}