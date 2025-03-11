<script setup>
import { Toast } from 'bootstrap';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();

const toLogOut = async () => {
    const logOut = await authStore.logout()

    if (logOut) {
        const toast = new Toast(document.getElementById('logoutToast'));
        toast.show()
    }
}
</script>

<template>
    <header class="cover-container w-100 p-3 mx-auto">
        <div>
            <h3 class="float-md-start text-center mb-0">Yugi-Django</h3>
            <nav class="nav nav-masthead justify-content-center float-md-end">
                <RouterLink to="/" class="nav-link fw-bold py-1 px-0" active-class="active">Accueil</RouterLink>
                <RouterLink to="/cards" class="nav-link fw-bold py-1 px-0" active-class="active">Cards</RouterLink>
                <RouterLink to="/decks" class="nav-link fw-bold py-1 px-0" active-class="active">Decks</RouterLink>
                <RouterLink to="/features" class="nav-link fw-bold py-1 px-0" active-class="active">Features</RouterLink>
                <a
                    v-show="authStore.isAuthenticated"
                    type="button"
                    class="nav-link fw-bold py-1 px-0"
                    id="logoutToastBtn"
                    @click.prevent="toLogOut"
                >
                Déconnexion
                </a>
            </nav>
        </div>
    </header>
    <div class="position-fixed bottom-0 end-0 p-3">
        <div id="logoutToast" class="toast text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    Déconnecté
                </div>
                <button type="button" class="btn-close button close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav-masthead .nav-link {
  color: rgba(255, 255, 255, .5);
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

.nav-masthead .active {
  color: #fff;
  border-bottom-color: #fff;
}
</style>