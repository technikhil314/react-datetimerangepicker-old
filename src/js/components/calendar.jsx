import React, { Component } from "react";

export default class CalendarComponent extends Component {
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
        </table>
      </div>
    );
  }
}
