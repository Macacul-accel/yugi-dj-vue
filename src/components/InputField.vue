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
    <div class="form-floating">
        <input
            :type="props.inputType"
            :id="props.inputId"
            class="form-control"
            :placeholder="props.inputPlaceHolder"
            :value="props.modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            required
        >
        <label :for="props.inputId">{{ props.inputPlaceHolder }}</label>
    </div>
</template>