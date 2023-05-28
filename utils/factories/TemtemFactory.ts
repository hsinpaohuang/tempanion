import type { TemTemType } from '@maael/temtem-types';
import type { CondensedApiTem, Tem, Weakness } from '~/utils/types/tem';

export class TemtemFactory {
  static convert(temtem: CondensedApiTem): Tem {
    const { name, portraitWikiUrl, types, weaknesses } = temtem;
    return Object.freeze({
      name,
      portraitWikiUrl,
      types,
      weaknesses: this.convertWeaknesses(weaknesses),
    });
  }

  private static convertWeaknesses(weaknesses: Record<TemTemType, number>) {
    return Object.freeze(
      Object.entries(weaknesses)
        .filter(w => w[1] !== 1)
        .sort((a, b) => b[1] - a[1]) as Weakness[],
    );
  }
}
