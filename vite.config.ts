import adapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import honox from "honox/vite";
import pages from "@hono/vite-cloudflare-pages";


export default defineConfig(async () => {
  return {
    plugins: [
      honox({
        devServer: {
          entry: "./app/server.ts",
          adapter
        },
      }),
      pages(),
    ],
  };
});
