import React, { Component } from "react";
import "@styles/styles.scss";
import OutsideClickDetector from "@common/insideOutsideClickDetector";
import { classNames } from "@common/utils";

export default class ReactDateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.insideOutSideClickHandler = ::this.insideOutSideClickHandler;
  }
  componentWillMount() {
    this.setDefaultFlyoutClassName();
  }
  insideOutSideClickHandler(isInsideClick) {
    if (isInsideClick) {
      this.setState({
        showFlyout: isInsideClick
      });
    } else {
      this.setDefaultFlyoutClassName();
    }
  }
  setDefaultFlyoutClassName() {
    this.setState({
      showFlyout: false
    });
  }
  render() {
    let flyoutClassNames = classNames({
      daterangepicker__flyout: true,
      "daterangepicker__flyout--open": this.state.showFlyout
    });
    return (
      <OutsideClickDetector clickHandler={this.insideOutSideClickHandler}>
        <div className="daterangepicker">
          <input type="text" className="daterangepicker__input" />
          <div className={flyoutClassNames} />
        </div>
      </OutsideClickDetector>
    );
  }
}

/* istanbul ignore next */
if (module.hot) module.hot.accept();
