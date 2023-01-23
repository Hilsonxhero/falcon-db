<template>
    <section class="mb-6">
        <HxDataTable url="brands" :single-item-index="index" search-placeholder="جستجوی برند"
            :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">
            <template #left>
                <hx-button :to="{ name: 'brands create' }">
                    برند جدید
                </hx-button>
            </template>
            <template v-slot:cell-checkbox="{ row: category }">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" :value="category.id" v-model="checkedData" />
                </div>
            </template>

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
            <template v-slot:cell-category="{ row: category }">
                {{ category.category && category.category.title }}
            </template>
            <template v-slot:cell-status="{ row: category }">
                <template v-if="category?.status == 'enable'">
                    <hx-button outlined variant="success" size="sm">فعال</hx-button>
                </template>
                <template v-if="category?.status == 'disable'">
                    <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
                </template>
                <template v-if="category?.status == 'pending'">
                    <hx-button outlined variant="warning" size="sm">در حال انتظار</hx-button>
                </template>
                <template v-if="category?.status == 'rejected'">
                    <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
                </template>
            </template>

            <template v-slot:cell-special="{ row: category }">

                <template v-if="category.special">
                    <hx-button outlined variant="success" size="sm">ویژه</hx-button>
                </template>
                <template v-else>
                    <hx-button outlined variant="light" size="sm"> عادی</hx-button>
                </template>
            </template>

            <template v-slot:cell-actions="{ row: category, index: index }">
                <hx-button variant="gray" size="sm" icon :to="{ name: 'brands edit', params: { id: category.id } }">
                    <hx-icon icon="edit-alt"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon @click="handleDelete(category, index)">
                    <hx-icon icon="trash"></hx-icon>
                </hx-button>

            </template>
        </HxDataTable>
    </section>

</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from '@/components/base/message-box'
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
const index = ref(null)
const checkedData = ref([]);
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
        key: "title_en",
        sortable: true,
    },
    {
        name: "دسته ",
        key: "category",
        sortable: false,
    },
    {
        name: "وضعیت",
        key: "status",
        sortable: false,
    },
    {
        name: "ویژه",
        key: "special",
        sortable: false,
    },
    {
        name: "عملیات",
        key: "actions",
    },
]);
const handleDelete = (item: any, i: any) => {
    HxMessageBox.confirm(
        `آیا از حذف برند ${item.title} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(() => {
            ApiService.delete(`brands/${item.id}`).then(() => {
                index.value = item.id
                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'برند موردنظر حذف شد',
                    showClose: true,
                    duration: 4000,
                    position: 'bottom-right',
                })
            })
        })
        .catch(() => {

        })
}
</script>
<style>
</style>
