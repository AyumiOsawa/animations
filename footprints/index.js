// Parameters
const rate = 100;    // The rate of fetching the cursor location (ms)

let timer;
let counter = 0;
let x; 
let y;

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");

  timer = setInterval(() => {
  screen.addEventListener("mousemove", () => {
    x = event.clientX;
    y = event.clientY;
  })
  document.querySelector("#text").textContent = "X: " + x + ", Y: " + y;
  counter++;
  console.log(counter);

  if (counter % 2 === 0) {
    document.querySelector("#birdR").style.left = String(x) + "px";
    document.querySelector("#birdR").style.top = String(y) + "px";
  } else {
    document.querySelector("#birdL").style.left = String(x) + "px";
    document.querySelector("#birdL").style.top = String(y) + "px";
  }

  }, 500);

})