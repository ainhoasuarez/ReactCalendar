import React, { Component } from 'react';
import employeeArray from "./employeeArray.js";
import './App.css';
import Employees from './Employees.jsx';
import GanttChart from './GanttChart.jsx';
import moment from 'moment';
import Search from './Search.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    var lotsOfEmployees=[]
    for (var i=1;i<=1000;i++){
      lotsOfEmployees=lotsOfEmployees.concat(employeeArray)
    }
    lotsOfEmployees.forEach(function(emp,i){
      emp._id=i;
    })
    this.state = {
      employees:lotsOfEmployees,
      searchText:''
    };
  }
  
  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  update(day,event){
    var currentEmployees=this.state.employees;
    var selectedEmployee=Math.floor(event.nativeEvent.offsetY/45);
    var currentDayFormatted=day.format('YYYY-MM-DD');
    var nextDayFormatted=moment(currentDayFormatted).add(1,'days').format('YYYY-MM-DD');
    var newelement={from:currentDayFormatted,to:nextDayFormatted,type:'vacation'};
    currentEmployees[selectedEmployee].events.push(newelement);

    this.setState({
      employees:currentEmployees
    });
  }
  
  render() {
    return (
      <div className="gantt">
        
        <Search handleSearch={this.handleSearch.bind(this)}></Search>
        <Employees employees={this.state.employees}  searchText={this.state.searchText} />
        <GanttChart searchText={this.state.searchText} employees={this.state.employees} handleOpenModal={this.handleOpenModal} handleUpdate={this.update.bind(this)}/>
          
      </div>
    );
  }
}

export default App;
