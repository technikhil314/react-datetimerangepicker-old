import { PropTypes } from "prop-types";
import React, { PureComponent } from "react";
import OutsideClickDetector from "@common/insideOutsideClickDetector";
import { classNames } from "@common/utils";
import Calendar from "@components/calendar";
import "@styles/styles.scss";
import { themes } from "@common/constants/theme";
import cssVars from "css-vars-ponyfill";
import { defaultProps } from "./js/common/constants/constants";
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
    const options = {
      ...defaultProps,
      ...props
    };
    this.state = {
      showFlyout: false,
      fromDate: options.startDate
        ? moment(options.startDate, options.format)
        : null,
      toDate: options.endDate ? moment(options.endDate, options.format) : null,
      selectedRange: "",
      options
    };
  }
  componentDidMount() {
    const { fromDate, toDate } = this.state;
    if (fromDate && toDate) {
      this.applyRange();
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {
      ...prevState,
      options: {
        ...defaultProps,
        ...nextProps
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
        this.setStateDefaults();
        this.clearBackedupOldDates();
      }
    }
  }

  setFromDate(date) {
    let nextState;
    if (date.isAfter(this.state.toDate, "date")) {
      nextState = {
        fromDate: date.startOf("day"),
        toDate: date.endOf("day")
      };
    } else {
      nextState = {
        fromDate: date.startOf("day")
      };
    }
    this.setState({
      ...nextState,
      rangeIsDirty: true
    });
  }

  setToDate(date) {
    let nextState;
    if (date.isBefore(this.state.fromDate, "date")) {
      nextState = {
        fromDate: date.startOf("day"),
        toDate: date.endOf("day")
      };
    } else {
      nextState = {
        toDate: date.endOf("day")
      };
    }
    if (this.state.options.autoApply) {
      this.setState(
        {
          ...nextState,
          rangeIsDirty: true
        },
        this.applyRange
      );
    } else {
      this.setState({
        ...nextState,
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
    if (this.oldDatesStored) {
      this.setState({
        fromDate: this.oldFromDate,
        toDate: this.oldToDate
      });
    }
  }

  clearBackedupOldDates() {
    this.oldDatesStored = false;
    this.oldFromDate = this.oldToDate = undefined;
  }

  applyRange() {
    const { fromDate, toDate } = this.state;
    const { format } = this.state.options;
    this.onRangeSelected(
      fromDate,
      toDate,
      `${fromDate.format(format)} - ${toDate.format(format)}`
    );
    this.setStateDefaults();
    this.clearBackedupOldDates();
  }

  cancel() {
    this.restoreOldDates();
  }

  clear() {
    this.setStateDefaults();
    this.onRangeSelected();
    this.clearBackedupOldDates();
  }

  onRangeSelected(
    fromDate = undefined,
    toDate = undefined,
    selectedRange = ""
  ) {
    this.setState({ fromDate, toDate, selectedRange });
    this.props.onRangeSelected({
      fromDate,
      toDate
    });
  }

  //Component private methods
  setStateDefaults() {
    this.setState({
      showFlyout: false,
      rangeIsDirty: false
    });
  }

  //Rendering logic
  renderFlyout() {
    const { format, autoApply, alwaysOpen } = this.state.options;
    let flyoutClassNames = classNames({
      daterangepicker__flyout: true,
      ["daterangepicker__flyout-open daterangepicker__flyout-open-" +
      this.state.options.open]: this.state.showFlyout,
      "daterangepicker__flyout-always-open": alwaysOpen
    });
    const { fromDate, toDate, rangeIsDirty } = this.state;
    return (
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
        <div className="daterangepicker__controls-wrapper">
          {!autoApply && (
            <button
              className="daterangepicker__control daterangepicker__control--apply"
              onClick={this.applyRange}
              disabled={!(fromDate && toDate)}
            >
              Apply
            </button>
          )}
          {!alwaysOpen && (
            <button
              className="daterangepicker__control daterangepicker__control--cancel"
              onClick={this.cancel}
              disabled={!(this.oldDatesStored && rangeIsDirty)}
            >
              Cancel
            </button>
          )}
          <button
            className="daterangepicker__control daterangepicker__control--clear"
            onClick={this.clear}
            disabled={!(fromDate && toDate)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
  renderRangeInput() {
    return (
      <input
        type="text"
        className="daterangepicker__input"
        defaultValue={this.state.selectedRange}
      />
    );
  }
  render() {
    const { alwaysOpen } = this.state.options;
    if (alwaysOpen) {
      return <div className="daterangepicker">{this.renderFlyout()}</div>;
    }
    return (
      <OutsideClickDetector
        clickHandler={this.insideOutSideClickHandler}
        className="daterangepicker"
      >
        {this.renderRangeInput()}
        {this.renderFlyout()}
      </OutsideClickDetector>
    );
  }
}
/* eslint-disable react/no-unused-prop-types*/
ReactDateRangePicker.propTypes = {
  open: PropTypes.string,
  theme: PropTypes.string,
  startDate: PropTypes.any,
  endDate: PropTypes.any,
  onRangeSelected: PropTypes.func.isRequired,
  format: PropTypes.string,
  autoApply: PropTypes.bool,
  alwaysOpen: PropTypes.bool
};
/* eslint-enable react/no-unused-prop-types*/
ReactDateRangePicker.defaultProps = {
  options: defaultProps
};

/* istanbul ignore next */
if (module.hot) module.hot.accept();
