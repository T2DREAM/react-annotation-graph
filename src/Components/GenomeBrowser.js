import React from 'react';
import igv from 'igv';
class AppIgv extends React.Component {
    componentDidMount() {
	var igvContainer = document.getElementById('igv-div');
	var endpoint = 'igvSessiontest.json?dl=0';
	igv.xhr.loadJson("https://www.dropbox.com/s/5lg7csv5r9l3353/" + endpoint)
	    .then(function(json) {
		return igv.createBrowser(igvContainer, json);
	    }
		 );
    }
    render() {
	    return (
		    <div id="igv-div" style={{width: '100%', height: '100%'}}></div>
	    );
	}

}
export default AppIgv;
