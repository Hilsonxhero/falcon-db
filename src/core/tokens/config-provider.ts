// // import type { ConfigProviderProps } from '@element-plus/components/config-provider'

// import { definePropType } from "@/core/utils";
// import type { ExperimentalFeatures } from '@/core/tokens'

// const configProviderProps = defineProps({
//     a11y: {
//         type: Boolean,
//         default: true,
//     },


//     experimentalFeatures: {
//         type: definePropType<ExperimentalFeatures>(Object),
//     },

//     // Controls if we should handle keyboard navigation
//     keyboardNavigation: {
//         type: Boolean,
//         default: true,
//     },

//     zIndex: Number,

//     namespace: {
//         type: String,
//         default: 'el',
//     },
// })

// import type { ExtractPropTypes } from 'vue'
// export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
// import type { InjectionKey, Ref } from 'vue'

// export type ConfigProviderContext = Partial<ConfigProviderProps>

// export const configProviderContextKey: InjectionKey<
//     Ref<ConfigProviderContext>
// > = Symbol()