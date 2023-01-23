<template>
  <div>
    <slot
      name="price"
      :chnage="handlePriceInput"
      :min="minValInp"
      :max="maxValInp"
    ></slot>
  </div>
  <div>
    <div class="slider">
      <div class="progress" ref="progress"></div>
    </div>
    <div class="range-input">
      <input
        ref="minValInpRef"
        type="range"
        class="range-min"
        :min="min"
        :max="max"
        step="5000"
        v-model="minValInp"
        @input="handleRangeInput"
      />
      <input
        ref="maxValInpRef"
        type="range"
        class="range-max"
        :min="min"
        :max="max"
        step="5000"
        v-model="maxValInp"
        @input="handleRangeInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  min: {
    type: Number,
    default: 1000,
  },
  max: {
    type: Number,
    default: 200000000,
  },
  gap: {
    type: Number,
    default: 1000,
  },
  modelValue: {
    type: [String, Number, Object, Array],
  },
});

defineOptions({
  name: "HxSlider",
});

// const emits = defineEmits(["update:modelValue"]);
let priceGap = ref<number>(1000);
let progress = ref<any>(null);
let minValInpRef = ref<any>(null);
let maxValInpRef = ref<any>(null);
const minValInp = ref<number>(0);
const maxValInp = ref<number>(props.max);
const minPriceInp = ref<any>(null);
const maxPriceInp = ref<any>(null);

const handleRangeInput = (e: any) => {
  let minVal: number = minValInp.value,
    maxVal: number = maxValInp.value;
  if (maxVal - minVal < priceGap.value) {
    if (e.target.className === "range-min") {
      minValInp.value = maxVal - priceGap.value;
    } else {
      maxValInp.value = minVal + priceGap.value;
    }
  } else {
    maxPriceInp.value = maxVal;
    minPriceInp.value = minVal;

    progress.value.style.right =
      (minVal / Number(minValInpRef.value.max)) * 100 + "%";

    progress.value.style.left =
      100 - (maxVal / Number(maxValInpRef.value.max)) * 100 + "%";

    // emits("update:modelValue", {
    //   min: minValInp.value,
    //   max: maxValInp.value,
    // });
  }
};

const handlePriceInput = (e: any) => {
  // let minPrice = props.minPrice,
  //   maxPrice = props.maxPrice;
  // if (
  //   maxPrice - minPrice >= priceGap.value &&
  //   maxPrice <= parseInt(maxValInpRef.value.max)
  // ) {
  //   if (e.target.classList.contains("input-min")) {
  //     minValInp.value = minPrice;
  //     progress.value.style.right =
  //       (minPrice / minValInpRef.value.max) * 100 + "%";
  //   } else {
  //     maxValInp.value = maxPrice;
  //     progress.value.style.left =
  //       100 - (maxPrice / maxValInpRef.value.max) * 100 + "%";
  //   }
  // }
};

onMounted(() => {
  minPriceInp.value = minValInp.value;
  maxPriceInp.value = maxValInp.value;
});
</script>

<style scoped>
.price-input {
  width: 100%;
  display: flex;
  margin: 30px 0 35px;
}
.price-input .field {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
}
.field input {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 19px;
  margin-left: 12px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #999;
  -moz-appearance: textfield;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.price-input .separator {
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}
.slider {
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}
.slider .progress {
  height: 100%;
  left: 0;
  right: 0;
  position: absolute;
  border-radius: 5px;
  background: #333;
}
.range-input {
  position: relative;
}
.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
input[type="range"]::-webkit-slider-thumb {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #333;
  cursor: pointer;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
input[type="range"]::-moz-range-thumb {
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #333;
  pointer-events: auto;
  -moz-appearance: none;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
}
</style>
