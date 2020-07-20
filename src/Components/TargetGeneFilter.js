import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class TargetGeneFilter extends Component {
  constructor(props) {

      super(props);      
      this.state = {
	  selected: {
	      'Chromatin interaction target genes': true,
	      'Coaccessible target genes': true,
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
      
  }
      toggleOption = (e) => {
	  const key = e.target.value;
	  const value = !this.state.selected[key];
	  const newSelected = Object.assign(this.state.selected, {[key]: value});
	  return this.props.onFilter(newSelected);
      };
    getBsStyle(key) {
	return this.state.selected[key] ? 'secondary' : 'outline-secondary';
    };
    render() {
	return (
	        <ButtonToolbar>
		<Col>
		<Row>
	        <Button onClick={this.toggleOption} value='Chromatin interaction target genes' variant = {this.getBsStyle('Chromatin interaction target genes')} size="sm">
	        Chromatin Interaction
                </Button>
		</Row>
		<Row style = {{marginTop: '20px'}}>
		<Button onClick={this.toggleOption} value='Coaccessible target genes' variant = {this.getBsStyle('Coaccessible target genes')} size="sm">
	        Co-accessibility
	        </Button>
		</Row>
		</Col>
		</ButtonToolbar>
	)
    }
	
}
export default TargetGeneFilter;
