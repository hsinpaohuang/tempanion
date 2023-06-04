import { debounce } from 'quasar';
import type { Router } from 'vue-router';

/** tries to minimize the chance that vue router will error by reducing rapid route changes */
export const goTo = debounce((router: Router, path: string) => {
  router.isReady().then(() => {
    goTo.cancel();
    if (path !== router.currentRoute.value.path) {
      router.push(path);
    }
  });
}, 300);
