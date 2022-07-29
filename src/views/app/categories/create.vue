<template>
    <div class="grid grid-cols-9 gap-6">
        <div class="col-span-12">

            <div class="hx-card">
                <div class="hx-card__header">
                    <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
                </div>
                <div class="hx-card__body">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-4">
                            <hx-form-group>
                                <hx-input v-model="form.title" placeholder="عنوان"></hx-input>
                            </hx-form-group>

                        </div>

                        <div class="col-span-4">
                            <hx-form-group>
                                <hx-input v-model="form.title_en" placeholder="عنوان انگلیسی"></hx-input>
                            </hx-form-group>

                        </div>

                        <div class="col-span-4">

                            <hx-form-group>
                                <VueMultiselect v-model="form.parent" class="" label="title" :options="categories"
                                    placeholder="انتخاب کنید" deselectLabel="" selectLabel="" selectedLabel="انتخاب شده"
                                    value-field="id" track-by="id">
                                    <template #noResult> نتیجه ای یافت نشد </template>
                                </VueMultiselect>
                            </hx-form-group>
                        </div>


                        <div class="col-span-12">
                            <hx-form-group>
                                <hx-textarea v-model="form.description" placeholder="توضیحات"></hx-textarea>
                            </hx-form-group>
                        </div>

                        <div class="col-span-3">
                            <hx-form-group>
                                <hx-switch :label="form.status ? 'فعال' : 'غیرفعال'" name="staus" v-model="form.status">
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
                <div class="hx-card__body ">
                    <hx-upload :max="1" v-model="form.image"></hx-upload>
                </div>

            </div>

        </div>
    </div>
    <div class="w-full flex items-center justify-between my-4">

        <div class="flex items-center space-x-3 space-x-reverse">
            <hx-button @click="handleCreate">
                ذخیره
            </hx-button>
            <hx-button variant="light" :to="{ name: 'categories index' }">
                لغو
            </hx-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueMultiselect from "vue-multiselect";
import ApiService from '@/core/services/ApiService'
import { useRouter } from 'vue-router';
import { HxNotification } from '@/components/base/notification'


const categories = ref<any>([])

const router = useRouter()

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
        const { data } = await ApiService.get('categories')
        console.log("data", data.data);
        categories.value = data.data
    } catch (e) {

    }
}

const handleCreate = async () => {

    let formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('title_en', form.value.title_en)
    formData.append('description', form.value.description)
    formData.append('parent', form.value.parent?.id ?? "")
    formData.append('status', form.value.status)
    formData.append('image', form.value.image)

    try {
        const { data } = await ApiService.post('categories', formData)
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

fetchData()

</script>

<style scoped>
</style>