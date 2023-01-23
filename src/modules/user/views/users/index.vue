<template>
  <section></section>
  <section class="mb-6">
    <HxDataTable
      url="users"
      :single-item-index="index"
      search-placeholder="جستجوی کاربر"
      :table-header="tableHeader"
      :enable-items-per-page-dropdown="false"
      :on-current-change="true"
    >
      <template #left>
        <hx-button :to="{ name: 'users create' }"> کاربر جدید </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: user }">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="user.id"
            v-model="checkedData"
          />
        </div>
      </template>

      <template v-slot:cell-username="{ row: user }">
        <span> {{ user?.username }}</span>
      </template>
      <template v-slot:cell-phone="{ row: user }">
        {{ user.phone }}
      </template>

      <template v-slot:cell-email="{ row: user }">
        {{ user.email }}
      </template>

      <template v-slot:cell-wallet="{ row: user }">
        {{ user.wallet }}
      </template>

      <template v-slot:cell-city="{ row: user }">
        {{ user.city ?? "-" }}
      </template>

      <template v-slot:cell-status="{ row: user }">
        <template v-if="user?.status == 'active'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-if="user?.status == 'inactive'">
          <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
        </template>
        <template v-if="user?.status == 'ban'">
          <hx-button outlined variant="danger" size="sm">مسدود شده</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: user, index: index }">
        <hx-button
          variant="gray"
          size="sm"
          icon
          :to="{ name: 'users edit', params: { id: user.id } }"
        >
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button
          variant="gray"
          size="sm"
          icon
          @click="handleDelete(user, index)"
        >
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
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
const index = ref(null);
const checkedData = ref([]);
const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "نام کاربری",
    key: "username",
    sortable: true,
  },
  {
    name: "شماره همراه",
    key: "phone",
    sortable: true,
  },
  {
    name: "ایمیل ",
    key: "email",
    sortable: false,
  },
  {
    name: "کیف پول",
    key: "wallet",
    sortable: false,
  },
  {
    name: "شهر",
    key: "city",
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
  HxMessageBox.confirm(
    `آیا از حذف کاربر ${item.username} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`users/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "کاربر موردنظر حذف شد",
          showClose: true,
          duration: 4000,
          position: "bottom-right",
        });
      });
    })
    .catch(() => {});
};
</script>
