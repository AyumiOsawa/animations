// Parameters
const speed = 500;    // The rate of fetching the cursor location (ms)

let counter = 0;
let x;
let y;

// degree calculation & conversion 
const deg = (y, x) => {
  let rawDeg = Math.atan2(y, x) * 180 / Math.PI;   // rad -> deg 
  
  // from -180<r<180 to 0<r<360
  if (y < 0) { 
    degree += rawDeg + 360;
  } else {
    degree = rawDeg;
  }
  degree = ( degree - 90 ) * -1;   // -90 to start from 12:00 direction, * -1 to rotate counter clock wise
  return degree;
}

// eventlistenerを外に出す
// #mouse-position-debug-label <- わかりやすいidをつける

document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const vh = document.documentElement.clientHeight;
  const vw = document.documentElement.clientWidth;
  let xDiff = 0; // 90deg by default;
  let yDiff = 1;
  let degree = 90;
  let prevX = vw * 0.5;
  let prevY = vh * 0.5;

  

  // EVENT: repeating the operations every (rate) ms
  setInterval(() => {

    // getting the cursor position
    screen.addEventListener("mousemove", () => {
      x = event.clientX;
      y = event.clientY;
      document.querySelector("#text").textContent = "X: " + x + ", Y: " + y + ", degree: " + degree;
    })

    // calculate the degree of foot pic rotation
    xDiff = x - prevX;
    yDiff = y - prevY;
    degree = deg(yDiff, xDiff); 
    prevX = x; 
    prexY = y;

    // right, left, right, left, right ... 
    counter++;
    if (counter % 2 === 0) {
      // console.log(degree);
      document.querySelector("#birdR").style.transform = "rotate(" + String(degree) + "deg)"; 
      document.querySelector("#birdR").style.left = String(x) + "px";
      document.querySelector("#birdR").style.top = String(y) + "px";

    } else {
      // console.log(degree);
      document.querySelector("#birdL").style.transform = "rotate(" + String(degree) + "deg)";
      document.querySelector("#birdL").style.left = String(x) + "px";
      document.querySelector("#birdL").style.top = String(y) + "px";
    }
  }, speed);

})