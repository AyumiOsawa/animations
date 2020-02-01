
document.addEventListener("DOMContentLoaded", () => {
  let vw = document.documentElement.clientWidth;
  let vh = document.documentElement.clientHeight;
  
  const screen = document.querySelector("#screen");
  let eyeY = getComputedStyle(document.querySelector(".eye")).top;    // get position of the eye from CSS
  let eyeX = getComputedStyle(document.querySelector(".eye")).left;
  eyeY = Number(eyeY.slice(0, -2));    // dropping "px" from the end
  eyeX = Number(eyeX.slice(0, -2));
  
  // EVENT : reculculate eye location as the window resizing
  window.addEventListener("resize", () => {
    vw = document.documentElement.clientWidth;
    vh = document.documentElement.clientHeight;
    eyeX = vw * 0.5 + 100;
    eyeY = vh * 0.5 - 130;
    document.querySelector(".eye").style.top = String(eyeY) + "px";
    document.querySelector(".eye").style.left = String(eyeX) + "px";
  })

  // EVENT : the eye following the cursor
  screen.addEventListener("mousemove", () => {
    let x = event.clientX;
    let y = event.clientY;

    let xDiff = x - eyeX;
    let yDiff = y - eyeY;
    let netDist = (xDiff ** 2 + yDiff ** 2 ) ** 0.5;

    let xPos = 10 * xDiff / netDist + eyeX;     // cos
    let yPos = 10 * yDiff / netDist + eyeY;     // sin

    document.querySelector(".eye").style.left = String(xPos) + "px";
    document.querySelector(".eye").style.top = String(yPos) + "px";    
    document.querySelector("#position").textContent = "X: " + xDiff + ", Y: " + yDiff + ", distance: " + netDist;
  })

  // EVENT : eye location reset by clicking
  screen.addEventListener("click", () => {
    document.querySelector(".eye").style.left = String(eyeX) + "px";
    document.querySelector(".eye").style.top = String(eyeY) + "px"; 
  })
})