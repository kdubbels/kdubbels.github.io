import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorTransitioner from './components/ColorTransitioner';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//       </div>
//     );
//   }
// }

// THE COLORS YEAH
const themesList = [
  {
    id: 'original-gold',
    fill: '#303030',
    stroke: '#a78247',
  },
  {
    id: 'blueberry',
    fill: '#171e26',
    stroke: '#248deb',
  },
  {
    id: 'faded-forest',
    fill: '#98c673',
    stroke: '#957a51',
  },
  {
    id: 'good-ol-💅',
    fill: 'papayawhip',
    stroke: 'palevioletred',
  },
  {
    id: 'pale-beach',
    fill: '#ffeead',
    stroke: '#96ceb4',
  },
  {
    id: 'standard',
    fill: '#fcfcfc',
    stroke: '#333',
  },
];

ReactDOM.render(<ColorTransitioner themesList={themesList} />
, document.getElementById('foo'));
