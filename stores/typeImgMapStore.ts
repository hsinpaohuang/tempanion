import type { TemTemApiType } from '@maael/temtem-types';

export type TypeImgMap = Record<string, string>;

export const useTypeImgMapStore = defineStore('typeImgMap', {
  state: (): { map: TypeImgMap } => ({ map: {} }),
  actions: {
    async initialize() {
      if (Object.keys(this.map).length) {
        return;
      }

      const { data: result } = await useFetch<TemTemApiType[]>(
        `${TEM_TEM_API_BASE_URL}/api/types`,
      );

      if (!result.value || !result.value.length) {
        throw new Error('Invalid API response');
      }

      result.value.forEach(({ name, icon }) => {
        this.map[name] = `${TEM_TEM_API_BASE_URL}${icon}`;
      });
    },
  },
});
