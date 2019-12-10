import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
class TissueLabelSwitch extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      'ON': false,
	      'OFF': false,
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
    toggleOption = (e) => {
	const key = e.target.value;
	const value = !this.state.selected[key];
	//this.setState({newSelected: {Object.assign( ...this.state.selected, {[key]: value})}});
	const newSelected = Object.assign(this.state.selected, {[key]: value});
	//this.props.onFilter(newSelected);
 	this.setState({onFilter: this.props.onFilter(newSelected)});
    };
    render() {
	return (
	       <Form>
		<Col>
		<Form.Check inline type='radio' onClick={this.toggleOption} value='ON' label='ON' style={{fontSize: '0.9rem'}} />
	        <Form.Check inline type='radio' onClick={this.toggleOption} value='OFF' label='OFF' style={{fontSize: '0.9rem'}} />
		</Col>
                </Form>	
    );
  }
}
export default TissueLabelSwitch;
