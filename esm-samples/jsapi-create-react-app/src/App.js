import React, { useRef, useEffect } from "react";
import WebScene from "@arcgis/core/WebScene";
import SceneView from "@arcgis/core/views/SceneView";
import config from "@arcgis/core/config";

import "./App.css"; 

function App() {

  const viewDiv = useRef(null);

  useEffect(() => {
    if (viewDiv.current) {
      /**
       * Initialize application
       */
      const map = new WebScene({
        portalItem: {
          id: "9c90786e1a1d4102adf9d53655c2843d"
        }
      });

      const view = new SceneView({
        container: viewDiv.current,
        map: map,
        alphaCompositingEnabled: true,
        environment: {
          // set a transparent background
          background: {
            type: "color",
            color: [255, 252, 244, 0]
          },
          lighting: {
            date:
              "Sun Jul 15 2018 08:00:00 GMT+0200 (W. Europe Daylight Time)"
          },
          // disable stars
          starsEnabled: false,
          // disable atmosphere
          atmosphereEnabled: false
        },
        // limit zooming in and out
        constraints: {
          altitude: {
            min: 7000000,
            max: 25000000
          }
        },
        ui: {
          components: ["attribution"]
        },
        padding: {
          top: 100
        }
      });

    }
  }, []);

  return <div className="viewDiv" ref={viewDiv}></div>;

}

export default App;
