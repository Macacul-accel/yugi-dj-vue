<script setup>
const props = defineProps({
    inputId: String,
    inputType: String,
    inputPlaceHolder: String,
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="form-floating">
        <input
            :type="inputType"
            :id="inputId"
            class="form-control"
            :placeholder="inputPlaceHolder"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
            required
        >
        <label :for="inputId">{{ inputPlaceHolder }}</label>
    </div>
</template>
