import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import AnnotationFilter from './Components/AnnotationFilter';
import BiosampleFilter from './Components/BiosampleFilter';
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
      super();
      this.performUrl = this.performUrl.bind(this);
      this.state = {
	  graph_items: {links:[{source:"Loading...",target:"Loading..."}],nodes:[{color: "#170451", id: undefined, label: "Loading...", leaf: "Loading...", level: 0,link: "", name: "", path: "Loading..."}]},
	  newQuery: 'rs7903146',
	  annotation:[],
	  biosample:[]
      };
  }
    //fetch variant graph data from DGA API, rs7903146 is default query variant
    //callback passed to setState access State right after setting it
    performSearch = (query) =>
	{
	    this.setState({
		newQuery: query
	    }, () => (this.performUrl()));
	    }
    performAnnotationFilter = (annotation_filter) => {
	var arr = [];
	var arr1 = [];
	arr = annotation_filter.map(value => value.value);
	var arr1 = arr1.concat(arr);
	this.setState({
	    annotation: arr1
	},  () => (this.performUrl()))
    }
    performBiosampleFilter = (biosample_filter) => {
	var arr = [];
	var arr1 = [];
	arr = biosample_filter.map(value => value.value);
	var arr1 = arr1.concat(arr);
	this.setState({
	    biosample: arr1
	},  () => (this.performUrl()))
    }
    performUrl = () => {
	console.log(this.state.annotation);
	var postData = {
	    region: this.state.newQuery,
	    genome: "GRCh37",
	    ...(this.state.biosample ?  {biosample_term_name: this.state.biosample}  : {}),
	    ...(this.state.annotation ?  {annotation_type: this.state.annotation}  : {})
	};
	let axiosConfig = {
	    headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	    }
	};
	axios.post('https://cors-anywhere.herokuapp.com/http://www.apps.t2depigenome.org:8080/getAnnotationVariant', postData, axiosConfig)
	    .then(response => {
		const links = [];
		const nodes1 = response.data.nodes;
		//console.log(nodes1);
		const nodes = [];
		nodes1.forEach(({tst, label, link, color, path, name}) => {
		    const levels = path.split('|'),
			  level = levels.length - 1,
			  leaf = levels.pop(),
			  id = tst,
			  parent = levels.join('|');
		    const node = {
			path,
			leaf,
			id,
			color,
			link,
			label,
			name,
			level
		    };
		    nodes.push(node);
		    if (parent) {
			links.push({source: parent, target: path});
		    }
		});
		this.setState({
		    graph_items: {nodes, links}
		});
	    })
	    .catch(error => {
		console.log('Error fetching and parsing data', error);
	    });
    }
    componentDidMount(){
	this.performUrl();
    }
    //search & variant graph components
    render() {
	return (
		<div>
		<div className="main-header">
		<div className="inner">
		<h1 className="main-title">Variant Search</h1>
		<SearchForm onSearch={this.performSearch} />
		</div>
		</div>
		<div className="main-content">
		<h3> Annotation Filter</h3>
		<AnnotationFilter onFilter={this.performAnnotationFilter}/>
		<h3> Biosample Filter</h3>
		<BiosampleFilter onFilter={this.performBiosampleFilter}/>
		<ForceTree data={this.state.graph_items} />
		</div>
		</div>
	);
    }
}
