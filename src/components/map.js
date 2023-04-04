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
      "esri/widgets/ScaleBar",
      "esri/widgets/Sketch",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/geometry/geometryEngine",
      "esri/widgets/BasemapToggle",
      "esri/widgets/BasemapGallery",
    ]).then(([WebScene, 
      SceneView, 
      Search, 
      LayerList, 
      Legend, 
      ScaleBar,
      Sketch,
      Graphic,
      GraphicsLayer,
      geometryEngine,
      BasemapToggle, 
      BasemapGallery,]) => {
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
      
      const graphicsLayer = new GraphicsLayer();
      webscene.add(graphicsLayer);

      // Add sketch
      const sketch = new Sketch({
        view: view,
        layer: view.map.allLayers.getItemAt(0),
        availableCreateTools: ["polyline", "polygon", "rectangle"],
        creationMode: "update",
        updateOnGraphicClick: true,
        visibleElements: {
          createTools: {
            point: false,
            polygon: true,
            polyline: true,
            rectangle: false,
            circle: false
          },
          selectionTools:{
            "lasso-selection": false,
            "rectangle-selection":false,
          },
          settingsMenu: true,
          undoRedoMenu: true
        }
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
