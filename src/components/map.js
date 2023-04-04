import React, { useRef } from 'react';
import { useCreateMap } from './hooks';

const Map = () => {
  const mapRef = useRef(null);
  useCreateMap(mapRef);
  return <div id="viewDiv" ref={mapRef} />;
};

export default Map;
