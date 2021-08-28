import React, { Component } from 'react';
import './App.css';
import Week from './Week.jsx';
import Columns from './Columns.jsx';
import EmployeeEventsRow from './EmployeeEventsRow.jsx';

class GanttChart extends Component {

  render() {
    var printEmployeeRows=[];
    var employees=this.props.employees;
    var calendar= this.props.weeklyCalendar;
    var handleOpenModal=this.props.handleOpenModal;
    var searchText = this.props.searchText;
    var lcSearchText=searchText.toLowerCase();
    console.log("employees",employees)
    employees.forEach(function(employee,i){
      var lcFirstName=employee.firstName.toLowerCase();
      var lcLastName=employee.lastName.toLowerCase();
      if(searchText!= '' &&  (lcFirstName.indexOf(lcSearchText) !== -1 || lcLastName.indexOf(lcSearchText)!==-1)){
        printEmployeeRows.push(
          <EmployeeEventsRow employee={employee} key={i} handleOpenModal={handleOpenModal} calendar={calendar}/>
        )
      }else if (!searchText){
        printEmployeeRows.push(
          <EmployeeEventsRow employee={employee} key={i} handleOpenModal={handleOpenModal} calendar={calendar}/>
        )
      }
    });

    return (
      <div className="chart">
        <div className="content">
            <Week weeklyCalendar={this.props.weeklyCalendar}></Week>
        </div>
        <Columns weeklyCalendar={this.props.weeklyCalendar} employees={this.props.employees} handleUpdate={this.props.handleUpdate}></Columns>
        <div className="rows">
          {printEmployeeRows}
        </div>
      </div>
    );
  }
}

export default GanttChart;
