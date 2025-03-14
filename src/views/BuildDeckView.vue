<script setup>
import NavBar from "../components/NavBar.vue";
import DeckBuild from "../components/DeckBuild.vue";
import DeckCardSearch from "../components/DeckCardSearch.vue";
import { useDeckStore } from "../stores/deck";
import { onMounted } from "vue";

const deckStore = useDeckStore();

onMounted(() => {
  deckStore.getDeckInfo();
});
</script>

<template>
  <NavBar />
  <DeckBuild />
  <DeckCardSearch />
</template>
