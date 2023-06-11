export async function preloadImages(imageUrls: string[]): Promise<void> {
  const results = await Promise.allSettled(
    imageUrls.map(
      url =>
        new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = url;
        }),
    ),
  );

  results.forEach((r, index) => {
    if (r.status === 'rejected') {
      // eslint-disable-next-line no-console
      console.error(`Failed to preload image ${imageUrls[index]}: ${r.reason}`);
    }
  });
}
