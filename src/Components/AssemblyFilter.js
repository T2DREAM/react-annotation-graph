import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
class AssemblyFilter extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      'GRCh37': 'GRCh37',
	      'GRCh38': 'GRCh38',
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
    toggleOption = (e) => {
	const key = e.target.value;
 	this.setState({onFilter: this.props.onFilter(key)});
    };
    render() {
	return (
	        <Form>
		<Form.Label><h5>Assembly</h5></Form.Label>
		<Form.Control as="select" size="sm">
		<option name='assembly' onClick={this.toggleOption} value='GRCh37'>GRCh37</option>
	        <option name='assembly' onClick={this.toggleOption} value='GRCh38'>GRCh38</option>
		</Form.Control>
		</Form>
    );
  }
}
export default AssemblyFilter;
