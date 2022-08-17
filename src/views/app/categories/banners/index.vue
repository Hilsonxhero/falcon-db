<template>
  <section class="mb-6">
    <HxDataTable url="category/banners" :single-item-index="index" search-placeholder="جستجوی  عنوان"
                 :table-header="fields" :enable-items-per-page-dropdown="false" :on-current-change="true">
      <template #left>
        <hx-button :to="{ name: 'categories banners create' }">
          اسلاید جدید
        </hx-button>
      </template>
      <template v-slot:cell-checkbox="{ row: banner }">
        <div class="form-check form-check-sm form-check-custom form-check-solid">
          <input class="form-check-input" type="checkbox" :value="banner.id" v-model="checkedData"/>
        </div>
      </template>

      <template v-slot:cell-banner="{ row: banner }">
        <img class="rounded-md w-20 h-16 h-full object-cover" :src="banner.banner" alt="">
      </template>

      <template v-slot:cell-title="{ row: banner }">
        {{ banner?.title }}
      </template>


      <template v-slot:cell-url="{ row: banner }">
        {{ banner?.url }}
      </template>

      <template v-slot:cell-category="{ row: banner }">
        {{ banner?.category?.title }}
      </template>


      <template v-slot:cell-type="{ row: banner }">
        {{ banner?.type }}
      </template>

<!--      <template v-slot:cell-position="{ row: banner }">-->
<!--        {{ banner?.position }}-->
<!--      </template>-->

      <template v-slot:cell-status="{ row: banner }">

        <template v-if="banner?.status == 'enable'">
          <hx-button outlined variant="success" size="sm">فعال</hx-button>
        </template>
        <template v-else>
          <hx-button outlined variant="danger" size="sm">غیر فعال</hx-button>
        </template>
      </template>

      <template v-slot:cell-actions="{ row: banner, index: index }">
        <hx-button variant="gray" size="sm" icon :to="{ name: 'categories banners edit', params: { id: banner.id } }">
          <hx-icon icon="edit-alt"></hx-icon>
        </hx-button>
        <hx-button variant="gray" size="sm" icon @click="handleDelete(banner, index)">
          <hx-icon icon="trash"></hx-icon>
        </hx-button>

      </template>
    </HxDataTable>
  </section>

</template>

<script setup lang="ts">
import {ref, onMounted, watch,watchEffect} from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import {HxMessageBox} from '@/components/base/message-box'
import {HxNotification} from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
import {useRoute, useRouter} from "vue-router";

const checkedData = ref([]);

const fields = ref([
  {
    key: "checkbox",
    sortable: false,
  },
  {
    name: "تصویر",
    key: "banner",
  },
  {
    name: "عنوان",
    key: "title",
  },
  {
    name: "لینک",
    key: "url",
    sortable: false,
  },
  {
    name: "دسته بندی",
    key: "category",
    sortable: false,
  },
  {
    name: "نوع",
    key: "type",
    sortable: false,
  },
  // {
  //   name: "موقعیت",
  //   key: "position",
  //   sortable: false,
  // },
  {
    name: "وضعیت",
    key: "status",
    sortable: false,
  },
  {
    name: "عملیات",
    key: "actions",
  },
]);

const index = ref(null)

const handleDelete = (item: any, i: any) => {
  HxMessageBox.confirm(
      `آیا از حذف اسلاید ${item.title} اطمینان دارید ؟!`,
      'پیام تایید',
      {
        confirmButtonText: 'تایید',
        cancelButtonText: 'لغو',
        type: 'warning',
      }
  )
      .then(() => {

        ApiService.delete(`category/banners/${item.id}`).then(() => {
          index.value = item.id
          HxNotification.success({
            title: 'عملیات موفقیت آمیز',
            message: 'اسلاید موردنظر حذف شد',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
          })
        })


      })
      .catch(() => {

      })

}

</script>
