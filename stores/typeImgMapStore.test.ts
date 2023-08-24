import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import {
  testTemtemTypes,
  testTemtemTypesMap,
} from '~/utils/test/data/testTemtemTypes';

const mockedUseFetch = vi.hoisted(() => vi.fn());
vi.mock('nuxt/app', () => ({
  useFetch: mockedUseFetch,
}));

describe('typeImgMapStore', () => {
  const subject = {
    async initialized() {
      const typeImgMapStore = useTypeImgMapStore();
      await typeImgMapStore.initialize();

      return typeImgMapStore;
    },
    notInitialized: () => useTypeImgMapStore(),
  };

  beforeAll(() => {
    mockedUseFetch.mockImplementation(() => ({
      data: { value: testTemtemTypes },
    }));
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('actions', () => {
    describe('initialize', () => {
      it('correctly initialize state with data from API', async () => {
        const typeImgMapStore = await subject.initialized();

        expect(mockedUseFetch).toHaveBeenCalledOnce();
        expect(typeImgMapStore.map).toEqual(testTemtemTypesMap);
      });

      it('does not call API if data already exists', async () => {
        const typeImgMapStore = subject.notInitialized();
        typeImgMapStore.map = testTemtemTypesMap;

        await typeImgMapStore.initialize();

        expect(mockedUseFetch).not.toHaveBeenCalled();
      });

      it('throws error if API data is invalid', () => {
        // empty array
        mockedUseFetch.withImplementation(
          () => ({ data: { value: [] } }),
          async () => {
            const typeImgMapStore = subject.notInitialized();

            await expect(() =>
              typeImgMapStore.initialize(),
            ).rejects.toThrowError('Invalid API response');
          },
        );

        // empty response
        mockedUseFetch.withImplementation(
          () => ({ data: { value: null } }),
          async () => {
            const typeImgMapStore = subject.notInitialized();

            await expect(() =>
              typeImgMapStore.initialize(),
            ).rejects.toThrowError('Invalid API response');
          },
        );
      });
    });
  });
});
