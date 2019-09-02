/* Configuration file - epiMap
 * Change the webmap' settings here, accordingly with the associated comments (lines starting with "//").
 * Please keep in mind that parameters are case-sensitives.
 */

(function(){
	var globalParameters = {
			map : {
				// center (x, y : INTEGER) - Centers the map to the defined coordinates on start.
		        center : {
		            x : 8.02,
		            y : 6.25
		        },
		        // zoomLevel (INTEGER) - Default zoom level displayed on start.
		        zoomLevel : 9.25,
		        // zoom Max/Min (zoomLevelMax, zoomLevelMin : INTEGER) - Set the maximum and minimum zoom level.
		        zoomLevelMax : 18,
		        zoomLevelMin : 6			
			},
			data : {
				// epiDataset - Related to the delimiter-separated values dataset to be joined to the geometry.
				epiDataset : {
					// source (STRING) - Link to the epi data, can be remote or local.
					source : "data/ebonyi_yellow_2019_all.csv",
					// delimiter (STRING) - Defines the delimiter used in the dataset.
					delimiter : ";",
	                // remote (BOOLEAN) -  To be set as 'true' for online use. Set as 'false' to avoid CORS issues on local use.
	                remote : false,					
					// XMLHttpRequestHeader (header, value : STRING) - Set the request header for password-protected remote sources - Leave blank for local sources.
	                XMLHttpRequestHeader : {
	                    header : "",
	                    value  : ""
	                },
	                // fieldsForAnalysis - Defines the fields to be considered from the epi dataset.
	                fieldsForAnalysis : {                    
	                    // dimTime (STRING) - Temporal dimension, for the filter slider.
	                    dimTime : "Weeks",
	                    // temportal boundaries (timeMin, timeMax, defaultTime : INTERGER [defined] / STRING [default]) - Bound the temporal dimension : set a number for defined value, write a string for automatic value.
	                    timeMin : 1,
	                    timeMax : 34,
	                    defaultTime : "",
	                    // dimGeo (STRING) - Geographical dimension, usually 'p' codes. Joins to geometry.
	                    dimGeo : "PCODE",
	                    // measure (STRING) - Includes the values recorded for a given dimTime (cases : t1, t2, t3, ...).
	                    measure : "Cases",
	                    // cumulative (STRING) - Cumulative measure, sum the values for the given and the previous dimTime (cases : t1, t1 + t2, t1 + t2 + t3, ...).
	                    cumulative : "Cumul_cases",
	                    // rate (STRING) - Field for the rate calculated with the "measure" value.
	                    rate : "IR_100000",
	                    // cumulRate (STRING) - Field for the rate calculated with the "cumulative" value.
	                    cumulRate : "CumulIR_100000"
	                }                
				},
				
			},
			// Set the options for the analysis layers.
			analysis : {
				// Options for the rates layers.
				/* For each rate analysis
				 * "config" object properties (all param : STRING) :
				     * name : Name of the indicator to be displayed in the Map analysis selector.
				     * abbreviation : Abbreviated indicator - displayed in the legend and in the pop-ups.
				     * fieldRate : Field that contains the rate indicator in the epi dataset.
				     * fieldAbsolute : Field that contains the absolute indicator in the epi dataset.
				     * otherName : Other way to mention the indicator - displayed in the legend
				     * printName : Name of the indicator as it appears in the exported .pdf file.
				     * 
				 * "classes" object (value : INTEGER/REAL, color : STRING) :
				     * Define the ranges for the analysis by replacing the following values.
				     *      - *_less : Includes the values stricly inferior to the number, e.g : values < 5.
				     *      - *_between : Includes the values superior or equal to the first number and strictly inferior to the second number, e.g : 5 =< values < 10.
				     *      - *_more : Includes the values superior or equal to the number, e.g : values >= 150.
				     *      
				     * Colors are set in RGB as they will be automatically converted to RGBA once running the scripts.
				     * 
				 */				
				rates : {
	                analysis_1 : {
	                    config : {
	                        name            :   "Weekly Incidence Rate (x 100000)",
	                        abbreviation    :   "WIR",
	                        fieldRate       :   "IR_100000",
	                        fieldAbsolute   :   "Cases",
	                        otherName       :   "Weekly Incidence Rate",
	                        printName       :   "Weekly Incidence Rate (x 100000)"
	                    },
	                    classes : {
	                        class1_less     :   {value : 1,             color : "rgb(254,229,217)"},
	                        class2_between  :   {value : [1, 2],       color : "rgb(252,187,161)"},
	                        class3_between  :   {value : [2, 3],      color : "rgb(252,146,114)"},
	                        class4_between  :   {value : [3, 4],     color : "rgb(251,106,74)"},
	                        class5_between  :   {value : [4, 5],    color : "rgb(222,45,38)"},
	                        class6_more     :   {value : 5,           color : "rgb(165,15,21)"}                   
	                    }
	                },
	                analysis_2 : {
	                    config : {
	                        name            :   "Cumulative Incidence Rate (x 100000)",
	                        abbreviation    :   "CIR",
	                        fieldRate       :   "CumulIR_100000",
	                        fieldAbsolute   :   "Cumul_cases",
	                        otherName       :   "Cumulative Incidence Rate",
	                        printName       :   "Cumulative Incidence Rate (x 100000)"
	                    },
	                    classes : {
	                        class1_less     :   {value : 1,             color : "rgb(254,229,217)"},
	                        class2_between  :   {value : [1, 5],       color : "rgb(252,187,161)"},
	                        class3_between  :   {value : [5, 10],      color : "rgb(252,146,114)"},
	                        class4_between  :   {value : [10, 20],     color : "rgb(251,106,74)"},
	                        class5_between  :   {value : [20, 30],    color : "rgb(222,45,38)"},
	                        class6_more     :   {value : 30,           color : "rgb(165,15,21)"}
	                    }
	                }					
				},
				// cases (all param : INTEGER) - define the default range of circle size for each analysis. 
				cases : {
	                analysis_1 : {
	                    minArea : 50,
	                    maxArea : 1000                    
	                },
	                analysis_2 : {
	                    minArea : 100,
	                    maxArea : 2000
	                }				
				},            
				geoSources : {
					// Insert only geometry sources with the CRS 3857
					polygons : {
						// display (BOOLEAN) - Choose to display the layer or not.
						display: true,
						// name (STRING) - Name of the layer as it is going to be displayed in the legend.
		                name    : "LGA",
		                // source (STRING) - Source of the layer's data.
		                source  : "data/adm2_ebonyi_a.json",
		                // format (STRING) - Set the format of the dataset. Can be either "TopoJSON", "GeoJSON" or "EsriJSON".
		                format  : "TopoJSON",
		                // geoCode (STRING) - Joined field ('p' code).
		                geoCode : "pcode",
		                // geoName (STRING) - Matching names for labels.
		                geoName : "name"
					},
					// Insert only geometry sources with the CRS 3857
					points : {
						// display (BOOLEAN) - Choose to display the layer or not.
						display: true,						
						// name (STRING) - Name of the layer as it is going to be displayed in the legend.
		                name    : "LGA",
		                // source (STRING) - Source of the layer's data.
		                source  : "data/adm2_ebonyi_p.json",
		                // format (STRING) - Set the format of the dataset.
		                format  : "TopoJSON",
		                // geoCode (STRING) - Joined field ('p' code).
		                geoCode : "pcode",
		                // geoName (STRING) - Matching names for labels.
		                geoName : "name"
		            }	            
				},
				// Define the style of the polygons (elements that don't depend on the analysis).
				polygonsStyle : {
					// outline - For the outlines
					outline : {
						// strokeColor (STRING) - RGBA string that contains the color for the outlines.
						strokeColor : "rgba(0,0,0,0.4)",
						// strokeWidth (REAL) - Defines the width of circles' outlines.
						strokeWidth : 1
					},
					// colors - Define the transparency and the "0" value.
					colors : {
						// transparency (STRING) - Default transparency for the fill colors.
						transparency : "0.8",
						// class0 (STRING) - Color for the "0" value.
						class0 : "rgba(0,0,0,0)",
					}
				},
				// Define options for the cases analysis.
	            casesStyle : {
	            	// titleForLegend (STRING) - Name of the layer as it is going to be displayed in the legend.
	                titleForLegend : "Cases (by LGA)",
	                // fill (color : STRING) - RGBA string that contains the fill color for the circles.
	                fill : {
	                    color : "rgba(200,0,0,0.3)"
	                },
	                // stroke - Set the display of the circles' outlines.
	                stroke : {
	                	// color (STRING) - RGBA string that contains the fill color for the circles' outlines. 
	                    color : "rgba(0,0,0,1)",
	                    // width (REAL) - Defines the width of circles' outlines.
	                    width : 1
	                },
	                // sliderSizeStart (array of INTEGERs) - Define the default range of size for the circles. 
	                sliderSizeStart : [1, 600]
	            }
			},
			// context - Array of objects. Each object represents one layer. MUST BE POLYGONS.
			context : [
				{
					// name (STRING) - Name of the layer as it is going to be displayed in the legend.
	                name    : "States",
	                // source (STRING) - Source of the layer's data.
	                source  : "data/adm1_nigeria_a.json",
	                // format (STRING) - Set the format of the dataset.
	                format  : "TopoJSON",
	                // style - Set the style of the layer.
	                style   : {
	                	// fillColor (STRING) - RGBA string that contains the fill color for the polygons. 
	                    fillColor   : "rgba(0,0,0,0)",
	                    // strokeColor (STRING) - RGBA string that define the color of polygons' outlines.
	                    strokeColor : "rgba(0,0,0,1)",
	                    // strokeWidth (REAL) - Defines the width of polygons' outlines.
	                    strokeWidth : 1.5
	                },
	                // display (BOOLEAN) - To be set to "true" in order to display the layer. Set to "false" to hide it.
	                display : true
				}  			
			],
			// Define layout components (all param : STRING) - Title, descriptions, etc...
		    layout : {
		        // appTitle - Set the title of the webmap.
		        appTitle : "NIGERIA - Ebonyi State - 2019 Yellow Fever | All Cases (Positive, Probable & Negative)",
		        // analysisSectionTitle - Section title for analysis selector.
		        analysisSectionTitle : "Map analysis",
		        // analysisDescription - Description below analysis title (Use HTML tags for formatting).
		        analysisDescription : "<i>Choose the analysis you want to be shown on the map using the drop down-list below. The <b>weekly incidence rate</b> represents the ratio of new cases among the LGA's population for a given week. The <b>cumulative incidence rate</b> represents the proportion of the week's cumulated cases in the LGA's population.</i>",
		        // dimensionTitle - Title for the dimension used to filter the data with the slider.
		        dimensionTitle : "Filter by week",
		        // dimensionDescription - Description above the filter slider (Use HTML tags for formatting).
		        dimensionDescription : "<i>Choose the week's data you want to be displayed on the map by moving this slider.</i>",
		        // dimensionIndicator - Label that goes along with the filtering value.
		        dimensionIndicator : "Week",
		        // selectionTitle - Title for the feature selection.
		        selectionTitle : "Information",
		        // selectionDescription - Description above the selection's drop-down list (Use HTML tags for formatting).
		        selectionDescription : "<i>Select a LGA using the drop-down list below or by clicking on the map.</i>",
		        // selectionDefault - Define default text for selector (displayed when no features are selected).
		        selectionDefault : "Select an LGA...",
		        
		        // THE THREE ATTRIBUTES BELOW ARE NOT IMPLEMENTED YET
		        // appDisclaimer (STRING) - Write a disclaimer
		        appDisclaimer : "This application was designed by MSF GIS-Unit. Main local contact is the GIS @ OCB Lassa Fever project: msfocb-ebonyi-gis@brussels.msf.org",
		        // displayAppDisclaimer (BOOLEAN) - Hide or show app disclaimer.
		        displayAppDisclaimer : true,
		        // mapSettings (BOOLEAN) - Hide or show map settings.
		        mapSettings : true		        
		    },
		    // Define legend display parameters.
	        legendParam : {
	        	// forGeometryTitle (STRING) - Choose which property of the geometry object will be used to display the geometry title.
	            forGeometryTitle : "name",
	            // forAnalysisTitle (STRING) - Choose which property of the analysis object will be used to display the analysis title.
	            forAnalysisTitle : "otherName",
	            // verticalGap (REAL) - Set space between two features (between classes).
	            verticalGap : 6,
	            // horizontalGap (REAL) - Set space between a graphic element and its label.
	            horizontalGap : 15,
	            // rectangleHeight (REAL) - Define the height of the graphic rectangles.
	            rectangleHeight : 10,
	            // rectangleWidth (REAL) - Define the width of the graphic rectangles.
	            rectangleWidth  : 25,	
	            // labelSize (REAL) - Define label font size.
	            labelSize   : 11,    
	            // labelColor (STRING) - Define label font color with an RGBA string.
	            labelColor  : "rgba(0,0,0,1)",
	            // labelShift (INTEGER) - Arrange label vertical gap with the rectangles. 
	            labelShift  : 8,
	            // otherSectionTitle (STRING) - Title for the other layers' section.
	            otherSectionTitle   : "Context"
	        },
	        // Define text settings for charts layout (all param : STRING) - Title, legend, tooltip, etc... 
	        chartsLayout : {
	            cumulative : {
	                title   : "Incidence Rate (x 100000)",
	                legend  : "Incidence Rate (x 100000)",
	                axis    : "Rates",
	                tooltip : "Incidence rate"
	            },
	            measure : {
	                title   : "Weekly Incidence Rate (x 100000)",                
	                legend  : "Weekly Incidence Rate (x 100000)",
	                axis    : "Rates",
	                tooltip : "Weekly incidence rate"                
	            },
	            combined : {
	                title   : "All Cases",
	                bars : {
	                    legend  : "Bars : New weekly all cases",
	                    axis    : "New weekly cases",
	                    tooltip : "New all cases"                    
	                },
	                line : {
	                    legend  : "Line : Cumulated all cases",
	                    axis    : "Cumulated cases",
	                    tooltip : "Cumulated all cases"                    
	                }                
	            }
	        },
	};
	
	
	
	
	
	// Send config to global object
	configFile.mapViewInit = globalParameters.map;
	configFile.data.analysisLayer.geometry = globalParameters.analysis.geoSources.polygons;
	configFile.data.analysisLayer.geometryPoints = globalParameters.analysis.geoSources.points;
	configFile.data.analysisLayer.epiDataset = globalParameters.data.epiDataset;
	configFile.data.otherLayers = globalParameters.context;
	configFile.layout = globalParameters.layout;
	configFile.analysisFunctions.style.circles = globalParameters.analysis.cases;
	configFile.analysisFunctions.style.outline = globalParameters.analysis.polygonsStyle.outline;
	configFile.analysisFunctions.style.colors = globalParameters.analysis.polygonsStyle.colors;
	configFile.analysisFunctions.style.colors.glob = {};
	configFile.analysisFunctions.types.rates = globalParameters.analysis.rates;
	configFile.analysisFunctions.style.circles = globalParameters.analysis.cases;
	configFile.analysisFunctions.legendParam = globalParameters.legendParam;
	configFile.analysisFunctions.chartsLayout = globalParameters.chartsLayout;
})();