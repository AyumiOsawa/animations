import React from 'react';
import PropTypes from 'prop-types';
import './footprint.css';

export class Footprint extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      speed_average: 500
    }
    this.prevX = 0;
    this.prevY = 0;
    this.count = 0;
    this.moving = false;
    this.degree = 0;
    this.rawLocation = {};
    this.speed = this.state.speed_average;
  };


  componentDidMount() {
    // EVENT: getting the cursor position at every mousemovt
    const screen = document.querySelector('#screen');
    screen.addEventListener('mousemove', () => {
      this.rawLocation['x'] = event.clientX;
      this.rawLocation['y'] = event.clientY;
    })

    // start updating
    this.setTimer();
  }

  getPosition() {
    // degree calculation & conversion 
    const currentX = this.rawLocation['x']; 
    const currentY = this.rawLocation['y'];
    const diffX = currentX - this.prevX;
    const diffY = currentY - this.prevY;
    const rawDeg = Math.atan2(diffY, diffX) * 180 / Math.PI;   // rad -> deg. NOTE: The direction of y axis is opposite to math x-y plane. The returned value is +/- flipped. CSS rotation feature change the angle in clockwise direction whereas it's opposite in math degree system. Leave this +/- flipped value as it is to adjust to CSS system. 
    this.degree = rawDeg + 90;   // add 90 to start from 12:00 direction

    // check if the cursor moved
    if (diffX === 0 && diffY === 0) {
      this.moving = false;
    } else {
      this.moving = true;
    }

    // updating the history
    this.prevX = currentX;
    this.prevY = currentY;
    
    // updating count 
    this.count += 1;
  }

  setTimer() {
    clearTimeout(this.timeout);
    this.speed = this.state.speed_average + (Math.random() - 0.5) * 200; // jitter: plus/minus 100ms 
    this.timeout = setTimeout(this.updatePosition.bind(this), this.speed);
  }

  updatePosition() {
    // call setState() here to rerender the picture
    this.getPosition();
    this.setState({x: this.prevX, y: this.prevY}, this.setTimer);
  }

  render() {
    // change the visibility of footprint depending on props.selected
    let frog_selected;
    let bird_selected;
    if(this.props.selected === 'frog') {
      frog_selected = 'selected'; 
      bird_selected = '';
    } else if (this.props.selected === 'bird') {
      frog_selected = ''; 
      bird_selected = 'selected';
    } else { // if no _selected props are true, no footprints will be visible 
      frog_selected = ''; 
      bird_selected = '';
    }

    // left, right, left, right... 
    const frog0 = document.querySelector("#frog0");
    const frog1 = document.querySelector("#frog1");
    const birdR = document.querySelector("#birdR");
    const birdL = document.querySelector("#birdL");
    
    if (this.moving) {
      frog1.classList.toggle("current_walk");
      frog0.classList.toggle("current_walk");
      if (this.count % 2 === 0) {
        birdR.style.transform = "rotate(" + String(this.degree) + "deg)"; 
        birdR.style.left = String(this.state.x) + "px";
        birdR.style.top = String(this.state.y) + "px";
        frog0.style.transform = "rotate(" + String(this.degree) + "deg)"; 
        frog0.style.left = String(this.state.x) + "px";
        frog0.style.top = String(this.state.y) + "px";
      } else {
        birdL.style.transform = "rotate(" + String(this.degree) + "deg)";
        birdL.style.left = String(this.state.x) + "px";
        birdL.style.top = String(this.state.y) + "px";
        frog1.style.transform = "rotate(" + String(this.degree) + "deg)"; 
        frog1.style.left = String(this.state.x) + "px";
        frog1.style.top = String(this.state.y) + "px"; 
      } 
    }

    return (
    <div>
      <img src='img/bird_left.png' className={`bird walk ${bird_selected}`} id='birdL' alt='' />
      <img src='img/bird_right.png' className={`bird walk ${bird_selected}`} id='birdR' alt='' />
      <img src='img/frog_feet0.png' className={`frog jump ${frog_selected} current_walk`} id='frog0' alt='' />
      <img src='img/frog_feet1.png' className={`frog jump ${frog_selected}`} id='frog1' alt='' />
    </div>
    );
  }

  componentWillUnmount() {
    if(this.timeout) {
      clearTimeout(this.timeout);
    }
  }

}

Footprint.propTypes = {
  selected: PropTypes.string.isRequired,
}