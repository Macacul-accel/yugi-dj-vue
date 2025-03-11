<script setup>
import NavBar from '../components/NavBar.vue';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

</script>

<template>
    <NavBar/>
    <div class="container px-3 text-center w-100 my-auto">
    
    <section v-if="authStore.isAuthenticated">
        <h1>Bienvenue {{ authStore.user }}!</h1>
        <p class="lead">Que souhaites-tu faire ? Rechercher certaines cartes ? Construire un deck ?</p>
    </section>
    <section v-else>
        <h1>Bienvenue duelliste!</h1>
        <p class="lead">Le site ultime pour tous les fans du jeu de carte Yu-gi-oh!. Pour avoir accès à toutes les fonctionnalités, inscrivez-vous.</p>
        <p class="lead">
            <RouterLink to="/register" class="mx-1"><button class="btn btn-lg btn-light fw-bold">M'inscrire</button></RouterLink>
            <RouterLink to="/login" class="mx-1"><button class="btn btn-lg btn-light fw-bold">Me connecter</button></RouterLink>
        </p>
    </section>
    </div>

    <footer class="text-center text-white-50">
      <p>Created with <a href="https://www.djangoproject.com/" class="text-white">Django</a>, by <a href="https://github.com/Macacul-accel/" class="text-white">Macacul</a>.</p>
    </footer>
</template>
