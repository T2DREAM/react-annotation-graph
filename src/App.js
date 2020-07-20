/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import TableView from './Components/TabularView';
import TissueLabelSwitch from './Components/TissueLabelSwitch';
import TargetGeneFilter from './Components/TargetGeneFilter';
import AssemblyFilter from './Components/AssemblyFilter';
import TableDotView from './Components/TableDotView';
import './bootstrap.min.css';
import Loader from 'react-loader-spinner';
import "./react-spinner-loader.css"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { LegendOrdinal } from '@vx/legend';
import { LegendLabel } from '@vx/legend';
import { scaleOrdinal } from '@vx/scale';
import html2canvas from 'html2canvas';
import './react-bootstrap-table2.min.css';
const organs = scaleOrdinal({
    domain: ['pancreas', 'liver', 'kidney', 'heart', 'adipose', 'muscle', 'brain', 'vascular', 'other'],
    range: ['#add8e6', '#ff7f50', '#7fff00', '#ff0000', '#654321', '#8b0000', '#ffd700','#66ffff', '#d6d1d1']
});
const annotations = scaleOrdinal({
    domain: ['allelic effect', 'accessible chromatin', 'allelic effect & accessible chromatin', 'eQTL', 'no evidence'],
    range: ['#bfcce6', '#738fc7', '#003399', '#FFA500', '#BEBEBE']
});
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
      super();
      this.performUrl = this.performUrl.bind(this);
      this.state = {
	  graph_items: {links:[{source:"Loading...",target:"Loading..."}], nodes:[{color: "#170451", id: undefined, label: "Loading...", level: 1,link: "", path: "Loading...",biosample:"", type:"", name:"Loading...", state_len: 3, annotation_type: "-", accession_ids: "-", score:"-", distance:"-"}]},
	  table_items: {nodes:[{label: "Loading..."}]},
	  newQuery: 'rs6777684',
	  assembly: 'GRCh37',
	  loading: true,
	  labelswitch: false,
	  legendVisible: false,
	  legendAnnotationVisible: false,
	  isChecked: true,
	  legendTitle: 'show tissue legend',
	  legendAnnotationTitle: 'show links legend',
      };
  }
//fetch variant graph data from DGA API, rs6777684 is default query variant
//callback passed to setState access State right after setting it
    performSearch = (query) =>
	{
	    this.setState({
		newQuery: query
	    }, () => (this.performUrl()));
	}
    performTargetGeneFilter = (targetgene_filter) => {
	var arr1 = [];
	Object.keys(targetgene_filter).map(function(keyName) {
	    if (targetgene_filter[keyName] === true) {return (arr1 = arr1.concat(keyName));}
	})
	this.setState({
	    targetgene: arr1
	},  () => (this.performUrl()))
    }
    performAssemblyFilter = (assembly_filter) => {
	this.setState({
	    assembly: assembly_filter
	},  () => (this.performUrl()))
    }
    performTissueLabelSwitch = (label_filter) => {
	Object.entries(label_filter).map(([key,value]) => {
	     this.setState({
		 labelswitch: value
	     },  () => (this.performUrl()))})
    }
    performUrl = () => {
	var postData = {
	    region: this.state.newQuery,
	    ...(this.state.assembly ?  {'genome': this.state.assembly}  : {}),
	    ...(this.state.targetgene ?  {'annotation_type': this.state.targetgene}  : {}),
	};
	var postData1 = {
	    region: this.state.newQuery,
	    genome: "GRCh37"
	};
	let axiosConfig = {
	    headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	    }
	};
	//var endpoint = (this.state.targetgene ?  this.state.targetgene  : 'getAnnotationVariantGraphNew');
	this.setState({ loading: true }, () =>{ axios.post('https://cors-anywhere.herokuapp.com/http://www.diabetesepigenome.org:8080/getAnnotationVariantGraphNew', postData, axiosConfig)
	    .then(response => {
		const links = response.data.links;
		const nodes1 = response.data.nodes;
		const nodes = [];
		nodes1.forEach(({accession_ids, annotation_type, biosample, color, id, label, link_color, link, name, type, path, level, state_len, score, distance,width}) => {
		    const node = {
			accession_ids,
			annotation_type,
			biosample,
			color,
			link_color,
			id,
			label,
			width,
			link,
			name,
			type,
			path,
			level,
			state_len,
			score,
			distance
		    };
		    nodes.push(node);
		});
		this.setState({
		    graph_items: {nodes, links},
		    graph_links: links,
		    graph_nodes: nodes,
		    loading: false,
		    nodes_length: nodes.length
		});
	    })	      
	    .catch(error => {
		console.log('Error fetching and parsing data', error);
	    });
					      });	   
	axios.post('https://cors-anywhere.herokuapp.com/http://www.diabetesepigenome.org:8080/getAnnotationVariantAllGraph', postData1, axiosConfig)
	    .then(response2 => {
		const nodes1 = response2.data.nodes;
		const nodes = [];
		nodes1.forEach(({accession_ids, annotation_type, biosample, label, link, table_id, score}) => {
		    const node = {
			accession_ids,
			annotation_type,
			biosample,
			label,
			link,
			table_id,
			score
		    };
		    nodes.push(node);
		});
		this.setState({
		    table_items: {nodes},
		    table_nodes: {nodes}
		});
	    })
	    .catch(error => {
		console.log('Error fetching and parsing data', error);
	    });
    }
    componentDidMount(){
	this.performUrl();
    }
    onClick() {
	this.setState({legendVisible: !this.state.legendVisible});
	if (!this.state.legendVisible) {
	    this.setState({ legendTitle: 'hide tissue legend'});
	}
	else {
	    this.setState({ legendTitle: 'show tissue legend'});
	}
    };
    onClickLegend() {
	this.setState({legendAnnotationVisible: !this.state.legendAnnotationVisible});
	if (!this.state.legendAnnotationVisible) {
	    this.setState({ legendAnnotationTitle: 'hide link legend'});
	}
	else {
	    this.setState({ legendAnnotationTitle: 'show link legend'});
	}
    };
    saveImage = () => {
	var input = document.getElementById('2d-graph');
	html2canvas(input)
	    .then((canvas) =>{
		let imgData = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
		this.downloadURL(imgData);
	    });
    }
    downloadURL(imgData){
	var a = document.createElement('a');
	a.href = imgData.replace("image/png", "image/octet-stream");
	a.download = 'graph.png';
	a.click();
    }
    //search & variant graph components
    render() {
	let graph;
	console.log(this.state.targetgene);
	console.log(this.state.targetgene && this.state.targetgene.length <= 0);
	if (this.state.nodes_length == 1 || (this.state.targetgene && this.state.targetgene.length == 0)) {
	   graph = <Alert variant='warning'><h5>Your selection has no results! Please select a different variant or appropriate filters.</h5></Alert>
	}
	else
	{
	    graph = <div>{this.state.loading ? <div style ={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}><Loader type="Bars" color="#00BFFF" /></div> : <ForceTree data={this.state.graph_items} label={this.state.labelswitch} />}</div>
	}
	let table;
	if (this.state.table_nodes == 1) {
	    table = <Alert variant='warning'><h5>Your selection has no results! Please select a different variant/annotation/biosample</h5></Alert>
	}
	else
	{
	    table = <TableView data={this.state.table_items} />
	}
	return (
		<Container fluid>
		<Card.Header>
		<Row>
		<Col md={{ span: 3 }} sm={{ span: 3 }}>
		<SearchForm onSearch={this.performSearch} />
		</Col>
		<Col md={{ span: 2 }} sm={{ span: 2 }}>
		<AssemblyFilter onFilter={this.performAssemblyFilter}/>
	        </Col>
		<Col md={{ span: 2 }} sm={{ span: 2 }}>
		<TargetGeneFilter onFilter={this.performTargetGeneFilter}/>
		</Col>
		<Col>
		<Row>
		<Button variant="outline-secondary" size="sm" onClick={() => this.saveImage()}>Save Image</Button>
		</Row>
		<br></br>
		<Row>
		<TissueLabelSwitch onFilter={this.performTissueLabelSwitch}/>
		</Row>
		</Col>
		</Row>
		<Row>
		<Col md={{ span: 3 }} sm={{ span: 3 }}>
		{this.state.graph_links ? <h5>Sucess! Searched {this.state.newQuery}</h5> : <h5></h5>}
	        </Col>
		<Col>
		</Col>
		</Row>
		</Card.Header>
		<Col>
		<Tabs defaultActiveKey="graph" id="uncontrolled-tab-example">
		<Tab eventKey="graph" title="Target Gene Graph" unmountOnExit="true">
		<Row id = "2d-graph">
		<Col md={{ span: 10 }}>
		<Row>
		{ graph }
	        </Row>
		</Col>
		<Col md={{ span: 2 }}>
		<LegendLabel align={'left'} margin={'0 4px'}><h5>Tissues</h5></LegendLabel>
		<LegendOrdinal scale={organs} direction="column" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		<LegendLabel align={'left'} margin={'0 4px'}><h5>Links</h5></LegendLabel>
		<LegendOrdinal scale={annotations} direction="column" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		</Col>
		</Row>
	        </Tab>
		<Tab eventKey="table" title="Table" unmountOnExit="true">
		<Row>
		{table}
	        </Row>
		</Tab>
		</Tabs>
		</Col>
		<Card.Footer className="text-muted">
		&copy;2020 Diabetes Epigenome Atlas
	        </Card.Footer>
		</Container>
	);
    }
}
