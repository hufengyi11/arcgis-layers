import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

export const useFeatureLayer = (mapRef) => {

    useEffect( () => {
        let view;

        const initialiseMap = async (mapRef) => {

            const modules = [
                "esri/Map",
                "esri/views/MapView",
                "esri/layers/FeatureLayer",
                "esri/widgets/Search",
                'esri/widgets/LayerList',
                "esri/widgets/Sketch",
                "esri/layers/GraphicsLayer",
                "esri/widgets/BasemapToggle",
                "esri/widgets/BasemapGallery"
            ];

            const [
                Map, 
                MapView, 
                FeatureLayer,
                Search, 
                LayerList, 
                Sketch,
                GraphicsLayer,
                BasemapToggle, 
                BasemapGallery
              ] = await loadModules(modules);
      
              const graphicsLayer = new GraphicsLayer();
      
              const map = new Map({
                  basemap: "light-gray-vector",
                  layers: [graphicsLayer]
              })
      
            view = new MapView({
                  map: map,
                  center: [0.0878, 51.7678], // lon, lat
                  scale: 2000000,
                  container: mapRef.current, 
              })
      
              const template = {
                  // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
                  title: "{dno} {voltage}",
                  content: [
                      {
                        type: "fields",
                        fieldInfos: [
                          {
                            fieldName: "geo_point_2d",
                            label: "geo_point_2d"
                          }, 
                          {
                              fieldName: "voltage",
                              label: "voltage"
                          }, 
                          {
                              fieldName: "cmr",
                              label: "cmr"
                          }, 
                          {
                              fieldName: "ob_class",
                              label: "ob_class"
                          }, 
                          {
                              fieldName: "dno",
                              label: "dno"
                          },
                          {
                              fieldName: "betr_spann",
                              label: "voltage"
                          }
                        ]
                      }
                    ]
                };
      
              const featureLayer132kVlines = new FeatureLayer({
                  url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/132kvoverheadlines/FeatureServer/0",
                  popupTemplate: template,
              });
      
              const featureLayer66kVlines = new FeatureLayer({
                  url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/ukpn66kvoverheadlinesshapefile/FeatureServer/0",
                  popupTemplate: template,
              })
      
              const featureLayer33kVlines = new FeatureLayer({
                  url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/33kvoverheadlines/FeatureServer/0", 
                  popupTemplate: template,
              })

            // Create a new renderer with a red line symbol
            const redRenderer = {
                type: "simple",
                symbol: {
                type: "simple-line",
                color: "#ff0000", // red
                width: "1px"
                }
            };

            const orangeRenderer = {
                type: "simple",
                symbol: {
                type: "simple-line",
                color: "orange", // red
                width: "1px"
                }
            };

            const greenRenderer = {
                type: "simple",
                symbol: {
                type: "simple-line",
                color: "green", // red
                width: "1px"
                }
            };

            featureLayer132kVlines.renderer = redRenderer
            featureLayer66kVlines.renderer = orangeRenderer
            featureLayer33kVlines.renderer = greenRenderer
      
              map.add(featureLayer132kVlines)
              map.add(featureLayer66kVlines)
              map.add(featureLayer33kVlines)

              // Add basemap toggle
              const basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap: "arcgis-imagery"
             });

             const basemapGallery = new BasemapGallery({
              view: view,
              source: {
                query: {
                  title: '"World Basemaps for Developers" AND owner:esri'
                }
              }
            });
      
              // Add search
              const search = new Search({
                view: view,
                allPlaceholder: "Search",
                includeDefaultSources: false,
                sources: [
                  {
                    layer: featureLayer132kVlines,
                    searchFields: ["dno", "voltage", "cmr", "ob_class"],
                    exactMatch: false,
                    outFields: ["dno", "voltage", "cmr", "ob_class"],
                    name: "132kV lines",
                    placeholder: "example: LPN",
                  },
                  {
                      layer: featureLayer66kVlines,
                      searchFields: ["dno", "voltage", "cmr", "ob_class"],
                      exactMatch: false,
                      outFields: ["dno", "voltage", "cmr", "ob_class"],
                      name: "66kV lines",
                      placeholder: "example: LPN"
                  },
                  {
                      layer: featureLayer33kVlines,
                      searchFields: ["dno", "betr_spann", "cmr", "ob_class"],
                      exactMatch: false,
                      outFields: ["dno", "betr_spann", "cmr", "ob_class"],
                      name: "33kV lines",
                      placeholder: "example: LPN"
                  },
                  {
                    name: "ArcGIS World Geocoding Service",
                    placeholder: "example: London",
                    apiKey: "AAPK1d77186557e04a708ac0ca3713bf1e3c56gInDTOMBdRESlP3f2mCo1Uq6evk7iGV61P3bjA2lgBZn5fkrcQU4xfPZUZkbgh",
                    singleLineFieldName: "SingleLine",
                    url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
                  }
                ]
              });
              
              // Add a legend instance to the panel of a ListItem in a LayerList instance
              const layerList = new LayerList({
                view: view,
                listItemCreatedFunction: (event) => {
                  const item = event.item;
                  if (item.layer.type !== "group") {
                    // don't show legend twice
                    item.panel = {
                      content: "legend",
                      open: true
                    };
                  }
                }
              });
                            
              // Add sketch
              const sketch = new Sketch({
              // layer: view.map.allLayers.getItemAt(0),
                layer: graphicsLayer,
                view: view,
                creationMode: "update" // Auto-select
              });
      
              // view.ui.add(search, 'top-right');
              // view.ui.add(sketch, "top-right");
              // view.ui.add(layerList, "top-right");
              // view.ui.add(basemapToggle,"bottom-right");
              // view.ui.add(basemapGallery, "top-right");
        };

        initialiseMap(mapRef);

        return () => view?.destroy();
    }, [mapRef]);
};