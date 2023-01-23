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
                      <div class="text-gray-400 mr-2">امیرحسین وطن دوست</div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">شماره تلفن :</div>
                      <div class="text-gray-400 mr-2">09224734322</div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">ایمیل :</div>
                      <div class="text-gray-400 mr-2">
                        hilsonxhero.me@gmail.com
                      </div>
                    </div>

                    <div class="flex items-center">
                      <div class="text-gray-700">آدرس سفارش :</div>
                      <div
                        class="text-gray-400 mr-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        شیراز مالی آباد خ فرهنگ ک پلاک ۲۲
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-6">
                    <div class="flex items-center">
                      <div class="text-gray-700">روش پرداخت :</div>
                      <div class="text-gray-400 mr-2">پرداخت آنلاین</div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">مبلغ کل سفارش :</div>
                      <div class="text-gray-400 mr-2">23343434343 تومان</div>
                    </div>
                    <div class="flex items-center">
                      <div class="text-gray-700">کد سفارش :</div>
                      <div class="text-gray-400 mr-2">34343</div>
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

          <div class="w-full flex items-center justify-start my-4">
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
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const formRef = ref<any>(null);
const loader = ref(false);
const form = ref({
  zone_code: null,
  name: "",
});

const statuses = ref([
  { title: "فعال", key: "enable" },
  { title: "غیرفعال", key: "disable" },
  { title: "درحال انتظار", key: "pending" },
  { title: "رد شده", key: "rejected" },
]);

const selected_status = ref(null);

const id = ref(null);
const types = ref(["checkbox", "color", "select", "size"]);

const fetchData = async () => {
  // try {
  //   loading.value = true;
  //   const { data } = await ApiService.get(`states/${id.value}`);
  //   form.value = data.data;
  //   formRef.value.setValues({
  //     ...data.data,
  //   });
  //   loading.value = false;
  // } catch (e) {
  //   loading.value = false;
  // }
};

const handleUpdate = async (values, { resetForm }) => {
  let formData = {
    name: form.value.name,
    zone_code: form.value.zone_code,
  };

  try {
    loader.value = true;
    const { data } = await ApiService.put(`states/${id.value}`, formData);
    resetForm();
    HxNotification.success({
      title: "success",
      message: "عملیات موفقیت آمیز",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    loader.value = false;
    router.push({ name: "states index" });
  } catch (e) {}
};

onMounted(async () => {
  id.value = route.params.id;
  fetchData();
});
</script>
<style></style>
