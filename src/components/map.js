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
    ]).then(([WebScene, 
      SceneView, 
      Search, 
      LayerList, 
      Sketch,
      GraphicsLayer,]) => {
      const webscene = new WebScene({
        portalItem: {
          id: "c331bd42f3544e9fa39ed4289f5c254b"
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        map: webscene
      });

      // Add search
      const search = new Search({
        view: view
      });
      
            // Add a legend instance to the panel of a
      // ListItem in a LayerList instance
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
      view.ui.add(layerList, "top-right");

      
      // Add sketch widget
      const graphicsLayerSketch = new GraphicsLayer();
      webscene.add(graphicsLayerSketch);

      // Add sketch
      const sketch = new Sketch({
      // layer: view.map.allLayers.getItemAt(0),
        layer: graphicsLayerSketch,
        view: view,
        creationMode: "update" // Auto-select
      });

      view.ui.add(search, {
        position: 'top-right',
        index: 0
      });
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