import { defineConfig, UserConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'



// https://vite.dev/config/
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
    resolve: {
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
            "@components/*": new URL('./src/components', import.meta.url).pathname,
            "@data/*": new URL('./src/data', import.meta.url).pathname,
            "@helpers/*": new URL('./src/helpers', import.meta.url).pathname,
            "@tests/*": new URL('./__tests__', import.meta.url).pathname,
            "@customTypes/*": new URL('./src/types', import.meta.url).pathname,
        },
    },
} as UserConfig)