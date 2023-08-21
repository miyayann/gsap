import { defineConfig } from "vite";
import { resolve } from "path";

const root = "src";

export default defineConfig({
  root,
  base: "/",
  publicDir: "../public",
  resolve: {
    alias: [
      {
        find: "#",
        replacement: "/scripts",
      },
    ],
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        // htmlを追加する場合にはこちらに追記
        index: resolve(root, "index.html"),
        access: resolve(root, "access.html"),
        guide: resolve(root, "guide.html"),
        about: resolve(root, "about.html"),
        price: resolve(root, "price.html"),
        staff: resolve(root, "staff.html"),
      },
    },
  },
  server: {
    host: true,
  },
});
