<template>
    <section class="mb-6">
        <div class="hx-card p-0">
            <div class="hx-card__header border-0">
                <!--begin::Card title-->
                <div class="hx-card__title">
                    <!--begin::Search-->
                    <div class="flex items-center position-relative my-1">
                        <hx-input v-model="search" @input="searchItems()" placeholder="جستجوی دسته بندی"></hx-input>
                    </div>
                    <!--end::Search-->
                </div>
                <!--begin::Card title-->
                <!--begin::Card toolbar-->
                <div class="card-toolbar">

                </div>
                <!--end::Card toolbar-->
            </div>
            <HxDataTable :table-data="tableData" :table-header="tableHeader" :enable-items-per-page-dropdown="false">
                <template v-slot:cell-checkbox="{ row: category }">
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" :value="category.id"
                            v-model="checkedCustomers" />
                    </div>
                </template>
                <template v-slot:cell-title="{ row: category }">
                    {{ category.title }}
                </template>
                <template v-slot:cell-slug="{ row: category }">
                    <a href="#" class="text-gray-600 text-hover-primary mb-1">
                        {{ category.slug }}
                    </a>
                </template>
                <template v-slot:cell-parent="{ row: category }">
                    {{ category.parent }}
                </template>
                <template v-slot:cell-status="{ row: category }">

                    <template v-if="category.status === 1">
                        <hx-button outlined variant="success" size="sm">فعال</hx-button>
                    </template>
                    <template v-else>
                        <hx-button outlined variant="danger" size="sm">غیر فعال</hx-button>
                    </template>
                </template>

                <template v-slot:cell-actions="{ row: category }">
                    <hx-button variant="gray" size="sm" icon>
                        <hx-icon icon="edit-alt"></hx-icon>
                    </hx-button>
                    <hx-button variant="gray" size="sm" icon @click="handleDelete">
                        <hx-icon icon="trash"></hx-icon>
                    </hx-button>

                </template>
            </HxDataTable>
        </div>
    </section>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";

import { HxMessageBox } from '@/components/base/message-box'

onMounted(() => {
    initData.value.splice(0, tableData.value.length, ...tableData.value);
});

const checkedItems = ref([]);

const tableHeader = ref([
    {
        key: "checkbox",
        sortable: false,
    },
    {
        name: "عنوان",
        key: "title",
        sortable: true,
    },
    {
        name: "عنوان لاتین",
        key: "slug",
        sortable: true,
    },
    {
        name: "دسته پدر",
        key: "parent",
        sortable: true,
    },
    {
        name: "وضعیت",
        key: "status",
        sortable: false,
    },
    {
        name: "عملیات",
        key: "actions",
    },
]);
const categories = ref([
    { id: Math.floor(Math.random() * 99999) + 1, title: "کالای دیجیتال", slug: 'dsfgdfg', parent: '-', status: 1 },
    { id: Math.floor(Math.random() * 99999) + 1, title: 'لوازم خانگی', slug: 'wwww', parent: '-', status: 2 }
])

const tableData = ref<Array<any>>(categories.value);
const initData = ref<Array<any>>([]);

const search = ref<string>("");
const searchItems = () => {
    tableData.value.splice(0, tableData.value.length, ...initData.value);
    if (search.value !== "") {
        let results: Array<any> = [];
        for (let j = 0; j < tableData.value.length; j++) {
            if (searchingFunc(tableData.value[j], search.value)) {
                results.push(tableData.value[j]);
            }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
    }
};

const searchingFunc = (obj: any, value: any): boolean => {
    for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
            if (obj[key].indexOf(value) != -1) {
                return true;
            }
        }
    }
    return false;
};



const handleDelete = () => {
    // console.log(HxMessageBox);
    HxMessageBox.confirm(
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت ',
        'Warning',
        {
            confirmButtonText: 'باشه',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(() => {
            console.log("here then");

        })
        .catch(() => {
            console.log("here catch");
        })

}
</script>
<style>
</style>
