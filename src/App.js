import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
    super();
      this.state = {
	  items: {links:[{source:"Loading...",target:"Loading..."}],nodes:[{color: "#170451", id: undefined, label: "Loading...", leaf: "Loading...", level: 0,link: "", name: "", path: "Loading..."}]}};
  }
    componentDidMount() {
	this.performSearch();
    }
//fetch variant graph data from DGA API, rs7903146 is default query variant 
    performSearch = (query = 'rs7903146') => {
	axios.get(`https://www.t2depigenome.org/variant_graph/region=${query}&genome=GRCh37/variant_graph.json`)
	    .then(response => {
		const links = [];
		const nodes1 = response.data.nodes;
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
	console.log(data);
	return (
		<div>
		<div className="main-header">
		<div className="inner">
		<h1 className="main-title">Variant Search</h1>
		<SearchForm onSearch={this.performSearch} />
		</div>   
		</div>
		<div className="main-content">
		<ForceTree data={this.state.items} />
		</div>
		</div>
	);
    }
}
