import React, { Component, Fragment } from "react";
import ReactDateRangePicker from "../dist";
import HeaderComponent from "./header";
export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.demo = ::this.demo;
  }
  daterangepickerOptions = {
    open: "left"
  };
  demo() {}
  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <div className="container-fluid h-100">
          <div className="col-md-6 row border-right h-100">
            <div className="offset-md-3 col-md-6 row">
              <ReactDateRangePicker options={this.daterangepickerOptions} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
