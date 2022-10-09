<template>
    <section class="mb-6">
        <HxDataTable url="warranties" :single-item-index="index" search-placeholder="جستجوی گارانتی"
            :table-header="tableHeader" :enable-items-per-page-dropdown="false" :on-current-change="true">
            <template #left>
                <hx-button :to="{ name: 'warranties create' }">
                    گارانتی جدید
                </hx-button>
            </template>
            <template v-slot:cell-checkbox="{ row: warranty }">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" :value="warranty.id" v-model="checkedData" />
                </div>
            </template>

            <template v-slot:cell-title="{ row: warranty }">
                <span class="">{{ warranty?.title }}</span>
            </template>


            <template v-slot:cell-status="{ row: warranty }">
                <template v-if="warranty?.status == 'enable'">
                    <hx-button outlined variant="success" size="sm">فعال</hx-button>
                </template>
                <template v-if="warranty?.status == 'disable'">
                    <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
                </template>
                <template v-if="warranty?.status == 'pending'">
                    <hx-button outlined variant="warning" size="sm">در حال انتظار</hx-button>
                </template>
                <template v-if="warranty?.status == 'rejected'">
                    <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
                </template>
            </template>

            <template v-slot:cell-actions="{ row: warranty, index: index }">
                <hx-button variant="gray" size="sm" icon :to="{ name: 'warranties edit', params: { id: warranty.id } }">
                    <hx-icon icon="edit-alt"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon @click="handleDelete(warranty, index)">
                    <hx-icon icon="trash"></hx-icon>
                </hx-button>

            </template>
        </HxDataTable>
    </section>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from '@/components/base/message-box'
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
import { useRoute, useRouter } from "vue-router";

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
        name: "وضعیت",
        key: "status",
        sortable: false,
    },
    {
        name: "عملیات",
        key: "actions",
    },
]);

const index = ref(null)

const handleDelete = (item: any, i: any) => {
    HxMessageBox.confirm(
        `آیا از حذف گارانتی ${item.title} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(() => {

            ApiService.delete(`warranties/${item.id}`).then(() => {
                index.value = item.id
                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'گارانتی موردنظر حذف شد',
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
