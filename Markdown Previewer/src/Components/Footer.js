import React, { Component } from 'react'
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <div className="text-center Footer">
        &nbsp;
        <i className="fa fa-code text-dark fa-lg"></i>
          &nbsp;with&nbsp;
        <i className="fa fa-heart text-danger"></i>
        &nbsp;By Hemakshi Sachdev, 2018
        <ul className="text-center" id="footer-ul">
          <li><a href="https://github.com/hemakshis"><i className="fa fa-github"></i></a></li>
          <li><a href="https://www.freecodecamp.org/hemakshis"><i className="fa fa-free-code-camp"></i></a></li>
          <li><a href="https://www.linkedin.com/in/hemakshis"><i className="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
    );
  }
}

export default Footer
