<template>
  <div class="hx-card p-0">
    <div class="hx-card__header border-0">
      <div class="hx-card__title flex items-center justify-between">
        <div class="flex items-center position-relative my-1">
          <hx-input
            v-model="search"
            @input="searchItems()"
            :placeholder="searchPlaceholder"
          ></hx-input>
        </div>

        <div>
          <slot name="left"></slot>
        </div>
      </div>
    </div>

    <div class="dataTables_wrapper dt-bootstrap4 no-footer">
      <div class="table-responsive overflow-x-auto">
        <table
          :class="[loading && 'overlay overlay-block']"
          v-if="!loading"
          class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
          id="kt_customers_table"
          role="grid"
        >
          <thead>
            <tr
              class="text-start text-gray-400 er fs-7 text-uppercase gs-0"
              role="row"
            >
              <template v-for="(cell, i) in tableHeader" :key="i">
                <th
                  class=""
                  @click="
                    sort(
                      cell.sortingField ? cell.sortingField : cell.key,
                      cell.sortable
                    )
                  "
                  :class="[
                    cell.name && 'min-w-125px',
                    cell.sortable !== false && 'sorting',
                    tableHeader.length - 1 === i && 'text-start',
                    currentSort ===
                      `${
                        cell.sortingField ? cell.sortingField : cell.key
                      }desc` && 'sorting_desc',
                    currentSort ===
                      `${
                        cell.sortingField ? cell.sortingField : cell.key
                      }asc` && 'sorting_asc',
                  ]"
                  tabindex="0"
                  rowspan="1"
                  colspan="1"
                  style="cursor: pointer"
                >
                  <div class="flex items-center space-x-1 space-x-reverse ml-3">
                    <span class="whitespace-nowrap">{{ cell.name }}</span>
                    <span v-if="cell.sortable">
                      <hx-icon
                        icon="sort"
                        class="w-6 h-6 text-gray-500"
                      ></hx-icon>
                    </span>
                  </div>
                </th>
              </template>
            </tr>
          </thead>

          <tbody class="text-gray-600">
            <template v-if="getItems.length">
              <template v-for="(item, index) in getItems" :key="index">
                <tr class="odd">
                  <template v-for="(cell, i) in tableHeader" :key="i">
                    <td :class="{ 'text-start': tableHeader.length - 1 === i }">
                      <slot
                        :name="`cell-${cell.key}`"
                        :row="item"
                        :index="index"
                      >
                        {{ item[prop] }}
                      </slot>
                    </td>
                  </template>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr class="odd">
                <td colspan="7" class="dataTables_empty">
                  {{ emptyTableText }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div
          v-if="loading"
          class="overlay-layer card-rounded bg-dark bg-opacity-5"
        >
          <div class="spinner-border text-primary text-center" role="status">
            <span class="visually-hidden text-center">در حال بارگیری ..</span>
          </div>
        </div>
      </div>
      <div class="row p-3">
        <div
          class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
        >
          <div
            v-if="enableItemsPerPageDropdown"
            class="dataTables_length"
            id="kt_customers_table_length"
          >
            <hx-select
              class="max-w-[10rem]"
              @change="setItemsPerPage"
              v-model="selected"
              filterable
              :options="PerPageOptions"
              placeholder="انتخاب دسته بندی"
            />
          </div>
        </div>
        <div class="w-full flex items-center justify-center md:justify-start">
          <hx-pagination
            v-model:current-page="pagination.page"
            @current-change="currentPageChange"
            :page-size="pagination.rowsPerPage"
            layout="prev, pager, next,total"
            :total="pagination.total"
            :hide-on-single-page="true"
            background
          >
          </hx-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import {
  computed,
  ref,
  onMounted,
  watch,
  getCurrentInstance,
  inject,
} from "vue";
import arraySort from "array-sort";
import ApiService from "@/core/services/ApiService";
import { isNumber } from "@/core/utils";

interface IPagination {
  page: number;
  total: number;
  rowsPerPage: number;
}

interface IHeaderConfiguration {
  name?: string;
  key: string;
  sortingField?: string;
  sortable?: boolean;
}

const emit = defineEmits(["page", "sort", "items-per-page-change", "refresh"]);
const props = defineProps({
  tableHeader: {
    type: Array as () => Array<IHeaderConfiguration>,
    required: true,
  },
  emptyTableText: { type: String, default: "داده ای یافت نشد" },
  loading: { type: Boolean, default: false },
  currentPage: { type: Number, default: 1 },
  enableItemsPerPageDropdown: { type: Boolean, default: true },
  total: { type: Number, default: 0 },
  rowsPerPage: { type: Number, default: 10 },
  order: { type: String, default: "asc" },
  sortLabel: { type: String, default: "" },
  url: { type: String },
  refresh: { type: Boolean, default: false },
  singleItemIndex: { type: [Number, String, null] },
  searchPlaceholder: { type: String },
});
// const refresh = inject('refresh')
const refresh = ref(props.refresh);
const data = ref([]);
const loading = ref(false);
const currentSort = ref<string>("");
const order = ref(props.order);
const label = ref(props.sortLabel);
const search = ref<string>("");
const tableData = ref<Array<any>>([]);
const initData = ref<Array<any>>([]);
const pagination = ref<IPagination>({
  page: props.currentPage ? props.currentPage : 2,
  total: 0,
  rowsPerPage: props.rowsPerPage ? props.rowsPerPage : 15,
});

const PerPageOptions = ref<number[]>([10, 25, 50, 100]);
const selected = ref<number | null>(null);
const vnodeProps = getCurrentInstance()?.vnode.props || {};

watch(
  () => data.value,
  (currentValue, oldValue) => {
    if ("onCurrentChange" in vnodeProps) {
      currentSort.value = label.value + order.value;
    }
  }
);

watch(
  () => props.singleItemIndex,
  (val: any, oldVal) => {
    let index = data.value.findIndex((d) => d.id == val);
    data.value.splice(index, 1);
    initData.value.splice(index, 1);
  },
  {
    deep: true,
  }
);

watch(
  () => pagination.value.page,
  (currentValue, oldValue) => {
    fetchData();
  }
);

watch(
  () => props.refresh,
  (currentValue, oldValue) => {
    currentValue && fetchData();
    emit("refresh", false);
  }
);

const fetchData = () => {
  loading.value = true;

  ApiService.query(`${props.url}`, {
    params: { page: pagination.value.page, paginate: true },
  })
    .then(({ data: response }) => {
      pagination.value.total = response.meta.total;
      pagination.value.page = response.meta.current_page;
      pagination.value.rowsPerPage = response.meta.per_page;
      data.value = response.data;
      tableData.value = data.value;
      initData.value.splice(0, tableData.value.length, ...tableData.value);
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const getItems = computed({
  get: () => {
    if (pagination.value.page == 1) {
      const clone = JSON.parse(JSON.stringify(data.value));
      const startFrom =
        pagination.value.page * pagination.value.rowsPerPage -
        pagination.value.rowsPerPage;
      return clone.splice(startFrom, pagination.value.rowsPerPage);
    } else {
      return data.value;
    }
  },
  set: (val) => {
    const clone = JSON.parse(JSON.stringify(val));
  },
});

const currentPageChange = (val: any) => {
  pagination.value.page = val;
  emit("page", val);
};

const sort = (columnName: any, sortable: any) => {
  if (sortable === false) {
    return;
  }

  if ("onSort" in vnodeProps) {
    if (order.value === "asc") {
      order.value = "desc";
      emit("sort", { columnName: columnName, order: "desc" });
    } else {
      order.value = "asc";
      emit("sort", { columnName: columnName, order: "asc" });
    }
  } else {
    if (order.value === "asc") {
      order.value = "desc";
      arraySort(data.value, columnName, { reverse: false });
    } else {
      order.value = "asc";
      arraySort(data.value, columnName, { reverse: true });
    }
  }
  currentSort.value = columnName + order.value;
};

const setItemsPerPage = (value: any, id: any) => {
  if ("onItemsPerPageChange" in vnodeProps) {
    emit("items-per-page-change", value);
  } else {
    pagination.value.rowsPerPage = value;
  }
};

const searchItems = () => {
  tableData.value.splice(0, tableData.value.length, ...initData.value);
  if (search.value !== "") {
    let results: Array<any> = [];
    for (let j = 0; j < tableData.value.length; j++) {
      if (searchingFunc(tableData.value[j], search.value)) {
        results.push(tableData.value[j]);
      }
    }
    tableData.value.splice(0, tableData.value.length, ...results);
  }
};

const searchingFunc = (obj: any, value: any): boolean => {
  for (let key in obj) {
    if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
      if (obj[key].indexOf(value) != -1) {
        return true;
      }
    }
  }
  return false;
};

onMounted(() => {
  currentSort.value = label.value + order.value;
  fetchData();
});
</script>
