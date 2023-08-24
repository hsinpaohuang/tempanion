import Fuse from 'fuse.js';

export function useSearch<T>(
  ...[list, options]: ConstructorParameters<typeof Fuse<T>>
) {
  const searcher = new Fuse<T>(list, { ...options, includeScore: true });

  function search(key: string) {
    if (key === '') {
      return list;
    }

    const searchResult = searcher.search(key);
    const exactMatch = searchResult.find(
      ({ score }) => score && score < 10e-10,
    );

    return exactMatch
      ? [exactMatch.item]
      : searchResult.map(({ item }) => item);
  }

  return search;
}
