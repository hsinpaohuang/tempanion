import { defineVitestConfig } from 'nuxt-vitest/config';
import { configDefaults } from 'vitest/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',

    // ./tests is for e2e tests which are handled by playwright
    exclude: [...configDefaults.exclude, './tests'],
  },
});
