<template>
  <span :class="ns.e('total')" :disabled="disabled">
    {{
      t("el.pagination.total", {
        total,
      })
    }}
  </span>
</template>

<script lang="ts" setup>
import { useLocale, useNamespace } from "@/core/hooks";
import { usePagination } from "../usePagination";
import { paginationTotalProps } from "./total";
const { t } = useLocale();
const ns = useNamespace("pagination");
const { disabled } = usePagination();

defineProps(paginationTotalProps);
</script>
