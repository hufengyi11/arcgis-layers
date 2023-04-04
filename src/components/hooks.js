import { useEffect } from "react";
import {loadModules} from "esri-loader";

export const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initializeMap = async (mapRef) => {
      const modules = [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
      ];
      const [Map, MapView, FeatureLayer] = await loadModules(modules);
      
      const map = new Map({ 
        basemap: "topo-vector" 
      });
      
      view = new MapView({ 
        container: mapRef.current,
        map: map,
        zoom: 8,
        center: [-0.1278, 51.5074] // London coordinates
      });

      const fl = new FeatureLayer({
        portalItem: {  
          id: "54d29ca67d1c4d269677274b88734b8f" // 132kV
        }
      });
      
      map.add(fl);
    };

    initializeMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};

