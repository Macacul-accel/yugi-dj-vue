<script setup>
import LoginField from '../components/LoginField.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('');
const password = ref('');
const router = useRouter();

const submitForm = async () => {
    const formData = {
        username: username.value,
        password: password.value,
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
        <a href="#" @click.prevent="router.push('/home')">
            <i class="bi bi-arrow-left"></i>Retour à la page d'accueil
        </a>
    </div>
    <main class="text-center">
        <form @submit.prevent="submitForm" class="form-signin">
            <h1>Connexion</h1>
            <LoginField v-model:username="username" v-model:password="password" />
            <button type="submit" class="btn btn-lg btn-dark btn-block">Me connecter</button>
        </form>
    </main>
    <!-- Sign In card -->

    <!-- toggle button to view password and confirm password-->

</template>