import type {
  TemTemApiTechnique,
  TemTemApiTechniqueSource,
  TemTemApiTemSimpleTechnique,
  TemTemApiTem,
  TemTemApiWeaknesses,
  TemTemType,
} from '@maael/temtem-types';
import type { DeepReadonly } from 'nuxt/dist/app/compat/capi';

export type Weakness = Readonly<[TemTemType, number]>;

export type SynergyType = TemtemType | 'None';

export type Technique = {
  name: string;
  type: TemTemType;
  synergy: SynergyType;
  source: TemTemApiTechniqueSource
};

export type CondensedApiTem = Pick<
  TemTemApiTem,
  'number' | 'name' | 'portraitWikiUrl' | 'types' | 'techniques'
> & {
  weaknesses: Record<TemTemType, number>;
  techniques: TemTemApiTechnique[];
  wikiRenderAnimatedUrl: string;
  /** from fuse.js search result */
  refIndex?: number;
};

export type Tem = DeepReadonly<
  Omit<CondensedApiTem, 'weaknesses' | 'techniques'> & {
    /** sorted by damage modifier in descending order */
    weaknesses: Weakness[];
    techniques: Technique[];
  }
>;
