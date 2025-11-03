// ✅ vite.config.js — Universal Portable Build (GitHub Pages + Other Hosts)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ command }) => ({
    // ✅ Relative path for universal hosting
    base: "./",

    plugins: [
        react(),

        // ✅ Compression for production builds
        command === "build" &&
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // ✅ Image optimization
        command === "build" &&
        ViteImageOptimizer({
            jpg: { quality: 78 },
            png: { quality: 78 },
            webp: { quality: 70 },
            avif: { quality: 65 },
        }),
    ].filter(Boolean),

    build: {
        target: "esnext",
        minify: "terser",
        terserOptions: {
            compress: { drop_console: true, drop_debugger: true },
        },
        chunkSizeWarningLimit: 900,
        outDir: "dist",
        assetsInlineLimit: 4096, // ✅ inline small assets for faster FCP
    },

    server: {
        open: true,
        port: 5173,
        host: true,
        allowedHosts: [
            "localhost",
            "127.0.0.1",
            ".ngrok-free.dev",
        ],
    },
}));
