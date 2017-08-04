import React, { Component } from 'react';


class ThemeSample extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <circle
        className="theme-select"
        key={this.props.themeName}
        r="4"
        cx={this.props.cx}
        cy="6"
        fill={this.props.fill}
        stroke={this.props.stroke}
        strokeWidth={1}
        onClick={this.props.onClick.bind(null, this.props)}
      ></circle>
    )
  }
}

export default ThemeSample;