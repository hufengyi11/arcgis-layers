import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

function FeatureLayer() {

  useEffect(() => {

    loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/Search",
        'esri/widgets/LayerList',
        "esri/widgets/Sketch",
        "esri/layers/GraphicsLayer",
    ]).then(([
      Map, 
      MapView, 
      FeatureLayer,
      Search, 
      LayerList, 
      Sketch,
      GraphicsLayer,
    ]) => {

        const map = new Map({
            basemap: "dark-gray-vector"
        })

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [0.0878, 51.7678], // lon, lat
            scale: 2000000
        })

        const featureLayer132kVlines = new FeatureLayer({
            url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/132kvoverheadlines/FeatureServer/0"
        });

        const featureLayer66kVlines = new FeatureLayer({
            url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/ukpn66kvoverheadlinesshapefile/FeatureServer/0"
        })

        const featureLayer33kVlines = new FeatureLayer({
            url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/33kvoverheadlines/FeatureServer/0"
        })

        map.add(featureLayer132kVlines)
        map.add(featureLayer66kVlines)
        map.add(featureLayer33kVlines)

        // Add search
        const search = new Search({
          view: view,
          allPlaceholder: "Search",
          includeDefaultSources: false,
          sources: [
            {
              layer: featureLayer132kVlines,
              searchFields: ["dno", "voltage", "ob_class"],
              displayField: "132kV lines",
              exactMatch: false,
              outFields: ["dno", "voltage", "ob_class"],
              name: "132kV lines",
              placeholder: "example: LPN"
            },
            {
                layer: featureLayer66kVlines,
                searchFields: ["dno", "voltage", "ob_class"],
                displayField: "66kV lines",
                exactMatch: false,
                outFields: ["dno", "voltage", "ob_class"],
                name: "66kV lines",
                placeholder: "example: LPN"
            },
            {
                layer: featureLayer33kVlines,
                searchFields: ["dno", "voltage", "ob_class"],
                displayField: "132kV lines",
                exactMatch: false,
                outFields: ["dno", "voltage", "ob_class"],
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
        
        // Add sketch widget
        const graphicsLayer = new GraphicsLayer();
        // map.add(graphicsLayer);
        
        // Add sketch
        const sketch = new Sketch({
        // layer: view.map.allLayers.getItemAt(0),
          layer: graphicsLayer,
          view: view,
          creationMode: "update" // Auto-select
        });

        view.ui.add(search, 'top-right');
        view.ui.add(sketch, "top-right");
        view.ui.add(layerList, "top-right");

        return () => {
          if (view) {
            // destroy the map view
            view.container = null;
          }
        };
  });
  }, []);

  return <div id="viewDiv" style={{ height: "100vh" }}></div>;
}

export default FeatureLayer;