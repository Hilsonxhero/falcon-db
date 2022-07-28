<template>
    <div class="grid grid-cols-9 gap-6">
        <div class="col-span-7">

            <div class="hx-card">
                <div class="hx-card__header">
                    <h4 class="text-gray-600 text-xl">اطلاعات کلی</h4>
                </div>
                <div class="hx-card__body">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <hx-form-group>
                                <hx-input v-model="form.title" placeholder="عنوان"></hx-input>
                            </hx-form-group>
                            <hx-form-group>
                                <!-- <hx-input v-model="form.parent" placeholder="دسته پدر"></hx-input> -->

                                <VueMultiselect v-model="form.parent" class="" label="title" :options="categories"
                                    placeholder="انتخاب کنید" deselectLabel="" selectLabel="" selectedLabel="انتخاب شده"
                                    value-field="id" track-by="id">
                                    <template #noResult> نتیجه ای یافت نشد </template>
                                </VueMultiselect>
                            </hx-form-group>
                        </div>
                        <!-- <div class="col-span-6">

                        </div> -->

                        <div class="col-span-6">
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
        <div class="col-span-2 space-y-4">
            <div class="hx-card">
                <div class="hx-card__header">
                    <h4 class="text-gray-600 text-xl">تصویر</h4>
                </div>
                <div class="hx-card__body ">
                    <hx-upload></hx-upload>
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
    parent: '',
    description: '',
    status: true,
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
    try {
        const { data } = await ApiService.post('categories', form.value)
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