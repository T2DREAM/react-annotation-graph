# Version History


## 0.1

* JavaScript module that uses force graph to display an interactive directed tree graph of all annotation data currently in the DGA for a query genetic variant
* The graph annotations are nodes colored and organized by tissue/cell-type
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
* User can filter by annotation type (Chromatin State, Accesible Chromatin, Target Gene Predictions, Binding Sites or biosample type (Diabetes Relevant tissues, Complication Tissues, All Tisues)
* Navigation 
  * Mouse wheel/click: zoom in/out
  * Node left click: redirect to annotation on DGA
  * Hover over the node: for node label aka. tissue, cell type or annotation accession
  * Filter buttons: Filter by biosample & annotation type
  
 ## 0.2
 
 ### Graphical Display 
 * JavaScript module that uses force graph to display an interactive tree graph of all the **Target Gene Predictions** of all annotation data currently in DGA for various Diabetes releveant and complication tissues and cell types in the DGA for a query genetic variant
 * User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
 * The graph can be filtered by type of target gene (method) i.e. **Promoter HiC, Co-accesibility, eQTL**
 * Links weighted by whether variant is in chromatin state or open chromatin or has allelic effect on cell type. In addition, hovering over rsid to tissue/cell type links gives annotation types
 * 


* Navigation 
  * Mouse wheel/click: zoom in/out
  * Node left click: redirect to annotation on DGA
  * Hover over the node: for node label aka. tissue, cell type or annotation accession
  * Hover over the link (variant - tissues or tissues - cell type): for annotation type
  * Filter buttons: Filter by type of target gene aka method
