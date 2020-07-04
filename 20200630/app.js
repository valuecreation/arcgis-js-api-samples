import React, {Component} from 'react';
import {render} from 'react-dom';

import {StaticMap} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import {MapController} from '@deck.gl/core';
import {Tile3DLayer} from '@deck.gl/geo-layers';
import {I3SLoader} from '@loaders.gl/i3s';

// How to get mapbox token https://docs.mapbox.com/help/how-mapbox-works/access-tokens/
const MAPBOX_TOKEN = 'pk.eyJ1IjoidmFsdWVjcmVhdGlvbiIsImEiOiJjanM0Z21xamQwNHRrM3lueXZrOHBxZmNmIn0.oF6cKsx1z4NzUNiJ7RTXNQ'; // add your Mapbox token here

const INITIAL_VIEW_STATE = {
  longitude: -120,
  latitude: 34,
  height: 600,
  width: 800,
  pitch: 45,
  maxPitch: 85,
  bearing: 0,
  minZoom: 2,
  maxZoom: 30,
  zoom: 14.5
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {viewState: INITIAL_VIEW_STATE};
  }

  _onTilesetLoad(tileset) {
    // update viewport to the tileset center
    const {zoom, cartographicCenter} = tileset;
    const [longitude, latitude] = cartographicCenter;

    const viewState = {
      ...this.state.viewState,
      zoom: zoom + 2.5,
      longitude,
      latitude
    };

    this.setState({viewState});
  }

  render() {
    const {viewState} = this.state;

    // construct Tile3DLayer to render I3S tileset
    const layer = new Tile3DLayer({
      id: 'tile-3d-layer',
      // Tileset entry point: Indexed 3D layer file url
      data: 'https://services.arcgis.com/wlVTGRSYTzAbjjiC/ArcGIS/rest/services/Tokyo_Building_MP/SceneServer/layers/0?f=pjson',
      loader: I3SLoader,
      onTilesetLoad: this._onTilesetLoad.bind(this)
    });

    return (
      <DeckGL
        layers={[layer]}
        viewState={viewState}
        controller={{type: MapController}}
        onViewStateChange={({viewState}) => {
          // update viewState when interacting with map
          this.setState({viewState});
        }}
      >
        <StaticMap
          mapStyle={'mapbox://styles/mapbox/streets-v11'}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          preventStyleDiffing
        />
      </DeckGL>
    );
  }
}

export function renderToDOM(container) {
   render(<App />, container);
}