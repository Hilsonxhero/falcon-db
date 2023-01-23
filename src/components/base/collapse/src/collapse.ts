import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "@/core/constants";

import { definePropType, isNumber, isString, mutable } from "@/core/utils";

import type { Arrayable } from "@/core/utils";

export type CollapseModelValue = Arrayable<CollapseActiveName>;

export const emitChangeFn = (value: CollapseModelValue) =>
    typeof isNumber(value) || isString(value) || Array.isArray(value)


export const collapseEmits = {
    [UPDATE_MODEL_EVENT]: emitChangeFn,
    [CHANGE_EVENT]: emitChangeFn,
}

export type CollapseActiveName = string | number