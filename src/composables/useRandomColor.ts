import { ref, onUnmounted } from "vue";
import { randomInt, rgbToHex } from "../utils/utils"; // Import the utility function

export default function useRandomColor() {
  // Reactive references for the main counter's current RGB and HEX values
  const currentRgb = ref<[number, number, number]>([0, 0, 0]);
  const currentHex = ref<string>("#000000");

  // Reactive references for the delayed counter's RGB and HEX values
  const delayedRgb = ref<[number, number, number]>([0, 0, 0]);
  const delayedHex = ref<string>("#000000");

  // IDs for the intervals that generate colors for main and delayed counters
  let mainIntervalId: number | undefined = undefined;
  let delayedIntervalId: number | undefined = undefined;

  // Queue to store colors for delayed processing
  let delayQueue: { rgb: [number, number, number]; hex: string }[] = [];

  // Threshold after which the delayed counter starts (after 3 colors)
  const DELAY_START_THRESHOLD = 3;

  // Flag to track whether the stopping process is underway
  let isStopping = false;

  /**
   * Generates a random RGB color and its HEX equivalent.
   * Updates the main counter's current color and adds the color to the delay queue.
   * Starts the delayed counter if the threshold is reached.
   */
  const generateRandomColor = () => {
    const rgb: [number, number, number] = [
      randomInt(0, 255), // Generate a random number between 0 and 255 for Red
      randomInt(0, 255), // Generate a random number between 0 and 255 for Green
      randomInt(0, 255), // Generate a random number between 0 and 255 for Green
    ];
    const hex = rgbToHex(rgb); // Convert RGB to HEX
    currentRgb.value = rgb; // Update main counter's RGB
    currentHex.value = hex; // Update main counter's HEX

    // Add the generated color to the queue for delayed processing
    delayQueue.push({ rgb, hex });

    // If the queue reaches the start threshold, initialize the delayed counter
    if (delayQueue.length === DELAY_START_THRESHOLD && delayedIntervalId === undefined) {
      startDelayedProcessing();
    }
  };

  /**
   * Starts the delayed counter to process colors from the delay queue.
   * Processes one color per second and updates the delayed counter's current color.
   */
  const startDelayedProcessing = () => {
    delayedIntervalId = setInterval(() => {
      if (delayQueue.length > 0) {
        const { rgb, hex } = delayQueue.shift()!; // Retrieve and remove the next color from the queue
        delayedRgb.value = rgb; // Update delayed counter's RGB
        delayedHex.value = hex; // Update delayed counter's HEX
      } else {
        // If stopping is in progress and the queue is empty, stop the delayed counter
        if (isStopping) {
          stopDelayedProcessing();
        }
      }
    }, 1000) as unknown as number; // Process one color per second
  };

  /**
   * Stops the delayed counter by clearing its interval.
   */
  const stopDelayedProcessing = () => {
    if (delayedIntervalId !== undefined) {
      clearInterval(delayedIntervalId); // Stop the delayed counter
      delayedIntervalId = undefined; // Reset the interval ID
    }
  };

  /**
   * Starts generating colors for the main counter.
   * Resets the stopping flag and ensures the main counter's interval is active.
   */
  const startGeneratingColors = () => {
    if (mainIntervalId === undefined) {
      mainIntervalId = setInterval(generateRandomColor, 1000) as unknown as number; // Generate a new color every second
      isStopping = false; // Reset the stopping flag when restarted
    }
  };

  /**
   * Stops generating colors for the main counter.
   * If the delay queue still has colors, sets the stopping flag and allows the delayed counter to finish.
   */
  const stopGeneratingColors = () => {
    if (mainIntervalId !== undefined) {
      clearInterval(mainIntervalId); // Stop the main counter
      mainIntervalId = undefined; // Reset the interval ID
    }

    // If there are still colors in the delay queue, allow the delayed counter to finish processing
    if (delayQueue.length > 0) {
      isStopping = true; // Set the stopping flag to true
    } else {
      // If no colors are left in the delay queue, stop the delayed counter immediately
      stopDelayedProcessing();
    }
  };

  /**
   * Ensures all intervals are stopped when the component using this composable is unmounted.
   */
  onUnmounted(() => {
    stopGeneratingColors(); // Stop both main and delayed counters
  });

  return {
    currentRgb, // Main counter's RGB value
    currentHex, // Main counter's HEX value
    delayedRgb, // Delayed counter's RGB value
    delayedHex, // Delayed counter's HEX value
    startGeneratingColors, // Function to start generating colors
    stopGeneratingColors, // Function to stop generating colors
  };
}
