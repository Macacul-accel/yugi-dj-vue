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
// add success toast on update 
// add danger toast to indicate limit (main 60, extra 15)
</script>

<template>
  <NavBar />
  <DeckBuild />
  <DeckCardSearch />
</template>
