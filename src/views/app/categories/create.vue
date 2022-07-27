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
                                <hx-input placeholder="عنوان"></hx-input>
                            </hx-form-group>
                            <hx-form-group>
                                <hx-input placeholder="دسته پدر"></hx-input>
                            </hx-form-group>
                        </div>
                        <!-- <div class="col-span-6">

                        </div> -->

                        <div class="col-span-6">
                            <hx-form-group>
                                <hx-textarea placeholder="توضیحات"></hx-textarea>
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
            <hx-button>
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


const form = ref({
    title: '',
    parent: '',
    description: '',
    status: true,
})

</script>

<style scoped>
</style>