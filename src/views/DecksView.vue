<script setup>
import NavBar from "../components/NavBar.vue";
import DeckBox from "../components/DeckBox.vue";
import { useDeckStore } from "../stores/deck.js";
import { onMounted } from "vue";

const deckStore = useDeckStore();

onMounted(() => {
  deckStore.getDecks();
});
</script>

<template>
  <NavBar />
  <DeckBox
    :decks="deckStore.decks"
    @create-deck="deckStore.createDeck"
    @select-deck="deckStore.getDeckInfo"
  />
</template>
