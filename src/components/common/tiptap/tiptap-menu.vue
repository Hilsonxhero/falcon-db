<template>
    <div>
        <template v-for="(item, index) in items">
            <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`" />
            <menu-item v-else :key="index" v-bind="item" />
        </template>
        <slot name="link"></slot>
        <slot name="image"></slot>
        <slot name="color"></slot>

    </div>
</template>

<script lang="ts" setup>
import MenuItem from "./titap-menu-item.vue";
import { ref } from "vue";

const props = defineProps(
    {
        editor: {
            type: Object,
            required: true,
        },
    }
)

const items = ref([
    {

        icon: "bold",
        title: "Bold",
        action: (): void | Function =>
            props.editor.chain().focus().toggleBold().run(),
        isActive: (): void => props.editor.isActive("bold"),
    },
    {

        icon: "italic",
        title: "Italic",
        action: (): void | Function =>
            props.editor.chain().focus().toggleItalic().run(),
        isActive: (): void => props.editor.isActive("italic"),
    },
    {

        icon: "strikethrough",
        title: "Strike",
        action: (): void | Function =>
            props.editor.chain().focus().toggleStrike().run(),
        isActive: (): void => props.editor.isActive("strike"),
    },
    {

        icon: "mark-pen-line",
        title: "Highlight",
        action: (): void | Function =>
            props.editor.chain().focus().toggleHighlight().run(),
        isActive: (): void => props.editor.isActive("highlight"),
    },
    {
        type: "divider",
    },
    {

        icon: "h-1",
        title: "Heading 1",
        action: (): void | Function =>
            props.editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .run(),
        isActive: (): void =>
            props.editor.isActive("heading", { level: 1 }),
    },
    {

        icon: "h-2",
        title: "Heading 2",
        action: (): void | Function =>
            props.editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run(),
        isActive: (): void =>
            props.editor.isActive("heading", { level: 2 }),
    },
    {

        icon: "paragraph",
        title: "Paragraph",
        action: (): void | Function =>
            props.editor.chain().focus().setParagraph().run(),
        isActive: (): void => props.editor.isActive("paragraph"),
    },
    {

        icon: "list-unordered",
        title: "Bullet List",
        action: (): void | Function =>
            props.editor.chain().focus().toggleBulletList().run(),
        isActive: (): void => props.editor.isActive("bulletList"),
    },
    {

        icon: "list-ordered",
        title: "Ordered List",
        action: (): void | Function =>
            props.editor.chain().focus().toggleOrderedList().run(),
        isActive: (): void => props.editor.isActive("orderedList"),
    },
    {

        icon: "code-box-line",
        title: "Code Block",
        action: (): void | Function =>
            props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: (): void => props.editor.isActive("codeBlock"),
    },
    {
        type: "divider",
    },
    {

        icon: "double-quotes-l",
        title: "Blockquote",
        action: (): void | Function =>
            props.editor.chain().focus().toggleBlockquote().run(),
        isActive: (): void => props.editor.isActive("blockquote"),
    },
    {

        icon: "separator",
        title: "Horizontal Rule",
        action: (): void | Function =>
            props.editor.chain().focus().setHorizontalRule().run(),
    },
    {
        type: "divider",
    },
    {

        icon: "text-wrap",
        title: "Hard Break",
        action: (): void | Function =>
            props.editor.chain().focus().setHardBreak().run(),
    },
    {

        icon: "format-clear",
        title: "Clear Format",
        action: (): void | Function =>
            props.editor
                .chain()
                .focus()
                .clearNodes()
                .unsetAllMarks()
                .run(),
    },
    {
        type: "divider",
    },
    {

        icon: "arrow-go-back-line",
        title: "Undo",
        action: (): void | Function => props.editor.chain().focus().undo().run(),
    },
    {

        icon: "arrow-go-forward-line",
        title: "Redo",
        action: (): void | Function => props.editor.chain().focus().redo().run(),
    },
])





</script>

<style lang="scss">
.divider {
    width: 2px;
    height: 1.25rem;
    background-color: rgba(#000, 0.1);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
}
</style>