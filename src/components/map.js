import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

function Map() {
  useEffect(() => {

    loadModules([
      "esri/WebScene",
      "esri/views/SceneView",
      "esri/widgets/Legend"
    ]).then(([WebScene, SceneView, Legend]) => {
      const webscene = new WebScene({
        portalItem: {
          id: "c331bd42f3544e9fa39ed4289f5c254b"
        }
      });

      const view = new SceneView({
        container: "viewDiv",
        map: webscene
      });

      const legend = new Legend({
        view: view
      });

      view.ui.add(legend, "top-right");

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
