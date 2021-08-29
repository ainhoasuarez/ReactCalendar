import React, { Component } from 'react';
import './App.css';

class Search extends Component {
  
  handleChange(e) {
    this.props.handleSearch(e.target.value);
  }

  render() {
    console.log("render Search")
    return (
      <div className="search-employee-wrapper">
        <i className="fa fa-search"/>
        <input type="text" className="search-employee"  value={this.props.searchText} onChange={this.handleChange.bind(this)}  placeholder="Buscar empleado"/>
      </div>
    );
  }
}

export default Search;
