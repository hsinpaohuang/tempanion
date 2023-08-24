import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('~/utils/randomNumberGenerator', () => ({
  getRandomInt: vi.fn().mockReturnValue(1),
}));

vi.mock('~/stores/temtemStore', () => ({
  useTemtemStore: vi.fn().mockImplementation(() => ({
    temtemIds: [1, 2, 3, 4, 5],
  })),
}));

const storedTemtemIds = [1, 2, 3];
vi.mock('@vueuse/core', () => ({
  useLocalStorage: vi
    .fn()
    .mockImplementation(() => ({ value: [...storedTemtemIds] })),
}));

describe('battleFieldStore', () => {
  let subject: ReturnType<typeof useBattlefieldStore>;

  beforeEach(() => {
    setActivePinia(createPinia());

    subject = useBattlefieldStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('state', () => {
    it('initializes state with random temtems', () => {
      expect(subject).toMatchObject({
        enemy1: 1,
        enemy2: 1,
        friendly1: 1,
        friendly2: 1,
      });
      expect(getRandomInt).toHaveBeenCalledTimes(4);
    });
  });

  describe('getters', () => {
    describe('recentlySelected', () => {
      it('get recently selected temtem ids from localstorage', () => {
        const result = subject.recentlySelected.value;

        expect(result).toEqual(storedTemtemIds);
        expect(useLocalStorage).toHaveBeenCalledOnce();
        expect(useLocalStorage).toHaveBeenCalledWith('recentlySelected', []);
      });
    });

    describe('team', () => {
      it('get team temtem ids from localstorage', () => {
        const result = subject.team.value;

        expect(result).toEqual(storedTemtemIds);
        expect(useLocalStorage).toHaveBeenCalledOnce();
        expect(useLocalStorage).toHaveBeenCalledWith('team', []);
      });
    });
  });

  describe('actions', () => {
    describe('addRecentlySelected', () => {
      it('adds given ID to first position', () => {
        subject.addRecentlySelected(4);

        expect(subject.recentlySelected.value).toEqual([4, ...storedTemtemIds]);
      });

      it('deletes last ID if there are more than 10 after adding', () => {
        subject.recentlySelected.value = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        subject.addRecentlySelected(11);

        expect(subject.recentlySelected.value).toEqual([
          11, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ]);
      });

      it('moves ID to first position if given ID exists', () => {
        subject.addRecentlySelected(3);

        expect(subject.recentlySelected.value).toEqual([3, 1, 2]);
      });

      it('does not delete an ID if adding an existing one and there are already 10 IDs', () => {
        subject.recentlySelected.value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        subject.addRecentlySelected(5);

        expect(subject.recentlySelected.value).toEqual([
          5, 1, 2, 3, 4, 6, 7, 8, 9, 10,
        ]);
      });
    });

    describe('addToTeam', () => {
      it('adds ID to teams', () => {
        subject.addToTeam(4);

        expect(subject.team.value).toEqual([...storedTemtemIds, 4]);
      });

      it('throws error if team is already full', () => {
        subject.team.value = [1, 2, 3, 4, 5, 6];

        expect(() => subject.addToTeam(7)).toThrowError('team is already full');
      });
    });

    describe('setTeamMember', () => {
      it('set ID to the correct position', () => {
        subject.setTeamMember(0, 5);

        expect(subject.team.value).toEqual([5, 2, 3]);
      });

      it('removes ID from team if id is undefined', () => {
        subject.setTeamMember(1, undefined);

        expect(subject.team.value).toEqual([1, 3]);
      });
    });
  });
});
