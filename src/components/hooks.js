import { useEffect } from "react";
import {loadModules} from "esri-loader";

export const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initializeMap = async (mapRef) => {
      const modules = [
        "esri/Map",
        "esri/views/MapView", 
        "esri/Graphic"
      ];
      const [Map, MapView, Graphic] = await loadModules(modules);
      
      const map = new Map({ 
        basemap: "topo-vector" 
      });
      
      view = new MapView({ 
        container: mapRef.current,
        map: map,
        zoom: 11,
        center: [-0.1278, 51.5074] // London coordinates
      });

      const polyline = {
        type: "polyline", // autocasts as new Polyline()
        paths: [[-111.3, 52.68], [-98, 49.5], [-93.94, 29.89]]
      };

      const polylineGraphic = new Graphic({
        geometry: polyline
      });

      view.graphics.add(polylineGraphic)
    
      
      // const url =
      //   "http://localhost:8080/";

      // const geojsonLayer = new GeoJSONLayer({
      //   url: url,
      //   title: "Power Network Lines",
      //   renderer: {
      //     type: "simple",
      //     symbol: {
      //       type: "simple-line",
      //       color: [255, 0, 0, 1],
      //       width: 2
      //     }
      //   }
      // });
      
      // map.add(geojsonLayer);
    };

    initializeMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};
