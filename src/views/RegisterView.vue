<script setup>
import InputField from '../components/InputField.vue'
import LoginField from '../components/LoginField.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();

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
    <div class="position-fixed" style="top: 10px; left:10px;">
        <a href="{% url 'home' %}">
            <i class="bi bi-arrow-left"></i>Retour à la page d'accueil
        </a>
    </div>
    <main class="text-center">
        <form @submit.prevent="submitForm" class="form-signin">
            <h1>Inscription</h1>
            <LoginField v-model:username="username" v-model:password="password" />
            <InputField
                inputId="inputSecondPwd"
                inputType="password"
                inputPlaceHolder="Confirmation du mot de passe"
                v-model="password_confirmation"
            />
            <button type="submit" class="btn btn-lg btn-dark btn-block">M'inscrire</button>
        </form>
    </main>
    <!-- Sign In card -->

    <!-- toggle button to view password and confirm password-->

</template>