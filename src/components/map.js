import React, { useRef } from 'react';
import { useCreateMap } from './hooks';

const Map = () => {
  const mapRef = useRef(null);
  useCreateMap(mapRef);

  return <div className="map-view" ref={mapRef} />;
};

export default Map;
