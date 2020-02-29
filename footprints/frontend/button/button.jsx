import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export class Button extends React.Component {
  constructor(props) {
    super(props);
    // this.setAnimal = this.props.setAnimal;
 }

  onClick() {
    this.props.setAnimal();
  }

  render() {
    let frog_selected;
    let bird_selected;
    if (this.props.selected === "frog") {
      frog_selected = "btn--selected";
      bird_selected = "";
    } else if (this.props.selected === "bird"){
      frog_selected = "";
      bird_selected = "btn--selected";
    } else {  // if no _selected props are true, the buttons will have no color 
      frog_selected = "";
      bird_selected = ""; 
    }

    return (
      <div className="btn_area">
        <img src="img/bird_button.png" className={`btn btn__bird ${bird_selected}`} onClick={this.onClick.bind(this)} id="bird_btn" alt="bird" />
        <img src="img/frog_button.png" className={`btn btn__frog ${frog_selected}`} onClick={this.onClick.bind(this)} id="frog_btn" alt="frog" />
      </div>
    )
  }
};

Button.propTypes = {
  selected: PropTypes.string.isRequired,
  setAnimal: PropTypes.any.isRequired,
}