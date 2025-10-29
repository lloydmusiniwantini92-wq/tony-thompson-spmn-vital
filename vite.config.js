// ✅ vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"; // ✅ fixed named import

export default defineConfig(({ command }) => ({
    // ✅ Fix for Netlify + BASE_URL + MIME issues
    base: "./",

    plugins: [
        react(),

        // ✅ Run compression only in production
        command === "build" &&
        viteCompression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
            deleteOriginFile: false,
        }),

        // ✅ Run image optimizer only in production
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
    },

    // ✅ Local + ngrok + external testing support
    server: {
        open: true, // auto-open browser on `npm run dev`
        port: 5173, // default Vite port
        host: true, // allow LAN and external access
        allowedHosts: [
            "purringly-unfrisking-suzie.ngrok-free.dev",
            ".ngrok-free.dev",
            "localhost",
            "127.0.0.1",
        ],
    },
}));
