export {
  camelize,
  capitalize,
  hyphenate,
  hyphenate as kebabCase, // alias
} from "@vue/shared";

export const escapeStringRegexp = (string = "") =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
