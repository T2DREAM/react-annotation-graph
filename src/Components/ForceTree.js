import React from 'react';
import { ForceGraph2D } from 'react-force-graph';
class ForceTree extends React.Component {
    componentDidMount() {
	this.fg.zoom(1.75);
	this.fg.d3Force('center');
	//this.fg.centerAt(10,10);
    }
    render(){
	const results = this.props.data;
	//console.log(results);
	return(
		<ForceGraph2D
	    height = {700}
	    width = {1400}
	    ref={el => { this.fg = el; }}
	    graphData={results}
	    dagMode='radialout'
	    dagLevelDistance={60}
	    backgroundColor="#FFFFFF"
	    linkColor={() => 'rgba(0,0,0,1)'}
	    //nodeRelSize={2}
	    nodeId="path"
	    // node click direct to annotations on DGA
	    onNodeClick={node => {if (node.level === 0) {window.open(`https://www.t2depigenome.org/variant-search/?${node.link}`, '_blank')} else {window.open(`https://www.t2depigenome.org/search/?type=Annotation&${node.link}`, '_blank')}}}
	    // render nodes, text for variant and state (i.e. level 1 & 3), circle for biosample
	    nodeCanvasObject={(node, ctx, globalScale) => {if ((node.level === 1)||(node.level === 2 && node.type === 'cell')){ctx.beginPath(); ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI, false); ctx.fillStyle = node.color; ctx.fill();} else {const label = node.label; const fontSize = 12/globalScale; ctx.font = `${fontSize}px Arial`;const textWidth = ctx.measureText(label).width; const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = node.color; ctx.fillText(label, node.x, node.y); ctx.beginPath(); }}}
	    nodeVal={node => 100 / (node.level + 1)}
	    nodeLabel= {node => `${node.name}`}
	    d3VelocityDecay={0.08}
	    rendererConfig={{ preserveDrawingBuffer: true }}
	    showNavInfo={true}
		/>
	);
    }
}

export default ForceTree;
