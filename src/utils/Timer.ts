class Timer {
  // The current count of the timer.
  private count: number;

  // Stores the ID of the interval that increments the counter. Used to clear the interval when needed.
  private intervalId: number | null = null;

  // Stores the ID of the timeout that handles the delay before the interval starts.
  private delayTimeoutId: number | null = null;

  // Delay in milliseconds before the timer starts counting.
  private delay: number;

  // A callback function triggered every time the count is updated.
  private onUpdate: (value: number) => void;

  /**
   * Constructor to initialize the Timer instance.
   * @param initialValue - The starting value of the counter (default is 0).
   * @param delay - Delay in milliseconds before the timer starts (default is 0).
   * @param onUpdate - Callback function that gets called whenever the count updates.
   */
  constructor(initialValue: number = 0, delay: number = 0, onUpdate: (value: number) => void) {
    this.count = initialValue;
    this.delay = delay;
    this.onUpdate = onUpdate;
  }

  /**
   * Starts the timer. If a delay is specified, the timer waits for the delay before starting.
   * Prevents multiple intervals from being created by checking if the timer is already running.
   */
  start() {
    // Prevent starting the timer if it's already running
    if (this.intervalId) return;

    // If a delay is specified, start the interval after the delay
    if (this.delay > 0) {
      this.delayTimeoutId = setTimeout(() => {
        this.intervalId = setInterval(() => this.increment(), 1000); // Increment every second
      }, this.delay);
    } else {
      // Start the interval immediately if no delay
      this.intervalId = setInterval(() => this.increment(), 1000);
    }
  }

  /**
   * Stops the timer. Clears both the interval and the delay timeout, if they exist.
   * Ensures that no further counting occurs until the timer is restarted.
   */
  stop() {
    // Clear the interval if it's active
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Clear the timeout if a delay was set
    if (this.delayTimeoutId) {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = null;
    }
  }

  /**
   * Resets the timer. Stops the timer and sets the count back to 0.
   * Triggers the `onUpdate` callback to notify listeners of the reset.
   */
  reset() {
    this.stop(); // Stop any ongoing timer
    this.count = 0; // Reset the count to the initial value
    this.onUpdate(this.count); // Notify listeners of the updated count
  }

  /**
   * Increments the timer's count by 1 and calls the `onUpdate` callback to notify listeners.
   * This is a private method used internally by the timer's interval.
   */
  private increment() {
    this.count++; // Increase the count by 1
    this.onUpdate(this.count); // Notify listeners of the new count
  }
}

export default Timer;
