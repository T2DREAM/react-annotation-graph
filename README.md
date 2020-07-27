
![target_gene_graph](https://github.com/T2DREAM/react-annotation-graph/blob/master/target-genes-graph.png)
### Graphical Display 

This is a ReactJS module that uses force graph to display an interactive tree graph of all the Target Gene Predictions of all annotation data currently in DGA for various Diabetes relevant and complication tissues and cell types in the DGA for a query genetic variant

1. User can search for variant rsid (example: rs7903146, chr10:66794059) or variant coordinate via. Search interface on top right corner
2. Graph orientation - the variant node connects to all the tissue/cell type node that have target gene annotations (peaks in the target gene annotation BED files that intersect the searched variant); the intermediate tissue/cell type node connects to genes nodes. Gene nodes are weighted by evidence (color scale).  
3. The tissue/cell type node are color coded based on organs that are relevant to T2D tissues/complication tissues (see tissue legend on left panel of the graph)
4. Links are highlighted by whether variant has allelic effect or/and accessible chromatin on cell type. Links are also, highlighted if the tissue has gene expression for the target gene (see link legend on the left side of the graph)
5. User can click on nodes to re-direct to the DGA page to obtain more detailed information for that node (i.e. clicking on tissue/cell type node links out to all the annotations relevant to that tissue/cell type; clicking on gene node links to all the annotations that the target gene is found for the searched variant)
6. In addition, hovering over the target gene node displays metadata such as annotation accession ids, evidence (i.e. if the gene was implied in Co-accessibility and/or Chromatin Interaction), Gene score predicted by these methods and distance between the searched variant and promoter/gene
7. User can select the genome assembly for the variant search 
8. The graph can be filtered by type of target gene i.e. either Co-accessibility or Chromatin intersection (promoter capture HiC and HiC)
9. By default, the tissue/cell type labels are not displayed. show tissue label buttons allows displaying the tissue labels on the graph
10. The graph along with legend can be saved as PNG image
 
 #### Navigation 
 * Mouse wheel/click: zoom in/out
 * Node left click: redirect to annotation on DGA
 * Hover over the node: for node label aka. tissue, cell type or annotation accession
 * Hover over the link (variant - tissues or tissues - cell type): for annotation type
 * Filter buttons: Filter by type of target gene aka method

![tabular_view](https://github.com/T2DREAM/react-annotation-graph/blob/master/tabular_view.png)
 ### Tabular Display

1. All the annotations that intersect the variants searched are displayed 
2. The table can be sorted & filtered by Biosample, Annotation Type, State
3. For chromatin state annotations that have strong signals are displayed
4. The results are downloadable as CSV file

Installation

We recommend node.js v12 or higher(tested on node@v12.18.2)
react-annotation-graph is bundled using Webpack. To install all necessary dependencies for a development/production environment, run:

```
$ npm install
```

Once complete run build from the top of the application directory to run all tests and build the react-annotation-graph library bundle.
```
$npm run build
```

### Future Development
#### Matrix view

Matrix view of target genes v/s tissues is alternate visualization of tissues and effector gene for the variant. The weight of the dot matrix corresponds to evidence (# of annotations)

Copy contents of build directory to web-directory open location to web directory in the browser to view the application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
