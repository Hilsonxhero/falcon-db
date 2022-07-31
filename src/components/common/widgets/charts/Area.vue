<template>
    <apexchart :options="options" :series="series" :height="height" type="area"></apexchart>
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
    categories: {
        type: Array,
    },
    horizontal: {
        type: Boolean,
        default: false
    },
});


const labelColor = "#222";
const borderColor = "#e2e8f9";
const secondaryColor = "#e2e8f9";
const baseColor = "#1da1f2";

const options = {
    chart: {
        fontFamily: "inherit",
        type: "area",
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        sparkline: {
            enabled: true,
        },
    },
    plotOptions: {},
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        type: "solid",
        opacity: 1,
    },
    stroke: {
        curve: "smooth",
        show: true,
        width: 2,
        colors: ["#FFC700", "#50CD89", "#009EF7"],
    },
    xaxis: {
        x: 0,
        offsetX: 0,
        offsetY: 0,
        padding: {
            left: 0,
            right: 0,
            top: 0,
        },
        categories: props.categories,
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            style: {
                colors: "#e2e8f9",
                fontSize: "12px",
            },
        },
        crosshairs: {
            show: false,
            position: "front",
            stroke: {
                color: "#e2e8f9",
                width: 1,
                dashArray: 3,
            },
        },
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        y: 0,
        offsetX: 0,
        offsetY: 0,
        padding: {
            left: 0,
            right: 0,
        },
        labels: {
            show: false,
            style: {
                colors: "#e2e8f9",
                fontSize: "12px",
            },
        },
    },
    states: {
        normal: {
            filter: {
                type: "none",
                value: 0,
            },
        },
        hover: {
            filter: {
                type: "none",
                value: 0,
            },
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: "none",
                value: 0,
            },
        },
    },
    tooltip: {
        style: {
            fontSize: "12px",
        },
        y: {
            formatter: function (val: any) {
                return "$" + val + " thousands";
            },
        },
    },
    colors: ["#FFF8DD", "#E8FFF3", "#F1FAFF"],
    grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
    },
    markers: {
        colors: ["#FFF8DD", "#E8FFF3", "#F1FAFF"],
        strokeColor: ["#FFC700", "#50CD89", "#009EF7"],
        strokeWidth: 3,
    },
};

</script>

<style scoped>
</style>
