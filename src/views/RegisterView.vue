<script setup>
import { Toast } from 'bootstrap';
import ToastMessage from '../components/ToastMessage.vue';
import InputField from '../components/InputField.vue'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const password_confirmation = ref('');
const router = useRouter();
const isPasswordVisible = ref(false);
const errorMessage = ref('');

const submitForm = async () => {
    const formData = {
        username: username.value,
        password: password.value,
        password2: password_confirmation.value,
    };
    const registered = await authStore.register(formData);
    if (!registered) {
        errorMessage.value = authStore.errorMessage
        const toast = new Toast(document.getElementById('errorToast'), {delay: 2000})
        toast.show()
    } else {
        router.push('/login')
    }
}
</script>

<template>
    <!-- Redirect home link -->
    <div class="position-fixed" style="top: 10px; left:10px;">
        <RouterLink to="/">
            <i class="fas fa-arrow-left"></i> Retour à la page d'accueil
        </RouterLink>
    </div>
    <!-- Register card -->
    <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submitForm">
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
            <p class="mb-2"><RouterLink to="login">J'ai déjà un compte</RouterLink></p>
            <button type="submit" :disabled="authStore.isSubmitting" class="btn btn-dark w-100">M'inscrire</button>

            <ToastMessage
                toastId="errorToast"
                toastColor="text-bg-danger"
                :toastMsg="errorMessage"
            />
        </form>
    </main>
</template>