import React, { Component } from "react";
import "@styles/styles.scss";
import OutsideClickDetector from "@common/insideOutsideClickDetector";

export default class ReactDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.handleInsideClick = ::this.handleInsideClick;
    this.handleOutsideClick = ::this.handleOutsideClick;
  }
  handleInsideClick() {}
  handleOutsideClick() {}
  render() {
    this.handleInsideClick();
    return (
      <div>
        Hello ReactDateRangePicker!!!
        <OutsideClickDetector>
          <div>Demo</div>
        </OutsideClickDetector>
      </div>
    );
  }
}
