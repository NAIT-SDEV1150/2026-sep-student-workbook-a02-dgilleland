import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.browser.test.js'],
    setupFiles: ['./tests/setup-msw.js'],
  },
});
