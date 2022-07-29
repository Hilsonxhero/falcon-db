<template>
  <div class="flex items-center justify-start flex-wrap space-x-2 space-x-reverse">

    <div v-for="(file, index) in files" :key="index" :class="ns.e('input')"
      class="mb-3 group flex justify-center items-center w-36" :style="`background-image:url(${file.url})`">


      <div :class="ns.e('input-wrapper')"
        class="absolute transition-all duration-150 ease-linear invisible group-hover:visible w-full h-full inset-0 bg-gray-400/50  flex flex-col items-center justify-center overflow-hidden rounded-md">
        <hx-button variant="light" size="sm" icon @click="handleDeleteFile(index)">
          <hx-icon icon="trash" class="text-white"></hx-icon>
        </hx-button>
      </div>


      <label class="">
        <input type="file" ref="uploadRef" name="avatar" @change="handleObjectURL" />
      </label>
    </div>

    <div :class="ns.e('input')" class="mb-3 flex justify-center items-center w-36 bg-gray-100 border"
      @click="uploadRef.click()">

      <div :class="ns.e('input-wrapper')">
        <hx-icon icon="plus" class="w-7 h-7 text-gray-500"></hx-icon>
      </div>

      <label class="">
        <input type="file" ref="uploadRef" name="avatar" @change="handleObjectURL" />
      </label>
    </div>


    <!-- <div class="text-gray-400 text-xs text-right mt-2">
      لورم ایپسوم متن ساختگی با تولید سادگی
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useNamespace } from "@/core/hooks";
import { addUnit, isNumber, isString } from "@/core/utils";
import { avatarEmits, avatarProps } from "./upload";

import type { CSSProperties } from "vue";

const props = defineProps({
  max: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['fileChange', "update:modelValue"]);

const ns = useNamespace("upload");

const uploadRef = ref(null)
const files = ref([

])
const file = ref(null)
const fileURL = ref(null)
const fileName = ref(null)

// const uploadClass = computed(() => {
//   const { size, icon, shape } = props;
//   const classList = [ns.b()];
//   if (isString(size)) classList.push(ns.m(size));
//   if (icon) classList.push(ns.m("icon"));
//   if (shape) classList.push(ns.m(shape));
//   return classList;
// });

const filePreviewURL = computed(() => {
  return fileURL.value ? fileURL.value : '/media/svg/files/blank-image.svg'
});


const handleObjectURL = (event: any) => {
  let item = {
    file: [],
    name: '',
    url: ''
  }
  const file = [];
  item.file = event.target.files[0];
  item.name = event.target.files[0].name
  item.url = URL.createObjectURL(event.target.files[0])
  if (files.value.length >= props.max) return false
  files.value.push(item)
  item = {}
  emit('fileChange', true)
  props.max === 1 ? emit("update:modelValue", files.value[0].file) : emit("update:modelValue", files.value)
}

const handleDeleteFile = (index) => {
  files.value.splice(index, 1)
}


// need reset hasLoadError to false if src changed
// watch(
//   () => props.src,
//   () => (hasLoadError.value = false)
// );


</script>
