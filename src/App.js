import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
//import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import AnnotationFilter from './Components/AnnotationFilter';
import BiosampleFilter from './Components/BiosampleFilter';
import './bootstrap.min.css';
import { LegendOrdinal } from '@vx/legend';
import { scaleOrdinal } from '@vx/scale';
const tissues = scaleOrdinal({
    domain: ['liver', 'adipocyte', 'subcutaneous adipose', 'visceral adipose', 'skeletal muscle myoblast', 'skeletal muscle', 'pancreas', 'heart', 'kidney', 'endothelial cell of umbilical vein','other'],
    range: ['#ffd700', '#f98900','#66ffff','#5daaaa','#2c5e8d','#1a5353','#8b0000','#ff0000','#7fff00','#ff00ff','#d6d1d1']
  
});
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
      super();
      this.performUrl = this.performUrl.bind(this);
      this.state = {
	  graph_items: {links:[{source:"Loading...",target:"Loading..."}],nodes:[{color: "#170451", id: undefined, label: "Loading...", leaf: "Loading...", level: 0,link: "", name: "", path: "Loading..."}]},
	  newQuery: 'rs7903146',
	  annotation:[],
	  biosample:[],
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
	var arr1 = [];
	Object.keys(biosample_filter).map(function(keyName) {
	    if (biosample_filter[keyName] === true) {
		var tissues = keyName.split(',')
		return (arr1 = arr1.concat(tissues));
	    }
	})
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
	axios.post('https://cors-anywhere.herokuapp.com/http://www.t2depigenome.org:8080/getAnnotationVariantGraph', postData, axiosConfig)
	    .then(response => {
		const links = [];
		const nodes1 = response.data.nodes;
		const nodes = [];
		nodes1.forEach(({tst, label, link, color, path, name, type}) => {
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
			level,
			type,
		    };
		    nodes.push(node);
		    if (parent) {
			links.push({source: parent, target: path});
		    }
		});
		this.setState({
		    graph_items: {nodes, links},
		    links: links,
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
	let graph;
	if (this.state.links == 0) {
	    graph =	<div><h5>Your selection has no results! Please select a different variant/annotation/biosample</h5></div>
	}
	else
	{
	    graph =	<ForceTree data={this.state.graph_items} />
	}
	return (
		<Container >
		<Card.Header>
		<br/>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		<SearchForm onSearch={this.performSearch} />
		</Col>
		</Row>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		<h6 className="text-muted">examples:rs231361,chr8:118184783</h6>
		</Col>
		</Row>
		<h5> Annotation Filter</h5>
		<AnnotationFilter onFilter={this.performAnnotationFilter}/>
		<h5> Biosample Filter</h5>
		<BiosampleFilter onFilter={this.performBiosampleFilter}/>
		</Card.Header>
		<Card border="secondary" style={{padding: '10px'}}>
		<LegendOrdinal scale={tissues} direction="row" labelMargin="0 5px 0 5px" shapeMargin="1px 0 0"/>
		<br/>
		</Card>
		<Row className="justify-content-md-center">
		{graph}
		</Row>
		<Card.Footer className="text-muted">
		&copy;2019 Diabetes Epigenome Atlas
	        </Card.Footer>
		</Container>
	);
    }
}
