<template>
  <!-- v-if="states.length" -->
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-8">
        <HxDataTable
          @refresh="refresh = false"
          :refresh="refresh"
          :url="`states/${id}/cities`"
          :single-item-index="index"
          search-placeholder="جستجوی   شهر"
          :table-header="fields"
          :enable-items-per-page-dropdown="false"
          :on-current-change="true"
        >
          <template v-slot:cell-checkbox="{ row: city }">
            <div
              class="form-check form-check-sm form-check-custom form-check-solid"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :value="city.id"
                v-model="checkedData"
              />
            </div>
          </template>

          <template v-slot:cell-name="{ row: city }">
            <span class="">{{ city?.name }}</span>
          </template>
          <template v-slot:cell-zone_code="{ row: city }">
            <span> {{ city?.zone_code }}</span>
          </template>

          <template v-slot:cell-status="{ row: state }">
            <template v-if="state?.status == 'enable'">
              <hx-button outlined variant="success" size="sm">فعال</hx-button>
            </template>
            <template v-if="state?.status == 'disable'">
              <hx-button outlined variant="light" size="sm">غیر فعال</hx-button>
            </template>
            <template v-if="state?.status == 'pending'">
              <hx-button outlined variant="warning" size="sm"
                >در حال انتظار</hx-button
              >
            </template>
            <template v-if="state?.status == 'rejected'">
              <hx-button outlined variant="danger" size="sm">رد شده</hx-button>
            </template>
          </template>

          <template v-slot:cell-actions="{ row: city }">
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'shipment dates index',
                params: { id: city.id },
              }"
            >
              <hx-icon icon="calendar"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              :to="{
                name: 'states city edit',
                params: { id: id, value: city.id },
              }"
            >
              <hx-icon icon="edit-alt"></hx-icon>
            </hx-button>
            <hx-button
              variant="gray"
              size="sm"
              icon
              @click="handleDelete(city)"
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
              <h4 class="text-gray-600 text-xl">ایجاد شهر</h4>
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
                  name="zone_code"
                  v-slot="{ field }"
                  rules="required"
                  label="کد منطقه"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.zone_code"
                    placeholder="کد منطقه"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="zone_code" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="latitude"
                  v-slot="{ field }"
                  rules="required"
                  label="عرض جغرافیایی"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.latitude"
                    placeholder="عرض جغرافیایی"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="latitude" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <Field
                  mode="passive"
                  name="longitude"
                  v-slot="{ field }"
                  rules="required"
                  label="طول جغرافیایی"
                >
                  <hx-input
                    v-bind="field"
                    v-model="form.longitude"
                    placeholder="طول جغرافیایی"
                  ></hx-input>
                </Field>

                <div class="invalid-feedback d-block">
                  <ErrorMessage name="longitude" />
                </div>
              </hx-form-group>

              <hx-form-group>
                <hx-select
                  nmae="categories"
                  value-key="key"
                  label="title"
                  v-model="form.status"
                  filterable
                  :options="statuses"
                  placeholder="انتخاب  وضعیت"
                />
              </hx-form-group>
            </div>
          </div>

          <div class="w-full flex items-center justify-end my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'states index' }">
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
//@ts-nocheck
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
  zone_code: "",
  latitude: "",
  longitude: "",
  city_fast_sending: 0,
  pay_at_place: 0,
  status: "enable",
});
const id = ref(null);
const index = ref(null);
const refresh = ref(false);
const loader = ref(false);

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const fields = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "نام ",
    key: "name",
    sortable: true,
  },
  {
    name: "کد منطقه",
    key: "zone_code",
    sortable: false,
  },
  {
    name: "وضعیت ",
    key: "status",
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
    state: id.value,
    zone_code: form.value.zone_code,
    latitude: form.value.latitude,
    longitude: form.value.longitude,
    city_fast_sending: form.value.city_fast_sending,
    pay_at_place: form.value.pay_at_place,
    status: form.value.status,
  };
  loader.value = true;
  ApiService.post("cities", formData).then(() => {
    form.value.name = null;
    form.value.zone_code = null;
    form.value.latitude = null;
    form.value.longitude = null;
    form.value.city_fast_sending = false;
    form.value.pay_at_place = false;
    resetForm();
    refresh.value = true;
    loader.value = false;
    HxNotification.success({
      title: " موفقیت آمیز",
      message: "ایجاد شهر با موفقیت انجام شد",
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
      ApiService.delete(`cities/${item.id}`).then(() => {
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
