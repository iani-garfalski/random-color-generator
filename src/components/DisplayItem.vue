<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DisplayItem",
  props: {
    label: { type: String, required: true },
    value: { type: [String, Number], required: true },
  },
});
</script>

<template>
  <div>
    <p>{{ label }}: <span>{{ value }}</span></p>
  </div>
</template> 
