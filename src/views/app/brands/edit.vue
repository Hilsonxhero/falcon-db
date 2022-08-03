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

                            <div class="col-span-12 sm:col-span-6 lg:col-span-6">
                                <hx-form-group>
                                    <Field name="title" rules="required" v-slot="{ field }" label="عنوان">
                                        <hx-input v-bind="field" v-model="form.title" placeholder="عنوان"></hx-input>
                                    </Field>

                                    <div class="invalid-feedback d-block">
                                        <ErrorMessage name="title" />
                                    </div>

                                </hx-form-group>
                            </div>

                            <div class="col-span-12 sm:col-span-6 lg:col-span-6">
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

                            <div class="col-span-12 sm:col-span-6 lg:col-span-6">

                                <hx-form-group>
                                    <VueMultiselect v-model="form.category" class="" label="title" :options="categories"
                                        placeholder="انتخاب کنید" deselectLabel="" selectLabel=""
                                        selectedLabel="انتخاب شده" value-field="id" track-by="id">
                                        <template #noResult> نتیجه ای یافت نشد </template>
                                    </VueMultiselect>
                                </hx-form-group>
                            </div>

                            <div class="col-span-12 sm:col-span-6 lg:col-span-6">

                                <hx-form-group>
                                    <VueMultiselect v-model="selectedStatus" class="" label="title" :options="statuses"
                                        placeholder="انتخاب کنید" deselectLabel="" selectLabel=""
                                        selectedLabel="انتخاب شده" value-field="key" track-by="key">
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

                            <!-- <div class="col-span-3">
                                <hx-form-group>
                                    <hx-switch :label="form.status ? 'فعال' : 'غیرفعال'" name="status"
                                        v-model="form.status">
                                    </hx-switch>
                                </hx-form-group>
                            </div> -->

                            <!-- <div class="col-span-3">
                                <hx-form-group>
                                    <hx-switch :label="form.special ? 'ویژه' : 'عادی'" name="special"
                                        v-model="form.special" :value="form.special">
                                    </hx-switch>
                                </hx-form-group>
                            </div> -->

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
                        <hx-upload :max="1" v-model="form.logo" :src="form.media.main"></hx-upload>
                    </div>

                </div>

            </div>

            <div class="col-span-12">
                <div class="w-full flex items-center justify-between my-4">

                    <div class="flex items-center space-x-3 space-x-reverse">
                        <hx-button type="submit">
                            ذخیره
                        </hx-button>
                        <hx-button variant="light" :to="{ name: 'brands index' }">
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

const statuses = ref([
    { title: "فعال", key: "enable" },
    { title: "غیرفعال", key: "disable" },
    { title: "درحال انتظار", key: "pending" },
    { title: "رد شده", key: "rejected" }
])

const selectedStatus = ref(null)

const formRef = ref<any>(null)

const router = useRouter()
const route = useRoute()

const form = ref({
    title: '',
    title_en: '',
    category: null,
    description: '',
    status: false,
    special: false,
    logo: []
})



const fetchData = async () => {
    try {
        const { data } = await ApiService.get(`categories`)
        categories.value = data.data

    } catch (e) {

    }
}


const fetchItem = async () => {
    try {
        const { data } = await ApiService.get(`brands/${id.value}`)
        form.value = data.data

        selectedStatus.value = statuses.value.find(item => item.key == form.value.status)

        formRef.value.setValues({
            ...data.data
        })


    } catch (e) {

    }
}

const handleUpdate = async (values, { resetForm }) => {
    const formData = {
        title: form.value.title,
        title_en: form.value.title_en,
        description: form.value.description,
        category_id: form.value.category?.id,
        status: selectedStatus.value.key,
        is_special: form.value.special ? 1 : 0,
        logo: form.value.logo,
    }

    try {
        const { data } = await ApiService.put(`brands/${id.value}`, formData)
        HxNotification.success({
            title: 'success',
            message: 'عملیات موفقیت آمیز',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
        })
        router.push({ name: 'brands index' })
    } catch (e) {

    }
}


onMounted(() => {
    id.value = route.params.id
    fetchData()
    fetchItem()
})

</script>

<style scoped>
</style>