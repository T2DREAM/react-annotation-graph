import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
class TargetGeneFilter extends Component {
  constructor(props) {
      super(props);      
      this.state = {
	  isCheckedInteraction: true,
	  isCheckedCoaccessible: true,
	  selected: {
	      'Chromatin interaction target genes': false,
	      'Coaccessible target genes': false,
	  }
      };
      this.toggleOption = this.toggleOption.bind(this);
  }
    toggleOption = (e) => {
	const key = e.target.value;
	const value = !this.state.selected[key];
	const newSelected = Object.assign(this.state.selected, {[key]: value});
 	this.setState({onFilter: this.props.onFilter(newSelected)});
	//console.log(newSelected);
	//this.setState({isCheckedInteraction: !this.state.selected[key]});
	//this.setState({isCheckedCoaccessible: !this.state.selected[key]});
	//if (e.target.value == 'Chromatin interaction target genes') { this.setState({isCheckedInteraction: !this.state.isCheckedInteraction});}
	//else if (e.target.value == 'Coaccessible target genes') {this.setState({isCheckedCoaccessible: !this.state.isCheckedCoaccessible});}
	//else if (value == 'Coaccessible target genes' && value == 'Chromatin interaction target genes')  {(this.setState({isCheckedInteraction: this.state.isCheckedInteraction})) && (this.setState({isCheckedCoaccessible: this.state.isCheckedCoaccessible}));}
	//else {(this.setState({isCheckedInteraction: !this.state.isCheckedInteraction})) && (this.setState({isCheckedCoaccessible: !this.state.isCheckedCoaccessible}));}
    };
    render() {
	return (
		<Form>
		<Form.Label><h5>Target Gene Type</h5></Form.Label>
		<Form.Check type='checkbox' onClick={this.toggleOption} value='Chromatin interaction target genes' label='Chromatin interaction' style={{fontSize: '0.8rem'}}/>
		<Form.Check type='checkbox' onClick={this.toggleOption} value='Coaccessible target genes' label='Co-accessibility' style={{fontSize: '0.8rem'}}/>
		</Form>
    );
  }
}
export default TargetGeneFilter;
