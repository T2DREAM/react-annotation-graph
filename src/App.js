import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import AnnotationFilter from './Components/AnnotationFilter';
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
      super();
      this.performSearch = this.performSearch.bind(this);
      this.performAnnotationFilter = this.performAnnotationFilter.bind(this);
      this.performUrl = this.performUrl.bind(this);
      this.state = {
	  items: {links:[{source:"Loading...",target:"Loading..."}],nodes:[{color: "#170451", id: undefined, label: "Loading...", leaf: "Loading...", level: 0,link: "", name: "", path: "Loading..."}]}};
  }
    componentDidMount() {
	this.performSearch();
    }
    //fetch variant graph data from DGA API, rs7903146 is default query variant
    performAnnotationFilter = (annotation_filters) => {
	var arr = [];
	arr = annotation_filters.map(value => value.value);
	var arr1 = arr.join(',');
	//this.performUrl(arr1);
    }
    performSearch = (query='rs7903146') =>
    {
	var url = query;
	this.performUrl(query);
    }
    performUrl = (query) => {
	var annotation = '';
	var postData = {
	    region: query,
	    genome: "GRCh37",
	    ...(annotation ?  {annotation_type: annotation}  : {})
	};
	let axiosConfig = {
	    headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	    }
	};
	axios.post('https://cors-anywhere.herokuapp.com/http://www.apps.t2depigenome.org:8080/getAnnotationVariant', postData, axiosConfig)
	    .then(response => {
		console.log(response);
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
		    items: {nodes, links}
		});
	    })
	    .catch(error => {
		console.log('Error fetching and parsing data', error);
	    });
    }
    //search & variant graph components
    render() {
	const data = this.state.items;	
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
		<ForceTree data={this.state.items} />
		</div>
		</div>
	);
    }
}
