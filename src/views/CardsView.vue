<script setup>
import NavBar from "../components/NavBar.vue";
import CardBox from "../components/CardBox.vue";
import CardsPagination from "../components/CardsPagination.vue";
import FiltersList from "../components/FiltersList.vue";
import { useFilterStore } from "../stores/filters";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const filtersStore = useFilterStore();
const { filters } = storeToRefs(filtersStore);

onMounted(() => {
  filtersStore.fetchCards();
});
</script>

<template>
  <NavBar />

  <div class="container">
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

    <CardBox :cards="filtersStore.cards" />
  </div>
</template>
