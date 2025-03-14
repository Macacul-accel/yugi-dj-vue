<script setup>
const props = defineProps({
  decks: Object,
});
const emit = defineEmits();

const selectDeck = (deckId) => emit("select-deck", deckId);
</script>

<template>
  <div class="container">
    <h1 class="my-5 pt-5">Mes decks</h1>
    <div class="row row-cols-md-2 row-cols-1 g-4">
      <!-- Create new deck -->
      <div class="col d-flex flex-column align-items-center">
        <p class="invisible">Hehehehe</p>
        <img src="../assets/create_deck.jpg" loading="lazy" width="270" height="370" />
        <button
          type="button"
          @click="$emit('create-deck')"
          class="btn btn-lg btn-light fw-bold my-2 w-100"
        >
          Create deck
        </button>
      </div>
      <!-- List of users' decks -->
      <div
        v-for="deck in decks.slice().reverse()"
        :key="deck.id"
        class="col d-flex flex-column align-items-center"
      >
        <h3 class="text-center">{{ deck.name }}</h3>
        <img src="../assets/deck-box.jpg" loading="lazy" width="270" height="370" />
        <span>Main({{ deck.main_deck_total }})</span>
        <span>Extra({{ deck.extra_deck_total }})</span>
        <button
          type="button"
          @click="selectDeck(deck.id)"
          class="btn btn-lg btn-light fw-bold my-2 w-100"
        >
          Améliorer mon deck
        </button>
      </div>
    </div>
  </div>
</template>
