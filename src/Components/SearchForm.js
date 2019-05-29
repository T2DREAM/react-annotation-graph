import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default class SearchForm extends Component {
    state = {
	searchText: ''
    }
  
    onSearchChange = e => {
	this.setState({ searchText: e.target.value });
    }
  
    handleSubmit = e => {
	e.preventDefault();
	this.props.onSearch(this.query.value);
	//console.log(this.query.value);
	e.currentTarget.reset();
    }  
    render() {  
	return (
		<Form inline onSubmit={this.handleSubmit}>
		<FormControl className="mr-sm-2" type="search" 
            onChange={this.onSearchChange}
            name="search"
	    ref={(input) => this.query = input}
            placeholder="Search..." />
		<Button variant="outline-primary" type="submit" id="submit">Search</Button>
		<div>
		</div>
		</Form>
	
    );
  }
}
