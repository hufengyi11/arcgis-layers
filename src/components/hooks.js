import { useEffect } from "react";
import {loadModules} from "esri-loader";

export const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initializeMap = async (mapRef) => {
      const modules = [
        "esri/WebScene",
        "esri/views/SceneView",
        "esri/widgets/Legend"
      ];
      
      const [WebScene, SceneView, Legend] = await loadModules(modules);

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
    };

    initializeMap(mapRef);
    console.log("Initializing map...");

    return () => view?.destroy();
  }, [mapRef]);
};
