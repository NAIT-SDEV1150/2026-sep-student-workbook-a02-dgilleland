import { preview } from '@vitest/browser-preview';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.browser.test.js'],
    browser: {
      enabled: true,
      provider: preview(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
