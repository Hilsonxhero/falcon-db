import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from "path";
import dotenv from 'dotenv'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default () => {
  dotenv.config({ path: `./.env` });
  return defineConfig({
    plugins: [vue(), vueJsx(), DefineOptions()],
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
