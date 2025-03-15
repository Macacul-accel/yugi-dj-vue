import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from "../axios.js";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(localStorage.getItem('user') || null);
    const token = ref(localStorage.getItem('token') || null);
    const errorMessage = ref([]);
    const isSubmitting = ref(false);
    const isAuthenticated = computed(() => !!token.value);

    async function login(formData) {
        isSubmitting.value = true
        try {
            const response = await api.post('/login/', formData);

            if (response.data.token) {
                token.value = response.data.token
                localStorage.setItem('user', formData.username)
                user.value = formData.username
                localStorage.setItem('token', token.value)
                errorMessage.value = []
                return true
            }
        } catch (error) {
            if (error.response.status === 401) {
                errorMessage.value = "Nom d'utilisateur ou mot de passe incorrect"
            }
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    async function register(formData) {
        isSubmitting.value = true
        try {
            const response = await api.post('/register/', formData);
            if (response.status === 201) {
                errorMessage.value = []
                return true
            }
        } catch (error) {
            errorMessage.value = error.response?.data?.password || "Une erreur est survenue, veuillez réessayer"
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    async function logout() {
        isSubmitting.value = true
        try {
            const response = await api.post('/logout/');

            if (response.status === 200) {
                user.value = null
                localStorage.removeItem('token')
                token.value = null
                errorMessage.value = []
                return true
            }
        } catch (error) {
            errorMessage.value = "Une erreur est survenue, veuillez réessayer"
            return false
        } finally {
            isSubmitting.value = false
        }
    }

    return {
        user, isAuthenticated, errorMessage, isSubmitting,
        login, register, logout
    }
})