"use strict";

// Parameters
const speed = 500;    // The rate of fetching the cursor location & walking (ms)

// Global varaiables?
let counter = 0;
let x;
let y;

// degree calculation & conversion 
const get_rotation_degree = (x, y, prevX, prevY) => {
  const diffX = x - prevX;
  const diffY = y - prevY;
  const rawDeg = Math.atan2(diffY, diffX) * 180 / Math.PI;   // rad -> deg 
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
  let degree = 0;
  let prevX = vw * 0.5; // default value at the center
  let prevY = vh * 0.5;
  let moving = false;

  // EVENT: getting the cursor position at every mousemove
  screen.addEventListener("mousemove", () => {
    x = event.clientX;
    y = event.clientY;
  })

  // EVENT: repeating the operations every (rate) ms
  setInterval(() => {

    // calculate the degree of foot pic rotation
    [degree, prevX, prevY, moving] = get_rotation_degree(x, y, prevX, prevY); 
    
    // right, left, right, left, right ... 
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