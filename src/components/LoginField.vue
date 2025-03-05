<script setup>
import InputField from '../components/InputField.vue'

const props = defineProps(['username', 'password']);
const emit = defineEmits(['update:username', 'update:password']);
</script>

<template>
    <InputField
        inputId="inputUsername"
        inputType="text"
        inputPlaceHolder="Nom d'utilisateur"
        :model-value="props.username"
        @update:model-value="emit('update:username', $event)"
    />
    <InputField
        inputId="inputPwd"
        inputType="password"
        inputPlaceHolder="Mot de passe"
        :model-value="props.password"
        @update:model-value="emit('update:password', $event)"
    />
</template>