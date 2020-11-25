import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './button.css';

function Button(props) {
  const {
    name,
    current_animal,
    animals,
    clickHandler,
  } = props;

  const btn_state = (current_animal === name) ? 'btn--selected' : '';
  const img_src = animals[name].button;

  return (
    <div>
      <img
        id={name}
        className={`btn ${btn_state}`}
        onClick={clickHandler}
        src={img_src}
        alt={name}
      />
    </div>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  current_animal: PropTypes.string.isRequired,
  animals: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
}
