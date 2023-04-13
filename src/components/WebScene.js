import { useEffect } from "react";
import { setDefaultOptions, loadModules } from "esri-loader";

setDefaultOptions({ css: true });

export const useWebScene = (mapRef) => {

  useEffect(() => {
    let view;
    
    const initialiseMap = async (mapRef) => {

      const modules = [
      "esri/WebScene",
      "esri/views/SceneView",
      'esri/widgets/Search',
      'esri/widgets/LayerList',
      "esri/widgets/Sketch",
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
      ];

      const [
        WebScene, 
        SceneView, 
        Search, 
        LayerList, 
        Sketch,
        GraphicsLayer,
        FeatureLayer
      ] = await loadModules(modules);

        const webscene = new WebScene({
          portalItem: {
            id: "c331bd42f3544e9fa39ed4289f5c254b"
          }
        });

        view = new SceneView({
          container: "viewDiv",
          map: webscene
        });

        // Add search
        const search = new Search({
          view: view,
          allPlaceholder: "Search Layers",
          includeDefaultSources: false,
          sources: [
            {
              name: "33kV Overhead Lines",
              featureLayer: new FeatureLayer({
                url: "https://services1.arcgis.com/q63dRGvxpbXwQKMG/arcgis/rest/services/33kvoverheadlines/FeatureServer/0",
                outFields: ["*"],
                popupEnabled: false
              }),
              exactMatch: false,
              searchFields: ["datasetid", "dno", "ob_class", "cmr"],
              placeholder: "Search 33kV Overhead Lines",
              zoomScale: 50000
            },
            {
              name: "ArcGIS World Geocoding Service",
              placeholder: "example: London",
              apiKey: "AAPK1d77186557e04a708ac0ca3713bf1e3c56gInDTOMBdRESlP3f2mCo1Uq6evk7iGV61P3bjA2lgBZn5fkrcQU4xfPZUZkbgh",
              singleLineFieldName: "SingleLine",
              url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
            }
          ]
        });
        
        // Add a legend instance to the panel of a ListItem in a LayerList instance
        const layerList = new LayerList({
          view: view,
          listItemCreatedFunction: (event) => {
            const item = event.item;
            if (item.layer.type !== "group") {
              // don't show legend twice
              item.panel = {
                content: "legend",
                open: true
              };
            }
          }
        });
        
        // Add sketch widget
        const graphicsLayer = new GraphicsLayer();
        webscene.add(graphicsLayer);
        
        // Add sketch
        const sketch = new Sketch({
        // layer: view.map.allLayers.getItemAt(0),
          layer: graphicsLayer,
          view: view,
          creationMode: "update" // Auto-select
        });

        view.ui.add(search, 'top-right');
        view.ui.add(sketch, "top-right");
        view.ui.add(layerList, "top-right");

      }

      initialiseMap(mapRef);

       return () => view?.destroy();
    }, [mapRef]);
};