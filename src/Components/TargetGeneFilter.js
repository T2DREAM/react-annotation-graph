import React, { Component } from "react";
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
class TargetGeneFilter extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      'CHiCAGO': false,
	      'cicero': false,
	      'eQTL': false,
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
      toggleOption = (e) => {
	  const key = e.target.value;
	  const value = !this.state.selected[key];
	  const newSelected = Object.assign(this.state.selected, {[key]: value});
	  this.props.onFilter(newSelected);
	  console.log(newSelected);
      };
    render() {
	return (
	       <Form>
		<Col>
		<Row>
		<Form.Check type='checkbox' onClick={this.toggleOption} value='CHiCAGO' label='Promoter HiC' style={{fontSize: '0.9rem'}} />
		</Row>
		<Row>
	        <Form.Check type='checkbox' onClick={this.toggleOption} value='cicero' label='Co-accessibility' style={{fontSize: '0.9rem'}} />
		</Row>
		<Row>
	        <Form.Check type='checkbox' onClick={this.toggleOption} value='eQTL' label='eQTL' disabled style={{fontSize: '0.9rem'}}/>
		</Row>
		</Col>
                </Form>	
    );
  }
}
export default TargetGeneFilter;
