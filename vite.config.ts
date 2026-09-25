import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isLovableSandbox =
  process.env.LOVABLE_SANDBOX === "1" ||
  !!process.env.DEV_SERVER__PROJECT_PATH;

export default defineConfig({
  tanstackStart: isLovableSandbox
    ? {}
    : {
        prerender: {
          enabled: true,
          crawlLinks: true,
        },
        pages: [
          {
            path: "/",
          },
        ],
      },

  nitro: isLovableSandbox ? undefined : false,
});
