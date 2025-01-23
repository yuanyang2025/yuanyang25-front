import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://back-sbojkjgphc.cn-beijing.fcapp.run", //连接线上后端调试
        // target: 'http://127.0.0.1:9000', //连接本地后端调试, 此时请注释src/utils/network.ts中对应行
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
