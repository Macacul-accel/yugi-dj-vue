<script setup>
const props = defineProps({
    labelPlaceholder: String,
    options: Array,
    modelValue: String,
    divClass: String,
});
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <div class="form-group"
        :class="divClass"
        >
        <label>{{ labelPlaceholder }}</label>
        <select
            class="form-select"
            :value="modelValue"
            @change="emit('update:modelValue', $event.target.value)"
        >
            <option 
                v-for="(option, index) in props.options"
                :key="index"
                :value="option.value"
                >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>