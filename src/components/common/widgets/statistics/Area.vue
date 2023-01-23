<template>
    <div class="hx-card">
        <!--begin::Body-->
        <div class="hx-card__card-body flex flex-col ">
            <div class="flex items-center justify-between flex-grow w-full p-5">
                <div class="flex flex-col me-2">
                    <a href="#" class="font-bold">{{ title }}</a>

                    <span class="text-gray-500 mt-1">
                        {{ description }}
                    </span>
                </div>

                <span class="symbol symbol-50px">
                    <span class="symbol-label fs-5 font-bold text-xl">{{ change }}</span>
                </span>
            </div>

            <!--begin::Chart-->
            <apexchart class="statistics-widget-3-chart card-rounded-bottom" :options="chartOptions" :series="series"
                :height="height" type="area"></apexchart>
            <!--end::Chart-->
        </div>
        <!--end::Body-->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps({
    title: String,
    description: String,
    change: {
        type: Number,
    },
    color: {
        type: String,
        default: 'success'
    },
    height: {
        type: Number,
        default: 150
    },
});

const height = ref(props.height);
const color = ref(props.color);
const labelColor = "#3F4254"
const baseColor = "#50CD89"
const lightColor = "#E8FFF3"

const chartOptions = {
    chart: {
        fontFamily: "inherit",
        type: "area",
        height: height.value,
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
    stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [baseColor],
    },
    xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
            style: {
                colors: labelColor,
                fontSize: "12px",
            },
        },
        crosshairs: {
            show: false,
            position: "front",
            stroke: {
                color: "#E4E6EF",
                width: 1,
                dashArray: 3,
            },
        },
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        min: 0,
        max: 80,
        labels: {
            show: false,
            style: {
                colors: labelColor,
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
            formatter: function (val) {
                return "$" + val + " thousands";
            },
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            stops: [0, 100],
        },
    },
    colors: [baseColor],
    markers: {
        colors: [baseColor],
        strokeColor: [lightColor],
        strokeWidth: 3,
    },
};

const series = [
    {
        name: "Net Profit",
        data: [30, 45, 32, 70, 40],
    },
];
</script>

<style scoped>
</style>