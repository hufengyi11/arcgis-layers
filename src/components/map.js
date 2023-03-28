import React, { useRef, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API modules
    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/GeoJSONLayer'], { css: true })
      .then(([Map, MapView, GeoJSONLayer]) => {
        // create a new map object
        const map = new Map({
          basemap: 'streets-navigation-vector'
        });

        // create a new map view object
        const view = new MapView({
          container: mapRef.current,
          map: map,
          zoom: 11,
          center: [-0.1278, 51.5074] // London coordinates
        });

        // create a new GeoJSON layer object
        const layer = new GeoJSONLayer({
          url: 'ui/src/components/132kv-overhead-lines.geojson',
          title: 'Power Network Lines'
        });

        // add the layer to the map
        map.add(layer);

        // cleanup function
        return () => {
          if (view) {
            // destroy the view
            view.container = null;
          }
        };
      })
      .catch((err) => console.error(err));
  }, []);

  return <div className="map" ref={mapRef} />;
};

export default Map;
