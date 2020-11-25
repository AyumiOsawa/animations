import React, { useState,
                useEffect,
                useRef,
              } from 'react';
import PropTypes from 'prop-types';
import './footprint.css';
import right_foot from '../bird_right.png';
import left_foot from '../bird_left.png';

function Footprint({isOn}) {
  // let raw_x = useRef(center_x);
  // let raw_y = useRef(center_y);
  const center_x = Math.max(document.documentElement.clientWidth/2 || 0, window.innerWidth/2 || 0);
  const center_y = Math.max(document.documentElement.clientHeight/2 || 0, window.innerHeight/2 || 0);
  const average_speed = 1000;
  const R = document.getElementById('right_foot');
  const L = document.getElementById('left_foot');

  const [position, setPosition] = useState({'x': center_x, 'y': center_y});
  let prev_x = useRef(center_x);
  let prev_y = useRef(center_y);
  let throttle = useRef(false);

  const _updatePicture = (degree) => {
    R.classList.toggle('stepping_foot');
    L.classList.toggle('stepping_foot');
    R.style.top = `${position['y']}px`;
    R.style.left = `${position['x']}px`;
    R.style.transform = `rotate(${degree}deg)`;
    L.style.top = `${position['y']}px`;
    L.style.left = `${position['x']}px`;
    L.style.transform = `rotate(${degree}deg)`;
  }

  const drawFootprint = () => {
    // get the current points of cursor.
    // raw_x & raw_y are constantly changing while the cursor is moving.
    // const fixed_x = raw_x;
    // const fixed_y = raw_y;
    //
    // setPosition({
    //   'x': fixed_x,
    //   'y': fixed_y,
    // });

    // check if the cursor has been moved from the previous check.
    const diff_x = (prev_x.current - position.x) === 0;
    const diff_y = (prev_y.current - position.y) === 0;

    // if the cursor is moving, update prev_x & prev_y and redraw.
    if (diff_x || diff_y) {
      prev_x.current = position.x;
      prev_y.current = position.y;
      const new_degree = ( Math.atan2(diff_y, diff_x) * 180 / Math.PI ) + 90;  // rad -> deg. NOTE: The direction of y axis is opposite to math x-y plane. The returned value is +/- flipped. CSS rotation feature change the angle in clockwise direction whereas it's opposite in math degree system. Leave this +/- flipped value as it is to adjust to CSS system.
      _updatePicture(new_degree);
    }
  };

  // const getCursor = event => {
  //   // let raw_x = event.clientX;
  //   // let raw_y = event.clientY;
  //   setPosition({x: event.clientX, y: event.clientY});
  // };

// keeping an eye on the change of isOn
  useEffect(() => {
    console.log('isOn is toggled');
    const screen = document.querySelector('body');
    const speed = average_speed + (Math.random() - 0.5) * 200;
    const getCursor = event => {
      console.log('isOn is true and getCursor is running');
      console.log('throttle should be f:', throttle);

      if(!throttle.current) {
        console.log('throttle should still be f:', throttle);
        throttle.current = true;
        console.log('inside throttle');
        console.log('throttle should be t:', throttle);
        setPosition({x: event.clientX, y: event.clientY});
        setTimeout(() => throttle.current = false, speed);
      }
    };

    if(isOn) {
      screen.addEventListener('mousemove', getCursor);
    } else {
      screen.removeEventListener('mousemove', getCursor);
    }
    return () => screen.removeEventListener('mousemove', getCursor);
  }, [isOn]);

// keep updating while isOn is true, keeping an eye on the change of position
  useEffect(() => {
    if(isOn) drawFootprint();
  }, [position]);

  return (
      <>
        <img
          src={right_foot}
          className='component react--right_foot stepping_foot'
          id='right_foot'
          style={isOn
                  ? {
                      'display': 'inline',
                      'left': position.x,
                      'top': position.y
                    }
                  : {
                      'display': 'none',
                    }
                }
          alt='right foot'
        />
        <img
          src={left_foot}
          className='component react--left_foot'
          id='left_foot'
          style={isOn
                  ? {
                      'display': 'inline',
                      'left': position.x,
                      'top': position.y
                    }
                  : {
                      'display': 'none'
                    }
                }
          alt='left foot'
        />
      </>
  );
}

export default Footprint;

Footprint.propTypes = {
  isOn: PropTypes.bool.isRequired
};
