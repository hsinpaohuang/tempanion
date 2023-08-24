// Test data for testing and prototyping

import { TemTemApiType } from '@maael/temtem-types';
import { TypeImgMap } from '~/stores/typeImgMapStore';

export const testTemtemTypes: TemTemApiType[] = [
  { name: 'Neutral', icon: '/neutral' },
  { name: 'Fire', icon: '/fire' },
  { name: 'Water', icon: '/water' },
];

export const testTemtemTypesMap: TypeImgMap = {
  Neutral: `${TEM_TEM_API_BASE_URL}/neutral`,
  Fire: `${TEM_TEM_API_BASE_URL}/fire`,
  Water: `${TEM_TEM_API_BASE_URL}/water`,
};
