<template>
    <div class="hx-card p-0">
        <div class="hx-card__header border-0">
            <div class="hx-card__title flex items-center justify-between">
                <div>

                    <slot></slot>
                </div>
            </div>
        </div>
        <div class="dataTables_wrapper dt-bootstrap4 no-footer">
            <div class="table-responsive overflow-x-auto">
                <table :class="[loading && 'overlay overlay-block']" v-if="!loading"
                    class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" role="grid">
                    <thead>
                        <tr class="text-start text-gray-400 er fs-7 text-uppercase gs-0" role="row">
                            <template v-for="(cell, i) in tableHeader" :key="i">
                                <th :class="[
                                
                                    tableHeader.length - 1 === i && 'text-start',
                                
                                ]" tabindex="0" rowspan="1" colspan="1" style="cursor: pointer">
                                    <div class="flex items-center space-x-1 space-x-reverse">
                                        <span>{{ cell.name }}</span>
                                        <span v-if="cell.sortable">
                                            <hx-icon icon="sort" class="w-6 h-6 text-gray-500"></hx-icon>
                                        </span>
                                    </div>
                                </th>
                            </template>
                        </tr>
                    </thead>

                    <tbody class=" text-gray-600">
                        <template v-if="tableData.length">
                            <template v-for="(item, index) in tableData" :key="index">
                                <tr class="odd">
                                    <template v-for="(cell, i) in tableHeader" :key="i">
                                        <td :class="{ 'text-start': tableHeader.length - 1 === i }">
                                            <slot :name="`cell-${cell.key}`" :row="item" :index="index">
                                                {{ item[prop] }}
                                            </slot>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                        </template>
                        <template v-else>
                            <tr class="odd">
                                <td colspan="7" class="dataTables_empty">
                                    {{ emptyTableText }}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <div v-if="loading" class="overlay-layer card-rounded bg-dark bg-opacity-5">
                    <div class="spinner-border text-primary text-center" role="status">
                        <span class="visually-hidden text-center">در حال بارگیری ..</span>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script lang="ts" setup>
// @ts-nocheck
import {
    computed,
    ref,
    onMounted,
    watch,
    getCurrentInstance,
    inject,
} from "vue";
import arraySort from "array-sort";
import ApiService from '@/core/services/ApiService'
import {
    isNumber,
} from '@/core/utils'

interface IHeaderConfiguration {
    name?: string;
    key: string;
    sortingField?: string;
    sortable?: boolean;
}

const emit = defineEmits(["page", "sort", "items-per-page-change", "refresh"]);
const props = defineProps({
    tableHeader: {
        type: Array as () => Array<IHeaderConfiguration>,
        required: true,
    },
    emptyTableText: { type: String, default: "داده ای یافت نشد" },
    loading: { type: Boolean, default: false },
    total: { type: Number, default: 0 },
    order: { type: String, default: "asc" },
    tableData: {
        type: Array
    }
});

const data = ref([]);
const loading = ref(false)


watch(() => props.tableData, (currentValue, oldValue) => {

});


// const getItems = computed(() => {
//     return data.value
// })

</script>


