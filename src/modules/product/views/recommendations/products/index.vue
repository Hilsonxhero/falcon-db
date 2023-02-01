<template>
    <section class="mb-6">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-8">
                <HxDataTable @refresh="refresh = false" :refresh="refresh" :url="`recommendations/${id}/products`"
                    :single-item-index="index" search-placeholder="جستجوی  عنوان و.." :table-header="tableHeader"
                    :enable-items-per-page-dropdown="false" :on-current-change="true">
                    <template v-slot:cell-checkbox="{ row: recommendation }">
                        <div class="form-check form-check-sm form-check-custom form-check-solid">
                            <input class="form-check-input" type="checkbox" :value="recommendation.id"
                                v-model="checkedData" />
                        </div>
                    </template>

                    <template v-slot:cell-recommendation="{ row: recommendation }">
                        <span class="">{{ recommendation?.recommendation }}</span>
                    </template>

                    <template v-slot:cell-product="{ row: recommendation }">
                        <span class="">{{ recommendation?.product?.title_fa }}</span>
                    </template>

                    <template v-slot:cell-actions="{ row: recommendation, index: index }">


                        <hx-button variant="gray" size="sm" icon @click="handleDelete(recommendation, index)">
                            <hx-icon icon="trash"></hx-icon>
                        </hx-button>
                    </template>
                </HxDataTable>
            </div>
            <div class="col-span-12 lg:col-span-4">
                <Form @submit="handleCreate" class="w-full">
                    <div class="hx-card">
                        <div class="hx-card__header">
                            <h4 class="text-gray-600 text-xl">ایجاد دسته بندی پیشنهادی</h4>
                        </div>
                        <div class="hx-card__body">
                            <hx-form-group label="دسته بندی">
                                <Field name="recommendation" rules="required" v-slot="{ field }" label="دسته بندی">
                                    <hx-select v-bind="field" value-key="id" label="title" v-model="form.recommendation"
                                        filterable :options="recommendations" placeholder="انتخاب  دسته بندی" />
                                </Field>

                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="recommendation" />
                                </div>
                            </hx-form-group>

                            <hx-form-group label=" محصول">
                                <Field name="product" rules="required" v-slot="{ field }" label=" محصول">
                                    <hx-select remote :remote-method="handleSearch" v-bind="field" value-key="id"
                                        label="title_fa" v-model="form.product" filterable :options="products"
                                        placeholder="انتخاب   محصول" />
                                </Field>

                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="product" />
                                </div>
                            </hx-form-group>

                        </div>
                    </div>

                    <div class="w-full flex items-center justify-end my-4">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <hx-button type="submit" :loading="loader"> ذخیره</hx-button>
                            <hx-button variant="light" :to="{ name: 'recommendations index' }">
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
// @ts-nocheck
import { provide, ref, onMounted, watch } from "vue";
import HxDataTable from "@/components/common/datatable/DataTable.vue";
import { HxMessageBox } from "@/components/base/message-box";
import { HxNotification } from "@/components/base/notification";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
import { join } from "lodash-unified";

const route = useRoute();
const checkedData = ref([]);

const form = ref({
    product: null,
    recommendation: null,
});
const id = ref<any>(null);
const loader = ref(false);
const index = ref(null);
const refresh = ref(false);
const recommendations = ref<Array<any>>([]);
const products = ref<Array<any>>([]);
id.value = route.params.id;

const tableHeader = ref([
    {
        key: "checkbox",
        sortable: false,
    },
    {
        name: " دسته بندی",
        key: "recommendation",
        sortable: false,
    },
    {
        name: "محصول",
        key: "product",
        sortable: false,
    },
    {
        name: "عملیات",
        key: "actions",
    },
]);



const handleCreate = async (values, { resetForm }) => {
    let formData = {
        recommendation_id: form.value.recommendation,
        product_id: form.value.product,
    };
    loader.value = true;
    ApiService.post(`recommendation/products`, formData).then(() => {
        form.value.recommendation = null;
        form.value.product = null;
        products.value = [];

        resetForm();
        refresh.value = true;
        loader.value = false;
        HxNotification.success({
            title: "success",
            message: "عملیات موفقیت آمیز",
            showClose: true,
            duration: 4000,
            position: "bottom-right",
        });
    });
};

const handleDelete = (item: any, i: any) => {
    HxMessageBox.confirm(
        `آیا از حذف محصول ${item.product?.title_fa} اطمینان دارید ؟!`,
        "پیام تایید",
        {
            confirmButtonText: "تایید",
            cancelButtonText: "لغو",
            type: "warning",
        }
    )
        .then(() => {
            ApiService.delete(`recommendation/products/${item.id}`).then(() => {
                index.value = item.id;
                HxNotification.success({
                    title: "عملیات موفقیت آمیز",
                    message: "ویژگی موردنظر حذف شد",
                    showClose: true,
                    duration: 4000,
                    position: "bottom-right",
                });
            });
        })
        .catch(() => { });
};


const fetchProducts = (query = "") => {
    ApiService.query(`product/select`, {
        params: { q: query },
    }).then(({ data }) => {
        products.value = data?.data;
    });
}

const handleSearch = (query) => {
    fetchProducts(query)
        ;
};

onMounted(() => {
    ApiService.query(`recommendations/select/active`, {
    }).then(({ data }) => {
        recommendations.value = data?.data;
    });

    fetchProducts()
    // ApiService.query(`product/select`, {
    // }).then(({ data }) => {
    //     products.value = data?.data;
    // });
});
</script>
<style>

</style>
