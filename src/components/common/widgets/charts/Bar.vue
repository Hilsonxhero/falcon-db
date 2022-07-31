<template>
    <apexchart :options="options" :series="series" :height="height" type="bar"></apexchart>
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
        type: "bar",
        // height: "10",
        toolbar: {
            show: false,
        },
        sparkline: {
            enabled: false,
        },
    },
    plotOptions: {
        radialBar: {
            borderRadius: 50,
        },
        bar: {
            borderRadius: 5,
            horizontal: props.horizontal,
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
    },
    xaxis: {
        // categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        categories: props.categories,

        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                colors: labelColor,
                fontSize: "12px",
            },
        },
    },
    yaxis: {
        y: 0,
        offsetX: 0,
        offsetY: 0,
        labels: {
            style: {
                colors: labelColor,
                fontSize: "12px",
            },
        },
    },
    fill: {
        type: "solid",
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
                return "تومان" + val + " revenue";
            },
        },
    },
    colors: [baseColor, secondaryColor],
    grid: {
        show: false,
        padding: {
            top: 0,
            left: 20,
            right: 0,
            bottom: 0,
        },

        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
};

</script>

<style scoped>
</style>
