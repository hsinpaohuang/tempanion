import type { TemTemApiType } from '@maael/temtem-types';

export type TypeImgMap = Record<string, string>;

export const useTypeImgMap = async () => {
  const { data: result } = await useFetch<TemTemApiType[]>(
    'https://temtem-api.mael.tech/api/types',
  );

  if (!result.value || !result.value.length) {
    throw new Error('Invalid API response');
  }

  return result.value.reduce<TypeImgMap>((acc, curr) => {
    const type = curr.name;

    acc[type] = `${TEM_TEM_API_BASE_URL}${curr.icon}`;
    return acc;
  }, {});
};
