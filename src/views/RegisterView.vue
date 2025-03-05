<script setup>
import InputField from '../components/InputField.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();
const isPasswordVisible = ref(false);

const submitForm = async () => {
    const formData = {
        username: username.value,
        password: password.value,
        password2: password_confirmation.value,
    };

    try {
        const response = await axios.post('/register', formData);
        router.push('/')
    } catch (error) {
        alert(error.response?.data || error.message);
    }
}
</script>

<template>
    <main class="text-center">
        <form @submit.prevent="submitForm" class="form-signin">
            <h1>Inscription</h1>
            <InputField
                inputId="inputUsername"
                inputType="text"
                inputPlaceHolder="Nom d'utilisateur"
                v-model="username"
            />
            <InputField
                inputId="inputPwd"
                :inputType="isPasswordVisible ? 'text' : 'password'"
                inputPlaceHolder="Mot de passe"
                v-model="password"
            />
            <InputField
                inputId="inputSecondPwd"
                :inputType="isPasswordVisible ? 'text' : 'password'"
                inputPlaceHolder="Confirmation du mot de passe"
                v-model="password_confirmation"
            />
            <div class="form-check form-switch py-2">
                <input class="form-check-input" type="checkbox" id="showPwd" v-model="isPasswordVisible">
                <label class="form-check-label" for="showPwd">Afficher le mot de passe</label>
            </div>
            <button type="submit" class="btn btn-lg btn-dark btn-block">M'inscrire</button>
        </form>
    </main>
    <!-- Sign In card -->

    <!-- toggle button to view password and confirm password-->

</template>