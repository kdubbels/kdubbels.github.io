import React, { Component } from 'react';

import ThemeSample from './ThemeSample';

class ThemeBox extends Component {
  constructor(props) {
    super(props);

    const [firstTheme] = this.props.themesList;
    this.handleChildClick = this.handleChildClick.bind(this);


    this.state = {
      selectedTheme: firstTheme.id,
      stroke: "",
      fill: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem('backgroundColor') && localStorage.getItem('color')) {
      const body = document.body;

      body.style.backgroundColor = localStorage.getItem('backgroundColor');
      body.style.color = localStorage.getItem('color');
    }

  }

  handleChildClick(childData, event) {

    localStorage.setItem('backgroundColor', childData.fill);
    localStorage.setItem('color', childData.stroke);

    console.warn(localStorage)

    const body = document.body;


    if (pageYOffset > 150) {
      document.querySelector('header').style.backgroundColor = localStorage.getItem('color');
      document.querySelector('header').style.color = localStorage.getItem('backgroundColor');
        document.getElementById('el').style = "background-color: " + localStorage.getItem('backgroundColor');
    } else if (pageYOffset <= 150) {
      document.querySelector('header').style.backgroundColor = localStorage.getItem('backgroundColor');
      document.querySelector('header').style.color = localStorage.getItem('color');
          document.getElementById('el').style = "background-color: " + localStorage.getItem('color');
    }

    body.style.backgroundColor = localStorage.backgroundColor;
    body.style.color = localStorage.color;

  }

  render() {
    return (
        <svg viewBox={`0 0 ${12 * this.props.themesList.length} 12`}>
          {this.props.themesList.map((theme, index) =>
            <ThemeSample
              key={theme.id}
              themeName={theme.id}
              r="4"
              cx={6 + 12 * index}
              cy="6"
              fill={theme.fill}
              stroke={theme.stroke}
              onClick={this.handleChildClick}
            />
          )}
        </svg>
    );
  }
}

export default ThemeBox;