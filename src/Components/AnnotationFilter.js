import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class AnnotationFilter extends Component {
  constructor(props) {

      super(props);      
      this.state = {
	  selected: {
	      'chromatin state': false,
	      'accessible chromatin': false,
	      'variant allelic effects': false,
	      'target gene predictions': false,
	      'binding sites': false,
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
	return this.state.selected[key] ? 'primary' : 'default';
    };
    render() {
	return (
		<ButtonGroup>
		<Button onClick={this.toggleOption} value='chromatin state' variant = {this.getBsStyle('chromatin state')}>
	        Chromatin State
	        </Button>
	        <Button onClick={this.toggleOption} value='accessible chromatin' variant  = {this.getBsStyle('accessible chromatin')}>
	        Accessible Chromatin
                </Button>
	        <Button onClick={this.toggleOption} value='variant allelic effects' variant  = {this.getBsStyle('variant allelic effects')}>
                Variant Allelic Effects
                </Button>
                <Button onClick={this.toggleOption} value='target gene predictions' variant  = {this.getBsStyle('target gene predictions')}>
                Target Gene Predictions
                </Button>
                <Button onClick={this.toggleOption} value='binding sites' variant  = {this.getBsStyle('binding sites')}>
                Binding Sites
                </Button>
                </ButtonGroup>
    );
  }
}
export default AnnotationFilter;
