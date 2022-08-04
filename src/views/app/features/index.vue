<template>
    <section class="mb-6">
        <HxDataTable url="features" :single-item-index="index" search-placeholder="جستجوی ویژگی" :table-data="tableData"
            :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">

            <template #left>

                <hx-button :to="{ name: 'features create' }">
                    ویژگی جدید
                </hx-button>

            </template>
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

            <template v-slot:cell-actions="{ row: feature, index: index }">
                <hx-button variant="gray" size="sm" icon :to="{ name: 'features values', params: { id: feature.id } }">
                    <hx-icon icon="notepad"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon :to="{ name: 'features edit', params: { id: feature.id } }">
                    <hx-icon icon="edit-alt"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon @click="handleDelete(feature, index)">
                    <hx-icon icon="trash"></hx-icon>
                </hx-button>

            </template>
        </HxDataTable>
    </section>

</template>

<script setup lang="ts">
import { ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from '@/components/base/message-box'
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'

const checkedData = ref([]);
const index = ref(null);
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

const handleDelete = (item: any, i: any) => {
    console.log("i value:", i);

    HxMessageBox.confirm(
        `آیا از حذف ویژگی ${item.title} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(() => {
            ApiService.delete(`features/${item.id}`).then(() => {
                index.value = item.id
                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'ویژگی موردنظر حذف شد',
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
