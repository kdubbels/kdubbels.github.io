import React, { Component } from 'react';

// $(document).ready(function(){
//   $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
//     $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
//     e.preventDefault();
//   });
// });

class Panel extends Component {
  constructor(props) {
    super(props);

	const [firstTheme] = this.props.themesList;

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      key: 'value',
      isVisible: "",
      selectedTheme: firstTheme.id,
      stroke: localStorage.getItem('color'),
      fill: localStorage.getItem('backgroundColor')
    };


  }

  handleClick(e) {
  	e.preventDefault();

    console.log('foo');
    console.log(e);

    let isVisible;
    if (this.state.isVisible == "") {
    	isVisible = "is-visible";
    } else {
    	isVisible = "";
    }

    this.setState({
    	isVisible: isVisible,
      stroke: localStorage.getItem('color'),
      fill: localStorage.getItem('backgroundColor')
    })

  }

  render() {
  	const style = {
  		backgroundColor: this.state.fill,
  		color: this.state.stroke
  	};

    const elStyle = {
      backgroundColor: this.state.stroke
    }

    const paddingRight = {
      padding: "0 45px 0 0"
    }

    return (
      <div className="Panel" style={paddingRight}>

        <div id="threeLines" className={this.state.isVisible ? "active" : ""} onClick={this.handleClick}>
    		  <button id="el" style={elStyle}></button>
    		</div>
    		
    		<nav className={"js-menu sliding-panel-content " + this.state.isVisible} style={style}>
    		  <ul>
    		    <li><a href="/about/">About</a></li>
    		    <li><a href="/blog/">Blog</a></li>
    		  </ul>
          
    		</nav>

    		<div className={"js-menu-screen sliding-panel-fade-screen " + this.state.isVisible} onClick={this.handleClick}></div>

      </div>
    );
  }
}

export default Panel;