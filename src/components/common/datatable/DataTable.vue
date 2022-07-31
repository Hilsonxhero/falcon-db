<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <div class="table-responsive overflow-x-auto">
      <table :class="[loading && 'overlay overlay-block']" v-if="!loading"
        class="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer" id="kt_customers_table" role="grid">
        <!--begin::Table head-->
        <thead>
          <!--begin::Table row-->
          <tr class="text-start text-gray-400 fw-bolder fs-7 text-uppercase gs-0" role="row">
            <template v-for="(cell, i) in tableHeader" :key="i">
              <th @click="
                sort(
                  cell.sortingField ? cell.sortingField : cell.key,
                  cell.sortable
                )
              " :class="[
  cell.name && 'min-w-125px',
  cell.sortable !== false && 'sorting',
  tableHeader.length - 1 === i && 'text-start',
  currentSort ===
  `${cell.sortingField ? cell.sortingField : cell.key}desc` &&
  'sorting_desc',
  currentSort ===
  `${cell.sortingField ? cell.sortingField : cell.key}asc` &&
  'sorting_asc',
]" tabindex="0" rowspan="1" colspan="1" style="cursor: pointer">
                <div class="flex items-center space-x-1 space-x-reverse">
                  <span>{{ cell.name }}</span>
                  <span v-if="cell.sortable">
                    <hx-icon icon="sort" class="w-6 h-6 text-gray-500"></hx-icon>
                  </span>
                </div>
              </th>
            </template>
          </tr>
          <!--end::Table row-->
        </thead>

        <tbody class="fw-bold text-gray-600">
          <!-- v-if="getItems.length" -->
          <template v-if="getItems.length">
            <template v-for="(item, i) in getItems" :key="i">
              <tr class="odd">
                <template v-for="(cell, i) in tableHeader" :key="i">
                  <td :class="{ 'text-start': tableHeader.length - 1 === i }">
                    <slot :name="`cell-${cell.key}`" :row="item">
                      {{ item[prop] }}
                    </slot>
                  </td>
                </template>
                <!--end::Item=-->
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

        <!--end::Table body-->
      </table>
      <div v-if="loading" class="overlay-layer card-rounded bg-dark bg-opacity-5">
        <div class="spinner-border text-primary text-center" role="status">
          <span class="visually-hidden text-center">در حال بارگیری ..</span>
        </div>
      </div>
    </div>

    <div class="row p-3">
      <div class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start">
        <div v-if="enableItemsPerPageDropdown" class="dataTables_length" id="kt_customers_table_length">
          <!-- <label
            ><select
              name="kt_customers_table_length"
              class="form-select form-select-sm form-select-solid"
              @change="setItemsPerPage"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select></label
          > -->

          <VueMultiselect v-model="selected" class="max-w-[10rem]" @select="setItemsPerPage" :options="PerPageOptions"
            placeholder="انتخاب کنید" deselectLabel="" selectLabel="" selectedLabel="انتخاب شده">
            <template #noResult> نتیجه ای یافت نشد </template>
          </VueMultiselect>
        </div>
      </div>
      <div class="w-full flex items-center justify-center md:justify-start">
        <hx-pagination v-model:current-page="pagination.page" @current-change="currentPageChange"
          :page-size="pagination.rowsPerPage" layout="prev, pager, next,total" :total="pagination.total"
          :hide-on-single-page="true" background>
        </hx-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineComponent,
  ref,
  onMounted,
  watch,
  getCurrentInstance,
} from "vue";
import arraySort from "array-sort";
import VueMultiselect from "vue-multiselect";

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

const emit = defineEmits(["www", "sort", "items-per-page-change"]);
const props = defineProps({
  tableHeader: {
    type: Array as () => Array<IHeaderConfiguration>,
    required: true,
  },
  tableData: { type: Array, required: true },
  emptyTableText: { type: String, default: "داده ای یافت نشد" },
  loading: { type: Boolean, default: false },
  currentPage: { type: Number, default: 1 },
  enableItemsPerPageDropdown: { type: Boolean, default: true },
  total: { type: Number, default: 0 },
  rowsPerPage: { type: Number, default: 10 },
  order: { type: String, default: "asc" },
  sortLabel: { type: String, default: "" },
});
const data = ref(props.tableData);
const currentSort = ref<string>("");
const order = ref(props.order);
const label = ref(props.sortLabel);
const pagination = ref<IPagination>({
  page: props.currentPage ? props.currentPage : 2,
  total: props.total,
  rowsPerPage: props.rowsPerPage ? props.rowsPerPage : 15,
});

const PerPageOptions = ref<number[]>([10, 25, 50, 100]);
const selected = ref<number | null>(null);

const vnodeProps = getCurrentInstance()?.vnode.props || {};

watch(() => props.tableData, () => {
  if ("onCurrentChange" in vnodeProps) {
    currentSort.value = label.value + order.value;
  } else {
    // pagination.value.total = data.value.length;
    pagination.value.total = props.total ? props.total : props.tableData.length;
  }
});

onMounted(() => {
  currentSort.value = label.value + order.value;
  pagination.value.total = props.total ? props.total : props.tableData.length;
  pagination.value.rowsPerPage = props.rowsPerPage ? props.rowsPerPage : 15;
  pagination.value.page = props.currentPage ? props.currentPage : 2;
});

// const getItems = computed(() => {
//   if ("onCurrentChange" in vnodeProps) {
//     return data.value;
//   } else {
//     const clone = JSON.parse(JSON.stringify(data.value));
//     console.log("clone", data.value);

//     const startFrom =
//       pagination.value.page * pagination.value.rowsPerPage -
//       pagination.value.rowsPerPage;
//     return clone.splice(startFrom, pagination.value.rowsPerPage);
//   }
// });

const getItems = computed({
  get: () => {
    if (pagination.value.page == 1) {
      const clone = JSON.parse(JSON.stringify(props.tableData));
      const startFrom =
        pagination.value.page * pagination.value.rowsPerPage -
        pagination.value.rowsPerPage;
      return clone.splice(startFrom, pagination.value.rowsPerPage);
    } else {
      return props.tableData
    }
  },
  set: (val) => {
    console.log("here");

    const clone = JSON.parse(JSON.stringify(val));
    // return props.tableData
    // const startFrom =
    //   pagination.value.page * pagination.value.rowsPerPage -
    //   pagination.value.rowsPerPage;
    // return clone.splice(startFrom, pagination.value.rowsPerPage);
  }
  // data.value = val
})

const currentPageChange = (val: any) => {

  console.log("val", val);
  pagination.value.page = val;
  emit("www", val);
  // if ("onCurrentChange" in vnodeProps) {

  // } else {
  //   pagination.value.page = val;
  // }
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
      arraySort(props.tableData, columnName, { reverse: false });
    } else {
      order.value = "asc";
      arraySort(props.tableData, columnName, { reverse: true });
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
</script>

<style lang="scss">
table.dataTable {
  clear: both;
  margin-top: 6px !important;
  margin-bottom: 6px !important;
  max-width: none !important;
  border-collapse: separate !important;
  border-spacing: 0;
}

table.dataTable>thead {
  th.sorting {
    position: relative;
  }

  .sorting:after {
    position: absolute;
  }
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border-radius: 0.475rem;
  font-weight: 500;
  font-size: 1.075rem;
  font-family: Poppins, Helvetica, sans-serif;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #009ef7;
}

table.dataTable td.dataTables_empty,
table.dataTable th.dataTables_empty {
  text-align: center;
}

div.dataTables_wrapper div.dataTables_processing {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
