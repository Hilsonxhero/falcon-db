<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor">
      <template #link>
        <button
          type="button"
          :class="[ns.e('menu-item')]"
          title="image"
          @click="show = !show"
        >
          <hx-icon icon="link-m" class="w-6 h-6 text-gray-500"></hx-icon>
        </button>
      </template>

      <template v-slot:image>
        <input
          type="file"
          class="hidden"
          id="file-input"
          @change="uploadImageHandler"
        />
        <button
          type="button"
          :class="[ns.e('menu-item')]"
          title="image"
          @click="showFileHandler"
        >
          <hx-icon icon="image-line" class="w-6 h-6 text-gray-500"></hx-icon>
        </button>
      </template>

      <template v-slot:color>
        <button
          type="button"
          :class="[ns.e('menu-item')]"
          title="color"
          @click="showColorBox"
        >
          <hx-icon icon="font-color" class="w-6 h-6 text-gray-500"></hx-icon>
        </button>

        <div style="position: relative">
          <input
            id="color-box"
            ref="color"
            style="visibility: hidden"
            type="color"
            @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="editor.getAttributes('textStyle').color"
          />
        </div>
      </template>
    </menu-bar>

    <editor-content v-bind="$attrs" class="editor__content" :editor="editor" />

    <hx-modal :show="show" title="پیوست لینک" @close="show = !show">
      <hx-input v-model="url" placeholder="مسیر پیوست"></hx-input>

      <template #footer="{ close }">
        <div class="flex items-center space-x-reverse space-x-4">
          <hx-button variant="primary" @click="handleSetLink">
            تایید
          </hx-button>
          <hx-button variant="light" @click="close"> لغو </hx-button>
        </div>
      </template>
    </hx-modal>
  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./tiptap-menu.vue";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useNamespace } from "@/core/hooks";
import { ref, onMounted, onUnmounted, watch } from "vue";

const ns = useNamespace("tiptap");
const props = defineProps({
  content: {},
});
const emit = defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});

const show = ref(false);
const url = ref(null);
const dropzone = ref<any>(null);
const editor = ref<any>(null);
const file = ref<any>(null);
const color = ref<any>(null);

const showColorBox = () => {
  // document.getElementById("color-box").click();
};
const showFileHandler = () => {
  // document.getElementById("file-input").click();
};

const handleSetLink = () => {
  const previousUrl = editor.value.getAttributes("link").href;

  show.value = !show.value;

  if (url.value === null) {
    return;
  }

  if (url.value === "") {
    editor.value.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.value
    .chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url.value })
    .run();

  url.value = null;
};

const uploadImageHandler = (event) => {
  file.value = event.target.files[0];
  const data = new FormData();
  data.append("file", file.value);
  // axios
  //     .post("/api/admin/upload/editor", data)
  //     .then(({ data }) => {
  //         console.log(data.data);
  //         editor.value.commands.setImage({ src: data.data });
  //     })
  //     .catch((error) => { });
};

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        // emptyEditorClass: 'is-editor-empty',
        placeholder: "توضیحات محصول ..",
      }),
      TextStyle,
      Highlight,
      Color,
    ],
    content: props.content,
    onUpdate: () => {
      emit("update:modelValue", editor.value.getHTML());
    },
  });
});
onUnmounted(() => {
  editor.value.destroy();
});

watch(
  () => props.content,
  (val, prevVal) => {
    editor.value.commands.setContent(val);
  }
);
</script>
