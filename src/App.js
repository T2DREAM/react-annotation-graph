/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import ForceTree from './Components/ForceTree';
import AllelicEffectFilters from './Components/AllelicEffectFilters';
import TableView from './Components/TabularView';
import AppIgv from './Components/GenomeBrowser';
import TissueLabelSwitch from './Components/TissueLabelSwitch';
import TargetGeneFilter from './Components/TargetGeneFilter';
import './bootstrap.min.css';
import Loader from 'react-loader-spinner';
import "./react-spinner-loader.css"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import { LegendOrdinal } from '@vx/legend';
import { scaleOrdinal } from '@vx/scale';
import './react-bootstrap-table2.min.css';
const tissues = scaleOrdinal({
    domain: ['pancreas'],
    range: ['#add8e6']
});
const cells = scaleOrdinal({
    domain: ['pancreatic cells'],
    range: ['#0eb8f0']
});
export default class App extends Component {
//Initiaite state for nodes & links (loading for now)  
  constructor() {
      super();
      this.performUrl = this.performUrl.bind(this);
      this.state = {
	  graph_items: {links:[{source:"Loading...",target:"Loading..."}], nodes:[{color: "#170451", id: undefined, label: "Loading...", level: 1,link: "", path: "Loading...",biosample:"", type:"", name:"Loading...", state_len: 3, annotation_type: "-", accession_ids: "-",}]},
	  table_items: {links:[{source:"Loading...",target:"Loading..."}],nodes:[{color: 'black', id: "Loading", label: "Loading...", leaf: "Loading...", level: 1,link: "", name: "", path: "Loading...",biosample:"", type:""}]},
	  newQuery: 'rs963740',
	  loading: true,
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
    performTargetGeneFilter = (targetgene_filter) => {
	var arr1 = [];
	Object.keys(targetgene_filter).map(function(keyName) {
	    if (targetgene_filter[keyName] === true) {return (arr1 = arr1.concat(keyName));}
	})
	this.setState({
	    targetgene: arr1
	},  () => (this.performUrl()))
    }
    performAllelicEffectFilters = (alleliceffect_filter) => {
	var arr1 = [];
	Object.keys(alleliceffect_filter).map(function(keyName) {
	    if (alleliceffect_filter[keyName] === true) {return (arr1 = arr1.concat(keyName));}
	})
	this.setState({
	    alleliceffect: arr1
	},  () => (this.performUrl()))
    }
    saveCanvas() {
	const canvasSave = document.getElementById('graph');
	const d = canvasSave.toDataURL('image/png');
	const w = window.open('about:blank', 'image from canvas');
	w.document.write("<img src='"+d+"' alt='from canvas'/>");
	console.log('Saved!');
    }
    performUrl = () => {
	var postData = {
	    region: this.state.newQuery,
	    genome: "GRCh37",
	    ...(this.state.targetgene ?  {'software_used.software.title': this.state.targetgene}  : {}),
            ...(this.state.alleliceffect ?  {'software_used.software.title': this.state.alleliceffect}  : {})	    
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
		nodes1.forEach(({accession_ids, annotation_type, biosample, color, id, label, link, name, type, path, level, state_len}) => {
		    const node = {
			accession_ids,
			annotation_type,
			biosample,
			color,
			id,
			label,
			link,
			name,
			type,
			path,
			level,
			state_len
		    };
		    nodes.push(node);
		});
		this.setState({
		    graph_items: {nodes, links},
		    graph_links: links,
		    graph_nodes: nodes,
		    loading: false,
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
		nodes1.forEach(({accession_ids, annotation_type, biosample, color, id, label, link, name, type, path, level, table_id}) => {
		    const node = {
			accession_ids,
			annotation_type,
			biosample,
			color,
			id,
			label,
			link,
			name,
			type,
			path,
			table_id,
			level
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
    //search & variant graph components
    render() {
	console.log(this.state.loading);
	let graph;
	if (this.state.graph_links == 0) {
	    graph = <Alert variant='warning'><h5>Your selection has no results! Please select a different variant</h5></Alert>
	}
	let table;
	if (this.state.table_nodes == 1) {
	    table = <Alert variant='warning'><h5>Your selection has no results! Please select a different variant/annotation/biosample</h5></Alert>
	}
	else
	{
	    table = <TableView data={this.state.table_items} />
	}
	let genomeBrowser;
	genomeBrowser = <AppIgv />
	return (
		<Container fluid>
		<Card.Header>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		<SearchForm onSearch={this.performSearch} />
		</Col>
		</Row>
		<Row>
		<Col md={{ span: 6, offset: 7 }}>
		{this.state.graph_links ? <h5>Sucess! Searched {this.state.newQuery}</h5> : <h5></h5>}
	        </Col>
		</Row>
		</Card.Header>
		<Col>
		<Tabs defaultActiveKey="graph" id="uncontrolled-tab-example">
		<Tab eventKey="graph" title="Target Gene Graph" unmountOnExit="true">
		<Row style={{height: '1000px'}}>
		<Col md={{ span: 2}}>
		<h5>Type of Target Gene</h5>
		<TargetGeneFilter onFilter={this.performTargetGeneFilter}/>
		<h5>Allelic Effect Filter</h5>
		<AllelicEffectFilters onFilter={this.performAllelicEffectFilters} style={{ marginBottom: '1rem' }} />
		<h5>Tissue Legend</h5>
		<LegendOrdinal scale={tissues} direction="row" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		<h5>Cell Legend</h5>
		<LegendOrdinal scale={cells} direction="row" labelMargin="0 15px 0 5px" shapeMargin="1px 0 0"/>
		</Col>
                <Col>
		{this.state.loading ? <div style ={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}><Loader type="Bars" color="#00BFFF" height={100} width={100} /></div> : <ForceTree data={this.state.graph_items} />}
	        </Col>
		</Row>
	        </Tab>
		<Tab eventKey="table" title="Table" unmountOnExit="true">
		<Row>
		{table}
	        </Row>
		</Tab>
		<Tab eventKey="genomebrowser" title="Genome Browser" unmountOnExit="true">
		<Row className="justify-content-md-center">
		<Alert variant="success">
		<Alert.Heading>Genome Browser showing links between distal elements and target genes coming soon...</Alert.Heading>
		</Alert>
		</Row>
		</Tab>
		</Tabs>
		</Col>
		<Card.Footer className="text-muted">
		&copy;2019 Diabetes Epigenome Atlas
	        </Card.Footer>
		</Container>
	);
    }
}
