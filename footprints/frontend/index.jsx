import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.html';

import {Animal} from './animal/animal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.animals = ["frog", "bird"];
  }

  render() {
    return (
      <div>
        <Animal animals={this.animals}/>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
//---------------------------------

      // "use strict";

      // // Parameter
      // const speed = 800;    // The rate of fetching the cursor location & walking (ms)

      // // other variables
      // let counter = 0;
      // let x;
      // let y;
      // let isWalking_frog = true;
      // let isWalking_bird = false;

      // // degree calculation & conversion 
      // const get_rotation_degree = (x, y, prevX, prevY) => {
      //   const diffX = x - prevX;
      //   const diffY = y - prevY;
      //   const rawDeg = Math.atan2(diffY, diffX) * 180 / Math.PI;   // rad -> deg. NOTE: The direction of y axis is opposite to math x-y plane. The returned value is +/- flipped. CSS rotation feature change the angle in clockwise direction whereas it's opposite in math degree system. Leave this +/- flipped value as it is to adjust to CSS system. 
      //   let degreeInCSS = rawDeg + 90;   // add 90 to start from 12:00 direction
      //   let moving;
      //   if (diffX === 0 && diffY === 0) {
      //     moving = false;
      //   } else {
      //     moving = true;
      //   }
      //   prevX = x; 
      //   prevY = y;
      //   document.querySelector("#mouse-position-debug-label").textContent = "X: " + x + ", Y: " + y + ", degree" + degreeInCSS + ", moving: " + String(moving + ", speed: " + speed);
      //   return [degreeInCSS, prevX, prevY, moving];
      // }


// document.addEventListener("DOMContentLoaded", () => {
//   const screen = document.querySelector("#screen");
//   const vh = document.documentElement.clientHeight;
//   const vw = document.documentElement.clientWidth;
//   const birdBtn = document.querySelector("#bird_btn");
//   const frogBtn = document.querySelector("#frog_btn");
//   const frog0 = document.querySelector("#frog0");
//   const frog1 = document.querySelector("#frog1");
//   const birdR = document.querySelector("#birdR");
//   const birdL = document.querySelector("#birdL");
//   let degree = 0;
//   let prevX = vw * 0.5; // default value at the center
//   let prevY = vh * 0.5;
//   let moving = false;

//   // EVENT: add a function to buttons to switch between animals
//   frogBtn.addEventListener("click", () => {
//     frog0.classList.toggle("selected");
//     frog1.classList.toggle("selected");
//     birdR.classList.toggle("selected");
//     birdL.classList.toggle("selected");
//     birdBtn.classList.toggle("btn--selected");
//     frogBtn.classList.toggle("btn--selected");
//     isWalking_frog = !isWalking_frog;
//     isWalking_bird = !isWalking_bird;
//   })

//   // EVENT: add a function to buttons to switch between animals
//   birdBtn.addEventListener("click", () => {
//     frog0.classList.toggle("selected");
//     frog1.classList.toggle("selected");
//     birdR.classList.toggle("selected");
//     birdL.classList.toggle("selected");
//     birdBtn.classList.toggle("btn--selected");
//     frogBtn.classList.toggle("btn--selected");
//     isWalking_bird = !isWalking_bird;
//     isWalking_frog = !isWalking_frog;
//   })

      // // EVENT: getting the cursor position at every mousemove
      // screen.addEventListener("mousemove", () => {
      //   x = event.clientX;
      //   y = event.clientY;
      // })

//   // EVENT: repeating the operations every (rate) ms
//   setInterval(() => {
//     // calculate the degree of foot pic rotation
//     [degree, prevX, prevY, moving] = get_rotation_degree(x, y, prevX, prevY); 

//     // left, right, left, right... 
//     counter++;
//     if (moving) {
//       if (counter % 2 === 0) {
//         birdR.style.transform = "rotate(" + String(degree) + "deg)"; 
//         birdR.style.left = String(x) + "px";
//         birdR.style.top = String(y) + "px";
//       } else {
//         birdL.style.transform = "rotate(" + String(degree) + "deg)";
//         birdL.style.left = String(x) + "px";
//         birdL.style.top = String(y) + "px";
//       } 
//     }

//     // jump, jump, jump...
//     if (moving) {
//       frog1.classList.toggle("current_walk");
//       frog0.classList.toggle("current_walk");
//       if (counter % 2 === 0) {
//         frog0.style.transform = "rotate(" + String(degree) + "deg)"; 
//         frog0.style.left = String(x) + "px";
//         frog0.style.top = String(y) + "px";
//       } else {
//         frog1.style.transform = "rotate(" + String(degree) + "deg)"; 
//         frog1.style.left = String(x) + "px";
//         frog1.style.top = String(y) + "px"; 
//       }
//     }
//   }, speed)



   
    



//   // } else {
//   //   if (moving) {
//   //     frog1.classList.toggle("current_walk");
//   //     frog0.classList.toggle("current_walk");
//   //     if (counter % 2 === 0) {
//   //       frog0.style.transform = "rotate(" + String(degree) + "deg)"; 
//   //       frog0.style.left = String(x) + "px";
//   //       frog0.style.top = String(y) + "px";
//   //     } else {
//   //       frog1.style.transform = "rotate(" + String(degree) + "deg)"; 
//   //       frog1.style.left = String(x) + "px";
//   //       frog1.style.top = String(y) + "px"; 
//   //     }
//   //   }

// })