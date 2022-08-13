<template>
  <section>
    <div class="hx-card">
      <div class="hx-card__header">
        <h4 class="text-gray-600 text-xl">ویژگی های محصول</h4>
      </div>
      <div class="hx-card__body">
        <div
          class="flex flex-col space-y-2 border-b-2 py-4"
          v-for="(feature, index) in selectedFeatures"
          :key="index"
        >
          <hx-form-group>
            <hx-button @click="feature.values.push('')" variant="success">
              <hx-icon icon="plus"></hx-icon>
            </hx-button>
          </hx-form-group>
          <div class="w-full flex flex-wrap">
            <div class="w-3/12 ml-2">
              <hx-form-group label="ویژگی">
                <hx-select
                  @change="handleSelectFeature"
                  value-key="id"
                  label="title"
                  v-model="feature.feature"
                  filterable
                  :options="features"
                  placeholder="انتخاب  ویژگی"
                />
              </hx-form-group>
            </div>

            <div
              class="w-3/12 ml-2 flex flex-col"
              v-for="(value, index) in feature.values"
              :index="index"
            >
              <hx-form-group :label="`مقدار ویژگی `">
                <hx-select
                  value-key="id"
                  label="title"
                  v-model="feature.values[index]"
                  filterable
                  :options="feature.defaults"
                  placeholder="انتخاب  مقدار ویژگی"
                />
              </hx-form-group>

              <!-- <hx-form-group :label="`مقدار سفارشی `">
                <hx-textarea
                  v-model="feature.values[index]"
                  placeholder="انتخاب  مقدار سفارشی"
                />
              </hx-form-group> -->
            </div>
          </div>
        </div>
        <div class="my-4">
          <hx-button
            @click="handleCreateNewFeature"
            variant="success"
            outlined
            size="sm"
            >ویژگی جدید
          </hx-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck

import { onMounted, ref, watch, reactive } from "vue";
import ApiService from "@/core/services/ApiService";
const selectedFeatures = ref([{ feature: "", values: ["", ""] }]);
const features = ref([]);

const handleSelectFeature = (val) => {
  let item = selectedFeatures.value.find((o) => o.feature == val);
  ApiService.get(`features/${val}/values`).then(({ data }) => {
    item.defaults = null;
    item.defaults = data.data;
  });
};
const handleCreateNewFeature = () => {
  selectedFeatures.value.push({ feature: "", values: [""] });
};

onMounted(() => {
  ApiService.get("features")
    .then(({ data }) => {
      features.value = data.data;
    })
    .catch(() => {});
});
</script>

<style scoped></style>
