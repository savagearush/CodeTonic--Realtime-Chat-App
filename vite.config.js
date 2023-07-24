import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "CodeTonic-Chat",
        short_name: "CodeTonic-Chat",
        description: "Chat with your Friends Easily",
        theme_color: "whitesmoke",
      },
    }),
  ],
});
