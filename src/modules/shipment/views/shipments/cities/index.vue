<template>
  <section class="mb-6">
    <HxDataTable
      :url="`shipment/cities/${city}/types`"
      :single-item-index="index"
      search-placeholder="جستجوی  تاریخ"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button
          :to="{ name: 'shipment cities create', params: { city: city } }"
        >
          نوع ارسال جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: shipment }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="shipment.id"
            v-model="checkedData"
          />
        </div>
      </template>

      <template v-slot:cell-shipment="{ row: shipment }">
        <span class="">{{ shipment?.shipment?.title }}</span>
      </template>

      <template v-slot:cell-delivery="{ row: shipment }">
        <span class="">{{ shipment?.delivery?.title }}</span>
      </template>
      <template v-slot:cell-city="{ row: shipment }">
        <span class="">{{ shipment?.city?.name }}</span>
      </template>
      <template v-slot:cell-actions="{ row: shipment, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'shipment dates index',
            params: { shipment: shipment.shipment.id, id: shipment.id },
          }"
        >
          <hx-icon icon="calendar"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{
            name: 'shipment cities edit',
            params: { city: city, id: shipment.id },
          }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(shipment, index)"
        >
          <hx-icon icon="trash"></hx-icon>
        </hx-button>
      </template>
    </HxDataTable>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";

const checkedData = ref([]);

const city = ref<any>(null);

const route = useRoute();

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "نوع کالا",
    key: "delivery",
    sortable: false,
  },

  {
    name: "نوع ارسال",
    key: "shipment",
    sortable: true,
  },
  {
    name: " شهر",
    key: "city",
    sortable: true,
  },

  {
    name: "عملیات",
    key: "actions",
  },
]);

const index = ref(null);

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف نوع ارسال ${item?.shipment?.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`shipment/cities/${city.value}/types/${item.id}`).then(
        () => {
          index.value = item.id;
          HxNotification.success({
            title: "عملیات موفقیت آمیز",
            message: "روش ارسال موردنظر حذف شد",
            showClose: true,
            duration: 4000,
            position: "bottom-right",
          });
        }
      );
    })
    .catch(() => {});
};
city.value = route.params.city;
// onMounted(() => {
//   shipment.value = route.params.id;
// });
</script>
<style></style>
