window.addEventListener("load", update);

let rangeRed = document.querySelector("#range-red");
rangeRed.addEventListener("change", update);

let rangeGreen = document.querySelector("#range-green");
rangeGreen.addEventListener("change", update);

let rangeBlue = document.querySelector("#range-blue");
rangeBlue.addEventListener("change", update);

function update() {
  let red = rangeRed.value;
  let green = rangeGreen.value;
  let blue = rangeBlue.value;

  let inputRed = document.querySelector("#number-red");
  inputRed.value = red;

  let inputGreen = document.querySelector("#number-green");
  inputGreen.value = green;

  let inputBlue = document.querySelector("#number-blue");
  inputBlue.value = blue;

  let string = `rgb(${red},${green},${blue})`;
  let quadrado = document.querySelector("#quadrado");
  quadrado.style.backgroundColor = string;
}
