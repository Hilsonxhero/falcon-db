<template>
  <section class="mb-6">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <Form @submit="handleUpdate" class="w-full" ref="formRef">
          <div class="hx-card">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">صورتحساب سفارش</h4>
            </div>
            <div class="hx-card__body">
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-9">
                  <div class="flex flex-col space-y-6 mb-6">
                    <div class="flex items-center">
                      <div class="text-gray-700">نام :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form?.user?.username }}
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">شماره تلفن :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form?.user?.phone }}
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">ایمیل :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form?.user?.email }}
                      </div>
                    </div>

                    <div class="flex items-center">
                      <div class="text-gray-700">آدرس سفارش :</div>
                      <div
                        class="text-gray-400 mr-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {{ form?.address?.address }}
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-6">
                    <div class="flex items-center">
                      <div class="text-gray-700">روش پرداخت :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form?.payment_method?.title }}
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">مبلغ کل سفارش :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form.payable_price }} تومان
                      </div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">کد سفارش :</div>
                      <div class="text-gray-400 mr-2">
                        {{ form?.reference_code }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-span-3">
                  <div class="flex flex-col space-y-6">
                    <hx-form-group label="وضعیت سفارش">
                      <hx-select
                        name="status"
                        value-key="key"
                        label="title"
                        v-model="selected_status"
                        filterable
                        :options="statuses"
                        placeholder="انتخاب کنید"
                      />
                    </hx-form-group>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="hx-card mt-2">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">محصولات</h4>
            </div>
            <div class="hx-card__body">
              <div
                v-for="(shipping_item, index) in form.shipments"
                :key="index"
              >
                <div class="text-xs">
                  {{ shipping_item?.shipment?.title }}
                </div>
                <div class="flex flex-wrap items-center my-6">
                  <div
                    class="flex flex-col mb-3 ml-2 border rounded-xl"
                    v-for="(order_item, i) in shipping_item.order_items"
                    :key="i"
                  >
                    <router-link
                      class="w-24 h-24 lg:w-20 lg:h-20 relative p-2"
                      to="/"
                    >
                      <img
                        class="object-contain h-full w-full"
                        :src="order_item.product?.media?.thumb"
                        alt=""
                      />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="hx-card mt-2">
            <div class="hx-card__header">
              <h4 class="text-gray-600 text-xl">پرداخت ها</h4>
            </div>
            <div class="hx-card__body">
              <div class="flex flex-wrap items-center my-6">
                <div
                  class="flex flex-col mb-3 ml-2 border rounded-xl"
                  v-for="(payment_item, i) in form.payments"
                  :key="i"
                ></div>
              </div>
            </div>
          </div> -->
          <div v-if="form.payments" class="mt-2">
            <HxTable
              :table-data="form.payments"
              :table-header="table_headers"
              :single-item-index="index"
              search-placeholder="جستجوی کاربر"
              :enable-items-per-page-dropdown="false"
              :on-current-change="true"
            >
              <template #left>
                <div>پرداخت ها</div>
              </template>
              <template v-slot:cell-checkbox="{ row: payment }">
                <div
                  class="form-check form-check-sm form-check-custom form-check-solid"
                >
                  <hx-checkbox v-model="checkedData"></hx-checkbox>
                </div>
              </template>

              <template v-slot:cell-user="{ row: payment }">
                <span> {{ payment?.user?.username }}</span>
              </template>
              <template v-slot:cell-amount="{ row: payment }">
                <span> {{ payment?.amount }}</span>
              </template>
              <template v-slot:cell-status_fa="{ row: payment }">
                <span> {{ payment?.status_fa }}</span>
              </template>
              <template v-slot:cell-reference_code="{ row: payment }">
                <span> {{ payment?.reference_code }}</span>
              </template>
              <template v-slot:cell-payment_method="{ row: payment }">
                <span> {{ payment?.payment_method?.title }}</span>
              </template>

              <!-- <template v-slot:cell-actions="{ row: order, index: index }">
              <hx-button
                variant="gray"
                size="sm"
                icon
                :to="{ name: 'orders edit', params: { id: order.id } }"
              >
                <hx-icon icon="slider-alt"></hx-icon>
              </hx-button>
              <hx-button
                variant="gray"
                size="sm"
                icon
                @click="handleDelete(order, index)"
              >
                <hx-icon icon="trash"></hx-icon>
              </hx-button>
            </template> -->
            </HxTable>
          </div>

          <div class="w-full flex items-center justify-start my-4">
            <div class="flex items-center space-x-3 space-x-reverse">
              <hx-button type="submit" :loading="loader"> ذخیره </hx-button>
              <hx-button variant="light" :to="{ name: 'orders index' }">
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
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import HxTable from "@/components/common/widgets/table/Table.vue";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const loader = ref(false);
const form = ref({
  zone_code: null,
  name: "",
});

const table_headers = ref([
  {
    key: "checkbox",
    sortable: false,
  },

  {
    name: "کاربر",
    key: "user",
    sortable: true,
  },
  {
    name: "مقدار",
    key: "amount",
    sortable: false,
  },
  {
    name: "وضعیت",
    key: "status_fa",
    sortable: false,
  },
  {
    name: "شماره سفارش",
    key: "reference_code",
    sortable: false,
  },
  {
    name: "روش پرداخت",
    key: "payment_method",
    sortable: false,
  },
  // {
  //   name: "عملیات",
  //   key: "actions",
  // },
]);

const statuses = ref([
  { title: "در انتظار پرداخت", key: "wait_payment" },
  { title: "تایید سفارش", key: "accepted" },
  { title: "آماده سازی سفارش", key: "confirmation" },
  { title: "پردازش سفارش", key: "processed" },
  { title: "خروج از مرکز پردازش", key: "leaving_center" },
  { title: "دریافت در مرکز توضیح", key: "received_center" },
  { title: "تحویل به مامور ارسال", key: "delivery_dispatcher" },
  { title: "تحویل مرسوله  به مشتری", key: "sent" },
  { title: "لغو سیستمی", key: "canceled_system" },
]);

const selected_status = ref(null);

const id = ref(null);

const fetchData = async () => {
  try {
    loading.value = true;
    const { data } = await ApiService.get(`orders/${id.value}`);
    form.value = data.data;
    selected_status.value = form.value.status;
    formRef.value.setValues({
      ...data.data,
    });
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    status: selected_status.value,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`orders/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "orders index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  fetchData();
});
</script>
<style></style>
