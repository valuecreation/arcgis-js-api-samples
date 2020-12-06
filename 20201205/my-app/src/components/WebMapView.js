import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import './WebMapView.css';

export const WebMapView = () => {
    const mapRef = useRef();

    useEffect(
      () => {
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map', 'esri/views/MapView',  "esri/layers/GeoJSONLayer",], { css: true })
        .then(([ArcGISMap, MapView, GeoJSONLayer]) => {

          const map = new ArcGISMap({
              basemap: 'topo-vector'
          });

          const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

          const template = {
            title: "Earthquake Info",
            content: "Magnitude {mag} {type} hit {place} on {time}",
            fieldInfos: [
              {
                fieldName: "time",
                format: {
                  dateFormat: "short-date-short-time"
                }
              }
            ]
          };

          const renderer = {
            type: "simple",
            field: "mag",
            symbol: {
              type: "simple-marker",
              color: "orange",
              outline: {
                color: "white"
              }
            },
            visualVariables: [
              {
                type: "size",
                field: "mag",
                stops: [
                  {
                    value: 2.5,
                    size: "4px"
                  },
                  {
                    value: 8,
                    size: "40px"
                  }
                ]
              }
            ]
          };

          const geojsonLayer = new GeoJSONLayer({
            url: url,
            copyright: "USGS Earthquakes",
            popupTemplate: template,
            renderer: renderer //optional
          });

          map.add(geojsonLayer);

          // load the map view at the ref's DOM node
          const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [139.767125, 35.681236],
            zoom: 3
          });

          return () => {
            if (view) {
              // destroy the map view
              view.destroy();
            }
          };
        });
      }
    );

    return <div className="webmap" ref={mapRef} />;
};