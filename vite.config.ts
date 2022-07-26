import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import babel from 'vite-plugin-babel';
import dotenv from 'dotenv'

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": resolve(__dirname, "src"),
//     },
//   },
// });



export default () => {
  dotenv.config({ path: `./.env` });
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    define: {
      'process.env': process.env
    }
  })
}
