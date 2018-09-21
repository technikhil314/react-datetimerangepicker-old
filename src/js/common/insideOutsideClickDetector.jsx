import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
export default class InsideOutsideClickDetector extends Component {
  render() {
    return (
      <Fragment>
        <div>{this.props.children}</div>
        <div>Demo</div>
      </Fragment>
    );
  }
}

InsideOutsideClickDetector.propTypes = {
  children: PropTypes.object
};
