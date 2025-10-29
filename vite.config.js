// ✅ vite.config.js — Clean GitHub Pages Build (no Netlify)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig(({ command }) => ({
    // ✅ GitHub Pages base path (matches repo name)
    base: "/tony-thompson-spmn-vital/",

    plugins: [
        react(),

        // ✅ Production-only compression
        command === "build" &&
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // ✅ Image optimization for GH Pages
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
        outDir: "dist",
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
