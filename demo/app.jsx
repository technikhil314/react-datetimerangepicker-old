import React, { Component } from "react";
import ReactDateRangePicker from "../dist";

export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    console.log({
      ...this
    });
    this.demo = ::this.demo;
  }
  demo() {}
  render() {
    return (
      <div>
        Hello DemoApp
        <ReactDateRangePicker />
      </div>
    );
  }
}
