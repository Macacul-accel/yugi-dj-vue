<script setup>
const props = defineProps({
    labelPlaceholder: String,
    minValue: Number,
    maxValue: Number,
    stepValue: Number,
    modelValueMin: String,
    modelValueMax: String,
});
const emit = defineEmits(['update:modelValueMin', 'update:modelValueMax']);
</script>

<template>
    <div class="form-group py-3 px-4">
        <label>{{ labelPlaceholder }}</label>
        <input
            class="range-slider"
            type="range"
            :min="minValue"
            :max="maxValue"
            :step="stepValue"
            :value="modelValueMin"
            @input="emit('update:modelValueMin', $event.target.value)"
        >
        <span>{{ modelValueMin }}</span>
        <input
            class="range-slider"
            type="range"
            :min="minValue"
            :max="maxValue"
            :step="stepValue"
            :value="modelValueMax"
            @input="emit('update:modelValueMax', $event.target.value)"
        >
        <span>{{ modelValueMax }}</span>
    </div>
</template>