import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  routes: routes => [
    ...routes,
    {
      name: 'landing',
      path: '/',
      redirect: 'matchup',
    },
    {
      name: 'catchAll',
      path: '/:catchAll(.*)*',
      component: () => import('~/error.vue'),
    },
  ],
};
