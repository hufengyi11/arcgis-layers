import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

function Map() {
  useEffect(() => {

    loadModules([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/widgets/Legend",
      'esri/widgets/Search',
      'esri/widgets/LayerList',
      "esri/widgets/Sketch",
      "esri/layers/GraphicsLayer",
      "esri/widgets/BasemapToggle",
      "esri/widgets/BasemapGallery",
      "esri/layers/FeatureLayer",
    ]).then(([WebScene, 
      SceneView, 
      Search, 
      LayerList, 
      Legend, 
      Sketch,
      GraphicsLayer,
      BasemapToggle, 
      BasemapGallery,
      FeatureLayer,]) => {
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

      view.ui.add(search, {
        position: 'top-left',
        index: 0
      });
      
      // Add layer list widget
      const layerList = new LayerList({
        view: view
      });

      view.ui.add(layerList, {
        position: 'top-right'
      });

      // Add legend
      const legend = new Legend({
        view: view
      });

      view.ui.add(legend, "top-right");
      
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

      view.ui.add(sketch, "top-right");

      // Add basemap 
      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery"
     });

      view.ui.add(basemapToggle,"bottom-right");

      const basemapGallery = new BasemapGallery({
        view: view,
        source: {
          query: {
            title: '"World Basemaps for Developers" AND owner:esri'
          }
        }
      });

      view.ui.add(basemapGallery, "top-right"); // Add to the view

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
