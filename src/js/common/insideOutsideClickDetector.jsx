import React, { Component } from "react";
import PropTypes from "prop-types";
export default class InsideOutsideClickDetector extends Component {
  node = null;
  constructor(props) {
    super(props);
    this.handleDocumentClick = ::this.handleDocumentClick;
  }
  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }
  handleDocumentClick(event) {
    if (!this.node) {
      return false;
    }
    let current = event.target;
    if (this.node.compareDocumentPosition) {
      if (
        this.node.compareDocumentPosition(current) &
        window.Node.DOCUMENT_POSITION_CONTAINED_BY
      ) {
        return this.props.clickHandler(true);
      }
    } else if (this.node.contains) {
      if (this.node.contains(current)) {
        return this.props.clickHandler(true);
      }
    } else {
      do {
        if (current === this.node) {
          return this.props.clickHandler(true);
        }
        current = current.parentNode;
      } while (current);
    }
    this.props.clickHandler(false);
  }
  render() {
    return (
      <div
        className={this.props.className + " insideOutsideClickHandler-wrapper"}
        onClick={this.handleDocumentClick}
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

InsideOutsideClickDetector.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  clickHandler: PropTypes.func.isRequired,
  className: PropTypes.string
};
