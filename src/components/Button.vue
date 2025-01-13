  <script lang="ts">
  import { defineComponent, type PropType } from "vue";

  export default defineComponent({
    name: "Button",
    props: {
      buttonClass: {
        type: String,
        default: "default-button",
      },
      onClick: {
        type: Function as PropType<() => void>,
        required: true,
      },
    },
    setup(props) {
      const handleClick = () => {
        props.onClick();
      };

      return {
        handleClick,
      };
    },
  });
</script>

<template>
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style scoped>
.default-button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
