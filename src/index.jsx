import { PropTypes } from "prop-types";
import React, { PureComponent } from "react";
import OutsideClickDetector from "@common/insideOutsideClickDetector";
import { classNames } from "@common/utils";
import Calendar from "@components/calendar";
import "@styles/styles.scss";
import { themes } from "@common/constants/theme";
import cssVars from "css-vars-ponyfill";
import { defaultOptions } from "./js/common/constants/constants";

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

export default class ReactDateRangePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.insideOutSideClickHandler = ::this.insideOutSideClickHandler;
    this.state = {
      showFlyout: false,
      ...props,
      options: {
        ...defaultOptions,
        ...props.options
      }
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      ...prevState,
      ...nextProps,
      options: {
        ...defaultOptions,
        ...nextProps.options
      }
    };
    cssVars({
      variables: {
        ...themes[nextState.options.theme]
      }
    });
    return nextState;
  }
  insideOutSideClickHandler(isInsideClick) {
    if (this.state.showFlyout || isInsideClick) {
      if (isInsideClick) {
        this.setState({
          showFlyout: isInsideClick
        });
      } else {
        this.setDefaultFlyoutClassName();
      }
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
      this.state.options.open]: this.state.showFlyout
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
    open: PropTypes.string,
    theme: PropTypes.string
  })
};

ReactDateRangePicker.defaultProps = {
  options: defaultOptions
};

/* istanbul ignore next */
if (module.hot) module.hot.accept();
