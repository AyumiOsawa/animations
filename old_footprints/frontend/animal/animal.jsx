import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Footprint from '../footprint/footprint.jsx';
import Button from '../button/button.jsx';
import { animals } from '../animals.js';
import './animal.css';

const animal_names = Object.keys(animals);
let current_location = 0;

function Animal() {
  const [current_animal, setCurrentAnimal] = useState('bird');

  const clickHandler = (e) => {
    console.log('clicked')
    if(e.target.id !== current_animal) {
      current_location = (current_location + 1) % animal_names.length;
      setCurrentAnimal(animal_names[current_location]);
    }
  }

  return (
    <div className='container'>
      <div className='btn_container'>
        <Button
          name = 'bird'
          animals = {animals}
          current_animal={current_animal}
          clickHandler={clickHandler}
        />
        <Button
          name = 'frog'
          animals = {animals}
          current_animal={current_animal}
          clickHandler={clickHandler}
        />
      </div>
      <Footprint
        animals = {animals}
        current_animal={current_animal}
      />
    </div>
  );
}

export default Animal;
