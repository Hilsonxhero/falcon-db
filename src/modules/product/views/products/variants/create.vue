<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-12 xl:col-span-12">
        <Form @submit="handleCreate" class="w-full" ref="formRef">

          <div class="hx-card">
            <div class="hx-card__body">
              <div class="flex flex-wrap items-center justify-between">
                <div class="mb-4 lg:mb-0">
                  <div class="flex flex-wrap items-center">
                    <span>تنوع های انتخاب شده : </span>
                    <span
                        class="mx-2 mb-2 lg:mb-0"
                        v-for="(item, index) in selectedGroups"
                    >
                <hx-badge outlined>
                  {{ item.label }}
                </hx-badge>
              </span>
                  </div>
                </div>
                <div class="flex items-center">
                  <!--                  <hx-button variant="light" @click="createVariant" class="ml-2">-->
                  <!--                    ایجاد تنوع-->
                  <!--                  </hx-button>-->

                  <hx-button outlined @click="show = !show"> انتخاب تنوع</hx-button>

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
                              :value="{
                        id: value.id,
                        label: value.name,
                        value: value.value,
                        type: group.type,
                      }"
                              :key="index"
                              :label="value.name"
                          >
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
            <div
                class="hx-card"
            >
              <div class="hx-card__body">


                <div class="grid grid-cols-12 gap-2">
                  <hx-form-group class="col-span-6" label="قیمت ">
                    <hx-input v-model="variant.price" placeholder="قیمت"></hx-input>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="تعداد ">
                    <hx-input v-model="variant.stock" placeholder="تعداد"></hx-input>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="حداکثر تعداد خرید ">
                    <hx-input
                        v-model="variant.order_limit"
                        placeholder="حداکثر تعداد خرید"
                    ></hx-input>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="درصد تخفیف ">
                    <hx-input
                        v-model="variant.discount"
                        placeholder="درصد تخفیف"
                    ></hx-input>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="روش ارسال">
                    <hx-select
                        filterable
                        v-model="variant.shipment"
                        placeholder="انتخاب  روش ارسال"
                        value-key="id"
                        label="title"
                        :options="shipments"
                    >
                    </hx-select>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="گارانتی">
                    <hx-select
                        filterable
                        v-model="variant.warranty"
                        placeholder="انتخاب   گارانتی"
                        value-key="id"
                        label="title"
                        :options="warranties"
                    >
                    </hx-select>
                  </hx-form-group>

                  <hx-form-group class="col-span-6" label="وزن(گرم)">
                    <hx-input v-model="variant.weight" placeholder="وزن"></hx-input>
                  </hx-form-group>
                  <hx-form-group class="col-span-6" label="هزینه ارسال">
                    <hx-input
                        v-model="variant.shipment_price"
                        placeholder="هزینه ارسال"
                    >
                    </hx-input>
                  </hx-form-group>
                  <hx-form-group class="col-span-12" label="پایان تخفیف">
                    <date-picker v-model="variant.discount_expire_at" type="datetime"></date-picker>
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
import {ref, onMounted, watch, watchEffect} from "vue";
import {HxNotification} from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import {useRoute, useRouter} from "vue-router";
import {ErrorMessage, Field, Form} from "vee-validate";

import DatePicker from 'vue3-persian-datetime-picker'
import {generateId} from "@/core/utils";
import {uniqBy} from "lodash-unified";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const warranties = ref<Array<any>>([]);
const shipments = ref<Array<any>>([]);
const groups = ref<Array<any>>([]);

const id = ref(null);
const loader = ref(false);

const variant = ref(
    {
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
      discount_expire_at: ''
      // id: generateId()
    }
);
const show = ref(false);
const selectedGroups = ref<Array<any>>([]);


watch(
    () => selectedGroups.value,
    (val, oldVal) => {
    },
);

watchEffect(() => {
  selectedGroups.value = uniqBy(selectedGroups.value, "type")
})


onMounted(() => {
  id.value = route.params.id;

  ApiService.get("variant/groups/list/active").then(({data}) => {
    groups.value = data.data;
  });

  ApiService.get("warranties")
      .then(({data}) => {
        warranties.value = data.data;
      })
      .catch(() => {
      });
  ApiService.get("shipments")
      .then(({data}) => {
        shipments.value = data.data;
      })
      .catch(() => {
      });
  ApiService.get(`product/${id.value}/combinations`)
      .then(({data}) => {
      })
      .catch(() => {
      });
});

const handleCreate = async (values, {resetForm}) => {
  let formData = {
    stock: variant.value.stock,
    price: variant.value.price,
    discount: variant.value.discount,
    discount_price: variant.value.discount_price,
    weight: variant.value.weight,
    warranty: variant.value.warranty,
    shipment: variant.value.shipment,
    shipment_price: variant.value.shipment_price,
    order_limit: variant.value.order_limit,
    discount_expire_at: variant.value.discount_expire_at,
    combinations: JSON.stringify(selectedGroups.value),
  };

  try {
    loader.value = true;
    const {data} = await ApiService.post(
        `products/${id.value}/variants`,
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
    router.push({name: "products variants", params: {id: id.value}});
  } catch (e) {
    loader.value = false;
  }
};

// const handleSelectFeature = (val) => {
//   ApiService.get(`features/${val}/values`).then(({data}) => {
//     values.value = data.data;
//   });
// };
</script>
<style></style>
