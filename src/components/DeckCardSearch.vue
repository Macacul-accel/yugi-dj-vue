<script setup>
import { Toast } from 'bootstrap';
import FiltersList from "./FiltersList.vue";
import CardsPagination from "./CardsPagination.vue";
import { useFilterStore } from "../stores/filters";
import { useDeckStore } from "../stores/deck";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const showToast = (id) => {
  const toast = new Toast(document.getElementById(id), {delay: 2000})
  toast.show()
};

const filtersStore = useFilterStore();
const { cards, isLoading, filters } = storeToRefs(filtersStore);

const deckStore = useDeckStore();

const selectedCard = ref(null);

const selectCard = (card) => {
  selectedCard.value = card;
};
const incrementCard = (card) => {
  const success = deckStore.increment(card);
  if (!success) {
    showToast('limitToast')
  } else {
    showToast('addToast')
}};
onMounted(() => {
  filtersStore.fetchCards();
});
</script>

<template>
  <div class="container">
    <!-- Selected Card -->
    <div v-if="selectedCard" class="selected-card-container">
      <div class="row border px-2 mb-2">
        <!-- Card image -->
        <div class="col-sm-6 col-md-4 my-3 d-flex justify-content-center">
          <img
            :src="selectedCard.image_url || '../assets/default.jpg'"
            :alt="selectedCard.name"
            loading="lazy"
            class="card-img"
          />
        </div>

        <!-- Card detail -->
        <div class="col-sm-6 col-md-8 mt-3">
          <div class="text-center col">
            <span>{{ selectedCard.name }}</span>
          </div>
          <div class="col d-flex justify-content-between my-3">
            <span>{{ selectedCard.type }}</span>
            <span
              v-if="
                selectedCard.type === 'Trap Card' || selectedCard.type === 'Spell Card'
              "
            >
              {{ selectedCard.spell_trap_race }}
            </span>
            <span>{{ selectedCard.monster_race }}</span>
            <span v-if="selectedCard.attribute">{{ selectedCard.attribute }}</span>
            <span v-if="selectedCard.archetype">{{ selectedCard.archetype }}</span>
          </div>
          <div class="col d-flex justify-content-between my-3">
            <span v-if="selectedCard.level_rank">
              LVL: {{ selectedCard.level_rank }}</span
            >
            <span v-if="selectedCard.attack">ATK: {{ selectedCard.attack }} </span>
            <span v-if="selectedCard.defense">DEF: {{ selectedCard.defense }} </span>
          </div>
          <div class="text-start">
            <span>{{ selectedCard.effect }}</span>
          </div>
        </div>
      </div>
    </div>

    <FiltersList
      :filters="filters"
      @new-filters="filtersStore.fetchCards"
      @reset-filters="filtersStore.resetFilters"
    />
    <CardsPagination
      :previous="filtersStore.previousPage"
      :next="filtersStore.nextPage"
      :count="filtersStore.count"
      @previous-page="filtersStore.fetchPreviousPage"
      @next-page="filtersStore.fetchNextPage"
    />

    <!-- Cards List -->
    <div v-if="isLoading" class="loader">Chargement en cours...</div>
    <div v-else class="scroll-container">
      <div class="row row-cols-md-4 row-cols-1 g-4">
        <div v-for="card in cards" :key="card.id">
          <div class="card-wrapper col d-flex flex-column">
              <span class="text-center my-1">{{ card.name }}</span>
            <a href="#" @click="selectCard(card)">
              <img
                :src="card.image_url || '../assets/default.jpg'" 
                loading="lazy"
                width="270px"
                height="370px"
              />
            </a>
          </div>
          <div class="d-flex justify-content-around mt-2">
            <button class="col-4 btn btn-success" @click="incrementCard(card)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToastMessage
    toastId="limitToast"
    toastColor="text-bg-danger"
    toastMsg="Nombre de cartes maximum atteint"
  />
  <ToastMessage
    toastId="addToast"
    toastColor="text-bg-success"
    toastMsg="Carte ajouté au deck"
  />
</template>

<style scoped>
.selected-card-container {
  border: 2px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: grey;
  border-radius: 8px;
}
.scroll-container {
  height: 500px;
  overflow-y: auto;
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
.card-wrapper {
  display: flex;
  align-items: center;
  transition: transform 0.2s ease-in-out;
}
.card-wrapper:hover {
  transform: scale(1.05);
}
.card-img {
  width: 100%;
  max-width: 270px;
  height: auto;
  max-height: 370px;
  border-radius: 8px;
}
</style>
