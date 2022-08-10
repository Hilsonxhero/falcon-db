<template>
    <div class="w-full">
        <section>
            <Form @submit="handleCreate">
                <hx-tabs v-model="activeName">
                    <hx-tab-pane label="تنظیمات اولیه" name="setting">
                        <div class="grid grid-cols-12 gap-6">


                            <div class="col-span-12">

                                <div class="hx-card">
                                    <div class="hx-card__header">
                                        <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
                                    </div>
                                    <div class="hx-card__body">
                                        <div class="grid grid-cols-12 gap-4">
                                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                                                <hx-form-group>
                                                    <Field mode="passive" name="title" v-slot="{ field }"
                                                        rules="required" label="عنوان">
                                                        <hx-input v-bind="field" v-model="form.title_fa"
                                                            placeholder="عنوان">
                                                        </hx-input>
                                                    </Field>

                                                    <div class="invalid-feedback d-block">
                                                        <ErrorMessage name="title" />
                                                    </div>
                                                </hx-form-group>
                                            </div>

                                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                                                <hx-form-group>
                                                    <Field name="title_en" rules="required" v-slot="{ field }"
                                                        label="عنوان انگلیسی">
                                                        <hx-input v-bind="field" v-model="form.title_en"
                                                            placeholder="عنوان انگلیسی">
                                                        </hx-input>
                                                    </Field>
                                                    <div class="invalid-feedback d-block">
                                                        <ErrorMessage name="title_en" />
                                                    </div>
                                                </hx-form-group>

                                            </div>



                                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                                                <hx-form-group>
                                                    <hx-select nmae="categories" value-key="id" label="title"
                                                        v-model="form.category" filterable :options="categories"
                                                        placeholder="انتخاب دسته بندی" />
                                                </hx-form-group>
                                            </div>


                                            <div class="col-span-12">
                                                <hx-form-group>

                                                    <KeepAlive>
                                                        <TiptapEditor v-model="content" :content="content" ref="tiptap">
                                                        </TiptapEditor>
                                                    </KeepAlive>



                                                    <div class="invalid-feedback d-block">
                                                        <ErrorMessage name="description" />
                                                    </div>

                                                </hx-form-group>
                                            </div>

                                            <div class="col-span-3">
                                                <hx-form-group>
                                                    <hx-switch :label="form.status ? 'فعال' : 'غیرفعال'" name="staus"
                                                        v-model="form.status">
                                                    </hx-switch>
                                                </hx-form-group>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 space-y-4">
                                <div class="hx-card">
                                    <div class="hx-card__header">
                                        <h4 class="text-gray-600 text-xl">ویژگی های محصول</h4>
                                    </div>
                                    <div class="hx-card__body ">
                                        <div class="flex flex-col space-y-2"
                                            v-for="(feature, index) in selectedFeatures" :key="index">
                                            <div class="w-full flex items-center">
                                                <div class="w-3/12 ml-2">
                                                    <hx-form-group label="ویژگی">
                                                        <hx-select @change="handleSelectFeature" nmae="categories"
                                                            value-key="id" label="title" v-model="feature.feature"
                                                            filterable :options="features"
                                                            placeholder="انتخاب  ویژگی" />

                                                    </hx-form-group>
                                                </div>

                                                <div class="w-3/12 ml-2" v-for="(value, index) in feature.values"
                                                    :index="index">
                                                    <hx-form-group :label="`مقدار ویژگی `">
                                                        <hx-select nmae="categories" value-key="id" label="title"
                                                            v-model="feature.values[index]" filterable
                                                            :options="feature.defaults"
                                                            placeholder="انتخاب  مقدار ویژگی" />
                                                    </hx-form-group>
                                                </div>
                                            </div>


                                            <!-- <div class="w-full flex-wrap flex items-center  ">
                                                <div class="w-3/12 ml-2" v-for="(value, index) in feature.values"
                                                    :index="index">
                                                    <hx-form-group
                                                        :label="`مقدار ویژگی (${feature.feature.title ?? 'انتخاب نشده'})`">
                                                        <hx-select nmae="categories" value-key="id" label="title"
                                                            v-model="feature.values[index]" filterable
                                                            :options="feature.defaults"
                                                            placeholder="انتخاب  مقدار ویژگی" />
                                                    </hx-form-group>
                                                </div>

                                                <div class="w-2/12 mt-5">
                                                    <hx-button @click="feature.values.push('ss')" variant="success"
                                                        icon>
                                                        <hx-icon icon="plus"></hx-icon>
                                                    </hx-button>
                                                </div>
                                            </div> -->



                                        </div>

                                        <div class="my-4">
                                            <hx-button @click="handleCreateNewFeature" variant="success" outlined
                                                size="sm">ویژگی جدید</hx-button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="col-span-12 space-y-4">
                                <div class="hx-card">
                                    <div class="hx-card__header">
                                        <h4 class="text-gray-600 text-xl">تصویر</h4>
                                    </div>
                                    <div class="hx-card__body ">
                                        <hx-upload :max="1" v-model="form.image"></hx-upload>
                                    </div>

                                </div>

                            </div>

                            <div class="col-span-12">
                                <div class="w-full flex items-center justify-between my-4">

                                    <div class="flex items-center space-x-3 space-x-reverse">
                                        <hx-button type="submit">
                                            ذخیره
                                        </hx-button>
                                        <hx-button variant="light" :to="{ name: 'categories index' }">
                                            لغو
                                        </hx-button>
                                    </div>
                                </div>

                            </div>


                        </div>




                    </hx-tab-pane>
                    <hx-tab-pane label="ترکیبات" name="variants">
                        <Variants v-model="selectedVariants" />
                    </hx-tab-pane>
                    <hx-tab-pane label="ارسال" name="shipment">ارسال</hx-tab-pane>
                    <hx-tab-pane label="سئو" name="seo">سئو</hx-tab-pane>
                </hx-tabs>
            </Form>
        </section>


    </div>

</template>

<script setup lang="ts">
//@ts-nocheck
import { onMounted, ref, watch, reactive } from 'vue';

import ApiService from '@/core/services/ApiService'
import { useRouter } from 'vue-router';
import { HxNotification } from '@/components/base/notification'
import { ErrorMessage, Field, Form } from "vee-validate";
import TiptapEditor from "@/components/common/tiptap/tiptap-editor.vue"
import Variants from '@/components/app/product/create/variants.vue';

const activeName = ref('variants')

const categories = ref<any>([])

const selectedVariants = ref([])

const content = ref("");

const router = useRouter()

const form = ref({
    title_fa: '',
    title_en: '',
    category: null,
    review: '',
    status: 'enable',
    image: [],
})


const selectedFeatures = ref([])

const features = ref([])

const handleSelectFeature = (val) => {
    let item = selectedFeatures.value.find(o => o.feature == val)
    ApiService.get(`features/${val}/values`).then(({ data }) => {
        item.defaults = null
        item.defaults = data.data
    })

}

const handleCreateNewFeature = () => {
    selectedFeatures.value.push({ feature: '', values: [''], defaults: [] })
}

const fetchData = async () => {
    try {
        const { data } = await ApiService.get('categories')
        categories.value = data.data
    } catch (e) {

    }
}

const handleCreate = async (values, { resetForm }) => {

    let formData = new FormData()
    formData.append('title_fa', form.value.title_fa)
    formData.append('title_en', form.value.title_en)
    formData.append('review', content.value)
    formData.append('category_id', form.value.category)
    formData.append('brand_id', 1)
    formData.append('status', form.value.status)
    formData.append('image', form.value.image)
    formData.append('features', JSON.stringify(selectedFeatures.value))
    formData.append('variants', JSON.stringify(selectedVariants.value))

    try {
        const { data } = await ApiService.post('products', formData)
        resetForm();
        HxNotification.success({
            title: 'success',
            message: 'عملیات موفقیت آمیز',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
        })
        router.push({ name: 'products index' })
    } catch (e) {

    }
}

fetchData()

onMounted(() => {
    ApiService.get('features').then(({ data }) => {
        features.value = data.data
    }).catch(() => {
    })
})



</script>



<style scoped>
</style>