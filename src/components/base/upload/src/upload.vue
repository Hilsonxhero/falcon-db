<template>
  <div class="flex items-center justify-start flex-wrap space-x-2 space-x-reverse">
    <!-- <div
      v-for="(file, index) in files"
      :key="index"
      :class="ns.e('input')"
      class="mb-3 group flex justify-center items-center w-36"
      :style="`background-image:url(${file.url})`"
    >
      <div
        :class="ns.e('input-wrapper')"
        class="absolute transition-all duration-150 ease-linear invisible group-hover:visible w-full h-full inset-0 bg-gray-400/50 flex flex-col items-center justify-center overflow-hidden rounded-md"
      >
        <hx-button
          variant="light"
          size="sm"
          icon
          @click="handleDeleteFile(file, index)"
        >
          <hx-icon icon="trash" class="text-white"></hx-icon>
        </hx-button>
      </div>

      <label class="">
        <input
          type="file"
          ref="uploadRef"
          name="avatar"
          @change="handleObjectURL"
        />
      </label>
    </div> -->

    <!-- <div
      :class="ns.e('input')"
      class="mb-3 flex justify-center items-center w-36 border-2"
      @click="uploadRef.click()"
    >
      <div :class="ns.e('input-wrapper')">
        <hx-icon icon="plus" class="w-7 h-7 text-gray-500"></hx-icon>
      </div>

      <label class="">
        <input
          type="file"
          ref="uploadRef"
          name="avatar"
          @change="handleObjectURL"
        />
      </label>
    </div> -->


    <div class="flex flex-col relative w-full">
      <label for="file-upload"
        class="relative block bg-gray-100 border-dashed border-2 border-gray-300 rounded-xl overflow-hidden ">
        <input ref="uploadRef" id="file-upload" @change="handleObjectURL" type="file"
          class="opacity-0 cursor-pointer absolute inset-0 w-full">
        <span class=" items-center pointer-events-none flex  justify-center h-full ">
          <span class=" flex items-center justify-center h-full text-center mx-auto ">
            <div class="p-1 space-y-4 flex lg:t-col">
              <div class="items-center flex flex-col justify-center">
                <template v-if="uploaded_file.preview">
                  <div class="max-h-[5rem] mt-2">
                    <img :src="uploaded_file.preview" class="w-full h-full object-contain rounded-md" alt="">
                  </div>
                </template>
                <template v-else>
                  <hx-icon class="mb-3 w-10 h-10 text-typo-light fill-current icon sprite-next text-gray-500"
                    icon="gallery"></hx-icon>
                </template>


                <template v-if="uploaded_file.name">
                  <div class="mr-1 mt-2 text-typo-light text-xs font-bold">
                    {{ uploaded_file.name }}
                  </div>
                </template>
                <template v-else>
                  <div class="mr-1 mt-2 text-typo-light text-xs font-bold">
                    فایل را انتخاب کنید
                  </div>
                </template>

              </div>
            </div>
          </span></span></label>
    </div>

  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { onMounted, ref, watch } from "vue";
import { useNamespace } from "@/core/hooks";
import { isString } from "@/core/utils";
import useBase64 from "@/core/hooks/use-base64";
const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: [Array, String, Object],
  },
  sources: {
    type: [String, Array, Object],
    default: [],
  },
});

defineOptions({
  name: "HxUpload",
});

const emit = defineEmits(["fileChange", "update:modelValue", "delete"]);

const ns = useNamespace("upload");
const uploadRef = ref(null);
const files = ref<Array<any>>([]);
const uploaded_file = ref<any>({});
const media = ref<any>({});

const handleObjectURL = async (event: any) => {
  const file = event.target.files[0];
  uploaded_file.value.base64 = await useBase64(file);
  uploaded_file.value.media = file;
  uploaded_file.value.name = file.name;
  uploaded_file.value.preview = URL.createObjectURL(file);
  if (files.value.length >= props.max) return false;
  // files.value.push({
  //   media: file,
  //   file: await useBase64(file),
  //   name: uploaded_file.value.name,
  //   preview: uploaded_file.value.preview,
  // });

  // uploaded_file.value = {
  //   media: file,
  //   file: await useBase64(file),
  //   name: media.value.name,
  //   preview: media.value.preview,
  // }
};

const handleDeleteFile = (file, index) => {
  files.value.splice(index, 1);
  emit("delete", file.id);
};
const clear = () => {
  uploaded_file.value = {}
};

defineExpose({ clear })

watch(
  () => uploaded_file.value,
  (val, oldVal) => {

    emit("update:modelValue", {
      file: val.media,
      name: val.name,
      base64: val.base64,
      preview: val.preview,
    });
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  (val, oldVal) => {
  },
  { deep: true }
);

watch(
  () => props.sources,
  (val, oldVal) => {
    if (isString(val)) uploaded_file.value.preview = val;
  },
  { deep: true }
);

// watch(
//   () => files.value,
//   (val, oldVal) => {
//     if (props.max === 1) {
//       emit("update:modelValue", {
//         file: media.value.media,
//         base64: media.value.base64,
//       });
//     } else {
//       emit("update:modelValue", files.value);
//     }
//   },
//   { deep: true }
// );

onMounted(() => {
  if (props.sources) {
    // if (isString(props.sources)) files.value.push({ preview: props.sources });
    if (isString(props.sources)) uploaded_file.value.preview = props.sources;

  }
});
</script>
