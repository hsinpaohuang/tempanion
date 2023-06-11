import type { TemTemApiTechnique, TemTemType } from '@maael/temtem-types';
import type {
  CondensedApiTem,
  SynergyType,
  Tem,
  Weakness,
} from '~/utils/types/tem';

export class TemtemFactory {
  static convert(temtem: CondensedApiTem): Tem {
    const { weaknesses, techniques, ...rest } = temtem;
    return Object.freeze({
      ...rest,
      weaknesses: Object.freeze(this.convertWeaknesses(weaknesses)),
      techniques: Object.freeze(this.convertTechniques(techniques)),
    });
  }

  static normalize(temtems: Tem[]) {
    return temtems.reduce<{ ids: number[]; map: Record<string, Tem> }>(
      (acc, curr) => {
        acc.ids.push(curr.number);
        acc.map[curr.number] = curr;

        return acc;
      },
      { ids: [], map: {} },
    );
  }

  private static convertWeaknesses(weaknesses: Record<TemTemType, number>) {
    return Object.entries(weaknesses)
      .filter(w => w[1] !== 1)
      .sort((a, b) => b[1] - a[1]) as Weakness[];
  }

  private static convertTechniques(
    techniques: TemTemApiTechnique[],
  ): SynergyType {
    return techniques.map(t => ({
      name: t.name,
      type: t.type,
      // @ts-expect-error typo in @maael/temtem-types
      synergy: t.synergy,
    }));
  }
}
