import React, { PureComponent, Fragment } from "react";

export default class HeaderComponent extends PureComponent {
  render() {
    return (
      <Fragment>
        <div className="fork-github-ribbon">
          <a href="https://github.com/technikhil314/react-datetimerangepicker">
            Fork me on github
          </a>
        </div>
        <nav className="navbar navbar-expand-sm bg-light">
          <a className="navbar-brand" href="#">
            ReactDateRangePicker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}
