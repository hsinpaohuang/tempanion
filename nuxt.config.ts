// generate first then build so purge-css knows what to purge and what to keep
// https://dev.to/czerma/how-to-build-optimized-vuetify-3-nuxt-3-project-4l5k

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: { typeCheck: true },
  modules: [
    'nuxt-quasar-ui',
    [
      'nuxt-purgecss',
      {
        content: [
          /* Copy of 'dist' from first npm run generate */
          'dist/**/*.html',
        ],
        safelist: [
          /* Generated as runtime, keep all related selectors */
          /q-dark/,
          /text-indigo/,
          /q-ripple/,
          /q-body--layout-animate/,
          /q-toggle__inner--truthy/,
          /q-toggle__inner--falsey/,
          /q-tooltip/,
          /q-tooltip--style/,
          /q-position-engine/,
          /q-card--bordered/,
          /q-avatar/,
          /bg-dark/,
          /q-field--dark/,
          /q-field--focused/,
          /q-field--highlighted/,
          /q-field__focusable-action/,
          /q-separator/,
        ],
      },
    ],
  ],
  routeRules: {
    '/matchup': { isr: 60 * 60 * 2 },
  },
  app: {
    pageTransition: true,
  },
  css: ['~/assets/styles/global.scss'],
  quasar: {
    plugins: ['Dark'],
    config: {
      brand: {
        'primary': '#512da8',
        'secondary': '#01acc0',
        'accent': '#EF6D01',

        'dark': '#242424',
        // @ts-expect-error
        'dark-page': '#101010',

        'positive': '#4dae50',
        'negative': '#d32e2e',
        'info': '#0077d6',
        'warning': '#debe22',
      },
      dark: 'auto',
    },
    extras: { animations: ['fadeIn', 'fadeOut'] },
  },
  colorMode: {
    fallback: 'dark',
  },
});
