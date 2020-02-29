import React from 'react';
import PropTypes from 'prop-types';
import {Footprint} from '../footprint/footprint.jsx';
import {Button} from '../button/button.jsx';

export class Animal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animal_id: 1,  // 0:frog, 1:bird
    }
  }

  setAnimal() {
    const current_id = this.state.animal_id;
    const next_id = (current_id + 1) % this.props.animals.length;

    this.setState({
      animal_id: next_id
     })
  }

  render () {
    const animals = this.props.animals;
    console.log("animals: " + animals);
    return (
      <>
        <Button 
          selected={animals[this.state.animal_id]} 
          setAnimal={this.setAnimal.bind(this)}
        />
        <Footprint selected={animals[this.state.animal_id]}/>
      </>
    ); 
  }

}

Animal.propTypes = {
  animals: PropTypes.array.isRequired,
}