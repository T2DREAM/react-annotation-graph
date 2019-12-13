import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
class TissueLabelSwitch extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      ON: false,	      
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
    toggleOption = (e) => {
	const key = e.target.value;
	const value = !this.state.selected[key];
	const newSelected = Object.assign(this.state.selected, {[key]: value});
 	this.setState({onFilter: this.props.onFilter(newSelected)});
    };
    render() {
	return (
	       <Form>
		<Col>
		<Form.Check inline type='checkbox' onClick={this.toggleOption} value='ON' label='ON' />
		</Col>
                </Form>	
    );
  }
}
export default TissueLabelSwitch;
