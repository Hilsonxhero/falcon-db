<template>
  <section class="mb-6">
    <HxDataTable
      url="payment/methods"
      :single-item-index="index"
      search-placeholder="جستجوی روش پرداخت"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'payment-methods-create' }">
          روش پرداخت جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: shipment_method }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <hx-checkbox v-model="checkedData"></hx-checkbox>
        </div>
      </template>

      <template v-slot:cell-title="{ row: shipment_method }">
        <span class="">{{ shipment_method?.title }}</span>
      </template>

      <template v-slot:cell-is_default="{ row: shipment_method }">
        <template v-if="shipment_method?.is_default == 1">
          <span class="">پیش فرض</span>
        </template>
        <template v-if="shipment_method?.is_default == 0">
          <span class="">عادی</span>
        </template>
      </template>

      <template v-slot:cell-type="{ row: shipment_method }">
        <template v-if="shipment_method?.type == 'online'">
          <span class="">پرداخت آنلاین</span>
        </template>
        <template v-if="shipment_method?.type == 'wallet'">
          <span class="">کیف پول</span>
        </template>
      </template>

      <template v-slot:cell-status="{ row: shipment_method }">
        <template v-if="shipment_method?.status == 'enable'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="shipment_method?.status == 'disable'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>
        <template v-if="shipment_method?.status == 'pending'">
          <hx-button outlined variant="warning" size="sm"
            >در حال انتظار</hx-button
          >
        </template>
        <template v-if="shipment_method?.status == 'rejected'">
          <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: shipment_method }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'payment-methods-edit',
            params: { id: shipment_method.id },
          }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(shipment_method)"
        >
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";

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
    name: "حالت پیش فرض ",
    key: "is_default",
    sortable: false,
  },
  {
    name: "نوع",
    key: "type",
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

const handleDelete = (item: any) => {
  HxMessageBox.confirm(
    `آیا از حذف  روش پرداخت ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`payment/methods/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "تنوع موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};
</script>
<style></style>
