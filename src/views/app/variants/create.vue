<template>
    <section class="mb-6">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 lg:col-span-6 xl:col-span-4">
                <Form @submit="handleCreate" class="w-full" ref="formRef">
                    <div class="hx-card">
                        <div class="hx-card__header">
                            <h4 class="text-gray-600 text-xl">ایجاد تنوع </h4>
                        </div>
                        <div class="hx-card__body">

                            <hx-form-group>
                                <Field mode="passive" name="name" v-slot="{ field }" rules="required" label="عنوان">
                                    <hx-input v-bind="field" v-model="form.name" placeholder="عنوان"></hx-input>
                                </Field>

                                <div class="invalid-feedback d-block">
                                    <ErrorMessage name="title" />
                                </div>

                            </hx-form-group>

                            <hx-form-group>
                                <hx-select nmae="categories" value-key="key" v-model="form.type" filterable
                                    :options="types" placeholder="انتخاب  نوع" />
                            </hx-form-group>

                        </div>
                    </div>

                    <div class="w-full flex items-center justify-start my-4">
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
import { ref } from "vue";
import { HxNotification } from '@/components/base/notification'
import ApiService from '@/core/services/ApiService'
import { useRoute, useRouter } from "vue-router";
import { ErrorMessage, Field, Form } from "vee-validate";
const router = useRouter()
const route = useRoute()
const formRef = ref<any>(null)
const form = ref({
    type: null,
    name: '',

})

const types = ref([
    'checkbox',
    'color',
    'select',
    'size'
])

const handleCreate = async (values, { resetForm }) => {


    let formData = {
        name: form.value.name,
        type: form.value.type,
    }

    try {
        const { data } = await ApiService.post(`variant/groups`, formData)
        resetForm();
        HxNotification.success({
            title: 'success',
            message: 'عملیات موفقیت آمیز',
            showClose: true,
            duration: 4000,
            position: 'bottom-right',
        })
        router.push({ name: 'variants index' })
    } catch (e) {

    }
}



</script>
<style>
</style>
