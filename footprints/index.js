"use strict";

// Parameter
const speed = 500;    // The rate of fetching the cursor location & walking (ms)

// other variables
let counter = 0;
let x;
let y;

// degree calculation & conversion 
const get_rotation_degree = (x, y, prevX, prevY) => {
  const diffX = x - prevX;
  const diffY = y - prevY;
  const rawDeg = Math.atan2(diffY, diffX) * 180 / Math.PI;   // rad -> deg. NOTE: The direction of y axis is opposite to math x-y plane. The returned value is +/- flipped. CSS rotation feature change the angle in clockwise direction whereas it's opposite in math degree system. Leave this +/- flipped value as it is to adjust to CSS system. 
  let degreeInCSS = rawDeg + 90;   // add 90 to start from 12:00 direction
  let moving;
  if (diffX === 0 && diffY === 0) {
    moving = false;
  } else {
    moving = true;
  }
  prevX = x; 
  prevY = y;
  document.querySelector("#mouse-position-debug-label").textContent = "X: " + x + ", Y: " + y + ", degree" + degreeInCSS + ", moving: " + String(moving);
  return [degreeInCSS, prevX, prevY, moving];
}


document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const vh = document.documentElement.clientHeight;
  const vw = document.documentElement.clientWidth;
  const btn = document.querySelector(".btn");
  const birdBtn = document.querySelector("#bird_btn");
  const frogBtn = document.querySelector("#frog_btn");
  let degree = 0;
  let prevX = vw * 0.5; // default value at the center
  let prevY = vh * 0.5;
  let moving = false;

  // EVENT: add a function to buttons to switch between animals
  frogBtn.addEventListener("click", () => {
    birdBtn.classList.toggle("btn--selected");
    frogBtn.classList.toggle("btn--selected");
  })
  birdBtn.addEventListener("click", () => {
    birdBtn.classList.toggle("btn--selected");
    frogBtn.classList.toggle("btn--selected");
  })

  // EVENT: getting the cursor position at every mousemove
  screen.addEventListener("mousemove", () => {
    x = event.clientX;
    y = event.clientY;
  })

  // EVENT: repeating the operations every (rate) ms
  setInterval(() => {

    // calculate the degree of foot pic rotation
    [degree, prevX, prevY, moving] = get_rotation_degree(x, y, prevX, prevY); 
    
    // left, right, left, right... 
    counter++;
    console.log(counter);
    if (moving) {
      if (counter % 2 === 0) {
        document.querySelector("#birdR").style.transform = "rotate(" + String(degree) + "deg)"; 
        document.querySelector("#birdR").style.left = String(x) + "px";
        document.querySelector("#birdR").style.top = String(y) + "px";
      } else {
        document.querySelector("#birdL").style.transform = "rotate(" + String(degree) + "deg)";
        document.querySelector("#birdL").style.left = String(x) + "px";
        document.querySelector("#birdL").style.top = String(y) + "px";
      } 
    }
    
  }, speed);

})