import React, { Component, Fragment } from "react";
import ReactDateRangePicker from "../dist";

export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.demo = ::this.demo;
  }
  demo() {}
  render() {
    return (
      <Fragment>
        Hello DemoApp
        <ReactDateRangePicker />
      </Fragment>
    );
  }
}
