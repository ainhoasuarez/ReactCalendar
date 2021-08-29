import React, { Component } from 'react';
import './App.css';

class Employees extends Component {
  render() {
    console.log('render Employees');
    var i = 0;
    var searchText = this.props.searchText;
    var lcSearchText=searchText.toLowerCase();

    return (
      <div className="people">
        {this.props.employees
        .filter((employee) => (
          (searchText!== '' &&  
            (employee.firstName.toLowerCase().indexOf(lcSearchText) !== -1 || 
            employee.lastName.toLowerCase().indexOf(lcSearchText)!==-1)) || !searchText))
        .map(employee => (
            <div key={i++} className="person"><span >{employee.firstName} {employee.lastName}</span></div>
        ))}
      </div>
    );
  }
}

export default Employees;
