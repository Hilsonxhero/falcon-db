<template>
    <div class="w-full">

        <Form @submit="handleUpdate" class="grid grid-cols-12 gap-6" ref="formRef">

            <div class="col-span-12">

                <div class="hx-card">
                    <div class="hx-card__header">
                        <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
                    </div>
                    <div class="hx-card__body">


                        <div class="grid grid-cols-12 gap-4">

                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                                <hx-form-group>
                                    <Field name="title" rules="required" v-slot="{ field }" label="عنوان">
                                        <hx-input v-bind="field" v-model="form.title" placeholder="عنوان"></hx-input>
                                    </Field>

                                    <div class="invalid-feedback d-block">
                                        <ErrorMessage name="title" />
                                    </div>

                                </hx-form-group>
                            </div>

                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">
                                <hx-form-group>
                                    <Field name="title_en" rules="required" v-slot="{ field }" label="عنوان انگلیسی">
                                        <hx-input v-bind="field" v-model="form.title_en" placeholder="عنوان انگلیسی">
                                        </hx-input>
                                    </Field>
                                    <div class="invalid-feedback d-block">
                                        <ErrorMessage name="title_en" />
                                    </div>
                                </hx-form-group>

                            </div>

                            <div class="col-span-12 sm:col-span-6 lg:col-span-4">

                                <hx-form-group>
                                    <VueMultiselect v-model="form.parent" class="" label="title" :options="categories"
                                        placeholder="انتخاب کنید" deselectLabel="" selectLabel=""
                                        selectedLabel="انتخاب شده" value-field="id" track-by="id">
                                        <template #noResult> نتیجه ای یافت نشد </template>
                                    </VueMultiselect>
                                </hx-form-group>
                            </div>


                            <div class="col-span-12">
                                <hx-form-group>
                                    <Field name="description" rules="required" v-slot="{ field }" label="توضیحات">
                                        <hx-textarea v-bind="field" v-model="form.description" placeholder="توضیحات">
                                        </hx-textarea>

                                    </Field>
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
                        <h4 class="text-gray-600 text-xl">تصویر</h4>
                    </div>
                    <div class="hx-card__body" v-if="form.media">
                        <hx-upload :max="1" v-model="form.image" :src="form.media.main"></hx-upload>
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

        </Form>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VueMultiselect from "vue-multiselect";
import ApiService from '@/core/services/ApiService'
import { useRoute, useRouter } from 'vue-router';
import { HxNotification } from '@/components/base/notification'
import { ErrorMessage, Field, Form } from "vee-validate";


const categories = ref<any>([])
const id = ref<any>(null)

const formRef = ref(null)

const router = useRouter()
const route = useRoute()

const form = ref({
    title: '',
    title_en: '',
    parent: null,
    description: '',
    status: true,
    image: []
})



const fetchData = async () => {
    try {
        const { data } = await ApiService.get(`categories`)
        categories.value = data.data

    } catch (e) {

    }
}


const fetchCategory = async () => {
    try {
        const { data } = await ApiService.get(`categories/${id.value}`)
        form.value = data.data
        // formRef.value.setFieldValue('title', form.value.title)
        formRef.value.setValues({
            ...data.data
        })


    } catch (e) {

    }
}

const handleUpdate = async (values, { resetForm }) => {

    // let formData = new FormData()
    // formData.append('title', form.value.title)
    // formData.append('title_en', form.value.title_en)
    // formData.append('description', form.value.description)
    // formData.append('parent', form.value.parent?.id ?? "")
    // formData.append('status', form.value.status)
    // formData.append('image', form.value.image)

    const formData = {
        title: form.value.title,
        title_en: form.value.title_en,
        description: form.value.description,
        parent: form.value.parent?.id,
        status: form.value.status,
        image: form.value.image,
    }

    try {
        const { data } = await ApiService.put(`categories/${id.value}`, formData)
        HxNotification.success({
            title: 'success',
            message: 'عملیات موفقیت آمیز',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
        })
        router.push({ name: 'categories index' })
    } catch (e) {

    }
}




onMounted(() => {
    id.value = route.params.id
    fetchData()
    fetchCategory()
})

</script>

<style scoped>
</style>