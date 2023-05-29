import Fuse from 'fuse.js';

export function useSearch<T>(
  ...[list, options]: ConstructorParameters<typeof Fuse<T>>
) {
  const searcher = new Fuse<T>(list, { ...options, includeScore: true });
  const result = useState(() => list);

  function search(key: string) {
    if (key === '') {
      result.value = list;
      return;
    }

    const searchResult = searcher.search(key);
    const exactMatch = searchResult.find(
      ({ score }) => score && score < 10e-10,
    );
    if (exactMatch) {
      result.value = [exactMatch.item];
    } else {
      result.value = searchResult.map(({ item }) => item);
    }
  }

  return { result, search };
}
