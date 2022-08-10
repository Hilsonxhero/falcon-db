<template>
    <section class="mb-12">
        <div class="hx-card">
            <div class="hx-card__body">
                <div class="flex items-center justify-between">
                    <div>

                        <div class="flex items-center">
                            <!-- <span v-for="(item,index) in selectedGroups"></span> -->
                        </div>
                    </div>
                    <div class="flex items-center">
                        <hx-button variant="secondary" @click="createVariant" class="ml-2">
                            ایجاد تنوع
                        </hx-button>

                        <hx-button @click="show = !show">
                            انتخاب تنوع
                        </hx-button>

                        <hx-modal :show="show" title="انتخاب تنوع" @close="handleCloseModal">
                            <hx-collapse accordion>

                                <hx-collapse-item v-for="(group, index) in groups">

                                    <template #title>
                                        {{ group.name }}
                                    </template>
                                    <hx-checkbox-group v-model="selectedGroups">
                                        <hx-checkbox v-for="(value, index) in group.values"
                                            :value="{ id: value.id, label: value.name, value: value.value, type: group.type, }"
                                            :key="index" :label="value.name">
                                        </hx-checkbox>
                                    </hx-checkbox-group>


                                </hx-collapse-item>
                            </hx-collapse>
                        </hx-modal>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <HxTable :table-data="variants" :table-header="tableHeader">
            <template v-slot:cell-checkbox="{ row: product }">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                    <input class="form-check-input" type="checkbox" :value="product.id" />
                </div>
            </template>
            <template v-slot:cell-variants="{ row: product }">
                <div class="flex items-center">
                    <span class="ml-2" v-for="(variant, index) in product.variants">{{ variant.label }}</span>
                </div>

            </template>
            <template v-slot:cell-price="{ row: product }">
                <hx-input type="number" class="max-w-[12rem]" v-model="product.price"></hx-input>
            </template>

            <template v-slot:cell-stock="{ row: product }">
                <hx-input type="number" class="max-w-[5rem]" v-model="product.stock"></hx-input>
            </template>
            <template v-slot:cell-actions="{ row: product, index: index }">
                <hx-button variant="gray" size="sm" icon :to="{ name: 'products edit', params: { id: product.id } }">
                    <hx-icon icon="edit-alt"></hx-icon>
                </hx-button>
                <hx-button variant="gray" size="sm" icon @click="handleDelete(product)">
                    <hx-icon icon="trash"></hx-icon>
                </hx-button>
            </template>
        </HxTable>
    </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import HxTable from '@/components/common/widgets/table/Table.vue'
import ApiService from "@/core/services/ApiService";

const tableHeader = ref([
    {
        key: "checkbox",

    },
    {
        name: "ترکیب ها",
        key: "variants",
    },
    {
        name: "  قیمت",
        key: "price",
    },
    {
        name: "تعداد",
        key: "stock",

    },
    {
        name: "عملیات",
        key: "actions",
    },
]);

const emit = defineEmits(["update:modelValue"]);

const variants = ref<Array<any>>([])
const groups = ref<Array<any>>([])
const selectedGroups = ref<Array<any>>([])
const show = ref(false)

const handleCloseModal = () => {
    show.value = !show.value;
}

const handleDelete = (item: unknown) => {

}

const handleGenerateVariants = (arr: any) => {
    let resoult = [];
    let tmpArr = [];
    for (var i = 0; i < arr.length; i++) {
        console.log("here");
        for (var j = i + 1; j <= arr.length; j++) {
            if (arr[i] != undefined) tmpArr.unshift(arr[i]);
            if (arr[j] != undefined) tmpArr.unshift(arr[j]);
            if ((tmpArr.length > 1 && arr.length >= 2) || (tmpArr.length == 1 && arr.length == 1)) {
                resoult.push(tmpArr)
            }
            tmpArr = [];
        }
    }
    return resoult
}

const handleVariantSubsetDup = (arr) => {
    let rrr = []
    arr.map((item, index) => {
        console.log("item", item);

        let len = item.length
        let result = item.filter((b, i, { [i - 1]: a }) => a?.type !== b.type);
        if (result.length < len) return false

        rrr.push(result)
    })
    return rrr
}


watch(() => variants.value,
    (val, oldVal) => {
        emit("update:modelValue", val)
    }, { deep: true })



const createVariant = () => {
    let combinations = handleGenerateVariants(selectedGroups.value)
    let unq_combinations = handleVariantSubsetDup(combinations)
    variants.value = []
    unq_combinations.map((item, index) => {
        variants.value.push({
            variants: [...item],
            stock: 0,
            price: 0,
            discount: 0,
            discount_price: 0,
            weight: 0,
            order_limit: 0,
        })
    })

}

ApiService.get('variant/groups/list/active').then(({ data }) => {
    groups.value = data.data
})

</script>

<style lang="scss" scoped>
</style>