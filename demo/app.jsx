import React, { Component, Fragment } from "react";
import ReactDateRangePicker from "../dist";
import HeaderComponent from "./header";
export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      daterangepickerOptions: {}
    };
  }

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <div className="container-fluid h-100 row">
          <div className="col-md-6 border-right">
            <h3>Configuration options tester</h3>
          </div>
          <div className="col-md-6 h-100">
            <div className="offset-md-3 col-md-6 row">
              <ReactDateRangePicker
                open="left"
                theme="dark"
                startDate="07.12.2018"
                endDate="07.12.2018"
                onRangeSelected={() => {}}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
