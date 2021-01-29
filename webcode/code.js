(function () {
  "use strict";

  var state = 1;

  function Calculator() {
    this.cur = 0;
    this.prev = null;
    this.state = 1;
    this.operator = null;
  }

  var calc = new Calculator();
  var out = document.getElementById("output");

  // function to handle numbers being pressed depending on the state of the calc
  function onButtonPress() {
    if (calc.state === 1) {
      if (calc.cur != 0) {

        //Design choice to limit the number of characters that can be typed to 8
        if (calc.cur.length < 8) {
          calc.cur = calc.cur + this.innerText;
          out.innerText = calc.cur;
        }
      } else {

          calc.cur = this.innerText;
          out.innerText = calc.cur;
        }
      } else {
      calc.cur = this.innerText;
      out.innerText = calc.cur;
      calc.state = 1;
    }
  }

  // function to handle decimal points
  function onDecimal() {
    if (calc.cur === 0 && calc.state === 1) {
      calc.cur = this.innerText;
      out.innerText = calc.cur;
    }

    if (calc.state === 2) {
      calc.cur = this.innerText;
      out.innerText = calc.cur;
      calc.state = 1;
    }

    // does not allow decimals within decimals
    if (calc.cur.includes(".")) {

    }
    // design choice to limit length to 8 which means only allowing decimals if
    // there will be at least one extra space after it
    else if (calc.cur.length < 7) {
      calc.cur = calc.cur + this.innerText;
      out.innerText = calc.cur;
    }
  }

  // function to change the operator to add and either solve or wait for input
  function addCalc() {
    if (calc.state === 2) {
      calc.operator = "+";
    } else {
      if (calc.prev === null) {
        calc.prev = calc.cur;
        calc.operator = "+";
        calc.state = 2;
      } else {
        equalsPressed();
        calc.operator = "+";
      }
    }
  }

  // function to change the operator to subtract and either solve or wait for input
  function subCalc() {
    if (calc.state === 2) {
      calc.operator = "-";
    } else {
      if (calc.prev === null) {
        calc.prev = calc.cur;
        calc.operator = "-";
        calc.state = 2;
      } else {
        equalsPressed();
        calc.operator = "-";
      }
    }
  }

  // function to change the operator to multiply and either solve or wait for input
  function multiplyCalc() {
    if (calc.state === 2) {
      calc.operator = "x";
    } else {
      if (calc.prev === null) {
        calc.prev = calc.cur;
        calc.operator = "x";
        calc.state = 2;
      } else {
        equalsPressed();
        calc.operator = "x";
      }
    }
  }

  // function to change the operator to divide and either solve or wait for input
  function divideCalc() {
    if (calc.state === 2) {
      calc.operator = "/";
    } else {
      if (calc.prev === null) {
        calc.prev = calc.cur;
        calc.operator = "/";
        calc.state = 2;
      } else {
        equalsPressed();
        calc.operator = "/";
      }
    }
  }

  // function to solve the current state of the calculator based on the previous
  // number, the current number, and the current operator
  function equalsPressed() {
    var x = Number(calc.cur);
    var y = Number(calc.prev);
    if (calc.operator === "-") {
      calc.cur = y - x;
    } else if (calc.operator === "+") {
      calc.cur = y + x;
    } else if (calc.operator === "/") {
      calc.cur = y / x;
    } else if (calc.operator === "x") {
      calc.cur = y * x;
    }

    // Design choice to round the output to four decimal places max
    var rounded = Number(calc.cur);
    rounded = Math.round(rounded * 10000) / 10000;
    calc.cur = rounded;


    calc.prev = calc.cur;
    calc.state = 2;
    out.innerText = calc.cur;
    var check = calc.cur.toString();

    // Design decision to error out when the calculator tries to display more than 15 digits
    if (check.length > 15) {
      alert("Error: Calculator digit overflow. Cannot display more than 15 digits. Pressing OK will clear the calculator.");
      clearCalc();
    }
  }

  // function to clear the calculator when the C button is pressed
  function clearCalc() {
    calc.state = 1;
    calc.cur = 0;
    calc.prev = null;
    calc.operator = null;
    out.innerText = calc.cur;
  }

  // function to initialize the buttons to their respective functions
  function init() {
    var btns = document.getElementsByClassName("num");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", onButtonPress);
    }

    var clear = document.getElementById("clear");
    clear.addEventListener("click", clearCalc);

    var sub = document.getElementById("subtract");
    sub.addEventListener("click", subCalc);

    var add = document.getElementById("add");
    add.addEventListener("click", addCalc);

    var multiply = document.getElementById("multiply");
    multiply.addEventListener("click", multiplyCalc);

    var divide = document.getElementById("divide");
    divide.addEventListener("click", divideCalc);

    var dec = document.getElementById("decimal");
    dec.addEventListener("click", onDecimal);
  }

  window.addEventListener('load', init, false);
})();
