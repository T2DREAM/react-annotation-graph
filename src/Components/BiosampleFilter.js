import React, { Component } from "react";
import Select from "react-select";

    let biosamples = [
        'islet of Langerhans',
        'adipocyte',
        'liver',
        'pancreatic alpha cell',
        'pancreatic beta cell',
        'subcutaneous adipose',
        'pancreas',
        'pancreatic delta cell',
        'pancreatic polypeptide-secreting cell',
        'ESC derived cell line',
        'aorta',
        'heart',
        'heart left ventricle',
        'heart right ventricle',
        'kidney',
        'pancreatic stellate cell',
        'right cardiac atrium',
        'skeletal muscle',
        'visceral omenum adipose',
        'CD34-PB',
        'GM12878',
        'H1',
        'HepG2',
        'K562',
        'caudate nucleus',
        'cingulate gyrus',
        'colonic mucosa',
        'duodenum mucosa',
        'endothelial cell of umbilical vein',
        'fibroblast of lung',
        'keratinocyte',
        'layer of hippocampus',
        'mammary epithelial cell',
        'mesenchymal cell',
        'mid-frontal lobe',
        'mucosa of rectum',
        'pancreatic acinar cell',
        'pancreatic cell',
        'pancreatic ductal cell',
        'pancreatic endothelial cell',
        'pancreatic exocrine cell',
        'pancreatic glial cell',
        'pancreatic immune cell',
        'rectal smooth muscle',
        'skeletal muscle myoblast',
        'stomach smooth muscle',
        'substantia nigra',
        'temporal lobe'
    ];
let options = [];

options = options.concat(biosamples.map(x => x));

function MakeOptions(x) {
    return {value: x, label: x};
}

class BiosampleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
    handleChange = (value) => {
	this.props.onFilter(value);
	//console.log(`Option selected:`, newValue);
    };
    render() {
	return (
      <Select
        isMulti
            options={options.map(x => MakeOptions(x))}
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        onChange={this.handleChange}    
      />
    );
  }
}
export default BiosampleFilter;
