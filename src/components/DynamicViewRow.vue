<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import DisplayItem from "../components/DisplayItem.vue";
import SelectorComponent from "./SelectorComponent.vue";

export default defineComponent({
  name: "DynamicViewRow",
  props: {
    currentRgb: { type: Array, required: true },
    currentHex: { type: String, required: true },
    delayedRgb: { type: Array, required: true },
    delayedHex: { type: String, required: true },
    mainCounter: { type: Number, required: true },
    delayedCounter: { type: Number, required: true },
  },
  components: { DisplayItem, SelectorComponent },
  setup(props) {
    // Ref to hold the currently selected view (default: "Counter")
    const selectedView = ref("Counter");
    // Ref to hold the state of whether delayed view is enabled (default: false)
    const isDelayed = ref(false);

    // Array of view options for the selector component
    const viewOptions = [
      { value: "Counter", text: "Counter" },
      { value: "Hex", text: "Hex" },
      { value: "Dec", text: "Dec" },
    ];

    // Computed property to determine the value to display based on the selected view and delay state
    const computedValue = computed(() => {
      if (selectedView.value === "Counter") {
        return isDelayed.value ? props.delayedCounter : props.mainCounter;
      }
      if (selectedView.value === "Hex") {
        return isDelayed.value ? props.delayedHex : props.currentHex;
      }
      if (selectedView.value === "Dec") {
        return isDelayed.value
          ? props.delayedRgb.join(", ") // Join RGB values into a string
          : props.currentRgb.join(", "); // Join current RGB values into a string
      }
      return ""; // Default empty string if no view matches
    });

    const computedStyle = computed<Record<string, string | undefined>>(() => {
      if (selectedView.value === "Hex") {
        return { color: computedValue.value as string };
      }
      return {};
    });

    return {
      selectedView,
      isDelayed,
      viewOptions,
      computedValue,
      computedStyle,
    };
  },
});
</script>

<template>
  <div>
    <!-- Display the value based on the selected view and style it accordingly -->
    <DisplayItem :label="selectedView" :value="computedValue" :style="computedStyle" />

    <!-- Selector for choosing the view, provided by the SelectorComponent -->
    <SelectorComponent id="dynamic-view-selector" label="Select View" :options="viewOptions" v-model="selectedView" />

    <!-- Checkbox to toggle delay mode -->
    <label>
      Delayed:
      <input id="delayed-checkbox" type="checkbox" v-model="isDelayed" />
    </label>
  </div>
</template>

<style scoped>
#delayed-checkbox {
  vertical-align: middle;
}
</style>
