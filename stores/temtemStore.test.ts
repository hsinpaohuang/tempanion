import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TemtemFactory } from '~/utils/factories/TemtemFactory';
import {
  testConvertedTemtem,
  testTemtemMap,
  testTemtems,
} from '~/utils/test/data/testTemtems';

const mockedUseFetch = vi.hoisted(() => vi.fn());
vi.mock('nuxt/app', () => ({
  useFetch: mockedUseFetch,
}));

const testIds = vi.hoisted(() => [1, 2, 3, 4, 5]);

vi.mock('~/utils/factories/TemtemFactory');
vi.mocked(TemtemFactory)
  .convert.mockImplementationOnce(() => testConvertedTemtem[0])
  .mockImplementationOnce(() => testConvertedTemtem[1])
  .mockImplementationOnce(() => testConvertedTemtem[2])
  .mockImplementationOnce(() => testConvertedTemtem[3])
  .mockImplementationOnce(() => testConvertedTemtem[4]);
vi.mocked(TemtemFactory).normalize.mockImplementation(() => ({
  ids: testIds,
  map: testTemtemMap,
}));

const mockedSearcher = vi.hoisted(() => vi.fn().mockReturnValue(testIds));
vi.mock('~/composables/useSearch', () => ({
  useSearch: vi.fn().mockReturnValue(mockedSearcher),
}));

describe('temtemStore', () => {
  const subject = {
    async initialized() {
      const temtemStore = useTemtemStore();
      await temtemStore.initialize();

      return temtemStore;
    },
    notInitialized: () => useTemtemStore(),
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    // TODO: using `withImplementation` twice in a row seems to leak the temporary overriden implementation
    mockedUseFetch.mockResolvedValue({ data: { value: testTemtems } });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('getters', () => {
    describe('temtemList', () => {
      it('returns array of temtems', async () => {
        const temtemStore = await subject.initialized();

        const temtemList = temtemStore.temtemList;
        expect(temtemList).toEqual(testConvertedTemtem);
      });
    });

    describe('getTechniqueTypesOfTemtem', () => {
      it('returns techniques of given temtem ID', async () => {
        const temtemStore = await subject.initialized();

        const result = temtemStore.getTechniqueTypesOfTemtem(2);

        expect(result).toEqual(['Digital', 'Fire']);
      });
    });
  });

  describe('actions', () => {
    describe('initialize', () => {
      it('does not call API if data already exists', async () => {
        const temtemStore = subject.notInitialized();
        temtemStore.temtemIds = testIds;
        temtemStore.temtemMap = testTemtemMap;

        await temtemStore.initialize();

        expect(mockedUseFetch).not.toHaveBeenCalled();
      });

      it('correctly initialize state with data from API', async () => {
        const temtemStore = await subject.initialized();

        expect(mockedUseFetch).toHaveBeenCalledOnce();
        expect(temtemStore.temtemIds).toEqual(testIds);
        expect(temtemStore.temtemMap).toEqual(testTemtemMap);
        expect(useSearch).toHaveBeenCalledOnce();
      });

      it('throws error if API data is invalid', () => {
        // empty array
        mockedUseFetch.withImplementation(
          () => ({ data: { value: [] } }),
          async () => {
            const temtemStore = subject.notInitialized();

            await expect(() => temtemStore.initialize()).rejects.toThrowError(
              'Failed to fetch Temtem data',
            );
          },
        );

        // empty response
        mockedUseFetch.withImplementation(
          () => ({ data: { value: null } }),
          async () => {
            const temtemStore = subject.notInitialized();

            await expect(() => temtemStore.initialize()).rejects.toThrowError(
              'Failed to fetch Temtem data',
            );
          },
        );
      });
    });

    describe('search', () => {
      it('search with keyword', async () => {
        const temtemStore = await subject.initialized();

        const result = temtemStore.search('test');

        expect(mockedSearcher).toHaveBeenCalledOnce();
        expect(mockedSearcher).toHaveBeenCalledWith('test');
        expect(result).toEqual(testIds);
      });
    });
  });
});
