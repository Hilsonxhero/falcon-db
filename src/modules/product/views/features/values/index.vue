<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`features/${id}/values`"
          :single-item-index="index"
          search-placeholder="جستجوی مقدار ویژگی"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: feature }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="feature.id"
                v-model="checkedData"
              />
            </div>
          </template>

          <template v-slot:cell-title="{ row: feature }">
            <div class="flex space-x-2 space-x-reverse">
              <div class="flex flex-col space-y-1">
                <span class="">{{ feature?.title }}</span>
              </div>
            </div>
          </template>

          <template v-slot:cell-feature="{ row: feature }">
            {{ feature.feature && feature.feature.title }}
          </template>

          <template v-slot:cell-status="{ row: feature }">
            <template v-if="feature?.status == 'enable'">
              <hx-button outlined variant="success" size="sm">فعال</hx-button>
            </template>
            <template v-if="feature?.status == 'disable'">
              <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
            </template>
            <template v-if="feature?.status == 'pending'">
              <hx-button outlined variant="warning" size="sm"
                >در حال انتظار</hx-button
              >
            </template>
            <template v-if="feature?.status == 'rejected'">
              <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
            </template>
          </template>

          <template v-slot:cell-actions="{ row: feature, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'features value edit',
                params: { id: id, value: feature.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(feature, index)"
            >
              <hx-icon icon="trash"></hx-icon>
            </hx-button>
          </template>
        </HxDataTable>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <Form @submit="handleCreate" class="w-full">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">ایجاد مقدار جدید</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group>
                <Field
                  mode="passive"
                  name="title"
                  v-slot="{ field }"
                  rules="required"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.title"
                    placeholder="عنوان"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="title" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  value-key="key"
                  label="title"
                  v-model="selectedStatus"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب دسته بندی"
                />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'features index' }">
                لغو
              </hx-button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// @ts-nocheck
import { provide, ref } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const route = useRoute();
const checkedData = ref([]);

const form = ref({
  feature_id: null,
  title: null,
  status: null,
});

const id = ref<any>(null);

const index = ref(null);
const refresh = ref(false);
const loader = ref(false);
id.value = route.params.id;

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
    name: "ویژگی والد",
    key: "feature",
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

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const selectedStatus = ref("enable");

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    title: form.value.title,
    feature_id: id.value,
    status: selectedStatus.value,
  };
  loader.value = true;
  ApiService.post("feature/values", formData).then(() => {
    form.value.title = null;
    selectedStatus.value = null;
    resetForm();
    refresh.value = true;
    loader.value = false;
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
  });
};

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف ویژگی ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`feature/values/${item.id}`).then(() => {
        index.value = item.id;
        HxNotification.success({
          title: "عملیات موفقیت آمیز",
          message: "ویژگی موردنظر حذف شد",
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
