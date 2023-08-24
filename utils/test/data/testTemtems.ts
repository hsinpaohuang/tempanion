// Test data for testing and prototyping

import { TemTemType } from '@maael/temtem-types';
import type { CondensedApiTem, Tem } from '~/utils/types/tem';

/**
 * First 5 temtems from
 * {@link https://temtem-api.mael.tech/api/temtems?weaknesses=true&fields=number%2Cname%2CportraitWikiUrl%2Ctypes%2CwikiRenderAnimatedUrl%2Ctechniques&expand=techniques Temtem API}
 *
 * Commented lines are because of incorrect type definitions from `@maael/temtem-types`
 */
export const testTemtems: CondensedApiTem[] = [
  {
    number: 1,
    name: 'Mimit',
    portraitWikiUrl:
      'https://temtem.wiki.gg/images/thumb/8/88/Mimit.png/55px-Mimit.png',
    types: [TemTemType.Digital],
    wikiRenderAnimatedUrl:
      'https://temtem.wiki.gg/images/9/94/Mimit_idle_animation.gif',
    techniques: [
      {
        name: 'DNA Extraction',
        wikiUrl: 'https://temtem.wiki.gg/wiki/DNA_Extraction',
        type: TemTemType.Digital,
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 25,
        staminaCost: 3,
        hold: 0,
        priority: 'ultra',
        // priorityIcon: '/images/icons/priority/ultra.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          "The needle-prick doesn't inflict much damage, but Mimit uses the DNA sample to adapt its defense, bestowing SPD .",
        // effectText:
        //   'DNA Extraction deals damage to a single other target and gifts the user with SPD .',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 1,
      },
    ],
    weaknesses: {
      Neutral: 1,
      Fire: 1,
      Water: 2,
      Nature: 1,
      Electric: 2,
      Earth: 1,
      Mental: 1,
      Wind: 1,
      Digital: 2,
      Melee: 1,
      Crystal: 1,
      Toxic: 0.5,
    },
  },
  {
    number: 2,
    name: 'Oree',
    portraitWikiUrl:
      'https://temtem.wiki.gg/images/thumb/9/99/Oree.png/55px-Oree.png',
    types: [TemTemType.Digital],
    wikiRenderAnimatedUrl:
      'https://temtem.wiki.gg/images/9/9a/Oree_idle_animation.gif',
    techniques: [
      {
        name: 'Data Burst',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Data_Burst',
        type: 'Digital',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 48,
        staminaCost: 6,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Data input overflow! This sensory overload causes moderate damage.',
        // effectText: 'Data Burst deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 1,
      },
      {
        name: 'Mechanical Heat',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Mechanical_Heat',
        type: 'Fire',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 55,
        staminaCost: 7,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Every moving part generates residual heat - and this is a way to weaponize it and inflict moderate damage.',
        // effectText: 'Mechanical Heat deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 5,
      },
    ],
    weaknesses: {
      Neutral: 1,
      Fire: 1,
      Water: 2,
      Nature: 1,
      Electric: 2,
      Earth: 1,
      Mental: 1,
      Wind: 1,
      Digital: 2,
      Melee: 1,
      Crystal: 1,
      Toxic: 0.5,
    },
  },
  {
    number: 3,
    name: 'Zaobian',
    portraitWikiUrl:
      'https://temtem.wiki.gg/images/thumb/5/54/Zaobian.png/55px-Zaobian.png',
    types: [TemTemType.Digital],
    wikiRenderAnimatedUrl:
      'https://temtem.wiki.gg/images/2/20/Zaobian_idle_animation.gif',
    techniques: [
      {
        name: 'Data Burst',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Data_Burst',
        type: 'Digital',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 48,
        staminaCost: 6,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Data input overflow! This sensory overload causes moderate damage.',
        // effectText: 'Data Burst deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 1,
      },
      {
        name: 'Mechanical Heat',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Mechanical_Heat',
        type: 'Fire',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 55,
        staminaCost: 7,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Every moving part generates residual heat - and this is a way to weaponize it and inflict moderate damage.',
        // effectText: 'Mechanical Heat deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 5,
      },
    ],
    weaknesses: {
      Neutral: 1,
      Fire: 1,
      Water: 2,
      Nature: 1,
      Electric: 2,
      Earth: 1,
      Mental: 1,
      Wind: 1,
      Digital: 2,
      Melee: 1,
      Crystal: 1,
      Toxic: 0.5,
    },
  },
  {
    number: 4,
    name: 'Chromeon (Digital)',
    portraitWikiUrl:
      'https://temtem.wiki.gg/images/thumb/7/7d/Chromeon_%28Digital%29.png/55px-Chromeon_%28Digital%29.png',
    types: [TemTemType.Digital],
    wikiRenderAnimatedUrl:
      'https://temtem.wiki.gg/images/f/f5/Chromeon_idle_animation.gif',
    techniques: [
      {
        name: 'Digital Whip',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Digital_Whip',
        type: 'Digital',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 50,
        staminaCost: 6,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Like being slapped with a snippet of code - its bark is much worse than its byte! This technique does little damage.',
        // effectText: 'Digital Whip deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 1,
      },
      {
        name: 'Shy Shield',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Shy_Shield',
        type: 'Neutral',
        class: 'Status',
        // classIcon: '/images/icons/technique/Status.png',
        damage: 0,
        staminaCost: 11,
        hold: 0,
        priority: 'high',
        // priorityIcon: '/images/icons/priority/high.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Self',
        description:
          'Some Temtem are naturally introverted and keep to themselves, obtaining DEF .',
        // effectText: 'Shy Shield gifts the user with DEF .',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 5,
      },
    ],
    weaknesses: {
      Neutral: 1,
      Fire: 1,
      Water: 2,
      Nature: 1,
      Electric: 2,
      Earth: 1,
      Mental: 1,
      Wind: 1,
      Digital: 2,
      Melee: 1,
      Crystal: 1,
      Toxic: 0.5,
    },
  },
  {
    number: 5,
    name: 'Halzhi',
    portraitWikiUrl:
      'https://temtem.wiki.gg/images/thumb/8/88/Halzhi.png/55px-Halzhi.png',
    types: [TemTemType.Digital],
    wikiRenderAnimatedUrl:
      'https://temtem.wiki.gg/images/4/4a/Halzhi_idle_animation.gif',
    techniques: [
      {
        name: 'Scratch',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Scratch',
        type: 'Neutral',
        class: 'Physical',
        // classIcon: '/images/icons/technique/Physical.png',
        damage: 20,
        staminaCost: 4,
        hold: 0,
        priority: 'normal',
        // priorityIcon: '/images/icons/priority/normal.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          "Almost any claw or nail can scratch the surface. Sometimes that's enough.",
        // effectText: 'Scratch deals damage to a single other target.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 1,
      },
      {
        name: 'Token',
        wikiUrl: 'https://temtem.wiki.gg/wiki/Token',
        type: 'Digital',
        class: 'Special',
        // classIcon: '/images/icons/technique/Special.png',
        damage: 40,
        staminaCost: 12,
        hold: 0,
        priority: 'high',
        // priorityIcon: '/images/icons/priority/high.png',

        synergy: 'None',
        synergyEffect: '',
        targets: 'Single Other Target',
        description:
          'Launch token attacks, get token results. This technique does little damage and exiles the target for 1 turn.',
        // effectText:
        //  'Token deals damage to a single target and inflicts them with the Isolated Condition for 1 turn.',
        // synergyText: '',
        // effects: [],
        // source: TemTemApiTechniqueSource.Levelling,
        // levels: 5,
      },
    ],
    weaknesses: {
      Neutral: 1,
      Fire: 1,
      Water: 2,
      Nature: 1,
      Electric: 2,
      Earth: 1,
      Mental: 1,
      Wind: 1,
      Digital: 2,
      Melee: 1,
      Crystal: 1,
      Toxic: 0.5,
    },
  },
];

export const testConvertedTemtem: Tem[] = [
  {
    ...testTemtems[0],
    weaknesses: [
      [TemTemType.Water, 2],
      [TemTemType.Electric, 2],
      [TemTemType.Digital, 2],
      [TemTemType.Toxic, 0.5],
    ],
    techniques: [
      {
        name: testTemtems[0].techniques[0].name,
        type: testTemtems[0].techniques[0].type as TemTemType,
        synergy: testTemtems[0].techniques[0].synergy as TemTemType,
      },
    ],
  },
  {
    ...testTemtems[1],
    weaknesses: [
      [TemTemType.Water, 2],
      [TemTemType.Electric, 2],
      [TemTemType.Digital, 2],
      [TemTemType.Toxic, 0.5],
    ],
    techniques: [
      {
        name: testTemtems[1].techniques[0].name,
        type: testTemtems[1].techniques[0].type as TemTemType,
        synergy: testTemtems[1].techniques[0].synergy as TemTemType,
      },
      {
        name: testTemtems[1].techniques[1].name,
        type: testTemtems[1].techniques[1].type as TemTemType,
        synergy: testTemtems[1].techniques[1].synergy as TemTemType,
      },
    ],
  },
  {
    ...testTemtems[2],
    weaknesses: [
      [TemTemType.Water, 2],
      [TemTemType.Electric, 2],
      [TemTemType.Digital, 2],
      [TemTemType.Toxic, 0.5],
    ],
    techniques: [
      {
        name: testTemtems[2].techniques[0].name,
        type: testTemtems[2].techniques[0].type as TemTemType,
        synergy: testTemtems[2].techniques[0].synergy as TemTemType,
      },
      {
        name: testTemtems[2].techniques[1].name,
        type: testTemtems[2].techniques[1].type as TemTemType,
        synergy: testTemtems[2].techniques[1].synergy as TemTemType,
      },
    ],
  },
  {
    ...testTemtems[3],
    weaknesses: [
      [TemTemType.Water, 2],
      [TemTemType.Electric, 2],
      [TemTemType.Digital, 2],
      [TemTemType.Toxic, 0.5],
    ],
    techniques: [
      {
        name: testTemtems[3].techniques[0].name,
        type: testTemtems[3].techniques[0].type as TemTemType,
        synergy: testTemtems[3].techniques[0].synergy as TemTemType,
      },
      {
        name: testTemtems[3].techniques[1].name,
        type: testTemtems[3].techniques[1].type as TemTemType,
        synergy: testTemtems[3].techniques[1].synergy as TemTemType,
      },
    ],
  },
  {
    ...testTemtems[4],
    weaknesses: [
      [TemTemType.Water, 2],
      [TemTemType.Electric, 2],
      [TemTemType.Digital, 2],
      [TemTemType.Toxic, 0.5],
    ],
    techniques: [
      {
        name: testTemtems[4].techniques[0].name,
        type: testTemtems[4].techniques[0].type as TemTemType,
        synergy: testTemtems[4].techniques[0].synergy as TemTemType,
      },
      {
        name: testTemtems[4].techniques[1].name,
        type: testTemtems[4].techniques[1].type as TemTemType,
        synergy: testTemtems[4].techniques[1].synergy as TemTemType,
      },
    ],
  },
];

export const testTemtemMap: Record<string, Tem> = {
  [String(testConvertedTemtem[0].number)]: testConvertedTemtem[0],
  [String(testConvertedTemtem[1].number)]: testConvertedTemtem[1],
  [String(testConvertedTemtem[2].number)]: testConvertedTemtem[2],
  [String(testConvertedTemtem[3].number)]: testConvertedTemtem[3],
  [String(testConvertedTemtem[4].number)]: testConvertedTemtem[4],
};
