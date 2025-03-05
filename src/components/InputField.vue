<script setup>
const props = defineProps([
    'inputId',
    'inputType',
    'inputPlaceHolder',
    'modelValue',
]);
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <input
        :type="props.inputType"
        :id="props.inputId"
        class="form-control"
        :placeholder="props.inputPlaceHolder"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        required
    >
</template>