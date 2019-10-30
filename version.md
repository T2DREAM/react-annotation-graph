# Version History


## 0.1 (July 19th, 2019)

* JavaScript module that uses force graph to display an interactive directed tree graph of all annotation data currently in the DGA for a query genetic variant
* The graph annotations are nodes colored and organized by tissue/cell-type
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
* User can filter by annotation type (Chromatin State, Accesible Chromatin, Target Gene Predictions, Binding Sites or biosample type (Diabetes Relevant tissues, Complication Tissues, All Tisues)
* Navigation 
  * Mouse wheel/click: zoom in/out
  * Node left click: redirect to annotation on DGA
  * Hover over the node: for node label aka. tissue, cell type or annotation accession
  * Filter buttons: Filter by biosample & annotation type
  
 ## 0.2 (October 29th, 2019)
 
### Graphical Display 
* JavaScript module that uses force graph to display an interactive tree graph of all the **Target Gene Predictions** of all annotation data currently in DGA for various Diabetes releveant and complication tissues and cell types in the DGA for a query genetic variant
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
* Filters
  * Type of Target Gene (method) i.e. **Promoter HiC, Co-accesibility, eQTL**
  * Allelic Effect i.e **pbSNP**, **Chromatin QTL**
* Error handling
* Links weighted by whether variant has allelic effect on cell type. In addition, hovering over rsid to tissue/cell type links gives annotation types
* Genes weighted by number of cell types/biosamples linking to that gene 
* Make the application aesthetically nicer
  * Move filters as side-bar 

* Navigation 
  * Mouse wheel/click: zoom in/out
  * Node left click: redirect to annotation on DGA
  * Hover over the node: for node label aka. tissue, cell type or annotation accession
  * Hover over the link (variant - tissues or tissues - cell type): for annotation type
  * Filter buttons: Filter by type of target gene aka method
  

### Tabular Display
* All the annotations that intersect the variants searched are displayed (in case of chromatin state only active states are displayed)
* Sort & Filter the table by Biosample, Annotation Type, State
* Download results as csv file
* User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
