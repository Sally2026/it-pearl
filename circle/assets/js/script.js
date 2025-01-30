"use strict";
$( "#CircleForm" ).validate({

});

function CircleCalculations() {
    if ($("#CircleForm").valid()) {
        let radius;
        let diameter;
        let circumference;
        let radiusfp;
        radius = document.getElementById("radius").value;
        radiusfp = parseFloat(radius);

        diameter = calculateDiameter(radiusfp);
        document.getElementById("diameter").innerHTML = diameter;

        circumference = calculateCircumference(radiusfp);
        document.getElementById("circumference").innerHTML = circumference;
        let x = 1;
    }
}

function calculateDiameter(r) {
    return 2 * r;

}

function calculateCircumference(r) {
    return 2 * Math.PI * r;
    
}