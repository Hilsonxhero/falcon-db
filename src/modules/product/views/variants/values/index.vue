<template>
  <!-- v-if="variants.length" -->
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`variant/groups/${id}/values`"
          :single-item-index="index"
          search-placeholder="جستجوی  مقدار تنوع"
          :table-header="fields"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: variant }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <hx-checkbox v-model="checkedData"></hx-checkbox>
            </div>
          </template>

          <template v-slot:cell-name="{ row: variant }">
            <span class="">{{ variant?.name }}</span>
          </template>
          <template v-slot:cell-value="{ row: variant }">
            <a href="#" class="text-gray-600 text-hover-primary mb-1">
              {{ variant?.value }}
            </a>
          </template>

          <template v-slot:cell-group="{ row: variant }">
            <span class="">{{ variant.group && variant.group.name }}</span>
          </template>

          <template v-slot:cell-actions="{ row: variant }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'variants value edit',
                params: { id: id, value: variant.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(variant)"
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
                  name="name"
                  v-slot="{ field }"
                  rules="required"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.name"
                    placeholder="عنوان"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="name" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="value"
                  v-slot="{ field }"
                  rules="required"
                  label="مقدار"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.value"
                    placeholder="مقدار"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="value" />
                </div>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loading"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'variants index' }">
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
// @ts-ignore
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const route = useRoute();
const checkedData = ref([]);
const form = ref({
  name: "",
  value: "",
});
const id = ref(null);
const index = ref(null);
const refresh = ref(false);
const loading = ref(false);

const fields = ref([
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
    name: "مقدار",
    key: "value",
    sortable: true,
  },
  {
    name: "گروه تنوع ",
    key: "group",
    sortable: false,
  },

  {
    name: "عملیات",
    key: "actions",
  },
]);

id.value = route.params.id;

onMounted(() => {});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    value: form.value.value,
    variant_group_id: id.value,
  };
  loading.value = true;
  ApiService.post("variants", formData).then(() => {
    form.value.name = null;
    form.value.value = null;
    resetForm();
    refresh.value = true;
    loading.value = false;
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
  });
};

const handleDelete = (item: any) => {
  HxMessageBox.confirm(
    `آیا از حذف تنوع ${item.name} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`variants/${item.id}`).then(() => {
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
