import { PropTypes } from "prop-types";
import React, { PureComponent } from "react";
import OutsideClickDetector from "@common/insideOutsideClickDetector";
import { classNames } from "@common/utils";
import Calendar from "@components/calendar";
import "@styles/styles.scss";
import { themes } from "@common/constants/theme";
import cssVars from "css-vars-ponyfill";
import { defaultOptions } from "./js/common/constants/constants";
import moment from "moment";
/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

export default class ReactDateRangePicker extends PureComponent {
  //React lifecycle handlers
  constructor(props) {
    super(props);
    this.insideOutSideClickHandler = ::this.insideOutSideClickHandler;
    this.setFromDate = ::this.setFromDate;
    this.setToDate = ::this.setToDate;
    this.backupOldDates = ::this.backupOldDates;
    this.applyRange = ::this.applyRange;
    this.cancel = ::this.cancel;
    this.clear = ::this.clear;
    this.restoreOldDates = ::this.restoreOldDates;
    this.clearBackedupOldDates = ::this.clearBackedupOldDates;
    this.state = {
      showFlyout: false,
      fromDate: props.options.startDate
        ? moment(props.options.startDate)
        : null,
      toDate: props.options.endDate ? moment(props.options.endDate) : null,
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
    const theme = nextState.options.theme;
    cssVars({
      variables:
        typeof theme === "string"
          ? {
              ...themes[theme]
            }
          : {
              ...themes[nextState.options.defaultColorScheme],
              ...theme
            }
    });
    return nextState;
  }

  //Action/Events handlers and Callbacks
  insideOutSideClickHandler(isInsideClick) {
    if (this.state.showFlyout !== isInsideClick) {
      if (isInsideClick) {
        this.setState({
          showFlyout: isInsideClick
        });
        if (!this.oldDatesStored) {
          this.backupOldDates();
        }
      } else {
        this.setDefaultFlyoutClassName();
        this.clearBackedupOldDates();
      }
    }
  }

  setFromDate(date) {
    if (date.isAfter(this.state.toDate, "date")) {
      this.setState({
        fromDate: date.startOf("day"),
        toDate: date.endOf("day"),
        rangeIsDirty: true
      });
    } else {
      this.setState({
        fromDate: date.startOf("day"),
        rangeIsDirty: true
      });
    }
  }

  setToDate(date) {
    if (date.isBefore(this.state.fromDate, "date")) {
      this.setState({
        fromDate: date.startOf("day"),
        toDate: date.endOf("day"),
        rangeIsDirty: true
      });
    } else {
      this.setState({
        toDate: date.endOf("day"),
        rangeIsDirty: true
      });
    }
  }

  backupOldDates() {
    this.oldFromDate = this.state.fromDate;
    this.oldToDate = this.state.toDate;
    this.oldDatesStored = true;
  }

  restoreOldDates() {
    this.setState({
      fromDate: this.oldFromDate,
      toDate: this.oldToDate
    });
  }

  clearBackedupOldDates() {
    this.oldDatesStored = false;
    this.oldFromDate = this.oldToDate = undefined;
  }

  applyRange() {
    const { fromDate, toDate } = this.state;
    const { format } = this.state.options;
    this.setState({
      selectedRange: `${fromDate.format(format)} - ${toDate.format(format)}`
    });
    this.props.options.onRangeSelected({
      fromDate,
      toDate
    });
    this.setDefaultFlyoutClassName();
    this.clearBackedupOldDates();
  }

  cancel() {
    this.restoreOldDates();
  }

  clear() {
    this.clearSelectedRange();
    this.setDefaultFlyoutClassName();
    this.props.options.onRangeSelected({
      fromDate: undefined,
      toDate: undefined
    });
  }

  clearSelectedRange() {
    this.setState({
      fromDate: undefined,
      toDate: undefined,
      selectedRange: ""
    });
  }

  //Component private methods
  setDefaultFlyoutClassName() {
    this.setState({
      showFlyout: false,
      rangeIsDirty: false
    });
  }

  //Rendering logic
  render() {
    let flyoutClassNames = classNames({
      daterangepicker__flyout: true,
      ["daterangepicker__flyout-open daterangepicker__flyout-open-" +
      this.state.options.open]: this.state.showFlyout
    });
    const { fromDate, toDate, rangeIsDirty } = this.state;
    const { format } = this.state.options;
    return (
      <OutsideClickDetector
        clickHandler={this.insideOutSideClickHandler}
        className="daterangepicker"
      >
        <input
          type="text"
          className="daterangepicker__input"
          defaultValue={this.state.selectedRange}
        />
        <div className={flyoutClassNames}>
          <Calendar
            date={fromDate}
            format={format}
            fromDate={fromDate}
            toDate={toDate}
            onDateSelected={this.setFromDate}
          />
          <Calendar
            date={toDate}
            format={format}
            fromDate={fromDate}
            toDate={toDate}
            onDateSelected={this.setToDate}
          />
          <div className="daterangepicker__input-wrapper">
            <button
              className="daterangepicker__control daterangepicker__control--apply"
              onClick={this.applyRange}
            >
              Apply
            </button>
            <button
              className="daterangepicker__control daterangepicker__control--cancel"
              onClick={this.cancel}
              disabled={!(this.oldDatesStored && rangeIsDirty)}
            >
              Cancel
            </button>
            <button
              className="daterangepicker__control daterangepicker__control--clear"
              onClick={this.clear}
            >
              Clear
            </button>
          </div>
        </div>
      </OutsideClickDetector>
    );
  }
}

ReactDateRangePicker.propTypes = {
  options: PropTypes.shape({
    open: PropTypes.string,
    theme: PropTypes.string,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    onRangeSelected: PropTypes.func
  })
};

ReactDateRangePicker.defaultProps = {
  options: defaultOptions
};

/* istanbul ignore next */
if (module.hot) module.hot.accept();
