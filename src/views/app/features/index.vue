<template>
    <!-- v-if="features.length" -->
    <section class="mb-6">
        <div class="hx-card p-0">
            <div class="hx-card__header border-0">
                <!--begin::Card title-->
                <div class="hx-card__title flex items-center justify-between">
                    <!--begin::Search-->
                    <div class="flex items-center position-relative my-1">
                        <hx-input v-model="search" @input="searchItems()" placeholder="جستجوی ویژگی"></hx-input>
                    </div>
                    <!--end::Search-->
                    <div>
                        <hx-button :to="{ name: 'features create' }">
                            ویژگی جدید
                        </hx-button>

                    </div>
                </div>

                <div class="card-toolbar">

                </div>

            </div>
            <HxDataTable @page="currentPageChnage" :total="pagination.total" :rows-per-page="pagination.per_page"
                :currentPage="pagination.current_page" :loading="loading" :table-data="tableData"
                :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">
                <template v-slot:cell-checkbox="{ row: feature }">
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" :value="feature.id" v-model="checkedData" />
                    </div>
                </template>

                <template v-slot:cell-title="{ row: feature }">
                    <div class="flex  space-x-2 space-x-reverse">
                        <div class="flex flex-col space-y-1">
                            <span class="">{{ feature?.title }}</span>
                        </div>
                    </div>


                </template>

                <template v-slot:cell-category="{ row: feature }">
                    {{ feature.category && feature.category.title }}
                </template>
                <template v-slot:cell-parent="{ row: feature }">
                    {{ feature.parent ? feature.parent.title : 'اصلی' }}
                </template>
                <template v-slot:cell-status="{ row: feature }">
                    <template v-if="feature?.status == 'enable'">
                        <hx-button outlined variant="success" size="sm">فعال</hx-button>
                    </template>
                    <template v-if="feature?.status == 'disable'">
                        <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
                    </template>
                    <template v-if="feature?.status == 'pending'">
                        <hx-button outlined variant="warning" size="sm">در حال انتظار</hx-button>
                    </template>
                    <template v-if="feature?.status == 'rejected'">
                        <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
                    </template>
                </template>

                <template v-slot:cell-actions="{ row: feature }">
                    <hx-button variant="gray" size="sm" icon
                        :to="{ name: 'features values', params: { id: feature.id } }">
                        <hx-icon icon="notepad"></hx-icon>
                    </hx-button>
                    <hx-button variant="gray" size="sm" icon
                        :to="{ name: 'features edit', params: { id: feature.id } }">
                        <hx-icon icon="edit-alt"></hx-icon>
                    </hx-button>
                    <hx-button variant="gray" size="sm" icon @click="handleDelete(feature)">
                        <hx-icon icon="trash"></hx-icon>
                    </hx-button>

                </template>
            </HxDataTable>
        </div>
    </section>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from '@/components/base/message-box'
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
import { useRoute, useRouter } from "vue-router";

const router = useRouter()

const route = useRoute()

const checkedData = ref([]);

const loading = ref(false)

const pagination = ref({
    total: null,
    per_page: null,
    current_page: null
})

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
        name: "دسته ",
        key: "category",
        sortable: false,
    },
    {
        name: "والد",
        key: "parent",
        sortable: false,
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

const features = ref<any>([])

const fetchData = async () => {
    try {
        loading.value = true
        const { data } = await ApiService.get(`features?page=${pagination.value.current_page}`)
        console.log("data.data", data.data.data);

        pagination.value.total = data.meta.total
        pagination.value.current_page = data.meta.current_page
        pagination.value.per_page = data.meta.per_page
        features.value = data.data
        tableData.value = features.value
        initData.value.splice(0, tableData.value.length, ...tableData.value);

        loading.value = false
    } catch (e) {
        loading.value = false
    }
}

watch(() => pagination.value.current_page, (currentValue, oldValue) => {
    router.replace({ query: { ...route.query, page: currentValue } }).then(() => {
        fetchData()
    });
});

const currentPageChnage = (val: any) => {
    pagination.value.current_page = val
    // fetchData()
}

const tableData = ref<Array<any>>([]);
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




onMounted(() => {
    let page = route.query.page
    pagination.value.current_page = page ? Number(page) : 1
});




const handleDelete = (item: any) => {
    console.log("item", item);

    HxMessageBox.confirm(
        `آیا از حذف ویژگی ${item.title} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const { data } = await ApiService.delete(`features/${item.id}`)

                fetchData()

                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'ویژگی موردنظر حذف شد',
                    showClose: true,
                    duration: 4000,
                    position: 'bottom-right',
                })
            } catch (e) {

            }
        })
        .catch(() => {

        })

}


</script>
<style>
</style>
