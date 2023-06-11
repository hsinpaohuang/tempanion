import { Place } from '~/utils/types/battlefield';

type State = {
  [key in Place]: number;
};

export const useBattlefieldStore = defineStore('battlefield', {
  state: (): State => {
    const temtemStore = useTemtemStore();
    if (!temtemStore.temtemIds.length) {
      throw new Error('temtemStore is not initialized yet');
    }

    const max = temtemStore.temtemIds.length;

    return {
      enemy1: getRandomInt(max),
      enemy2: getRandomInt(max),
      friendly1: getRandomInt(max),
      friendly2: getRandomInt(max),
    };
  },
});
