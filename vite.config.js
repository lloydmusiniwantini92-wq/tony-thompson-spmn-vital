// 🚀 vite.config.js — Elite Performance Build for Production (cPanel or GitHub Pages)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    // 👇 Works perfectly for cPanel deployment in a subfolder
    base: "/tony-thompson-spmn-vital/",

    plugins: [
        react(),

        // ✅ Brotli & Gzip for maximum compression compatibility
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 2048,
            deleteOriginFile: false,
        }),
        viteCompression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 2048,
            deleteOriginFile: false,
        }),

        // ✅ Image optimization — optimal settings for a real-world site
        ViteImageOptimizer({
            jpg: { quality: 75 },
            jpeg: { quality: 75 },
            png: { quality: 75 },
            webp: { quality: 70 },
            avif: { quality: 60 },
            svg: { multipass: true },
        }),
    ],

    build: {
        target: "esnext",

        // 🚀 Minified, tree-shaken JS
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"],
            },
        },

        // 🚀 Ensures great code splitting
        cssCodeSplit: true,
        sourcemap: false,

        // 🚀 Inline very small assets for faster loads
        assetsInlineLimit: 4096,

        // ⚠️ Avoid warning spam for large libs (Babylon.js)
        chunkSizeWarningLimit: 1200,

        // Output directory
        outDir: "dist",

        // 🚀 Cache busting
        rollupOptions: {
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",
                assetFileNames: ({ name }) => {
                    if (/\.css$/.test(name)) return "css/[name]-[hash][extname]";
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },

    // 🚀 Dev server
    server: {
        open: true,
        port: 5173,
        host: true,
        allowedHosts: ["localhost", "127.0.0.1"],
    },
});
