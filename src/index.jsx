import { PropTypes } from "prop-types";
import React, { Component } from "react";
import OutsideClickDetector from "@common/insideOutsideClickDetector";
import { classNames } from "@common/utils";
import Calendar from "@components/calendar";
import "@styles/styles.scss";

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
      ["daterangepicker__flyout-open daterangepicker__flyout-open-" +
      this.props.options.open]: this.state.showFlyout
    });
    return (
      <OutsideClickDetector
        clickHandler={this.insideOutSideClickHandler}
        className="daterangepicker"
      >
        <input type="text" className="daterangepicker__input" />
        <div className={flyoutClassNames}>
          <Calendar date="02/10/2018" format="DD/MM/YYYY" />
          <Calendar date="02/11/2018" format="DD/MM/YYYY" />
        </div>
      </OutsideClickDetector>
    );
  }
}

ReactDateRangePicker.propTypes = {
  options: PropTypes.shape({
    open: PropTypes.string
  })
};

ReactDateRangePicker.defaultProps = {
  options: {
    open: "left"
  }
};

/* istanbul ignore next */
if (module.hot) module.hot.accept();
