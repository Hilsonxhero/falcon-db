<template>
  <div>
    <div :class="ns.e('input')" class="mb-3 flex justify-center items-center "
      :style="`background-image:url(${filePreviewURL})`" @click="uploadRef.click()">
      <!--begin::Preview existing avatar-->
      <div :class="ns.e('input-wrapper')" class=""></div>
      <!--end::Preview existing avatar-->
      <!--begin::Label-->
      <label class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        data-kt-image-input-action="change" title="" data-bs-original-title="Change avatar">
        <!--begin::Icon-->
        <i class="bi bi-pencil-fill fs-7"></i>
        <!--end::Icon-->
        <!--begin::Inputs-->
        <input type="file" ref="uploadRef" name="avatar" @change="handleObjectURL" />
        <!-- <input type="hidden" name="avatar_remove"> -->
        <!--end::Inputs-->
      </label>
      <!--end::Label-->
      <!--begin::Cancel-->
      <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        data-kt-image-input-action="cancel">
        <i class="bi bi-x fs-2"></i>
      </span>
      <!--end::Cancel-->
      <!--begin::Remove-->
      <span class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        data-kt-image-input-action="remove">
        <i class="bi bi-x fs-2"></i>
      </span>
      <!--end::Remove-->
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

});

const emit = defineEmits(['fileChange']);

const ns = useNamespace("upload");

const uploadRef = ref(null)
const file = ref(null)
const fileURL = ref(null)
const fileName = ref(null)

const uploadClass = computed(() => {
  const { size, icon, shape } = props;
  const classList = [ns.b()];
  if (isString(size)) classList.push(ns.m(size));
  if (icon) classList.push(ns.m("icon"));
  if (shape) classList.push(ns.m(shape));
  return classList;
});

const filePreviewURL = computed(() => {
  return fileURL.value ? fileURL.value : '/media/svg/files/blank-image.svg'
});


const handleObjectURL = (event) => {
  file.value = [];
  file.value = event.target.files[0];
  fileName.value = file.value.name;
  fileURL.value = URL.createObjectURL(file.value);
  emit('fileChange', file.value)
}


// need reset hasLoadError to false if src changed
// watch(
//   () => props.src,
//   () => (hasLoadError.value = false)
// );


</script>
