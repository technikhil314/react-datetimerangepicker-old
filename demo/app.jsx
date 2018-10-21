import React, { Component, Fragment } from "react";
import ReactDateRangePicker from "../dist";
import HeaderComponent from "./header";
export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.onThemeChange = ::this.onThemeChange;
    this.onPositionChange = ::this.onPositionChange;
    this.onAutoApplyChange = ::this.onAutoApplyChange;
    this.onAlwaysOpenChange = ::this.onAlwaysOpenChange;
    this.state = {
      theme: "dark",
      position: "left",
      startDate: "07/12/2018",
      endDate: "07/02/2019",
      format: "DD/MM/YYYY"
    };
  }

  onThemeChange(e) {
    this.setState({
      theme: e.target.value
    });
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  onPositionChange(e) {
    this.setState({
      position: e.target.value
    });
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  onAutoApplyChange(e) {
    this.setState({
      autoApply: e.target.checked
    });
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  onAlwaysOpenChange(e) {
    this.setState({
      alwaysOpen: e.target.checked
    });
    setTimeout(() => {
      this.forceUpdate();
    }, 0);
  }

  render() {
    return (
      <Fragment>
        <HeaderComponent />
        <div className="container-fluid h-100 row">
          <div className="col-md-6 border-right">
            <h3>Configuration options tester</h3>
            <div className="container">
              <div className="row">
                <label className="label col-md-12">
                  <b>Theme</b>
                </label>
                <div className="radio col-md-6">
                  <label htmlFor="light-theme" className="radio-wrapper">
                    <input
                      type="radio"
                      value="light"
                      onChange={this.onThemeChange}
                      checked={this.state.theme === "light"}
                      name="theme"
                      id="light-theme"
                      className="radio-button"
                    />
                    Light
                  </label>
                </div>
                <div className="radio col-md-6">
                  <label htmlFor="dark-theme" className="radio-wrapper">
                    <input
                      type="radio"
                      value="dark"
                      name="theme"
                      checked={this.state.theme === "dark"}
                      onChange={this.onThemeChange}
                      id="dark-theme"
                      className="radio-button"
                    />
                    Dark
                  </label>
                </div>
              </div>
              <div className="row">
                <label className="label form-check-label col-md-12">
                  <b>Position</b>
                </label>
                <div className="radio col-md-6">
                  <label htmlFor="open-left" className="radio-wrapper">
                    <input
                      type="radio"
                      value="left"
                      onChange={this.onPositionChange}
                      checked={this.state.position === "left"}
                      name="position"
                      id="open-left"
                      className="radio-button"
                    />
                    Left
                  </label>
                </div>
                <div className="radio col-md-6">
                  <label htmlFor="open-right" className="radio-wrapper">
                    <input
                      type="radio"
                      value="right"
                      name="position"
                      checked={this.state.position === "right"}
                      onChange={this.onPositionChange}
                      id="open-right"
                      className="radio-button"
                    />
                    Right
                  </label>
                </div>
              </div>
              <div className="row">
                <label className="label form-check-label col-md-12">
                  <b>Auto Apply</b>
                </label>
                <div className="radio col-md-6">
                  <label htmlFor="auto-apply" className="radio-wrapper">
                    <input
                      type="checkbox"
                      name="position"
                      value="true"
                      checked={this.state.autoApply}
                      onChange={this.onAutoApplyChange}
                      id="auto-apply"
                      className="radio-button"
                    />
                    Auto Apply
                  </label>
                </div>
              </div>
              <div className="row">
                <label className="label form-check-label col-md-12">
                  <b>AlwaysOpen</b>
                </label>
                <div className="radio col-md-6">
                  <label htmlFor="always-open" className="radio-wrapper">
                    <input
                      type="checkbox"
                      name="always-open"
                      value="true"
                      checked={this.state.alwaysOpen}
                      onChange={this.onAlwaysOpenChange}
                      id="always-open"
                      className="radio-button"
                    />
                    Always Open
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 h-100">
            <div className="offset-md-3 col-md-6 row">
              <ReactDateRangePicker
                open={this.state.position}
                theme={this.state.theme}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onRangeSelected={() => {}}
                autoApply={this.state.autoApply}
                alwaysOpen={this.state.alwaysOpen}
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
