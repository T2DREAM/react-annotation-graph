import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import AnnotationFilter from './Components/AnnotationFilter';
import BiosampleFilter from './Components/BiosampleFilter';
import './bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.css';
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
	var arr1 = [];
	Object.keys(annotation_filter).map(function(keyName) {
	    if (annotation_filter[keyName] === true) {
		return (arr1 = arr1.concat(keyName));
	    }
	})
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
		<Container >
		<br/>
		<Row>
		<Col md={{ span: 6, offset: 8 }}>
		<SearchForm onSearch={this.performSearch} />
		</Col>
		</Row>
		<h5> Annotation Filter</h5>
		<AnnotationFilter onFilter={this.performAnnotationFilter}/>
		<h5> Biosample Filter</h5>
		<BiosampleFilter onFilter={this.performBiosampleFilter}/>
		<Row className="justify-content-md-center">
		<ForceTree data={this.state.graph_items} />
		</Row>
		</Container>
	);
    }
}
