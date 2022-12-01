<template>
    <div class="print-div"></div>
</template>

<script>
export default {
    name: 'Print',
    async mounted() {
        const app = await import('../data/map');
        app.initializePrint(this.$el);
    }
};
</script>

<style lang="scss">
.print-div {
    position: absolute;
    right: 0;
    z-index: 999;
    width: 300px;
    height: 450px;
}
</style>