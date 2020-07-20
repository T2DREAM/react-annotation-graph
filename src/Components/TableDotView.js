import React from 'react';
import ReactTable from 'react-table';
//const ReactTable = window.ReactTable.default
import './react-table.css';
const response = {
    initial_data: [
	{
            "gene": <html>TPRG1</html>,	    
	    "islet of Langerhans": <svg><circle cx={10} cy={10} r={4} fill='#add8e6' /></svg>,
            "pancreatic alpha cell":  null,
	    "mesendoderm":  null,
            "pancreatic beta cell": null 
        },
        {
            "gene": <h1>RTP4</h1>,	    
            "pancreatic alpha cell": <svg><circle cx={10} cy={10} r={4} fill='#add8e6' /></svg>,
            "islet of Langerhans":  null,
	    "mesendoderm":  null,
            "pancreatic beta cell": null  
	},
        {
            "gene": <h1>LPP</h1>,
            "islet of Langerhans": <svg><circle cx={10} cy={10} r={4} fill='#add8e6' /></svg>,
            "pancreatic alpha cell":  null,
	    "mesendoderm":  null,
            "pancreatic beta cell": null  
        },
        {
	    "gene": <h1>BCL6</h1>,
            "pancreatic beta cell": <svg><circle cx={10} cy={10} r={6} fill='#add8e6' /></svg>,
            "islet of Langerhans": <svg><circle cx={10} cy={10} r={6} fill='#add8e6' /></svg>,
	    "mesendoderm": <svg><circle cx={10} cy={10} r={6} fill='#d6d1d1' /></svg>,
            "pancreatic alpha cell":  null
        },
	{
	    "gene": <h1>LPP-AS2</h1>,
            "islet of Langerhans": <svg><circle cx={10} cy={10} r={4} fill='#add8e6' /></svg>,
            "pancreatic alpha cell": null ,
	    "mesendoderm":  null,
            "pancreatic beta cell": null 
	}
    ]
}
class TableDotView extends React.Component {

  render() {
    const data = response.initial_data
    const data_final = data.replace("/\"/g", "")  
    const columns = Object.keys(response.initial_data[0]).map((key, id)=>{
      return {
        Header: key,
        accessor: key
      }
    })
      console.log(columns)
      return (
	      <ReactTable data = { data_final } columns = { columns } defaultPageSize={5} />
      )      
  }
}

export default TableDotView;
