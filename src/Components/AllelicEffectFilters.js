import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
class AllelicEffectFilters extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      'deltaSVM': true,
	      'caQTL': true,
	      'pbSNP': true,
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
      toggleOption = (e) => {
	  const key = e.target.value;
	  const value = !this.state.selected[key];
	  const newSelected = Object.assign(this.state.selected, {[key]: value});
	  this.props.onFilter(newSelected);
      };
    getBsStyle(key) {
	return this.state.selected[key] ? 'primary' : 'outline-primary';
    };
    render() {
	return (
	        <Form>
		<Col>
		<Row>
		<Form.Check type='checkbox' onClick={this.toggleOption} value='deltaSVM' disabled label='Allelic Predictions' style={{fontSize: '0.9rem'}} />
		</Row>
		<Row>
	        <Form.Check type='checkbox' onClick={this.toggleOption} value='caQTL' disabled label='Chromatin QTL' style={{fontSize: '0.9rem'}} />
		</Row>
		<Row>
	        <Form.Check type='checkbox' onClick={this.toggleOption} value='pbSNP' disabled label='pbSNP' style={{fontSize: '0.9rem'}} />
		</Row>
		</Col>
		</Form>
    );
  }
}
export default AllelicEffectFilters;
