<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`products/${product_id}/gallery`"
          :single-item-index="index"
          search-placeholder="جستجوی مقدار ویژگی"
          :table-header="tableHeader"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: gallery }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <hx-checkbox v-model="checkedData"></hx-checkbox>
            </div>
          </template>

          <template v-slot:cell-title="{ row: gallery }">
            <span class="">{{ gallery?.title }}</span>
          </template>

          <template v-slot:cell-mime_type="{ row: gallery }">
            <span class="">{{ gallery?.mime_type }}</span>
          </template>

          <template v-slot:cell-actions="{ row: gallery, index: index }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'products gallery edit',
                params: { product: product_id, id: gallery.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(gallery, index)"
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
              <h4 class="text-gray-600 text-xl">گالری محصول</h4>
            </div>
            <div class="hx-card__body">
              <hx-form-group label="عنوان">
                <Field
                  name="title"
                  rules="required"
                  v-slot="{ field }"
                  label="عنوان"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.title"
                    placeholder="عنوان"
                  >
                  </hx-input>
                </Field>
                <div class="invalid-feedback d-block">
                  <ErrorMessage name="title" />
                </div>
              </hx-form-group>

              <hx-form-group label="فایل">
                <hx-upload
                  ref="uploader"
                  :max="1"
                  v-model="form.media"
                ></hx-upload>
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
              <hx-button variant="light" :to="{ name: 'products index' }">
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
import { provide, ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const route = useRoute();
const checkedData = ref([]);
const uploader = ref(null);

const form = ref({
  title: null,
  media: {},
});
const product_id = ref<any>(null);
const loader = ref(false);
const index = ref(null);
const refresh = ref(false);

const tableHeader = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: " عنوان",
    key: "title",
    sortable: false,
  },
  {
    name: "نوع فایل",
    key: "mime_type",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const handleCreate = async (values, { resetForm }) => {
  let formData = new FormData();

  formData.append("product_id", product_id.value);
  formData.append("title", form.value.title);
  formData.append("media", form.value.media?.file);

  loader.value = true;
  ApiService.post(`products/${product_id.value}/gallery`, formData)
    .then(() => {
      form.value.title = null;
      resetForm();
      uploader.value.clear();
      refresh.value = true;
      loader.value = false;
      HxNotification.success({
        title: "success",
        message: "عملیات موفقیت آمیز",
        showClose: true,
        duration: 4000,
        position: "bottom-right",
      });
    })
    .catch(() => {
      loader.value = false;
    });
};

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
    `آیا از حذف فایل ${item.title} اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(() => {
      ApiService.delete(`products/${product_id.value}/gallery/${item.id}`).then(
        () => {
          index.value = item.id;
          HxNotification.success({
            title: "عملیات موفقیت آمیز",
            message: "ویژگی موردنظر حذف شد",
            showClose: true,
            duration: 4000,
            position: "bottom-right",
          });
        }
      );
    })
    .catch(() => {});
};

onMounted(() => {
  product_id.value = route.params.id;
});
</script>
<style></style>
