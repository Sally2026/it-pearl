$(document).ready(function() {
    // Initialize jQuery Validation
    $("#CircleForm").validate({
    });

 // When the "Calculate" button is clicked
 $("#btnSubmitCalculate").click(function () {
    if ($("#CircleForm").valid()) {
        let radius = parseFloat($("#radius").val()); // Convert input to floating-point number
        
        let diameter = calcDiameter(radius);
        let circumference = calcCircumference(radius);
        let area = calcArea(radius);
        
        $("#diameter").text(diameter.toFixed(2));
        $("#circumference").text(circumference.toFixed(2));
        $("#area").text(area.toFixed(2));
        }
    });
});

// Function to calculate diameter
function calcDiameter(radius) {
    return 2 * radius; // Diameter = 2 * Radius
}

// Function to calculate circumference
function calcCircumference(radius) {
    return 2 * Math.PI * radius; // Circumference = 2 * π * Radius
}

// Function to calculate area
function calcArea(radius) {
    return Math.PI * radius * radius; // Area = π * Radius²
}

// When the "Clear" button is clicked
    $("#btnSubmitClear").click(function(){
        clearForm();
    });

// Function to clear the form
    function clearForm() {
        $("#radius").val("");
        $("#diameter").text("");
        $("#circumference").text("");
        $("#area").text("");
    }