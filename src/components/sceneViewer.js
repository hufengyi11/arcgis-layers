import React, { useEffect } from "react";
import { loadModules } from "esri-loader";

const EsriSceneView = () => {
  useEffect(() => {
    loadModules(["esri/views/SceneView", "esri/widgets/LayerList", "esri/WebScene"]).then(
      ([SceneView, LayerList, WebScene]) => {
        const scene = new WebScene({
          portalItem: {
            // autocasts as new PortalItem()
            id: "adfad6ee6c6043238ea64e121bb6429a"
          }
        });

        const view = new SceneView({
          container: "viewDiv",
          map: scene
        });

        view.when(() => {
          const layerList = new LayerList({
            view: view
          });

          // Add widget to the top right corner of the view
          view.ui.add(layerList, "top-right");
        });
      }
    );
  }, []);

  return <div id="viewDiv" />;
};

export default EsriSceneView;
