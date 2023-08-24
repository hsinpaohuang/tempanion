import { TemTemType } from '@maael/temtem-types';
import { CondensedApiTem, Tem } from '~/utils/types/tem';
import { TemtemFactory } from '~/utils/factories/TemtemFactory';

const params = new URLSearchParams({
  weaknesses: 'true',
  fields: [
    'number',
    'name',
    'portraitWikiUrl',
    'types',
    'wikiRenderAnimatedUrl',
    'techniques',
  ].join(','),
  expand: 'techniques',
});

/** exported for testing */
export const TEM_TEMS_ENDPOINT = `${TEM_TEM_API_BASE_URL}/api/temtems?${params.toString()}`;

type State = {
  temtemIds: number[];
  temtemMap: Record<string, Tem>;
};

// Cannot put in state because functions can't be serialized
let searcher: (key: string) => readonly Tem[];

export const useTemtemStore = defineStore('temtems', {
  state: (): State => ({
    temtemIds: [],
    temtemMap: {},
  }),
  getters: {
    /** Implemented as getters to avoid sending duplicated data */
    temtemList: state => state.temtemIds.map(id => state.temtemMap[id]),
    getTechniqueTypesOfTemtem: state => {
      function get(temtemId: number): TemTemType[] {
        const typeSet = state.temtemMap[temtemId].techniques.reduce<
          Set<TemTemType>
        >((acc, curr) => {
          acc.add(curr.type);
          return acc;
        }, new Set());

        return Array.from(typeSet);
      }

      return get;
    },
  },
  actions: {
    async initialize() {
      if (!this.temtemIds.length) {
        const { data } = await useFetch<CondensedApiTem[]>(TEM_TEMS_ENDPOINT);
        if (!data.value || !data.value.length) {
          throw new Error('Failed to fetch Temtem data');
        }

        const list = data.value.map(d => TemtemFactory.convert(d));

        const { ids, map } = TemtemFactory.normalize(list);
        this.temtemIds = ids;
        this.temtemMap = map;
      }

      if (process.client) {
        searcher = useSearch(this.temtemList, {
          keys: [{ name: 'name' }, { name: 'types', weight: 0.1 }],
          threshold: 0.3,
        });
      }
    },
    search(key: string) {
      return searcher(key);
    },
  },
});
