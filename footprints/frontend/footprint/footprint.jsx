import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './footprint.css';

const screen = document.getElementById('screen');
let raw_location = {};
let timeout = null;
let prev_x = document.documentElement.clientWidth * 0.5;  // default: center
let prev_y = document.documentElement.clientHeight * 0.5;  // default: center
let current_x = prev_x;
let current_y = prev_y;
let degree = 0;
let is_moving = true;
let steps = 0;
let is_right_feet = true;
const styles = {
  'left': prev_x,
  'top': prev_y,
  'transform': '0deg',
};

function Footprint(props) {
  const [xy, setXY] = useState({'x': null, 'y': null});
  const {
        animals,
        current_animal,
        } = props;

  function getPosition() {
    // degree calculation & conversion
    current_x = raw_location['x'];
    current_y = raw_location['y'];
    const diff_x = current_x - prev_x;
    const diff_y = current_y - prev_y;
    const raw_degree = Math.atan2(diff_y, diff_x) * 180 / Math.PI;   // rad -> deg. NOTE: The direction of y axis is opposite to math x-y plane. The returned value is +/- flipped. CSS rotation feature change the angle in clockwise direction whereas it's opposite in math degree system. Leave this +/- flipped value as it is to adjust to CSS system.

    // check if the cursor moved
    if (diff_x === 0 && diff_y === 0) {
      is_moving = false;
    } else {
      is_moving = true;
    }

    if (is_moving) {
      degree = raw_degree + 90;   // add 90 to start from 12:00 direction
      // updating the history
      prev_x = current_x;
      prev_y = current_y;
    }

    // set the front feet
    is_right_feet = !is_right_feet;
  }


  function updatePosition() {
    // change xy (state) here to rerender the pictures
    getPosition();
    // const new_state = {
    //   'x': current_x,
    //   'y': current_y,
    // };
    setXY({
    ...prevState, 'x': current_x, 'y': current_y});
  }

  function setTimer() {
    const speed = animals[current_animal].speed + (Math.random() - 0.5) * 200; // jitter: plus/minus 100ms
    // console.log('speed: '+ speed)
    timeout = setTimeout(updatePosition, speed);
    console.log('new timer: '+timeout)
  }


  useEffect(() => { // runs only in the first render
    console.log('componentDidMount')
    console.log('current_x: '+current_x)
    console.log('current_y: '+current_y)
    // EVENT: getting the cursor position at every mousemovt
    screen.addEventListener('mousemove', () => {
      raw_location['x'] = event.clientX;
      raw_location['y'] = event.clientY;
    })

    // start updating
    timeout = setTimer();
    clearTimeout(timeout);

    // REMOVE EVENT
    return () => { // equivalent to componentWillUnmount
      screen.removeEventListener('mousemove', () => {
        raw_location['x'] = event.clientX;
        raw_location['y'] = event.clientY;
      })
    }
  },[]);


  useEffect(() => { // equivalent to componentDidUpdated
    console.log('componentDidUpdated')
    console.log('current_x: '+current_x)
    console.log('current_y: '+current_y)

    // timeout = setTimer();
    // clearTimeout(timeout);

    // dinamically change CSS
    const R = document.getElementById(`${current_animal}R`);
    const L = document.getElementById(`${current_animal}L`);

    // show the front feet, hide the back feet
    if(is_moving) {
      R.classList.toggle('behind_feet');
      L.classList.toggle('behind_feet');
    }
  })

  return (
    <div className='foorprint_container'>
        <img
          src={animals[current_animal].footprint_r}
          className={`footprint ${current_animal}`}
          id={`${current_animal}R`}
          alt=''
          style={{
            'border': '1px solid red',
            'transform': `rotate(${degree}deg)`,
            'left': `${current_x}px`,
            'top': `${current_y}px`
          }}
        />
        <img
          src={animals[current_animal].footprint_l}
          className={`footprint ${current_animal} behind_feet`}
          id={`${current_animal}L`}
          alt=''
          style={{
            'border': '1px solid blue',
            'transform': `rotate(${degree}deg)`,
            'left': `${current_x}px`,
            'top': `${current_y}px`
          }}
        />
    </div>
  );
}

export default Footprint;

Footprint.propTypes = {
  animals: PropTypes.object.isRequired,
  current_animal: PropTypes.string.isRequired,
}
