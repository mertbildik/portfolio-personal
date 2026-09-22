import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    // Tailwind 4 runs as a Vite plugin. There is no tailwind.config.js and no
    // postcss.config.js: the whole theme lives in src/index.css.
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        host: '0.0.0.0',
        // Polling watcher: required for file changes to be seen from WSL.
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
});
