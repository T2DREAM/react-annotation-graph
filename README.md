
# Interactive graphical view of all DGA annotations
![](https://github.com/T2DREAM/react-annotation-graph/blob/master/1.png)
![](https://github.com/T2DREAM/react-annotation-graph/blob/master/2.png)
![](https://github.com/T2DREAM/react-annotation-graph/blob/master/3.png)

### Graphical Display 
* JavaScript module that uses force graph to display an interactive tree graph of all the **Target Gene Predictions** of all annotation data currently in DGA for various Diabetes releveant and complication tissues and cell types in the DGA for a query genetic variant
* User can search for variant rsid (example: rs7903146, chr10:66794059) or variant coordinate via. Search interface on top right corner
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
* The graph can be filtered by type of target gene (method) i.e. **Promoter HiC, Co-accesibility, eQTL**
* Links weighted by whether variant has allelic effect on cell type. In addition, hovering over rsid to tissue/cell type links gives annotation types
*  Genes weighted by number of cell types/biosamples linking to that gene 

* Navigation 
  * Mouse wheel/click: zoom in/out
  * Node left click: redirect to annotation on DGA
  * Hover over the node: for node label aka. tissue, cell type or annotation accession
  * Hover over the link (variant - tissues or tissues - cell type): for annotation type
  * Filter buttons: Filter by type of target gene aka method
  

### Tabular Display 
![](https://github.com/T2DREAM/react-annotation-graph/blob/master/4.png)

* All the annotations that intersect the variants searched are displayed (in case of chromatin state only active states are displayed)
* Sort & Filter the table by Biosample, Annotation Type, State
*  Download results as csv file
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation


## Usage


## Installation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To install the Variant Annotation Graph application, in project directory, you can run:

### `npm install`

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
