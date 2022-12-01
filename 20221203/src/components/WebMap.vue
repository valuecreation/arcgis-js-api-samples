// src/components/WebMap.vue
<template>
    <div class="map-div"></div>
</template>

<script>
export default {
    name: 'WebMap',
    async mounted() {
        const app = await import('../data/map');
        app.initialize(this.$el);
    }
};
</script>

<style lang="scss">
// Widgets (sorted alphabetically)
$include_AreaMeasurement2D: false !default;
$include_AreaMeasurement3D: false !default;
$include_Attachments: false !default;
$include_BasemapGallery: false !default;
$include_BasemapLayerList: false !default;
$include_BasemapToggle: false !default;
$include_BinaryColorSizeSlider: false !default;
$include_Bookmarks: false !default;
$include_BuildingExplorer: false !default;
$include_ButtonMenu: false !default;
$include_ClassedColorSlider: false !default;
$include_ClassedSizeSlider: false !default;
$include_Compass: false !default;
$include_ColorPicker: false !default;
$include_ColorSizeSlider: false !default;
$include_ColorSlider: false !default;
$include_CoordinateConversion: false !default;
$include_DatePicker: false !default;
$include_Daylight: false !default;
$include_Directions: false !default;
$include_DirectLineMeasurement3D: false !default;
$include_DistanceMeasurement2D: false !default;
$include_Editor: false !default;
$include_ElevationProfile: false !default;
$include_Feature: false !default;
$include_FeatureContent: false !default;
$include_FeatureMedia: false !default;
$include_FeatureForm: false !default;
$include_FeatureTable: false !default;
$include_FeatureTemplates: false !default;
$include_FloorFilter: false !default;
$include_Grid: false !default;
$include_HeatmapSlider: false !default;
$include_Histogram: false !default;
$include_HistogramRangeSlider: false !default;
$include_IdentityForm: false !default;
$include_IdentityModal: false !default;
$include_ItemList: false !default;
$include_LayerList: false !default;
$include_LineOfSight: false !default;
$include_Measurement: false !default;
$include_NavigationToggle: false !default;
$include_OpacitySlider: false !default;
$include_Print: true !default;
$include_ScaleBar: false !default;
$include_ScaleRangeSlider: false !default;
$include_Search: false !default;
$include_ShadowAccumulation: false !default;
$include_SizeSlider: false !default;
$include_Sketch: false !default;
$include_Slice: false !default;
$include_Slider: false !default;
$include_SnappingControls: false !default;
$include_Spinner: false !default;
$include_Swipe: false !default;
$include_TableList: false !default;
$include_TimePicker: false !default;
$include_TimeSlider: false !default;

$icomoon-font-path: "./assets/esri/themes/base/icons/fonts" !default;
$calcite-fonts-path: "./assets/esri/themes/base/fonts/fonts/" !default;
@import "~@arcgis/core/assets/esri/themes/light/main.scss";

.map-div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>