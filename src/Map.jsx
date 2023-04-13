import React, {useRef} from "react";
import {useFeatureLayer} from "./components/FeatureLayer.js";

const Map = () => {
    const mapRef = useRef(null);
    useFeatureLayer(mapRef);
    return <div className="map-view" ref={mapRef} />;
};

export default Map; 