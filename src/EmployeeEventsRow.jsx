import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
class EmployeeEventsRow extends Component {
  getStyleForEvent (event,calendar){

    var columnWidth=57.14;
    var from=moment(event.from);
    var to=moment(event.to);
    var diff=to.diff(from, 'days');
    if (diff===0) diff=1;
    var awesomeWidth=(diff*columnWidth).toFixed(2)+'px';
    var firstDay=calendar.getFirstDay();
    var diffFirstDay=from.diff(firstDay,'days');
    var awesomeLeft=(diffFirstDay*columnWidth).toFixed(2)+'px';

    return {
      left:awesomeLeft,
      width:awesomeWidth
    }
  }

  render() {
    var employeeEvents=this.props.employee.events;
    console.log("this.props",this.props);
    var calendar=this.props.calendar;
    var handleOpenModal=this.props.handleOpenModal;
    var printEvents=[];
    var printDays=[];

    for (var i=0;i<35;i++){
      printDays.push(
        <div className="day-element">
          <div className="add-shift js-add-shift" onClick={handleOpenModal}>+</div>
        </div>
      )
    }
    var currentEvents=[];
    employeeEvents.forEach(function(event,i){
      var fromDate=moment(event.from);
      var firstDayOfCurrentCalendar=calendar.getFirstDay();
      var lastDayOfCurrentCalendar=calendar.getLastDay();
      if (fromDate.isBetween(firstDayOfCurrentCalendar, lastDayOfCurrentCalendar)){
        currentEvents.push(event);
      }
    })
    var that=this;
    currentEvents.forEach(function(event,i){
      printEvents.push(
        <div className="event bright-green" key={i} style={that.getStyleForEvent(event,calendar)}>
        </div>
      )
    })

    return (
      <div className="cat-row single" key={this.props.employee.firstName}>
        {printDays}
        {printEvents}
      </div>
    );
  }
}

export default EmployeeEventsRow;
