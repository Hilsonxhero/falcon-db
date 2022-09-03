import { buildProps, isBoolean, isNumber, isString } from "@/core/utils";
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "@/core/constants";
import { useSizeProp } from "@/core/hooks";
import type { ExtractPropTypes } from "vue";
import type Radio from "./radio.vue";

export const radioPropsBase = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: "",
  },
});

export const radioProps = buildProps({
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  border: Boolean,
} as const);

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioEmits = typeof radioEmits;
export type RadioInstance = InstanceType<typeof Radio>;
