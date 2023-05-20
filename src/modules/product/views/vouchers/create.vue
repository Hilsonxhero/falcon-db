<template>
  <div class="w-full">
    <Form @submit="handleCreate" class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <div class="hx-card">
          <div class="hx-card__header">
            <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
          </div>
          <div class="hx-card__body">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label="کد تخفیف">
                  <Field
                    mode="passive"
                    name="code"
                    v-slot="{ field }"
                    rules="required"
                    label="کد تخفیف"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.code"
                      placeholder="کد تخفیف"
                    ></hx-input>
                  </Field>

                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="code" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label=" مقدار تخفیف (درصد یا مبلغ)">
                  <Field
                    name="value"
                    rules="required"
                    v-slot="{ field }"
                    label=" مقدار تخفیف (درصد یا مبلغ)"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.value"
                      placeholder=" مقدار تخفیف (درصد یا مبلغ)"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="value" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label=" حداقل مبلغ کل">
                  <Field
                    name="minimum_spend"
                    rules="required"
                    v-slot="{ field }"
                    label=" حداقل مبلغ کل"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.minimum_spend"
                      placeholder=" حداقل مبلغ کل"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="minimum_spend" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label=" حداکثر مبلغ کل">
                  <Field
                    name="maximum_spend"
                    rules="required"
                    v-slot="{ field }"
                    label=" حداکثر مبلغ کل"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.maximum_spend"
                      placeholder=" حداکثر مبلغ کل"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="maximum_spend" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label="محدودیت استفاده در هر کد تخفیف">
                  <Field
                    name="usage_limit_per_voucher"
                    rules="required"
                    v-slot="{ field }"
                    label="محدودیت استفاده در هر کد تخفیف"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.usage_limit_per_voucher"
                      placeholder="محدودیت استفاده در هر کد تخفیف"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="usage_limit_per_voucher" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label="محدودیت استفاده در هر مشتری">
                  <Field
                    name="usage_limit_per_customer"
                    rules="required"
                    v-slot="{ field }"
                    label="محدودیت استفاده در هر مشتری"
                  >
                    <hx-input
                      v-bind="field"
                      v-model="form.usage_limit_per_customer"
                      placeholder="محدودیت استفاده در هر مشتری"
                    >
                    </hx-input>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="usage_limit_per_customer" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label="تاریخ شروع">
                  <Field
                    name="start_date"
                    rules="required"
                    v-slot="{ field }"
                    label="تاریخ شروع"
                  >
                    <date-picker
                      placeholder="تاریخ شروع"
                      v-bind="field"
                      v-model="form.start_date"
                      type="datetime"
                    ></date-picker>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="start_date" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-12 sm:col-span-6 lg:col-span-3">
                <hx-form-group label="تاریخ پایان">
                  <Field
                    name="end_date"
                    rules="required"
                    v-slot="{ field }"
                    label="تاریخ پایان"
                  >
                    <date-picker
                      placeholder="تاریخ پایان"
                      v-bind="field"
                      v-model="form.end_date"
                      type="datetime"
                    ></date-picker>
                  </Field>
                  <div class="invalid-feedback d-block">
                    <ErrorMessage name="end_date" />
                  </div>
                </hx-form-group>
              </div>

              <div class="col-span-3">
                <hx-form-group>
                  <hx-switch
                    :label="form.is_active ? 'فعال' : 'غیرفعال'"
                    name="is_active"
                    v-model="form.is_active"
                  >
                  </hx-switch>
                </hx-form-group>
              </div>
              <div class="col-span-3">
                <hx-form-group>
                  <hx-switch
                    :label="form.is_percent ? 'تخفیف درصدی' : 'تخفیف مبلغی'"
                    name="is_percent"
                    v-model="form.is_percent"
                  >
                  </hx-switch>
                </hx-form-group>
              </div>
              <div class="col-span-3">
                <hx-form-group>
                  <hx-switch
                    :label="
                      form.is_flexable
                        ? 'انعطاف پذیر (عمومی)'
                        : 'غیر انعطاف پذیر'
                    "
                    name="is_flexable"
                    v-model="form.is_flexable"
                  >
                  </hx-switch>
                </hx-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <div class="w-full flex items-center justify-between my-4">
          <div class="flex items-center space-x-3 space-x-reverse">
            <hx-button type="submit" :loading="loading"> ذخیره </hx-button>
            <hx-button variant="light" :to="{ name: 'vouchers index' }">
              لغو
            </hx-button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
// @ts-ignore
import { onMounted, ref } from "vue";

import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import { HxNotification } from "@/components/base/notification";
import { ErrorMessage, Field, Form } from "vee-validate";
import DatePicker from "vue3-persian-datetime-picker";

const vouchers = ref<any>([]);
const loading = ref(false);
const router = useRouter();

const form = ref({
  code: null,
  value: null,
  minimum_spend: null,
  maximum_spend: null,
  usage_limit_per_voucher: null,
  usage_limit_per_customer: null,
  is_percent: true,
  is_active: true,
  is_flexable: true,
  start_date: null,
  end_date: null,
});

const handleCreate = async (values, { resetForm }) => {
  let formData = {
    code: form.value.code,
    value: form.value.value,
    minimum_spend: form.value.minimum_spend,
    maximum_spend: form.value.maximum_spend,
    usage_limit_per_voucher: form.value.usage_limit_per_voucher,
    usage_limit_per_customer: form.value.usage_limit_per_customer,
    is_percent: form.value.is_percent,
    is_active: form.value.is_active,
    is_flexable: form.value.is_flexable,
    start_date: form.value.start_date,
    end_date: form.value.end_date,
  };
  loading.value = true;
  try {
    const { data } = await ApiService.post("vouchers", formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loading.value = false;
    router.push({ name: "vouchers index" });
  } catch (e) {}
};

onMounted(() => {});
</script>

<style scoped></style>
