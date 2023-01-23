<template>
    <apexchart :options="options" :series="series" :height="height" type="donut"></apexchart>
</template>

<script setup lang="ts">
const props = defineProps({

    series: {
        type: Array,
    },
    height: {
        type: Number,
    },
    color: {
        type: String,
        defualt: "primary",
    },
    labels: {
        type: Array,
    },
});

const options = {
    chart: {
        fontFamily: "inherit",
        type: "bar",
        // height: "10",
        toolbar: {
            show: false,
        },
        sparkline: {
            enabled: false,
        },
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    labels: props.labels,
}

</script>

<style scoped>
</style>
