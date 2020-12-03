import React, { Component } from "react";

import Calculator from "./Calculator";

class Tracker extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     error: null,
  //     loading: false,
  //     searchTerm: "",
  //     humans: [],
  //   };
  // }

  render() {
    return (
      <section className="littering_tracker" id="tracker">
        <h2 className="forum">Littering Tracker</h2>
        {/*  implement a map here */}
        <h3>Litering In Your Current Location</h3>
        <p>Littering Level 123</p>
        <label htmlFor="search-term">Search a location where a human presence has been reported:</label>
        <input type="input" name="search" id="search-term" value="" placeholder="vermont" />
        <button type="submit" id="submit-keyword">Search</button>
        <div className="tracking-results">
        <h3>Results for "Vermont":</h3>
        <h4>Montpelier:</h4>
        <p className="lorem">"3 individuals have been reported in this area. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        <p>Littering Level: 3</p>
        </div>
        <div className="tracking-results">
        <h4>Burlington:</h4>
        <p className="lorem">"1 individuals have been reported in this area. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        <p>Littering Level: 5</p>
        </div>
        <Calculator />
      </section>
      );
    }
  }
  export default Tracker;
