<script setup>
import { Toast } from 'bootstrap';
import ToastMessage from './ToastMessage.vue';
import { useDeckStore } from "../stores/deck";
import { storeToRefs } from "pinia";

const showToast = (id) => {
  const toast = new Toast(document.getElementById(id), {delay: 2000})
  toast.show()
};
const deckStore = useDeckStore();
const {
  deckName,
  mainCards,
  extraCards,
  selectedDeck,
  currentDeck,
  mainDeckSize,
  extraDeckSize,
} = storeToRefs(deckStore);
const incrementCard = (card) => {
  const success = deckStore.increment(card);
  if (!success) {
    showToast('limitToast')
  } else {
    showToast('addToast')
}};
const decrementCard = (card) => deckStore.decrement(card);

const updateMyDeck = async () => {
  const success = await deckStore.updateDeck(deckName.value, mainCards.value, extraCards.value);
  if (!success) {
    showToast('updateFailToast')
  } else {
    showToast('updatedDeckToast')
}};
const delecteCurrentDeck = () => {
  if (confirm("Voulez-vous vraiment supprimer le deck ?")) {
    deckStore.deleteDeck();
    showToast('deletedDeckToast')
  }
};
</script>

<template>
  <!-- Deck Main/Extra -->
  <div class="container">
    <div class="text-center">
      <input v-model="deckName" @change="updateMyDeck" class="form-control text-center" />
    </div>
    <div class="row my-2 px-3 justify-content-around">
      <button class="col-3 btn btn-light fw-bold" @click="selectedDeck = 'Main'">
        Main deck ({{ mainDeckSize }})
      </button>
      <button class="col-3 btn btn-light fw-bold" @click="selectedDeck = 'Extra'">
        Extra deck ({{ extraDeckSize }})
      </button>
      <button class="col-4 btn btn-success" @click="updateMyDeck">
        Sauvegarder mon deck
      </button>
    </div>
    <!-- Deck content -->
    <div class="deck-container">
      <div class="row row-cols-md-4 row-cols-1 g-4">
        <div v-for="card in currentDeck" :key="card.id">
          <div class="col d-flex flex-column align-items-center">
            <span class="text-center my-1">{{ card.card_name }}</span>
            <img
              :src="card.card_image_url || card.image_url || '../assets/default.jpg'"
              loading="lazy"
              width="270px"
              height="370px"
            />
          </div>
          <div class="d-flex justify-content-around mt-2">
            <button class="col-4 btn btn-danger" @click="decrementCard(card)">-</button>
            <span class="text-center">{{ card.quantity }}</span>
            <button class="col-4 btn btn-success" @click="incrementCard(card)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <button class="btn btn-danger text-center w-50" @click="delecteCurrentDeck">
        Supprimer ce deck
      </button>
    </div>
  </div>
  <ToastMessage
    toastId="updatedDeckToast"
    toastColor="text-bg-success"
    toastMsg="Deck mis à jour"
  />
  <ToastMessage
    toastId="updateFailToast"
    toastColor="text-bg-danger"
    toastMsg="Trop de cartes dans le deck"
  />
  <ToastMessage
    toastId="deletedDeckToast"
    toastColor="text-bg-danger"
    toastMsg="Deck supprimé"
  />
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
.deck-container {
  height: 500px;
  overflow-y: auto;
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 8px;
}
.card-controls {
  display: flex;
  gap: 5px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
.btn {
  padding: 5px;
}
.card-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
