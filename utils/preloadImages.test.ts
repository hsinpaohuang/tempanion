import { beforeAll, describe, expect, it, vi, afterAll } from 'vitest';

abstract class MockedImage {
  onload?: (val?: unknown) => void;
  onerror?: (reason?: unknown) => void;

  abstract set src(_: string);
}

class MockedSuccessImage extends MockedImage {
  // eslint-disable-next-line accessor-pairs
  set src(_: string) {
    this.onload?.();
  }
}

class MockedFailedImage extends MockedImage {
  // eslint-disable-next-line accessor-pairs
  set src(_: string) {
    this.onerror?.('test failed');
  }
}

describe('preloadImages', () => {
  const mockedConsoleError = vi.fn();

  beforeAll(() => {
    vi.stubGlobal('console', { ...console, error: mockedConsoleError });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  const subject = () => preloadImages(['test1', 'test2']);

  it('load images successfully', async () => {
    vi.stubGlobal('Image', MockedSuccessImage);

    await subject();

    expect(mockedConsoleError).not.toHaveBeenCalled();
  });

  it('prints error to console if image fails to preload', async () => {
    vi.stubGlobal('Image', MockedFailedImage);

    await subject();

    expect(mockedConsoleError).toHaveBeenCalledTimes(2);
    expect(mockedConsoleError).toHaveBeenNthCalledWith(
      1,
      'Failed to preload image test1: test failed',
    );
    expect(mockedConsoleError).toHaveBeenNthCalledWith(
      2,
      'Failed to preload image test2: test failed',
    );
  });
});
