<template>
    <!-- v-if="categories.length" -->
    <section class="mb-6">
        <div class="hx-card p-0">
            <div class="hx-card__header border-0">
                <!--begin::Card title-->
                <div class="hx-card__title flex items-center justify-between">
                    <!--begin::Search-->
                    <div class="flex items-center position-relative my-1">
                        <hx-input v-model="search" @input="searchItems()" placeholder="جستجوی دسته بندی"></hx-input>
                    </div>
                    <!--end::Search-->
                    <div>
                        <hx-button :to="{ name: 'categories create' }">
                            دسته بندی جدید
                        </hx-button>
                        <!-- <hx-button @click="open1">
                            دسته بندی جدید
                        </hx-button> -->
                    </div>
                </div>
                <!--begin::Card title-->
                <!--begin::Card toolbar-->
                <div class="card-toolbar">

                </div>
                <!--end::Card toolbar-->
            </div>
            <HxDataTable @www="currentPageChnage" :total="pagination.total" :rows-per-page="pagination.per_page"
                :currentPage="pagination.current_page" :loading="loading" :table-data="tableData"
                :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">
                <template v-slot:cell-checkbox="{ row: category }">
                    <div class="form-check form-check-sm form-check-custom form-check-solid">
                        <input class="form-check-input" type="checkbox" :value="category.id" v-model="checkedData" />
                    </div>
                </template>
                <!-- <template v-slot:cell-thumb="{ row: category }">
                    <img class="w-14 h-14 object-cover rounded-lg" :src="category?.media?.thumb" alt="">
                </template> -->
                <template v-slot:cell-title="{ row: category }">
                    <div class="flex  space-x-2 space-x-reverse">
                        <img class="w-14 h-14 object-cover rounded-lg" :src="category?.media?.thumb" alt="">
                        <div class="flex flex-col space-y-1">
                            <span class="">{{ category?.title }}</span>
                            <span class="text-sm text-gray-400 max-w-[90%] overflow-hidden">{{ category.short_review
                            }}</span>
                        </div>
                    </div>


                </template>
                <template v-slot:cell-title_en="{ row: category }">
                    <a href="#" class="text-gray-600 text-hover-primary mb-1">
                        {{ category?.title_en }}
                    </a>
                </template>
                <template v-slot:cell-parent="{ row: category }">
                    {{ category.parent ? category.parent.title : 'اصلی' }}
                </template>
                <template v-slot:cell-status="{ row: category }">

                    <template v-if="category?.status == 'enable'">
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
                    <hx-button variant="gray" size="sm" icon @click="handleDelete(category)">
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
    // {
    //     name: "تصویر",
    //     key: "thumb",
    //     sortable: false,
    // },
    {
        name: "عنوان",
        key: "title",
        sortable: true,
    },
    {
        name: "عنوان لاتین",
        key: "title_en",
        sortable: true,
    },
    {
        name: "دسته پدر",
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

const categories = ref<any>([])

const fetchData = async () => {
    try {
        loading.value = true
        const { data } = await ApiService.get(`categories?page=${pagination.value.current_page}`)
        pagination.value.total = data.meta.total
        pagination.value.current_page = data.meta.current_page
        pagination.value.per_page = data.meta.per_page
        categories.value = data.data
        tableData.value = categories.value
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
        `آیا از حذف دسته بندی ${item.title} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const { data } = await ApiService.delete(`categories/${item.id}`)

                fetchData()

                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'دسته بندی موردنظر حذف شد',
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
