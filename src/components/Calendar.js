import React, { Component } from "react";
import moment from "moment";
export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateContext: moment(),
      today: moment(),
      selectedDay: moment().format("D"),
      selectedMonth: moment().format("MMM")
    };
  }
  static defaultProps = {
    theme: "dark"
  };
  shortMonths = moment.monthsShort();
  weekDaysShort = moment.weekdaysShort();
  year = () => {
    return this.state.dateContext.format("Y");
  };
  month = () => {
    return this.state.dateContext.format("MMMM");
  };
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  };
  currentDate = () => {
    return this.state.dateContext.get("date");
  };
  currentDay = () => {
    return this.state.dateContext.format("D");
  };
  firstDayofMonth = () => {
    let currDate = this.state.dateContext;
    let firstDay = moment(currDate)
      .startOf("month")
      .format("d");
    return firstDay;
  };
  renderWeekDays = () => {
    return this.weekDaysShort.map(item => {
      return <td key={item}>{item}</td>;
    });
  };
  onDayClick = (e, day) => {
    this.setState({
      selectedDay: day
    });

    this.props.onDayClick && this.props.onDayClick(e, day);
  };
  renderCalendarDays = () => {
    let blanks = [];
    for (let i = 0; i < this.firstDayofMonth(); i++) {
      blanks.push(
        <td
          key={i * 80}
          className={
            this.props.theme === "dark" ? "empty-slot" : "empty-slot-light"
          }
        >
          {""}
        </td>
      );
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = d === +this.currentDay() ? "day current-day" : "day";
      let selectedClass = d === +this.state.selectedDay ? " selected-day " : "";
      daysInMonth.push(
        <td key={d} className={className + selectedClass}>
          <span
            onClick={e => {
              this.onDayClick(e, d);
            }}
          >
            {d}
          </span>
        </td>
      );
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((d, i) => {
      return <tr key={i * 100}>{d}</tr>;
    });
    return trElems;
  };
  setMonth = month => {
    let monthNo = this.shortMonths.indexOf(month);
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).set("month", monthNo);

    this.setState({
      dateContext: dateContext,
      selectedMonth: month
    });
  };

  changeMonthHandler = e => {
    this.setMonth(e.target.value);
  };

  prevMonth = () => {
    let currContext = Object.assign({}, this.state.dateContext);
    currContext = moment(currContext).subtract(1, "month");
    let updatedMonth = moment(currContext).format("MMM");
    this.setState({ dateContext: currContext, selectedMonth: updatedMonth });
  };

  nextMonth = () => {
    let currContext = Object.assign({}, this.state.dateContext);
    currContext = moment(currContext).add(1, "month");
    let updatedMonth = moment(currContext).format("MMM");
    this.setState({ dateContext: currContext, selectedMonth: updatedMonth });
  };

  render() {
    return (
      <div
        className={
          this.props.theme === "light"
            ? "calendar-container-light"
            : "calendar-container"
        }
      >
        <div className="flex-container">
          <select
            className={
              this.props.theme === "light" ? "select-light" : "select-dark"
            }
            name="months"
            value={this.state.selectedMonth}
            onChange={this.changeMonthHandler}
          >
            {this.shortMonths.map((item, i) => {
              return (
                <option key={i + 1} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <div className="caret-pos">
            <a
              href="javaScript:void(0);"
              className={this.props.theme === "light" ? "caret-light" : "caret"}
              onClick={this.prevMonth}
            >
              <i className="material-icons"> chevron_left </i>
            </a>
            <span className="year">
              {`${this.state.dateContext.format(
                "MMM"
              )} ${this.state.dateContext.format("YYYY")}`}
            </span>
            <a
              href="javaScript:void(0);"
              className={this.props.theme === "light" ? "caret-light" : "caret"}
              onClick={this.nextMonth}
            >
              <i className="material-icons"> chevron_right </i>
            </a>
          </div>
        </div>
        <table
          id="table1"
          className={
            this.props.theme === "light" ? "table-light" : "table-dark"
          }
        >
          <thead />
          <tbody>
            <tr>{this.renderWeekDays()}</tr>
            {this.renderCalendarDays()}
          </tbody>
        </table>
        <div />
      </div>
    );
  }
}
