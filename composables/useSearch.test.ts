import { afterEach, describe, expect, it, vi } from 'vitest';
import Fuse from 'fuse.js';

const data = [
  { key: 't1', value: 'test1' },
  { key: 't2', value: 'test2' },
  { key: 't3', value: 'test3' },
];

const options = {
  keys: [{ name: 'value', weight: 0.5 }],
  threshold: 0.1,
};

vi.mock('fuse.js');

describe('useSearch', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const subject = () => useSearch(data, options);

  it('passes params to Fuse correctly', () => {
    subject();

    expect(Fuse).toHaveBeenCalledOnce();
    expect(Fuse).toHaveBeenCalledWith(data, { ...options, includeScore: true });
  });

  it('returns search results', () => {
    const search = subject();
    vi.mocked(Fuse.prototype.search).mockImplementationOnce(() => [
      { item: data[0], score: 1, refIndex: 0 },
      { item: data[1], score: 1, refIndex: 1 },
    ]);

    const result = search('test');

    expect(Fuse.prototype.search).toHaveBeenCalledOnce();
    expect(result).toEqual([data[0], data[1]]);
  });

  it('returns only 1 result for exact match', () => {
    const search = subject();
    vi.mocked(Fuse.prototype.search).mockImplementationOnce(() => [
      { item: data[0], score: 10e-11, refIndex: 0 },
      { item: data[1], score: 1, refIndex: 1 },
    ]);

    const result = search(data[0].value);

    expect(Fuse.prototype.search).toHaveBeenCalledOnce();
    expect(result).toEqual([data[0]]);
  });

  it('returns everything if search string is empty', () => {
    const search = subject();

    const result = search('');

    expect(Fuse.prototype.search).not.toHaveBeenCalled();
    expect(result).toEqual(data);
  });
});
