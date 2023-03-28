import { useEffect } from "react";
import {loadModules} from "esri-loader";

export const useCreateMap = (mapRef) => {
  useEffect(() => {
    let view;

    const initializeMap = async (mapRef) => {
      const modules = [
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GeoJSONLayer"
      ];
      const [Map, MapView, GeoJSONLayer] = await loadModules(modules);
      
      const map = new Map({ 
        basemap: "topo-vector" 
      });
      
      view = new MapView({ 
        container: mapRef.current,
        map: map,
        zoom: 11,
        center: [-0.1278, 51.5074] // London coordinates
      });
      
      const url =
        "ui/src/components/132kv-overhead-lines.geojson";

      const geojsonLayer = new GeoJSONLayer({
        url: url,
        title: "Power Network Lines"
      });
      
      map.add(geojsonLayer);
    };

    initializeMap(mapRef);

    return () => view?.destroy();
  }, [mapRef]);
};
