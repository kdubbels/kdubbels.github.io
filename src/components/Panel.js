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

  componentDidMount() {
    window.onload = function() {
      if (pageYOffset > 150) {
        document.querySelector('header').style.backgroundColor = localStorage.getItem('color');
        document.querySelector('header').style.color = localStorage.getItem('backgroundColor');
        document.getElementById('el').style.backgroundColor = localStorage.getItem('backgroundColor');
      } else if (pageYOffset <= 150) {
        document.querySelector('header').style.backgroundColor = localStorage.getItem('backgroundColor');
        document.querySelector('header').style.color = localStorage.getItem('color');
        document.getElementById('el').style.backgroundColor = localStorage.getItem('color');
      }
    }
    window.onscroll = function() {
      if (pageYOffset > 150) {
        document.querySelector('header').style.backgroundColor = localStorage.getItem('color');
        document.querySelector('header').style.color = localStorage.getItem('backgroundColor');
        document.getElementById('el').style.backgroundColor = localStorage.getItem('backgroundColor');
      } else if (pageYOffset <= 150) {
        document.querySelector('header').style.backgroundColor = localStorage.getItem('backgroundColor');
        document.querySelector('header').style.color = localStorage.getItem('color');
        document.getElementById('el').style.backgroundColor = localStorage.getItem('color');
      }
    }
  }

  handleClick(e) {
  	e.preventDefault();

    console.log('foo');
    console.log(e);

    let isVisible;
    if (this.state.isVisible == "") {
    	isVisible = "is-visible";
      if (pageYOffset > 150) {
        document.getElementById('el').style.backgroundColor = localStorage.getItem('backgroundColor');
      } else if (pageYOffset <= 150) {
        document.getElementById('el').style.backgroundColor = localStorage.getItem('color');
      }

      document.getElementById('page').style.filter = "blur(2px)";
      document.querySelector('footer.footer').style.filter = "blur(2px)";

    } else {
    	isVisible = "";
      if (pageYOffset > 150) {
        document.getElementById('el').style.backgroundColor = localStorage.getItem('backgroundColor');
      } else if (pageYOffset <= 150) {
        document.getElementById('el').style.backgroundColor = localStorage.getItem('color');
      }

      document.getElementById('page').style.filter = "";
      document.querySelector('footer.footer').style.filter = "";
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
      // backgroundColor: this.state.fill
    }

    const paddingRight = {
      padding: "0 45px 0 0"
    }

    return (
      <div className="Panel" style={paddingRight}>

        <div id="threeLines" className={this.state.isVisible ? "active" : ""} onClick={this.handleClick}>
    		  <button id="el"></button>
    		</div>
    		
    		<nav className={"js-menu sliding-panel-content " + this.state.isVisible} style={style} role="navigation">
    		  <ul>
    		    <li><a href="/about/">About</a></li>
    		    <li><a href="/blog/">Blog</a></li>
            <li><a href="/portfolio/">Portfolio</a></li>
    		  </ul>
    		</nav>

    		<div className={"js-menu-screen sliding-panel-fade-screen " + this.state.isVisible} onClick={this.handleClick}></div>

      </div>
    );
  }
}

export default Panel;