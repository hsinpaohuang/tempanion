/** Wait for `time` (in milliseconds) */
export function sleep(time: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, time);
  });
}
