import React, { useEffect, useRef } from 'react';
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

const Sketch = () => {
  const mapRef = useRef(null);
  const tempLayerRef = useRef(null);
  const sketchRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/GraphicsLayer',
      'esri/widgets/Sketch',
      'esri/symbols/SimpleLineSymbol',
      'esri/Graphic',
    ]).then(([
      Map,
      MapView,
      GraphicsLayer,
      Sketch,
      SimpleLineSymbol,
      Graphic,
    ]) => {
      const map = new Map({
        basemap: "dark-gray-vector",
      });

      const view = new MapView({
        container: mapRef.current,
        map,
        center: [-25.312, 34.307],
        zoom: 3,
      });
      viewRef.current = view;

      const tempLayer = new GraphicsLayer();
      map.add(tempLayer);
      tempLayerRef.current = tempLayer;

      if (localStorage.features !== undefined) {
        JSON.parse(localStorage.features).forEach((featureJson) => {
          tempLayer.add(new Graphic(featureJson));
        });
      }

      const sketch = new Sketch({
        view,
        layer: tempLayer,
        creationMode: 'update',
        symbol: new SimpleLineSymbol(),
      });
      sketchRef.current = sketch;

      sketch.on('create', (evt) => {
        if (evt.state === 'complete') {
          const graphic = evt.graphic;
          tempLayer.add(graphic);
          let graphics = [];
          if (localStorage.features !== undefined) {
            graphics = JSON.parse(localStorage.features);
          }
          graphics.push(graphic.toJSON());
          localStorage.features = JSON.stringify(graphics);
        }
      });

      view.ui.add(sketch, 'top-right');
    });
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '900px' }} />;
};

export default Sketch;
