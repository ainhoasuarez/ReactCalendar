import React, { Component } from 'react';
import './App.css';

class Day extends Component {
  render() {
    var passedWeekDays=this.props.weekDays;
    console.log("render Day",passedWeekDays)

    return (
      <div className="each-week">
        {passedWeekDays.map((day,i) => (
            <div className="day" key={i} data-date={day.format('YYYY-MM-DD')}>
          <div>{day.format('ddd')}</div>
          {day.format('DD/MM')}
        </div>
        ))}
      </div>
    );
  }
}

export default Day;
