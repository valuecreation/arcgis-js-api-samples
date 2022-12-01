// src/data/map.js
import config from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Expand from '@arcgis/core/widgets/Expand';
import Legend from '@arcgis/core/widgets/Legend';
import Print from '@arcgis/core/widgets/Print';

config.assetsPath = './assets';

export const webmap = new WebMap({
    portalItem: {
        id: 'f2e9b762544945f390ca4ac3671cfa72'
    }
});

export const view = new MapView({
    container: 'viewDiv',
    map: webmap
});

export const legend = new Expand({
    content: new Legend({
        view,
        style: 'card'
    }),
    view,
    expanded: true
});
view.ui.add(legend, 'bottom-left');

/**
 * Assigns the container element to the View
 * @param container
 */
export const initialize = (container) => {
    view.container = container;
    view.when()
        .then(() => {
            console.log('Map and View are ready');
        })
        .catch(error => {
            console.warn('An error in creating the map occurred:', error);
        });
};

export function initializePrint(container) {
    const print = new Print({ view, container });
    return print;
}