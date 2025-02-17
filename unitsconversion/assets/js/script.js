function calculate() {
    "use strict";

    // Get a reference to the form using jQuery
    let form = $("#myform");

    // If all form elements are valid, get the form values
    if (form.valid()) {
        
        // From Value
        let FromValue = document.getElementById("FormValue").value;

        // From Unit
        let FromUnit = "";
        if (document.getElementById("cm").checked) {
            FromUnit = document.getElementById("cm").value;
        }
        if (document.getElementById("m").checked) {
            FromUnit = document.getElementById("m").value;
        }
        if (document.getElementById("km").checked) {
            FromUnit = document.getElementById("km").value;
        }
        if (document.getElementById("in").checked) {
            FromUnit = document.getElementById("in").value;
        }
        if (document.getElementById("ft").checked) {
            FromUnit = document.getElementById("ft").value;
        }
        if (document.getElementById("yd").checked) {
            FromUnit = document.getElementById("yd").value;
        }
        if (document.getElementById("mi").checked) {
            FromUnit = document.getElementById("mi").value;
        }

        // To Unit
        let ToUnit = "";
        if (document.getElementById("tocm").checked) {
            ToUnit = document.getElementById("tocm").value;
        }
        if (document.getElementById("tom").checked) {
            ToUnit = document.getElementById("tom").value;
        }
        if (document.getElementById("tokm").checked) {
            ToUnit = document.getElementById("tokm").value;
        }
        if (document.getElementById("toin").checked) {
            ToUnit = document.getElementById("toin").value;
        }
        if (document.getElementById("toft").checked) {
            ToUnit = document.getElementById("toft").value;
        }
        if (document.getElementById("toyd").checked) {
            ToUnit = document.getElementById("toyd").value;
        }
        if (document.getElementById("tomi").checked) {
            ToUnit = document.getElementById("tomi").value;
        }

        ConvertUnits(FromValue, FromUnit, ToUnit);
    }
}

async function ConvertUnits(FromValue, FromUnit, ToUnit) {
    "use strict";

    // URL and method used with AJAX Call
    let myURL = "https://brucebauer.info/assets/ITEC3650/unitsconversion.php";
    myURL = myURL + "?FromValue=" + encodeURIComponent(FromValue) + "&FromUnit=" + encodeURIComponent(FromUnit) + "&ToUnit=" + encodeURIComponent(ToUnit);

    /* fetch the results */
    let response = await fetch(myURL);
    let result = await response.json();

    document.getElementById("ToValue").innerHTML = result;
}

function clearform() {
    "use strict";

    // Set all of the form values to blank or false
    document.getElementById("FormValue").value = "";

    // Uncheck all "From Unit" radio buttons
    document.getElementById("cm").checked = false;
    document.getElementById("m").checked = false;
    document.getElementById("km").checked = false;
    document.getElementById("in").checked = false;
    document.getElementById("ft").checked = false;
    document.getElementById("yd").checked = false;
    document.getElementById("mi").checked = false;

    // Uncheck all "To Unit" radio buttons
    document.getElementById("tocm").checked = false;
    document.getElementById("tom").checked = false;
    document.getElementById("tokm").checked = false;
    document.getElementById("toin").checked = false;
    document.getElementById("toft").checked = false;
    document.getElementById("toyd").checked = false;
    document.getElementById("tomi").checked = false;

    // Clear the output value
    document.getElementById("ToValue").innerHTML = "";
}

// Initialize jQuery form validation
$("#myform").validate({});