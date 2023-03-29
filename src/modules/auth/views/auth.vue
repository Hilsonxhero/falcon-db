<template>
  <div>
    <div class="bg-white p-5 lg:shadow-design-base rounded-3xl">
      <template v-if="otp">
        <Otp :username="username" :end="end" @reset="otp = false" />
      </template>
      <template v-else>
        <Confirmation v-model="username" @change="handleChange" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Otp from "@/modules/auth/components/otp.vue";
import Confirmation from "@/modules/auth/components/confirmation.vue";
const username = ref("");
const otp = ref(false);
const end = ref("");
const handleChange = (val) => {
  otp.value = true;
  end.value = val;
};
</script>

<style scoped></style>
