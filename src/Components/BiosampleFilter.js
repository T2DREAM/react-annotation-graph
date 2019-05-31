import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
var all = ['liver','HepG2','islet of Langerhans','adipocyte','subcutaneous adipose','visceral omenum adipose','skeletal muscle myoblast','skeletal muscle','pancreas','pancreatic alpha cell','pancreatic beta cell','pancreatic delta cell','pancreatic stellate cell','pancreatic acinar cell','pancreatic cell','pancreatic ductal cell','pancreatic endothelial cell','pancreatic exocrine cell','pancreatic glial cell','pancreatic immune cell','pancreatic polypeptide-secreting cell','heart','aorta','heart left ventricle','heart right ventricle','kidney','right cardiac atrium','endothelial cell of umbilical vein','coronary artery','ascending aorta','CD34-PB','GM12878','H1','K562','caudate nucleus','cingulate gyrus','colonic mucosa','duodenum mucosa','fibroblast of lung','keratinocyte','layer of hippocampus','mammary epithelial cell','mesenchymal cell','mid-frontal lobe','mucosa of rectum','rectal smooth muscle','stomach smooth muscle','substantia nigra','temporal lobe', 'ESC derived cell line', 'muscle of leg','germinal matrix','angular gyrus'];
var relevant_tissues = ['liver','HepG2','islet of Langerhans','adipocyte','subcutaneous adipose','visceral omenum adipose','skeletal muscle myoblast','skeletal muscle','pancreas','pancreatic alpha cell','pancreatic beta cell','pancreatic delta cell','pancreatic stellate cell','pancreatic acinar cell','pancreatic cell','pancreatic ductal cell','pancreatic endothelial cell','pancreatic exocrine cell','pancreatic glial cell','pancreatic immune cell','pancreatic polypeptide-secreting cell'];
var complication_tissues = ['heart','aorta','heart left ventricle','heart right ventricle','kidney','right cardiac atrium','endothelial cell of umbilical vein','coronary artery','ascending aorta'];
var others = ['CD34-PB','GM12878','H1','K562','caudate nucleus','cingulate gyrus','colonic mucosa','duodenum mucosa','fibroblast of lung','keratinocyte','layer of hippocampus','mammary epithelial cell','mesenchymal cell','mid-frontal lobe','mucosa of rectum','rectal smooth muscle','stomach smooth muscle','substantia nigra','temporal lobe', 'ESC derived cell line', 'muscle of leg','germinal matrix','angular gyrus'];
function tissues(x){
    return x
}
class BiosampleFilter extends Component {
    constructor(props) {
      super(props);      
      this.state = {
	  selected: {
	      all: false,
	      relevant_tissues: false,
	      complication_tissues: false,
	      others: false,
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
    getBsStyleDanger(key) {	
	return  this.state.selected[key] ? 'danger' :'outline-danger';
    };
    getBsStyleSuccess(key) {	
	return  this.state.selected[key] ? 'success' :'outline-success';
    };
    getBsStyleWarning(key) {
	return this.state.selected[key] ? 'warning' : 'outline-warning';
    };
    getBsStyleSecondary(key) {
	return this.state.selected[key] ? 'secondary' : 'outline-secondary';
    };
    render() {
	return (
	        <ButtonToolbar>
		<OverlayTrigger placement='top' overlay={<Tooltip>all tissues </Tooltip>}>
		<Button onClick={this.toggleOption} value={tissues(all)}  variant = {this.getBsStyleDanger(all)} size="sm">
	        All Tissues
	        </Button>
		</OverlayTrigger>
		<OverlayTrigger placement='top' overlay={<Tooltip>liver, adipocyte, adipose, skeletal muscle, islet, pancreas </Tooltip>}>
		<Button onClick={this.toggleOption} value={tissues(relevant_tissues)}  variant = {this.getBsStyleSuccess(relevant_tissues)} size="sm">
	        T2D Relevent Tissues
	        </Button>
		</OverlayTrigger>
		<OverlayTrigger placement='top' overlay={<Tooltip>heart, aorta, ventricle, atrium, kidney, endotheial cell </Tooltip>}>
	        <Button onClick={this.toggleOption} value={tissues(complication_tissues)} variant  = {this.getBsStyleWarning(complication_tissues)} size="sm">
	        T2D Complication Tissues
                </Button>
		</OverlayTrigger>
		<OverlayTrigger placement='top' overlay={<Tooltip>brain, stem cells </Tooltip>}>
	        <Button onClick={this.toggleOption} value={tissues(others)} variant  = {this.getBsStyleSecondary(others)} size="sm">
                Others
                </Button>
		</OverlayTrigger>
		</ButtonToolbar>
    );
  }
}
export default BiosampleFilter;
