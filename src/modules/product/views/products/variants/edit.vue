<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12 xl:col-span-12">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__body">
              <div class="flex flex-wrap items-center justify-between">
                <div class="mb-4 lg:mb-0">
                  <div class="flex flex-wrap items-center">
                    <span>تنوع های انتخاب شده : </span>
                    <span
                      class="mx-2 mb-2 lg:mb-0"
                      v-for="(filtered_varinat, index) in filtered_varinats"
                    >
                      <hx-badge outlined>
                        {{ filtered_varinat.label }}
                      </hx-badge>
                    </span>
                  </div>
                </div>
                <div class="flex items-center">
                  <hx-button outlined @click="handleOpenDialog">
                    انتخاب تنوع</hx-button
                  >

                  <hx-modal
                    :show="show"
                    title="انتخاب تنوع"
                    @close="show = !show"
                  >
                    <hx-collapse accordion>
                      <hx-collapse-item v-for="(group, index) in groups">
                        <template #title>
                          {{ group.name }}
                        </template>
                        <hx-checkbox-group v-model="selectedGroups">
                          <hx-checkbox
                            v-for="(value, index) in group.values"
                            :key="index"
                            :label="value.id"
                          >
                            {{ value.name }}
                          </hx-checkbox>
                        </hx-checkbox-group>
                      </hx-collapse-item>
                    </hx-collapse>
                  </hx-modal>
                </div>
              </div>
            </div>
          </div>

          <section class="mt-12">
            <div class="hx-card">
              <div class="hx-card__body">
                <div class="grid grid-cols-12 gap-2">
                  <hx-form-group class="col-span-6" label="قیمت ">
                    <Field
                      name="price"
                      rules="required"
                      v-slot="{ field }"
                      label="قیمت"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.price"
                        placeholder="قیمت"
                      ></hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="price" />
                    </div>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="تعداد ">
                    <Field
                      name="stock"
                      rules="required"
                      v-slot="{ field }"
                      label="تعداد"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.stock"
                        placeholder="تعداد"
                      ></hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="stock" />
                    </div>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="حداکثر تعداد خرید ">
                    <Field
                      name="order_limit"
                      rules="required"
                      v-slot="{ field }"
                      label="حداکثر تعداد خرید"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.order_limit"
                        placeholder="حداکثر تعداد خرید"
                      ></hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="order_limit" />
                    </div>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="درصد تخفیف ">
                    <Field
                      name="discount"
                      rules="required"
                      v-slot="{ field }"
                      label="درصد تخفیف"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.discount"
                        placeholder="درصد تخفیف"
                      ></hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="discount" />
                    </div>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="روش ارسال">
                    <Field
                      name="shipment"
                      rules="required"
                      v-slot="{ field }"
                      label="انتخاب  روش ارسال"
                    >
                      <hx-select
                        v-bind="field"
                        filterable
                        v-model="form.shipment"
                        placeholder="انتخاب  روش ارسال"
                        value-key="id"
                        label="title"
                        :options="shipments"
                      >
                      </hx-select>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="shipment" />
                    </div>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="گارانتی">
                    <Field
                      name="warranty"
                      rules="required"
                      v-slot="{ field }"
                      label="انتخاب   گارانتی"
                    >
                      <hx-select
                        v-bind="field"
                        filterable
                        v-model="form.warranty"
                        placeholder="انتخاب   گارانتی"
                        value-key="id"
                        label="title"
                        :options="warranties"
                      >
                      </hx-select>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="warranty" />
                    </div>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="وزن(گرم)">
                    <Field
                      name="weight"
                      rules="required"
                      v-slot="{ field }"
                      label="وزن"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.weight"
                        placeholder="وزن"
                      ></hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="weight" />
                    </div>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="هزینه ارسال">
                    <Field
                      name="shipment_price"
                      rules="required"
                      v-slot="{ field }"
                      label="هزینه ارسال"
                    >
                      <hx-input
                        v-bind="field"
                        v-model="form.shipment_price"
                        placeholder="هزینه ارسال"
                      >
                      </hx-input>
                    </Field>
                    <div class="invalid-feedback d-block">
                      <ErrorMessage name="shipment_price" />
                    </div>
                  </hx-form-group>
                  <hx-form-group class="col-span-12" label="پایان تخفیف">
                    <date-picker
                      v-model="form.discount_expire_at"
                      type="datetime"
                    ></date-picker>
                  </hx-form-group>
                </div>
              </div>
            </div>
          </section>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
              <hx-button
                variant="light"
                :to="{ name: 'products variants', params: { id: id } }"
              >
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
import { ref, onMounted, watch, watchEffect } from "vue";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import { HxMessage } from "@/components/base/message";
import DatePicker from "vue3-persian-datetime-picker";
import { generateId } from "@/core/utils";
import { uniqBy } from "lodash-unified";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const warranties = ref<Array<any>>([]);
const shipments = ref<Array<any>>([]);
const groups = ref<Array<any>>([]);
const selectedGroups = ref<Array<any>>([]);
const selected_variants = ref<Array<any>>([]);
const filtered_varinats = ref<Array<any>>([]);
const product_combinations = ref<Array<any>>([]);
const product_variant_id = ref(null);
const id = ref(null);
const loader = ref(false);
const has_variants = ref(false);
const form = ref({
  stock: 0,
  price: 0,
  discount: 0,
  discount_price: 0,
  weight: 0,
  warranty: null,
  shipment: null,
  shipment_price: 0,
  order_limit: 0,
  product: null,
  discount_expire_at: "",
});
const show = ref(false);

watch(
  () => selectedGroups.value,
  (val, oldVal) => {
    filtered_varinats.value = [];
    const variantTypes = new Set();

    for (const variant of groups.value) {
      for (const variantValue of variant.values) {
        if (val.includes(variantValue.id)) {
          if (variantTypes.has(variantValue.group.type)) {
            val.splice(val.indexOf(variantValue.id), 1);
          } else {
            filtered_varinats.value.push({
              variant_id: variantValue.id,
              label: variantValue.name,
              value: variantValue.value,
              type: variantValue.group.type,
            });
            variantTypes.add(variantValue.group.type);
          }
        }
      }
    }
  }
);

watchEffect(() => {
  // selectedGroups.value = uniqBy(selectedGroups.value, "type");
});

const handleOpenDialog = () => {
  HxMessage({
    message: "امکان ویرایش تنوع های محصول وجود ندارد",
    type: "warning",
    duration: 4000,
    center: true,
    offset: 20,
    "custom-class": "",
  });
  // show.value = !show.value;
};

const fetchData = () => {
  ApiService.get(`products/${id.value}/variants/${product_variant_id.value}`)
    .then(({ data }) => {
      form.value.price = data.data.price;
      form.value.stock = data.data.stock;
      form.value.discount = data.data.discount;
      form.value.weight = data.data.weight;
      form.value.warranty = data.data.warranty?.id;
      form.value.shipment = data.data.shipment?.id;
      form.value.shipment_price = data.data.shipment_price;
      form.value.order_limit = data.data.order_limit;
      form.value.discount_expire_at = data.data.discount_expire_at;

      filtered_varinats.value = data.data.combinations.map(
        (combinatin, index) => {
          return {
            variant_id: combinatin.variant_id,
            label: combinatin.label,
            value: combinatin.value,
            type: combinatin.type,
          };
        }
      );

      formRef.value.setValues({
        ...form.value,
      });
    })
    .catch(() => {});
};

onMounted(() => {
  id.value = route.params.id;
  product_variant_id.value = route.params.value;

  ApiService.get(`variant/groups/list/active/${id.value}`).then(({ data }) => {
    groups.value = data.data.groups;
    has_variants.value = data.data.has_variants;
    product_combinations.value = data.data.combinations;
  });

  ApiService.get("warranties")
    .then(({ data }) => {
      warranties.value = data.data;
    })
    .catch(() => {});
  ApiService.get("shipments")
    .then(({ data }) => {
      shipments.value = data.data;
    })
    .catch(() => {});
  ApiService.get(`product/${id.value}/combinations`)
    .then(({ data }) => {})
    .catch(() => {});

  fetchData();
});

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    stock: form.value.stock,
    price: form.value.price,
    discount: form.value.discount,
    discount_price: form.value.discount_price,
    weight: form.value.weight,
    warranty_id: form.value.warranty,
    shipment_id: form.value.shipment,
    shipment_price: form.value.shipment_price,
    order_limit: form.value.order_limit,
    discount_expire_at: form.value.discount_expire_at,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(
      `products/${id.value}/variants/${product_variant_id.value}`,
      formData
    );
    resetForm();
    loader.value = false;
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    router.push({ name: "products variants", params: { id: id.value } });
  } catch (e) {
    loader.value = false;
  }
};
</script>
<style></style>
