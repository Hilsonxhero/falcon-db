<template>
  <div
    class="flex items-center justify-start flex-wrap space-x-2 space-x-reverse"
  >
    <div
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
    </div>

    <div
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
    </div>

    <!-- <div class="text-gray-400 text-xs text-right mt-2">
      لورم ایپسوم متن ساختگی با تولید سادگی
    </div> -->
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

const emit = defineEmits(["fileChange", "update:modelValue", "delete"]);

const ns = useNamespace("upload");
const uploadRef = ref(null);
const files = ref<Array<any>>([]);
const media = ref<any>({});

const handleObjectURL = async (event: any) => {
  const file = event.target.files[0];
  media.value.media = await useBase64(file);
  media.value.name = file.name;
  media.value.url = URL.createObjectURL(file);
  if (files.value.length >= props.max) return false;
  files.value.push({
    file: await useBase64(file),
    name: media.value.name,
    url: media.value.url,
  });
};

const handleDeleteFile = (file, index) => {
  files.value.splice(index, 1);
  emit("delete", file.id);
};

watch(
  () => files.value,
  (val, oldVal) => {
    if (props.max === 1) {
      emit("update:modelValue", media.value.media);
    } else {
      emit("update:modelValue", files.value);
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.sources) {
    if (isString(props.sources)) files.value.push({ url: props.sources });
  }
});
</script>
