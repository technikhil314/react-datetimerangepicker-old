import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import yearArrow from "../../assets/images/double-left-chevron.svg";
import monthArrow from "../../assets/images/single-left-chevron.svg";
export default class CalendarHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.onMonthChange = ::this.onMonthChange;
    this.onYearChange = ::this.onYearChange;
  }
  onMonthChange(value) {
    return () => {
      this.props.onMonthChange(value);
    };
  }
  onYearChange(value) {
    return () => {
      this.props.onYearChange(value);
    };
  }
  render() {
    return (
      <div className="calendarHeader">
        <span className="calendarHeader__prev-buttons">
          <span
            dangerouslySetInnerHTML={{ __html: yearArrow }}
            className="calendarHeader__control calendarHeader__control-year calendarHeader__prev-year"
            onClick={this.onYearChange(-1)}
            title="Previous Year"
          />
          <span
            dangerouslySetInnerHTML={{ __html: monthArrow }}
            className="calendarHeader__control calendarHeader__control-month calendarHeader__prev-month"
            onClick={this.onMonthChange(-1)}
            title="Previous Month"
          />
        </span>
        <span className="calendarHeader__title">{this.props.name}</span>
        <span className="calendarHeader__next-buttons">
          <span
            dangerouslySetInnerHTML={{ __html: monthArrow }}
            className="calendarHeader__control calendarHeader__control-month calendarHeader__next-month"
            onClick={this.onMonthChange(1)}
            title="Next Month"
          />
          <span
            dangerouslySetInnerHTML={{ __html: yearArrow }}
            className="calendarHeader__control calendarHeader__control-year calendarHeader__next-year"
            onClick={this.onYearChange(1)}
            title="Next Year"
          />
        </span>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  name: PropTypes.string,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func
};
