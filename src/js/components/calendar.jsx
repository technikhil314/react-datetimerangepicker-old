import React, { Component } from "react";
import { PropTypes } from "prop-types";
import moment from "@lib/extendedMoment";
export default class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarData: CalendarComponent.createCalendarGridData(
        props.date,
        props.format
      )
    };
  }
  static getWeekNumbers(monthRange) {
    let weekNumbers = [];
    let indexOf = [].indexOf;
    Array.from(monthRange.by("days")).map(function(moment) {
      let ref;
      if (
        weekNumbers.length < 6 &&
        ((ref = moment.week()), indexOf.call(weekNumbers, ref)) < 0
      ) {
        return weekNumbers.push(moment.week());
      }
    });

    return weekNumbers;
  }
  static getWeeksRange(weeks, year, month) {
    let weeksRange = [];

    for (let i = 0, len = weeks.length; i < len; i++) {
      let week = weeks[i];
      let firstWeekDay, lastWeekDay;
      if (i > 0 && week < weeks[i - 1]) {
        firstWeekDay = moment([year, month])
          .add(1, "year")
          .week(week)
          .day(0);
        lastWeekDay = moment([year, month])
          .add(1, "year")
          .week(week)
          .day(6);
      } else {
        firstWeekDay = moment([year, month])
          .week(week)
          .day(0);
        lastWeekDay = moment([year, month])
          .week(week)
          .day(6);
      }
      let weekRange = moment.range(firstWeekDay, lastWeekDay);
      weeksRange.push(weekRange);
    }
    return weeksRange;
  }
  static createCalendarGridData(date, format) {
    date = date || moment().format("DD/MM/YYYY");
    let year = moment(date, format).format("YYYY");
    let month = parseInt(moment(date, format).format("MM"), 10) - 1;
    let startDate = moment([year, month]);
    let firstDay = moment(startDate).startOf("month");
    let endDay = moment(startDate).add(60, "d");
    let monthRange = moment.range(firstDay, endDay);
    let weeksRange = [];
    weeksRange = CalendarComponent.getWeeksRange(
      CalendarComponent.getWeekNumbers(monthRange),
      year,
      month
    );

    let weekList = [];
    weeksRange.map(function(week) {
      let daysList = [];
      Array.from(week.by("days")).map(function(day) {
        daysList.push(day);
      });
      weekList.push(daysList);
    });
    return weekList;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...nextProps,
      ...prevState,
      calendarData: CalendarComponent.createCalendarGridData(
        nextProps.date,
        nextProps.format
      )
    };
  }
  getWeekBody(week) {
    return week.map(day => {
      return <td key={day.format("DD/MM")}>{day.format("DD")}</td>;
    });
  }
  getCalendarBody() {
    return this.state.calendarData.map((week, index) => {
      return <tr key={index}>{this.getWeekBody(week)}</tr>;
    });
  }
  render() {
    return (
      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th>SU</th>
              <th>MO</th>
              <th>TU</th>
              <th>WE</th>
              <th>TH</th>
              <th>FR</th>
              <th>SA</th>
            </tr>
          </thead>
          <tbody>{this.getCalendarBody()}</tbody>
        </table>
      </div>
    );
  }
}

CalendarComponent.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string
};

CalendarComponent.defaultProps = {
  date: "",
  format: "DD.MM.YYYY"
};
