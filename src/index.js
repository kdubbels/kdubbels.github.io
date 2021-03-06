import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ColorTransitioner from './components/ColorTransitioner';
import Panel from './components/Panel';

const themesList = [
  {
    id: 'original-gold',
    fill: '#303030',
    stroke: '#a78247',
  },
  {
    id: 'homebrew',
    fill: 'rgba(0,0,0,0.7)',
    stroke: 'rgba(5, 254, 4, 0.9)',
  },
  {
    id: 'commodore-64',
    fill: '#4C36A7',
    stroke: '#C4ACFF'
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
    fill: 'rgba(252,252,252,0.85)',
    stroke: 'rgba(51,51,51,0.85)',
  },
];

ReactDOM.render(<ColorTransitioner themesList={themesList} />
, document.getElementById('colorPicker'));

ReactDOM.render(<Panel themesList={themesList} />
, document.getElementById('panel'));
