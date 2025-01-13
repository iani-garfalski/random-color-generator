<script lang="ts">
import { defineComponent, ref } from "vue";
import useRandomColor from "../composables/useRandomColor";
import DisplayItem from "../components/DisplayItem.vue";
import DynamicViewRow from "../components/DynamicViewRow.vue";
import Timer from "../utils/Timer";
import Button from "../components/Button.vue"; // Import the reusable button component

export default defineComponent({
  name: "HomeView",
  components: { DisplayItem, DynamicViewRow, Button },
  setup() {
    const {
      currentRgb,
      delayedRgb,
      currentHex,
      delayedHex,
      startGeneratingColors,
      stopGeneratingColors
    } = useRandomColor();

    // Reactively manage the main and delayed counters
    const mainCounter = ref(0);
    const delayedCounter = ref(0);

    // Create instances of the Timer utility with different intervals and update handlers
    const mainTimer = new Timer(0, 0, (value) => (mainCounter.value = value));
    const delayedTimer = new Timer(0, 3000, (value) => (delayedCounter.value = value));

    // Start generating colors and the timers
    const start = () => {
      startGeneratingColors();
      mainTimer.start();
      delayedTimer.start();
    };

    // Stop generating colors and the timers
    const stop = () => {
      stopGeneratingColors();
      mainTimer.stop();
      stopWithDelay(); // Stops the delayed timer after 3 seconds
    };

    // Utility function to create a delay (useful for async operations)
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // Function to stop the delayed timer with a 3-second delay
    const stopWithDelay = async () => {
      await delay(3000); // Wait for 3 seconds
      delayedTimer.stop(); // Perform the delayed action
    };

    // Functions to reset the timers
    const resetMainCounter = () => {
      mainTimer.reset();
      mainTimer.stop(); // Stop main timer when reset
    };
    const resetDelayedCounter = () => {
      delayedTimer.reset();
      delayedTimer.stop(); // Stop delayed timer when reset
    };
    
    // Return values to be used in the template and setup methods
    return {
      currentRgb,
      currentHex,
      delayedRgb,
      delayedHex,
      mainCounter,
      delayedCounter,
      start,
      stop,
      resetMainCounter,
      resetDelayedCounter,
    };
  },
});
</script>

<template>
  <div>
    <p>Starts/Stops generation of three random numbers between 0 and 255 every second</p>
    <Button @click="start">Start</Button>
    <Button @click="stop">Stop</Button>
    
    <hr />

    <DisplayItem label="Decimal RGB Values" :value="currentRgb.join(', ')" />
    <hr />

    <DisplayItem label="CSS Hex Color" :value="currentHex" :style="{ color: currentHex }" />
    <hr />

    <DisplayItem label="Counter" :value="mainCounter" />
    <Button @click="resetMainCounter">Reset</Button>
    <hr />

    <DisplayItem label="Delayed Counter" :value="delayedCounter" />
    <Button @click="resetDelayedCounter">Reset</Button>
    <hr />

    <p>Dynamically selects one of the three view above (dec, colored hex or counter). If the checkbox is checked applies
      a three seconds delay to the view.</p>
    <DynamicViewRow :currentRgb="currentRgb" :currentHex="currentHex" :delayedRgb="delayedRgb" :delayedHex="delayedHex"
      :mainCounter="mainCounter" :delayedCounter="delayedCounter" />
  </div>
</template>

<style scoped>
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
