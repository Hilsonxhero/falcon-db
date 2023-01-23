import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from "path";
import dotenv from 'dotenv'

export default () => {
  dotenv.config({ path: `./.env` });
  return defineConfig({
    plugins: [vue(), DefineOptions()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
      // mainFields: [
      //   'browser',
      //   'module',
      //   'main',
      //   'jsnext:main',
      //   'jsnext'
      // ]
    },
    define: {
      'process.env': process.env
    }
  })
}
