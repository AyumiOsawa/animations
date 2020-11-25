import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.html';
import Animal from './animal/animal.jsx';

function App() {
  return (
      <Animal />
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
