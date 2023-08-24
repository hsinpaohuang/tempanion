import { describe, expect, it } from 'vitest';
import {
  testConvertedTemtem,
  testTemtemMap,
  testTemtems,
} from '~/utils/test/data/testTemtems';
import { TemtemFactory } from '~/utils/factories/TemtemFactory';

describe('TemtemFactory', () => {
  describe('convert', () => {
    const subject = () => TemtemFactory.convert(testTemtems[1]);

    it('converts API data successfully', () => {
      expect(subject()).toEqual(testConvertedTemtem[1]);
    });

    it('freezes returned object', () => {
      const result = subject();

      expect(Object.isFrozen(result)).toBe(true);
      expect(Object.isFrozen(result.weaknesses)).toBe(true);
      expect(Object.isFrozen(result.techniques)).toBe(true);
    });
  });

  describe('normalize', () => {
    it('normalizes temtems data successfully', () => {
      const result = TemtemFactory.normalize(testConvertedTemtem);

      expect(result).toEqual({
        ids: testConvertedTemtem.map(t => t.number),
        map: testTemtemMap,
      });
    });
  });
});
