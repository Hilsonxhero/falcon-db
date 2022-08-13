<template>
  <section class="grid grid-cols-12 gap-2">
    <div class="hx-card col-span-12 md:col-span-6 xl:col-span-4">
      <div class="hx-card__body">
        <div>
          <hx-form-group label="وزن">
            <hx-input v-model="form.weight" placeholder="وزن"> </hx-input>
          </hx-form-group>
          <hx-form-group label="هزینه ارسال">
            <hx-input v-model="form.shipment_price" placeholder="هزینه ارسال">
            </hx-input>
          </hx-form-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from "@/core/services/ApiService";

const form = ref({
  weight: 0,
  shipment_price: 0,
});

const shipments = ref<Array<any>>([]);

const emit = defineEmits(["update:modelValue"]);

watch(
  () => form.value,
  (val, oldVal) => {
    emit("update:modelValue", val);
  },
  { deep: true }
);

onMounted(async () => {
  const { data } = await ApiService.get("shipments");
  shipments.value = data.data;
});
</script>

<style scoped></style>
