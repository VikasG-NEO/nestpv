
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => ({
    server: {
        host: "::",
        port: 8080,
    },
    plugins: [
        react(),
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        target: 'es2015',
        outDir: 'dist',
    }
}));
