import { defineConfig, UserConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    test: {
        environment: 'jsdom',
    }
} as UserConfig)