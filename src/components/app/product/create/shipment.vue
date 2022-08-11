<template>
    <section class="grid grid-cols-12 gap-2">
        <div class="hx-card col-span-12  md:col-span-6 xl:col-span-4">
            <div class="hx-card__body">
                <div>
                    <hx-form-group label="وزن">
                        <Field mode="passive" name="weight" v-slot="{ field }" rules="required" label="وزن">
                            <hx-input v-bind="field" v-model="form.weight" placeholder="وزن">
                            </hx-input>
                        </Field>
                        <div class="invalid-feedback d-block">
                            <ErrorMessage name="weight" />
                        </div>
                    </hx-form-group>
                    <hx-form-group label="روش ارسال">
                        <Field mode="passive" name="shipment_method" v-slot="{ field }" rules="required"
                            label="روش ارسال">
                            <hx-select filterable v-bind="field" v-model="form.shipment_method"
                                placeholder="انتخاب  روش ارسال" value-key="id" label="title" :options="shipments">
                            </hx-select>
                        </Field>
                        <div class="invalid-feedback d-block">
                            <ErrorMessage name="shipment_method" />
                        </div>
                    </hx-form-group>
                    <hx-form-group label="هزینه ارسال">
                        <Field mode="passive" name="shipment_price" v-slot="{ field }" rules="required"
                            label="هزینه ارسال">
                            <hx-input v-bind="field" v-model="form.shipment_price" placeholder="هزینه ارسال">
                            </hx-input>
                        </Field>
                        <div class="invalid-feedback d-block">
                            <ErrorMessage name="shipment_price" />
                        </div>
                    </hx-form-group>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue';
import { ErrorMessage, Field, Form } from "vee-validate";
import ApiService from '@/core/services/ApiService';

const form = ref({
    weight: 0,
    shipment_price: 0,
    shipment_method: null
})

const shipments = ref<Array<any>>([])

const emit = defineEmits(["update:modelValue"]);

watch(() => form.value,
    (val, oldVal) => {
        emit("update:modelValue", val)
    }, { deep: true })

onMounted(async () => {
    const { data } = await ApiService.get('shipments')
    shipments.value = data.data
    console.log("data", data);
})

</script>

<style scoped>
</style>