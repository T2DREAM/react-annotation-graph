import React, { Component } from "react";
import Select from "react-select";

let annotations = [
    'chromatin state',
    'accessible chromatin',
    'variant allelic effects',
    'target gene predictions',
    'binding sites'
    ];
let options = [];

options = options.concat(annotations.map(x => x));

function MakeOptions(x) {
    return {value: "'" + x + "'" , label: x};
}

class AnnotationFilter extends Component {
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
	//const { selectedOption } = this.state;
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
export default AnnotationFilter;
