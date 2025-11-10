// ✅ vite.config.js — Optimized for GitHub Pages (gh-pages or main branch)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    // 👇 Always use your repo name as the base for GitHub Pages
    base: "/tony-thompson-spmn-vital/",

    plugins: [
        react(),

        // ✅ Compression for production builds
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // ✅ Image optimization (keeps assets lightweight)
        ViteImageOptimizer({
            jpg: { quality: 78 },
            png: { quality: 78 },
            webp: { quality: 70 },
            avif: { quality: 65 },
        }),
    ],

    build: {
        target: "esnext",
        minify: "terser",
        terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
        },
        chunkSizeWarningLimit: 900,
        outDir: "dist",
        assetsInlineLimit: 4096, // inline small assets for faster load
    },

    server: {
        open: true,
        port: 5173,
        host: true,
        allowedHosts: ["localhost", "127.0.0.1", ".ngrok-free.dev"],
    },
});
