import { Place } from '~/utils/types/battlefield';

type State = {
  [key in Place]: number;
};

const RECENTLY_SELECTED_MAX_LENGTH = 10;

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
  getters: {
    recentlySelected: () => useLocalStorage<number[]>('recentlySelected', []),
    team: () => useLocalStorage<number[]>('team', []),
  },
  actions: {
    addRecentlySelected(id: number) {
      const existingIdIndex = this.recentlySelected.value.findIndex(
        i => i === id,
      );
      if (existingIdIndex !== -1) {
        this.recentlySelected.value.splice(existingIdIndex, 1);
      }

      this.recentlySelected.value.unshift(id);

      if (this.recentlySelected.value.length > RECENTLY_SELECTED_MAX_LENGTH) {
        this.recentlySelected.value.pop();
      }
    },
    addToTeam(id: number) {
      if (this.team.value.length >= 6) {
        throw new Error('team is already full');
      }
      this.team.value.push(id);
    },
    setTeamMember(index: number, id: number | undefined) {
      if (id === undefined) {
        this.team.value.splice(index, 1);
      } else {
        this.team.value[index] = id;
      }
    },
  },
});
