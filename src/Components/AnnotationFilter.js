import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
var all = ['chromatin state', 'accessible chromatin', 'variant allelic effects', 'target gene predictions','binding sites']
function annotations(x){
    return x
}
class AnnotationFilter extends Component {
  constructor(props) {

      super(props);      
      this.state = {
	  selected: {
	      all:false,
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
	return this.state.selected[key] ? 'primary' : 'outline-primary';
    };
    render() {
	return (
	        <ButtonToolbar>
		<Button onClick={this.toggleOption} value='chromatin state' variant = {this.getBsStyle('chromatin state')} size="sm">
	        Chromatin State
	        </Button>
	        <Button onClick={this.toggleOption} value='accessible chromatin' variant  = {this.getBsStyle('accessible chromatin')} size="sm">
	        Accessible Chromatin
                </Button>
	        <Button onClick={this.toggleOption} value='variant allelic effects' variant  = {this.getBsStyle('variant allelic effects')} size="sm">
                Variant Allelic Effects
                </Button>
                <Button onClick={this.toggleOption} value='target gene predictions' variant  = {this.getBsStyle('target gene predictions')} size="sm">
                Target Gene Predictions
                </Button>
                <Button onClick={this.toggleOption} value='binding sites' variant  = {this.getBsStyle('binding sites')} size="sm">
                Binding Sites
                </Button>
		</ButtonToolbar>
    );
  }
}
export default AnnotationFilter;
