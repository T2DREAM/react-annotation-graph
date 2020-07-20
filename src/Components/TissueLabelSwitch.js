import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
class TissueLabelSwitch extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      ON: false
	  },
	  labelTitle: 'show tissue label',
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
    toggleOption = (e) => {
	const key = e.target.value;
	const value = !this.state.selected[key];
	const newSelected = Object.assign(this.state.selected, {[key]: value});
 	this.setState({onFilter: this.props.onFilter(newSelected)});
	if (value == true) {
	    this.setState({ labelTitle: 'hide tissue label' });
	}
	else {
	    this.setState({ labelTitle: 'show tissue label' });
	}
    };
    render() {
	return (
	       <Form>
		<Button variant="outline-secondary" size="sm" onClick={this.toggleOption} value='ON'>{ this.state.labelTitle }</Button>
                </Form>	
    );
  }
}
export default TissueLabelSwitch;
