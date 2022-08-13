<template>
  <section class="mb-12">
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
            <hx-button variant="light" @click="createVariant" class="ml-2">
              ایجاد تنوع
            </hx-button>

            <hx-button outlined @click="show = !show"> انتخاب تنوع </hx-button>

            <hx-modal
              :show="show"
              title="انتخاب تنوع"
              @close="handleCloseModal"
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
  </section>
  <section v-if="variants.length >= 1">
    <div class="grid grid-cols-12 gap-2">
      <div
        class="hx-card col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4"
        v-for="(variant, index) in variants"
        :key="index"
      >
        <div class="hx-card__body">
          <div class="flex items-center justify-between">
            <div class="flex items-center mb-3">
              <span
                class="ml-2 bg-gray-100 rounded-xl px-4 py-2"
                v-for="(combination, i) in variant.combinations"
                >{{ combination.label }}</span
              >
            </div>

            <div>
              <hx-button
                @click="handleDelete(variant, index)"
                icon
                variant="danger"
              >
                <hx-icon icon="trash"></hx-icon>
              </hx-button>
            </div>
          </div>

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
              <hx-input v-model="variant.weight" placeholder="وزن"> </hx-input>
            </hx-form-group>
            <hx-form-group class="col-span-6" label="هزینه ارسال">
              <hx-input
                v-model="variant.shipment_price"
                placeholder="هزینه ارسال"
              >
              </hx-input>
            </hx-form-group>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import HxTable from "@/components/common/widgets/table/Table.vue";
import ApiService from "@/core/services/ApiService";
import { HxNotification } from "@/components/base/notification";
import { isEqual, uniqBy } from "lodash-unified";

const tableHeader = ref([
  {
    key: "checkbox",
  },
  {
    name: "ترکیب ها",
    key: "combinations",
  },
  {
    name: "  قیمت",
    key: "price",
  },
  {
    name: "تعداد",
    key: "stock",
  },
  {
    name: "حداکثر تعداد خرید",
    key: "order_limit",
  },
  {
    name: " تخفیف",
    key: "discount",
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Array,
  },
});

const variants = ref<Array<any>>([]);
const warranties = ref<Array<any>>([]);
const shipments = ref<Array<any>>([]);
const groups = ref<Array<any>>([]);
const selectedGroups = ref<Array<any>>([]);
const uniqueSelectedGroups = ref<Array<any>>([]);
const show = ref(false);

const handleCloseModal = () => {
  show.value = !show.value;
};

const handleDelete = (item: unknown, index: number) => {
  variants.value.splice(index, 1);
};

const handleGenerateVariants = (arr: Array<any>) => {
  let resoult = [];
  let tmpArr = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j <= arr.length; j++) {
      if (arr[i] != undefined) tmpArr.unshift(arr[i]);
      if (arr[j] != undefined) tmpArr.unshift(arr[j]);
      if (
        (tmpArr.length > 1 && arr.length >= 2) ||
        (tmpArr.length == 1 && arr.length == 1)
      ) {
        resoult.push(tmpArr);
      }
      tmpArr = [];
    }
  }
  return resoult;
};

const handleVariantSubsetDup = (arr) => {
  let rrr = [];
  arr.map((item, index) => {
    let len = item.length;
    let result = item.filter((b, i, { [i - 1]: a }) => a?.type !== b.type);
    if (result.length < len) return false;
    rrr.push(result);
  });
  return rrr;
};

watch(
  () => variants.value,
  (val, oldVal) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (val: any, oldVal) => {},
  { deep: true }
);

watchEffect(() => {
  if (props.modelValue && selectedGroups.value.length < 1) {
    variants.value = props.modelValue;
    variants.value.map((variant, index) => {
      console.log("variant", variant);
      variant.combinations.map((group, i) => {
        uniqueSelectedGroups.value.push(group);
      });
    });
    selectedGroups.value = uniqBy(uniqueSelectedGroups.value, "id");
  }
});

const contains = (arr, item) => {
  for (var i = 0; i < arr.length; i++) {
    if (
      isEqual(arr[i].combinations, item) ||
      isEqual(arr[i].combinations, item.reverse())
    ) {
      return false;
    }
  }
  return true;
};

const createVariant = () => {
  if (selectedGroups.value.length < 1) {
    HxNotification.info({
      title: "مقدار نامعتبر",
      message: "تعداد تنوع های انتخاب شده معتبر نمی باشد",
      showClose: true,
      duration: 4000,
      position: "bottom-right",
    });
    // return false
  }

  let combinations = handleGenerateVariants(selectedGroups.value);
  let unq_combinations = handleVariantSubsetDup(combinations);
  unq_combinations.map((item, index) => {
    const hasUniqueValue = contains(variants.value, item);
    if (hasUniqueValue)
      variants.value.push({
        combinations: [...item],
        stock: 0,
        price: 0,
        discount: 0,
        discount_price: 0,
        weight: 0,
        warranty: null,
        shipment: null,
        shipment_price: 0,
        order_limit: 0,
      });
  });
};

onMounted(() => {
  ApiService.get("variant/groups/list/active").then(({ data }) => {
    groups.value = data.data;
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
});
</script>
