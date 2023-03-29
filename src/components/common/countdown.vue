<template>
  <div class="countdown dir-ltr">
    <div v-if="days" class="countdown__block">
      <div class="countdown__digit">{{ $filters.twoDigits(days) }}</div>
    </div>
    <div v-if="hours" class="countdown__block">
      <div class="countdown__digit">{{ $filters.twoDigits(hours) }}</div>
    </div>
    <div class="countdown__block">
      <div class="countdown__digit">{{ $filters.twoDigits(minutes) }}</div>
    </div>
    <div class="countdown__block">
      <div class="countdown__digit">{{ $filters.twoDigits(seconds) }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { computed, onMounted, ref, onBeforeUnmount } from "vue";

const props = defineProps({
  date: {
    type: String,
  },
});

const now = ref(Math.trunc(new Date().getTime() / 1000));
const finish = ref(false);
const interval = ref(null);
const emit = defineEmits(["finish"]);

onMounted(() => {
  interval.value = setInterval(() => {
    now.value = Math.trunc(new Date().getTime() / 1000);

    if (!finish.value && calculatedDate.value - now.value <= 0) {
      clearInterval(interval.value);
      finish.value = true;
      emit("finish");
    }
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

const secondCount = computed(() => {
  return calculatedDate.value - now.value;
});

const calculatedDate = computed(() => {
  return Math.trunc(new Date().getTime() + props.date) / 1000;
});

const seconds = computed(() => {
  if (secondCount.value < 0) return 0;
  //   return secondCount.value % 60;
  return Math.trunc(secondCount.value) % 60;
});

const minutes = computed(() => {
  if (secondCount.value < 0) return 0;
  return Math.trunc(secondCount.value / 60) % 60;
});

const hours = computed(() => {
  if (secondCount.value < 0) return 0;
  return Math.trunc(secondCount.value / 60 / 60) % 24;
});

const days = computed(() => {
  if (secondCount.value < 0) return 0;
  return Math.trunc(secondCount.value / 60 / 60 / 24);
});
</script>
<style lang="scss">
.countdown {
  display: flex;
  justify-content: center;
  &__block {
    text-align: center;
    // padding: 0px 15px;
    margin: 0 5px;
    position: relative;
    &:first-child {
      padding-left: 0;
      .countdown__digit {
        &:before {
          display: none;
        }
      }
    }
    &:last-child {
      padding-right: 0;
    }
  }
  &__text {
    display: inline-block;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  &__digit {
    font-weight: bold;
    line-height: 1;
    margin-bottom: 5px;
    // &:before {
    //   content: ":";
    //   position: absolute;
    //   left: -7px;
    // }
  }
}
</style>
