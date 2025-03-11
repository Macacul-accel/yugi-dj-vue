import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import axios from "axios";

const initialFilters = {
    search: '',
    frame_type: '',
    spell_trap_race: '',
    type: '',
    monster_race: '',
    attribute: '',
    archetype: '',
    min_attack: '',
    max_attack: '',
    min_defense: '',
    max_defense: '',
    min_level_rank: '',
    max_level_rank: '',
    page_size: '',
};
export const useFilterStore = defineStore('filters', () => {
    const filters = ref({...initialFilters});
    const cards = ref([]);
    const count = ref(0);
    const nextPage = ref(null);
    const previousPage = ref(null);
    const isLoading = ref(false);

    const getQueryString = computed(() => {
        return Object.entries(filters.value)
            .filter(([_, value]) => value !== '' && value !== null)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&')
    });

    async function fetchCards(url = null) {
        isLoading.value = true
        try {
            const response = await axios.get(url || `/cards/?${getQueryString.value}`);
            count.value = response.data.count
            nextPage.value = response.data.next
            previousPage.value = response.data.previous
            cards.value = ''
            cards.value = response.data.results
        } catch(error) {
            cards.value = []
        } finally {
            isLoading.value = false
        }
    }
    function fetchNextPage() {
        if (nextPage.value) {
            fetchCards(nextPage.value)
        }
    }
    function fetchPreviousPage() {
        if (previousPage.value) {
            fetchCards(previousPage.value)
        }
    }
    function resetFilters() {
        Object.assign(filters.value, initialFilters)
        nextPage.value = null
        previousPage.value = null
        cards.value = []
        count.value = 0
        fetchCards()
    }

    watch(filters, fetchCards, {deep: true})

    return {
        filters, cards, count, isLoading, nextPage, previousPage,
        fetchCards, fetchNextPage, fetchPreviousPage, resetFilters
    }
})