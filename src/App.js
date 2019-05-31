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
    domain: ['liver', 'HepG2', 'islet', 'adipocyte', 'subcutaneous adipose', 'visceral adipose', 'skeletal muscle myoblast', 'skeletal muscle', 'pancreas', 'alpha cell', 'beta cell', 'delta cell', 'stellate cell', ],
    range: ['#0000ff', '#ff3300', '#ff00ff','#f98900','#66ffff','#5daaaa','#2c5e8d','#1a5353','#78ff02','#8b0000','#21a041','#ffcff1','#00ffff','#8b4513']
  
});
const tissues_next = scaleOrdinal({
    domain: ['acinar cell', 'pancreatic cell','ductal cell', 'endothelial cell', 'exocrine cell', 'glial cell', 'immune cell', 'polypetide-secreting', 'complication tissue','other tissues'],
    range: ['#8b4513','#ee82ee','#ab93fd','#bdb76b','#6e8b1c','#73cccc','#b38019','#685b40','#ffc107', '#d6d1d1']
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
		    graph_items: {nodes, links},
		    nodes: nodes,
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
		<Card.Header>
		<br/>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		<SearchForm onSearch={this.performSearch} />
		</Col>
		</Row>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		<h6 className="text-muted">examples:rs231361,chr10:66794059</h6>
		</Col>
		</Row>
		<h5> Annotation Filter</h5>
		<AnnotationFilter onFilter={this.performAnnotationFilter}/>
		<h5> Biosample Filter</h5>
		<BiosampleFilter onFilter={this.performBiosampleFilter}/>
		</Card.Header>
		<Card border="secondary" style={{padding: '10px'}}>
		<LegendOrdinal scale={tissues} direction="row" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		<br/>
		<br/>
		<LegendOrdinal scale={tissues_next} direction="row" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		</Card>
		<Row className="justify-content-md-center">
		<ForceTree data={this.state.graph_items} />
		</Row>
		<Card.Footer className="text-muted">
		&copy;2019 Diabetes Epigenome Atlas
	        </Card.Footer>
		</Container>
	);
    }
}
