import React, { Component } from 'react';
import './App.css';
import Week from './Week.jsx';
import Columns from './Columns.jsx';
import EmployeeEventsRow from './EmployeeEventsRow.jsx';
import WeeklyCalendar from './WeeklyCalendar.js';

var calendar = new WeeklyCalendar();
class GanttChart extends Component {

  constructor(props) {
    super(props);
    this.state = { weeklyCalendar: calendar };
  }

  prevWeek() {
    var currentCalendar = this.state.weeklyCalendar;
    currentCalendar.prevWeek();
    this.setState({
      weeklyCalendar: currentCalendar
    })
  }
  nextWeek() {
    var currentCalendar = this.state.weeklyCalendar;
    currentCalendar.nextWeek();
    this.setState({
      weeklyCalendar: currentCalendar
    })
  }

  render() {
    console.log('render GanttChart');
    var printEmployeeRows = [];
    var employees = this.props.employees;
    var calendar = this.state.weeklyCalendar;
    var searchText = this.props.searchText;
    var lcSearchText = searchText.toLowerCase();

    employees.forEach(function (employee, i) {
      var lcFirstName = employee.firstName.toLowerCase();
      var lcLastName = employee.lastName.toLowerCase();
      var repeatText = (lcFirstName.indexOf(lcSearchText) !== -1 || lcLastName.indexOf(lcSearchText) !== -1);
      if (!searchText || (searchText !== '' && repeatText)) {
        printEmployeeRows.push(
          <EmployeeEventsRow employee={employee} key={i} calendar={calendar} />
        )
      }
    });

    return (
      <div>
        <div className="row calendar-buttons">
          <button type="button" onClick={this.prevWeek.bind(this)} className="btn btn-default btn-rounded waves-effect waves-light">
            <span className="btn-label"><i className="fa fa-arrow-left"></i>
            </span>Anterior
          </button>
          <button type="button" onClick={this.nextWeek.bind(this)} className="btn btn-default btn-rounded waves-effect waves-light">
            Siguiente
            <span className="btn-label btn-label-right"><i className="fa fa-arrow-right"></i>
            </span>
          </button>
        </div>

        <div className="chart">
          <div className="content">
            <Week weeklyCalendar={this.state.weeklyCalendar}></Week>
          </div>
          <Columns weeklyCalendar={this.state.weeklyCalendar} handleUpdate={this.props.handleUpdate}></Columns>
          <div className="rows">
            {printEmployeeRows}
          </div>
        </div>
      </div>
    );
  }
}

export default GanttChart;
