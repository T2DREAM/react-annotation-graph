import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import './react-bootstrap-table2.min.css';
import './react-bootstrap-table2-toolkit.min.css';
import './bootstrap.min.css';
class TableView extends React.Component {
    render(){
	const results = this.props.data.nodes;
	const selectOptions = {
	    'accessible chromatin': 'accessible chromatin',
	    'chromatin state': 'chromatin state',
	    'binding sites': 'binding sites',
	    'target gene predictions': 'target gene predictions'
	};
	const { ExportCSVButton } = CSVExport;
	const columns = [{
	    dataField: 'biosample',
	    text: 'Biosample',
	    sort: true,
	    filter: textFilter()
	}, {
	    dataField: 'label',
	    text: 'State',
	    sort: true,
	    filter: textFilter()
	}, {
	    dataField: 'accession_ids',
	    text: 'Accessions',
	    //formatter: (rowContent, row) => {
		//var array = rowContent.split(',').map(item => item.trim())
		//var linkArray = array.join('&accession=')
		//return (
		//	<a target="_blank" rel="noopener noreferrer" href= {'https://www.diabetesepigenome.org/search/?type=Annotation&accession=' +  linkArray }>{ rowContent }</a>
		//)
	    //}
	}, {
	    dataField: 'annotation_type',
	    text: 'Annotation Type',
	    sort: true,
	    filter: selectFilter({
		options: selectOptions,
	    })
	}];
	return(
		<ToolkitProvider bootstrap4 keyField='table_id'  data={ results } columns={ columns } >
		{
		    props => (
			    <div>
			    <br />
			    <ExportCSVButton className="btn-sm" { ...props.csvProps }>Download Results!</ExportCSVButton>
			    <hr />
			    <BootstrapTable { ...props.baseProps }  filter={ filterFactory() } selectRow={ this.selectRow } />
			    </div>
		    )
		}
	    	    </ToolkitProvider>    

	)
    }
}

export default TableView;
