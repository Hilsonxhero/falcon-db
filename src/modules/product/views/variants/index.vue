<template>
    <section class="mb-6">
        <HxDataTable url="variant/groups" :single-item-index="index" search-placeholder="جستجوی تنوع"
            :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">

            <template #left>
                <hx-button :to="{ name: 'variants create' }">
                    تنوع جدید
                </hx-button>
            </template>
            <template v-slot:cell-checkbox="{ row: variant }">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" :value="variant.id" v-model="checkedData" />
                </div>
            </template>

            <template v-slot:cell-name="{ row: variant }">
                <div class="flex  space-x-2 space-x-reverse">
                    <div class="flex flex-col space-y-1">
                        <span class="">{{ variant?.name }}</span>
                    </div>
                </div>
            </template>

            <template v-slot:cell-type="{ row: variant }">

                <hx-button outlined variant="success" size="sm">{{ variant?.type }}</hx-button>

            </template>

            <template v-slot:cell-actions="{ row: variant }">
                <hx-button variant="gray" size="sm" icon :to="{ name: 'variants values', params: { id: variant.id } }">
                    <hx-icon icon="notepad"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon :to="{ name: 'variants edit', params: { id: variant.id } }">
                    <hx-icon icon="edit-alt"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon @click="handleDelete(variant)">
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

const index = ref(null)

const tableHeader = ref([
    {
        key: "checkbox",
        sortable: false,
    },
    {
        name: "عنوان",
        key: "name",
        sortable: true,
    },
    {
        name: "نوع ",
        key: "type",
        sortable: false,
    },
    {
        name: "عملیات",
        key: "actions",
    },
]);

const handleDelete = (item: any) => {
    HxMessageBox.confirm(
        `آیا از حذف تنوع ${item.name} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(() => {
            ApiService.delete(`variant/groups/${item.id}`).then(() => {
                index.value = item.id
                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'تنوع موردنظر حذف شد',
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
