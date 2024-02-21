import type { Ref } from 'vue';

let cancelPreviousDisplay = () => {}; // Function to cancel the previous display

const display = async (
  displayThis: string[] | string,
  where: Ref<string>,
  speed: number = 25,
  allowCancel: boolean = true // Add allowCancel parameter with default value true
): Promise<void> => {
  // Cancel any previous display that might still be running
  if (allowCancel) {
    cancelPreviousDisplay();
  }

  // A new promise that resolves when the current display execution is cancelled
  let cancelled = false;
  if (allowCancel) {
    cancelPreviousDisplay = () => {
      cancelled = true;
    };
  }

  where.value = '';
  const formattedDisplayThis = typeof displayThis === 'string' ? displayThis : displayThis.join('\n');

  const promises: Promise<void>[] = [];

  for (let i = 0; i < formattedDisplayThis.length; i++) {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        if (cancelled) return; // If cancelled, do not proceed
        where.value += formattedDisplayThis.charAt(i);
        resolve();
      }, i * speed);
    });

    promises.push(promise);
  }

  await Promise.all(promises).finally(() => {
    // When all promises complete or the function is cancelled, consider the display not running
    if (!cancelled || !allowCancel) {
      cancelPreviousDisplay = () => {}; // Reset the cancel function if the action wasn't cancelled or cancellation is not allowed
    }
  });
};

export default display;
