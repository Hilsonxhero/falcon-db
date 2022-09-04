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

            <hx-button outlined @click="show = !show"> انتخاب تنوع</hx-button>

            <hx-modal :show="show" title="انتخاب تنوع" @close="show = !show">
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
              <hx-input
                v-model="variant.rrp_price"
                placeholder="قیمت"
              ></hx-input>
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
              <date-picker
                v-model="variant.discount_expire_at"
                type="datetime"
              ></date-picker>
            </hx-form-group>

            <hx-form-group class="col-span-12" label="تنوع پیش فرض">
              <hx-radio
                :label="variant.id"
                v-model="default_variant"
                name="default_on"
              ></hx-radio>
            </hx-form-group>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, onUnmounted, ref, watch, watchEffect, computed } from "vue";
import HxTable from "@/components/common/widgets/table/Table.vue";
import ApiService from "@/core/services/ApiService";
import { HxNotification } from "@/components/base/notification";
import { generateId } from "@/core/utils";
import DatePicker from "vue3-persian-datetime-picker";
import { HxMessageBox } from "@/components/base/message-box";

import { isEqual, uniqBy, isLength, isEqualWith } from "lodash-unified";

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
const combinations = ref<Array<any>>([]);

const default_variant = ref<any>(null);

const handleDelete = (item: unknown, index: number) => {
  if (!item.product) return variants.value.splice(index, 1);

  HxMessageBox.confirm("آیا از حذف این تنوع اطمینان داری؟!", "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(() => {
      ApiService.delete(`products/${item.product}/variants/${item.id}`).then(
        () => {
          variants.value.splice(index, 1);
          HxNotification.success({
            title: "عملیات موفقیت آمیز",
            message: "محصول موردنظر حذف شد",
            showClose: true,
            duration: 4000,
            position: "bottom-right",
          });
        }
      );
    })
    .catch(() => {});
};

const handleGenerateVariants = (arr) =>
  arr.reduce(
    (acc, item) => {
      var arr = acc.concat(acc.map((x) => [...x, item]));
      let rrr = [];
      arr.map((item, index) => {
        let len = item.length;
        let result = item.filter((b, i, { [i - 1]: a }) => a?.type !== b.type);
        if (result.length < len) return false;
        rrr.push(result);
      });
      return rrr;
    },
    [[]]
  );

const handleVariantSubsetDup = (arr) => {
  let same = arr.findIndex(({ type }) => type !== arr[0].type) == -1;
  return !same
    ? handleGenerateVariants(arr).filter((a) => a.length == 2)
    : handleGenerateVariants(arr).filter((a) => a.length == 1);
};

watch(
  () => variants.value,
  (val, oldVal) => {
    if (variants.value.length >= 1)
      default_variant.value = val.find(
        (item, index) => item.default_on == 1
      ).id;
    emit("update:modelValue", val);
  }
);

watch(default_variant, (val: any, oldVal) => {
  variants.value.map((variant, i) => {
    variant.default_on = 0;
  });
  variants.value.find((item, index) => item.id == val).default_on = 1;
});

watch(
  () => props.modelValue,
  (val: any, oldVal) => {},
  { deep: true }
);

watchEffect(() => {
  if (props.modelValue && selectedGroups.value.length < 1) {
    variants.value = props.modelValue;
    variants.value.map((variant, index) => {
      variant.combinations.map((group, i) => {
        uniqueSelectedGroups.value.push(group);
      });
      combinations.value.push(variant.combinations);
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
    return false;
  }

  let unq_combinations = handleVariantSubsetDup(selectedGroups.value);
  unq_combinations.map((item, index) => {
    const hasUniqueValue = contains(variants.value, item);

    if (hasUniqueValue) {
      combinations.value.push([...item]);

      let id = generateId();

      variants.value.push({
        combinations: [...item],
        stock: 0,
        rrp_price: 0,
        discount: 0,
        discount_price: 0,
        weight: 0,
        warranty: null,
        shipment: null,
        shipment_price: 0,
        order_limit: 0,
        product: null,
        id: id,
        discount_expire_at: null,
        default_on: false,
      });

      const sameCombinations =
        variants.value.findIndex(
          (el) =>
            el.combinations.length !== variants.value[0]?.combinations.length
        ) == -1;
      if (!sameCombinations) {
        const i = variants.value.findIndex((variant) => variant.id == id);
        variants.value.splice(i, 1);
        HxNotification.info({
          title: "مقدار نامعتبر",
          message:
            "تعداد تنوع های ساخته شده  باید با نوع یکسان یا مساوی با یکدیگر باشند",
          showClose: true,
          duration: 6000,
          position: "bottom-right",
        });
        return;
      }
    }
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
