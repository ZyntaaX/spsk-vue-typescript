// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/rasmu/Documents/Programming_Projects/VueJS/spsk-vue-typescript/node_modules/.pnpm/vite@5.1.1_@types+node@20.11.17_sass@1.70.0/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/rasmu/Documents/Programming_Projects/VueJS/spsk-vue-typescript/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.1_vue@3.4.18/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/rasmu/Documents/Programming_Projects/VueJS/spsk-vue-typescript/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.1.1_vue@3.4.18/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/rasmu/Documents/Programming_Projects/VueJS/spsk-vue-typescript/client/vite.config.ts";
var vite_config_default = (
  /**return */
  defineConfig({
    plugins: [
      vue(),
      vueJsx()
    ],
    server: {
      host: true,
      port: parseInt(process.env.VITE_CLIENT_PORT ?? "9000")
    },
    envDir: "../",
    // Points to root .env in monorepo
    envPrefix: "VITE_",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxyYXNtdVxcXFxEb2N1bWVudHNcXFxcUHJvZ3JhbW1pbmdfUHJvamVjdHNcXFxcVnVlSlNcXFxcc3Bzay12dWUtdHlwZXNjcmlwdFxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHJhc211XFxcXERvY3VtZW50c1xcXFxQcm9ncmFtbWluZ19Qcm9qZWN0c1xcXFxWdWVKU1xcXFxzcHNrLXZ1ZS10eXBlc2NyaXB0XFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcmFzbXUvRG9jdW1lbnRzL1Byb2dyYW1taW5nX1Byb2plY3RzL1Z1ZUpTL3Nwc2stdnVlLXR5cGVzY3JpcHQvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbi8vIC8qKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cbi8vIGV4cG9ydCBkZWZhdWx0IChtb2RlOiBhbnkgKSA9PiB7XG4gIC8vIHByb2Nlc3MuZW52ID0gey4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsICcuLi8nKX07IC8vIFBvaW50cyB0byByb290IC5lbnYgaW4gbW9ub3JlcG9cbiAgZXhwb3J0IGRlZmF1bHQgLyoqcmV0dXJuICovIGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiBwYXJzZUludChwcm9jZXNzLmVudi5WSVRFX0NMSUVOVF9QT1JUID8/ICc5MDAwJyksXG4gIH0sXG4gIGVudkRpcjogJy4uLycsIC8vIFBvaW50cyB0byByb290IC5lbnYgaW4gbW9ub3JlcG9cbiAgZW52UHJlZml4OiAnVklURV8nLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuXG4vLyB9Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE0YSxTQUFTLGVBQWUsV0FBVztBQUUvYyxTQUFTLG9CQUE2QjtBQUN0QyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBSmdRLElBQU0sMkNBQTJDO0FBVWxVLElBQU87QUFBQTtBQUFBLEVBQXFCLGFBQWE7QUFBQSxJQUN6QyxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxTQUFTLFFBQVEsSUFBSSxvQkFBb0IsTUFBTTtBQUFBLElBQ3ZEO0FBQUEsSUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
