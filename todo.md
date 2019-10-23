## TO DO


This list is based on feedback for react annotation graph V0.2 by T2D AMP consortium members

 ### Graphical Display 
- [x] JavaScript module that uses force graph to display an interactive tree graph of all the **Target Gene Predictions** of all annotation data currently in DGA for various Diabetes releveant and complication tissues and cell types in the DGA for a query genetic variant
- [x] User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation
* Filters
  - [x] Type of Target Gene (method) i.e. **Promoter HiC, Co-accesibility, eQTL**
  - [ ] Allelic Effect i.e **pbSNP**, **Chromatin QTL**
- [x] Error handling
- [x] Links weighted by whether variant has allelic effect on cell type. In addition, hovering over rsid to tissue/cell type links gives annotation types
- [ ] Genes weighted by number of cell types/biosamples linking to that gene 
* Make the application aesthetically nicer
  - [ ] Move filters as side-bar 
- [ ] Highlight nodes/links for selection i.e. variant <-> tissues <-> genes
* Navigation 
  - [x] Mouse wheel/click: zoom in/out
  - [x] Node left click: redirect to annotation on DGA
  - [x] Hover over the node: for node label aka. tissue, cell type or annotation accession
  - [x] Hover over the link (variant - tissues or tissues - cell type): for annotation type
  - [x] Filter buttons: Filter by type of target gene aka method
  

### Tabular Display
- [x] All the annotations that intersect the variants searched are displayed (in case of chromatin state only active states are displayed)
- [x] Sort & Filter the table by Biosample, Annotation Type, State
- [x] Download results as csv file
- [x] User can click on an annotation to re-direct to the DGA page to obtain more detailed information for that annotation

###  Interactive genome browser showing links between distal elements and target genes  
- [ ] A JavaScript module using D3.js which will display links between genomic sites such as chromatin loops (from Hi-C/CHi-C) or co-accessibility (from single cell data).  This module, will display a genomic region which includes tracks containing ‘arcs’ between two linked loci and where the ‘arc’ height (or weight) is based on a value (e.g. the significance of a Hi-C loop) 
