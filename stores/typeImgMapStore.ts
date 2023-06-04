import type { TemTemApiType } from '@maael/temtem-types';

export type TypeImgMap = Record<string, string>;

export const useTypeImgMapStore = defineStore('typeImgMap', {
  state: (): TypeImgMap => ({}),
  actions: {
    async initialize() {
      const { data: result } = await useFetch<TemTemApiType[]>(
        'https://temtem-api.mael.tech/api/types',
      );

      if (!result.value || !result.value.length) {
        throw new Error('Invalid API response');
      }

      result.value.forEach(({ name, icon }) => {
        this[name] = icon;
      });
    },
  },
});
