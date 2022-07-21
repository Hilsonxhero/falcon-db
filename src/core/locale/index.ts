export { default as en } from './lang/en'
export { default as fa } from './lang/fa'

export type TranslatePair = {
    [key: string]: string | string[] | TranslatePair
}

export type Language = {
    name: string
    el: TranslatePair
}