// Parameters
const rate = 100;    // The rate of fetching the cursor location (ms)


let timer;
let x; 
let y;

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  // screen.addEventListener("mousemove", () => {
  //   x = event.clientX;
  //   y = event.clientY;
  // })
 

  timer = setInterval(() => {

  screen.addEventListener("mousemove", () => {
    x = event.clientX;
    y = event.clientY;
  })
  document.querySelector("#text").textContent = "X: " + x + ", Y: " + y;
  }, 200);

})