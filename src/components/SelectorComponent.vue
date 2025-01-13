<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";

export default defineComponent({
    name: "SelectorComponent",
    props: {
        id: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            required: true,
        },
        options: {
            type: Array as PropType<{ value: string; text: string }[]>,
            required: true,
        },
        modelValue: {
            type: String,
            required: true,
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const selected = computed({
            get: () => props.modelValue,
            set: (value: string) => emit("update:modelValue", value),
        });

        return {
            selected,
        };
    },
});
</script>

<template>
    <div class="selector-container">
        <label :for="id" hidden>{{ label }}</label>
        <select :id="id" v-model="selected">
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.selector-container {
    margin: 10px 0;
}

select {
    padding: 5px;
    font-size: 14px;
}
</style>
