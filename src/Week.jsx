import React, { Component } from 'react';
import './App.css';
import Day from './Day.jsx';

class Week extends Component {
  render() {
    var returnedWeeks = this.props.weeklyCalendar.getWeeks();
    console.log("render Week", returnedWeeks);

    return (
      <div className="cal-nav">
        {returnedWeeks.map((week, i) => (
          <div className="week" key={i}>
            <div className="number">
              {week.month} {week.year}
            </div>
            <Day weekDays={week.days} />
          </div>
        ))}
      </div>
    );
  }
}

export default Week;
