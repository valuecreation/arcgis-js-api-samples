<template>
  <calcite-shell>
    <slot name="shell-header">
      <header class="header">
        <calcite-icon icon="beaker" scale="m" aria-hidden="true"></calcite-icon>
        <h2 class="heading">ArcGIS Vue and Calcite</h2>
      </header>
    </slot>
    <Print />
    <WebMap />
  </calcite-shell>
</template>

<script>

import {
  applyPolyfills,
  defineCustomElements
} from "@esri/calcite-components/dist/loader";

import WebMap from './components/WebMap.vue'
import Print from './components/Print.vue';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

export default {
  name: 'App',
  components: {
    WebMap,
    Print
  }
}
</script>

<style lang="scss">
@import "~@esri/calcite-colors/dist/colors"; // calcite colors
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  letter-spacing: 0em;
  font-family: "Avenir Next", "Helvetica Neue", sans-serif;
  font-feature-settings: "liga" 1, "calt" 0;
}
#app{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  display: flex;
  align-items: center;
  color: #fff;
  background: $h-bb-060;
  padding: 0.5rem;
}
.heading {
  margin: 0.5rem;
}
</style>