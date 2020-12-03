import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import TokenService from './services/token-service.js';



class Navbar extends Component {


  logOutClick = () => {
    TokenService.clearAuthToken()
    TokenService.getUserId = (id) => {
    }

    window.location = '/'
  }
  render() {
    return (
      <header className="Navbar">
        <nav>
          <ul className="nav-container">
            <li className="logo"><a href="#home">C vs H</a></li>
            <li className="nav-link"><a href="#about">About</a></li>
            <li className="nav-link"><a href="#tracker">Littering Tracker</a></li>
            <l className="nav-link"i><a href="#live-chat">Live Chat</a></l>
            <li className="log-out nav-link" onClick={this.logOutClick} >Log out</li>
          </ul>
        </nav>

      </header>
    );
  }
}

export default Navbar;
