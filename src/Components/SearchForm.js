import React, { Component } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default class SearchForm extends Component {
    state = {
	searchText: 'rs231361'
    }
  
    onSearchChange = e => {
	this.setState({ searchText: e.target.value });
    }
  
    handleSubmit = e => {
	e.preventDefault();
	this.props.onSearch(this.query.value);
	e.currentTarget.reset();
    }  
    render() {
	var id = this.state;
	var variant = id['searchText'];
	return (
		<Form inline onSubmit={this.handleSubmit}>		
		<Form.Label style={{padding: '5px'}}><h5>Search Variants or Coordinates</h5></Form.Label>
		<br/>
		<span>
		<FormControl type="text" className="mr-md-2" 
            onChange={this.onSearchChange}
	    ref={(input) => this.query = input}
	    defaultValue={variant}
            placeholder="Search..." />
		<Button variant="outline-primary" size="sm" type="submit" id="submit">Search</Button>
		</span>
		</Form>
	
    );
  }
}
