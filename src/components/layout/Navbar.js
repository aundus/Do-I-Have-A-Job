import React, { Component } from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            Do I Have A Job?
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdjfsXIOPaHSJu2G5C8rK0BnBWpsOuwc4el9hajn3BnYSNrig/viewform"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {};

export default Navbar;
