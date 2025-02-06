function calculate() {
    "use strict";
    /* Make sure that the form is valid */
    if ($("#myform").valid()) {
      /* get the operands from the form */
      let operand1 = document.getElementById("Operand1").value;
      let operand2 = document.getElementById("Operand2").value;
  
      /* convert the operands from string to floating point */
      let operand1fp = parseFloat(operand1);
      let operand2fp = parseFloat(operand2);
  
      /* figure out which operator was checked and place the value in operator */
      let operator;
      if (document.getElementById("AddOperator").checked) {
        operator = "Add";
      }
      if (document.getElementById("SubOperator").checked) {
        operator = "Sub";
      }
      if (document.getElementById("MultOperator").checked) {
        operator = "Mult";
      }
      if (document.getElementById("DivOperator").checked) {
        operator = "Div";
      }
  
      let result;
  
      /* if the operator was "Add" then Add two Operand */
      if (operator == "Add") {
        result = operand1fp + operand2fp;
      } else if (operator == "Sub") {
        /* if the operator was "Sub" then subtract */
        result = operand1fp - operand2fp;
      } else if (operator == "Mult") {
        /* if the operator was "Mult" then multiply */
        result = operand1fp * operand2fp;
      } else if (operator == "Div") {
        /* if the operator was "Div" then divide */
        result = operand1fp / operand2fp;
      }
  
      /* convert the result to a string and display it */
      document.getElementById("Result").innerHTML = result.toString();
    }
  }
  
  function clearform() {
    /* Set all of the form values to blank or false */
    document.getElementById("Operand1").value = "";
    document.getElementById("Operand2").value = "";
    document.getElementById("Operand1Error").innerHTML = "";
    document.getElementById("Operand2Error").innerHTML = "";
    document.getElementById("OperatorError").innerHTML = "";
    document.getElementById("AddOperator").checked = false;
    document.getElementById("SubOperator").checked = false;
    document.getElementById("MultOperator").checked = false;
    document.getElementById("DivOperator").checked = false;
    document.getElementById("Result").innerHTML = "";
  }
  
  /* Form Validation */
  $("#myform").validate({
    
  });