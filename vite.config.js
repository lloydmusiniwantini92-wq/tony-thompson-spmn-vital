// ✅ vite.config.js — Final Netlify + Local Fix
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ command }) => ({
    // ✅ Key: make all build paths relative for Netlify
    base: "./",

    plugins: [
        react(),

        // ✅ Compress only in production
        command === "build" &&
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // ✅ Optimize images only for production
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
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        chunkSizeWarningLimit: 900,
        outDir: "dist", // ensure correct output folder
    },

    server: {
        open: true,
        port: 5173,
        host: true,
        allowedHosts: [
            "purringly-unfrisking-suzie.ngrok-free.dev",
            ".ngrok-free.dev",
            "localhost",
            "127.0.0.1",
        ],
    },
}));
