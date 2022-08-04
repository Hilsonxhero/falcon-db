<template>
    <!-- v-if="variants.length" -->
    <section class="mb-6">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-8">
                <div class="hx-card p-0">
                    <div class="hx-card__header border-0">

                        <div class="hx-card__title flex items-center justify-between">

                            <div class="flex items-center position-relative my-1">
                                <hx-input v-model="search" @input="searchItems()" placeholder="جستجوی تنوع"></hx-input>
                            </div>
                        </div>


                    </div>
                    <HxDataTable @page="currentPageChnage" :total="pagination.total"
                        :rows-per-page="pagination.per_page" :currentPage="pagination.current_page" :loading="loading"
                        :table-data="tableData" :table-header="tableHeader" :enable-items-per-page-dropdown="false"
                        :on-current-change="true">
                        <template v-slot:cell-checkbox="{ row: variant }">
                            <div class="form-check form-check-sm form-check-custom form-check-solid">
                                <input class="form-check-input" type="checkbox" :value="variant.id"
                                    v-model="checkedData" />
                            </div>
                        </template>

                        <template v-slot:cell-name="{ row: variant }">
                            <span class="">{{ variant?.name }}</span>
                        </template>

                        <template v-slot:cell-value="{ row: variant }">
                            <span class="">{{ variant?.value }}</span>
                        </template>

                        <template v-slot:cell-group="{ row: variant }">
                            <span class="">{{ variant.group && variant.group.name }}</span>
                        </template>

                        <template v-slot:cell-actions="{ row: variant }">

                            <hx-button variant="gray" size="sm" icon
                                :to="{ name: 'variants value edit', params: { id: id, value: variant.id } }">
                                <hx-icon icon="edit-alt"></hx-icon>
                            </hx-button>
                            <hx-button variant="gray" size="sm" icon @click="handleDelete(variant)">
                                <hx-icon icon="trash"></hx-icon>
                            </hx-button>

                        </template>
                    </HxDataTable>
                </div>
            </div>
            <div class="col-span-12 lg:col-span-4">
                <Form @submit="handleCreate" class="w-full">
                    <div class="hx-card">
                        <div class="hx-card__header">
                            <h4 class="text-gray-600 text-xl">ایجاد مقدار جدید</h4>
                        </div>
                        <div class="hx-card__body">

                            <hx-form-group>
                                <Field mode="passive" name="name" v-slot="{ field }" rules="required" label="عنوان">
                                    <hx-input v-bind="field" v-model="form.name" placeholder="عنوان"></hx-input>
                                </Field>

                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="name" />
                                </div>

                            </hx-form-group>

                            <hx-form-group>
                                <Field mode="passive" name="value" v-slot="{ field }" rules="required" label="مقدار">
                                    <hx-input v-bind="field" v-model="form.value" placeholder="مقدار"></hx-input>
                                </Field>

                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="value" />
                                </div>

                            </hx-form-group>




                        </div>
                    </div>

                    <div class="w-full flex items-center justify-end my-4">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <hx-button type="submit">
                                ذخیره
                            </hx-button>
                            <hx-button variant="light" :to="{ name: 'variants index' }">
                                لغو
                            </hx-button>
                        </div>
                    </div>
                </Form>




            </div>
        </div>

    </section>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from '@/components/base/message-box'
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import VueMultiselect from "vue-multiselect";

const router = useRouter()

const route = useRoute()

const checkedData = ref([]);

const loading = ref(false)

const editMode = ref(false)

const pagination = ref({
    total: null,
    per_page: null,
    current_page: 1
})

const form = ref({
    name: '',
    value: '',
})

const id = ref(null)

const tableHeader = ref([
    {
        key: "checkbox",
        sortable: false,
    },

    {
        name: "عنوان",
        key: "name",
        sortable: true,
    },
    {
        name: "مقدار",
        key: "value",
        sortable: true,
    },

    {
        name: "گروه تنوع ",
        key: "group",
        sortable: false,
    },

    {
        name: "عملیات",
        key: "actions",
    },
]);

const variants = ref<any>([])

const selectedStatus = ref({ title: "فعال", key: "enable" })


const fetchData = async () => {
    try {
        loading.value = true
        const { data } = await ApiService.get(`variant/groups/${id.value}/values?page=${pagination.value.current_page}`)
        pagination.value.total = data.meta.total
        pagination.value.current_page = data.meta.current_page
        pagination.value.per_page = data.meta.per_page
        variants.value = data.data
        tableData.value = variants.value
        initData.value.splice(0, tableData.value.length, ...tableData.value);
        loading.value = false
    } catch (e) {
        loading.value = false
    }
}

// watch(() => pagination.value.current_page, (currentValue, oldValue) => {
//     router.replace({ query: { ...route.query, page: currentValue } }).then(() => {
//         fetchData()
//     });
// });

const currentPageChnage = (val: any) => {
    pagination.value.current_page = val
}

const tableData = ref<Array<any>>([]);
const initData = ref<Array<any>>([]);

const search = ref<string>("");

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
    id.value = route.params.id
    fetchData()
    // let page = route.query.page
    // pagination.value.current_page = page ? Number(page) : 1
});


const handleCreate = async (values, { resetForm }) => {


    let formData = {
        name: form.value.name,
        value: form.value.value,
        variant_group_id: id.value,
    }

    try {
        const { data } = await ApiService.post('variants', formData)
        form.value.name = null
        form.value.value = null
        resetForm();
        HxNotification.success({
            title: 'success',
            message: 'عملیات موفقیت آمیز',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
        })
        fetchData()
    } catch (e) {

    }
}


const handleDelete = (item: any) => {
    HxMessageBox.confirm(
        `آیا از حذف تنوع ${item.nmae} اطمینان دارید ؟!`,
        'پیام تایید',
        {
            confirmButtonText: 'تایید',
            cancelButtonText: 'لغو',
            type: 'warning',
        }
    )
        .then(async () => {
            try {
                const { data } = await ApiService.delete(`variants/${item.id}`)

                fetchData()

                HxNotification.success({
                    title: 'عملیات موفقیت آمیز',
                    message: 'تنوع موردنظر حذف شد',
                    showClose: true,
                    duration: 4000,
                    position: 'bottom-right',
                })
            } catch (e) {

            }
        })
        .catch(() => {

        })

}


</script>
<style>
</style>
