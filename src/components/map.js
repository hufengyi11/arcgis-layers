import { useEffect } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
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

      const legend = new Legend ({
        view:view
      });

      view.ui.add(legend, "top-right");
    }).catch(err => {
      console.error(err);
    })
  }, []);

  return <div id="viewDiv" />;
};

export default Map;
