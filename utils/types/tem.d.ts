import type {
  TemTemApiTem,
  TemTemApiWeaknesses,
  TemTemType,
} from '@maael/temtem-types';
import type { DeepReadonly } from 'nuxt/dist/app/compat/capi';

export type Weakness = Readonly<[TemTemType, number]>;

export type CondensedApiTem = Pick<
  TemTemApiTem,
  'name' | 'portraitWikiUrl' | 'types'
> & {
  weaknesses: Record<TemTemType, number>;
  /** from fuse.js search result */
  refIndex?: number;
};

export type Tem = DeepReadonly<
  Omit<CondensedApiTem, 'weaknesses'> & {
    /** sorted by damage modifier in descending order */
    weaknesses: Weakness[];
  }
>;
