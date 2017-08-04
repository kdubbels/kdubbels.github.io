import React, { Component } from 'react';
import ThemeBox from './ThemeBox';

class ColorTransitioner extends Component {
  render() {
    return (
      <div className="ColorTransitioner">
        <ThemeBox themesList={this.props.themesList} />
      </div>
    );
  }
}

export default ColorTransitioner;
