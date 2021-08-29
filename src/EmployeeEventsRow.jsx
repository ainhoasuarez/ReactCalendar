import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import ReactModal from 'react-modal';

const customStyle = {
  overlay : {
    position          : 'fixed',
    top               : '0px',
    left              : '0px',
    right             : '0px',
    bottom            : '0px',
    backgroundColor   : 'rgba(0,0,0,.5)',
    zIndex: 9999
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    boxShadow                 : '0 7px 17px 0 rgba(0,0,0,.15)'
  }
};
class EmployeeEventsRow extends Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getStyleForEvent (event,calendar) {
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
    console.log("render EmployeeEventsRow",this.props);
    var employeeEvents=this.props.employee.events;
    var calendar=this.props.calendar;
    var printEvents=[];
    var printDays=[];

    for (var i=0;i<35;i++){
      printDays.push(
        <div className="day-element" key={i}>
          <div className="add-shift js-add-shift" onClick={this.handleOpenModal}>+</div>
        </div>
      )
    }
    
    employeeEvents.forEach(function(event,i) {
      var fromDate=moment(event.from);
      var firstDayOfCurrentCalendar=calendar.getFirstDay();
      var lastDayOfCurrentCalendar=calendar.getLastDay();
      if (fromDate.isBetween(firstDayOfCurrentCalendar, lastDayOfCurrentCalendar)){
        printEvents.push(
          <div className="event bright-green" key={i} style={this.useMemo(() => {
            return this.getStyleForEvent(event,calendar);
          }, [event,calendar])}>
          </div>
        )
      }
    })

    return (
      <div className="cat-row single" key={this.props.employee.firstName}>
        {printDays}
        {printEvents}
        <ReactModal
            isOpen={this.state.showModal}
            style={customStyle}
            contentLabel="Minimal Modal Example"
            ariaHideApp={false}>
           <button onClick={this.handleCloseModal}>Close Modal</button>
         </ReactModal>
      </div>
    );
  }
}

export default EmployeeEventsRow;
