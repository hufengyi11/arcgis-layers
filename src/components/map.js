import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

function Map() {

  useEffect(() => {

    loadModules([
      "esri/WebScene",
      "esri/views/SceneView",
      'esri/widgets/Search',
      'esri/widgets/LayerList',
      "esri/widgets/Sketch",
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",    
    ]).then(([
      WebScene, 
      SceneView, 
      Search, 
      LayerList, 
      Sketch,
      GraphicsLayer,
      FeatureLayer]) => {

      const webscene = new WebScene({
        portalItem: {
          id: "c331bd42f3544e9fa39ed4289f5c254b"
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        map: webscene
      });

      const featureLayerDistricts = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_117th_Congressional_Districts_all/FeatureServer/0",
      });

      // Add search
      const search = new Search({
        view: view,
        allPlaceholder: "Search Layers",
        includeDefaultSources: false,
        sources: [
          // {
          //   layer: new FeatureLayer({
          //     url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/132kvoverheadlines/FeatureServer/0",
          //     outFields: ["*"]
          //   }),
          //   searchFields: ["dno", "voltage", "ob_class", "recordid", "datasetid"],
          //   displayField: "dno",
          //   name: "132kV Overhead Lines"
          // }, 
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
      webscene.add(graphicsLayer);
      
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

export default Map;