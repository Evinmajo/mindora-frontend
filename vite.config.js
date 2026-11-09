
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel =
  Boolean(process.env.VERCEL && process.env.VERCEL !== "0") ||
  Boolean(process.env.VERCEL_URL);

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  nitro: isVercel
    ? {
        preset: "vercel",
      }
    : undefined,
});
