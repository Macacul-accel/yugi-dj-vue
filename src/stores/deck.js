import { defineStore } from "pinia";
import { computed, ref } from "vue";
import api from "../axios.js";
import { useRouter } from "vue-router";

export const useDeckStore = defineStore('decks', () => {
    const router = useRouter();
    const decks = ref([]);
    const deckId = ref(localStorage.getItem('deckId') || null);
    const deckName = ref(localStorage.getItem('deckName') || null);
    const mainCards = ref([]);
    const extraCards = ref([]);
    const mainCardsTotal = ref(0);
    const extraCardsTotal = ref(0);
    const selectedDeck = ref('Main');

    const currentDeck = computed(() =>
        selectedDeck.value === 'Main'? mainCards.value : extraCards.value
    );
    const deckNumber = computed(() => {
        return decks.value.length
    });
    const mainDeckSize = computed(() => {
        return mainCards.value.reduce((sum, card) => sum + card.quantity, 0) 
    })
    const extraDeckSize = computed(() => {
        return extraCards.value.reduce((sum, card) => sum + card.quantity, 0)
    })


    function increment(card) {
        const cardPosition = card.is_extra ? extraCards.value : mainCards.value;
        const found = cardPosition.find(c => c.id === card.id);
        if (found && found.quantity < 3) {
            found.quantity++
        } else if (!found) {
            cardPosition.push({
                id: card.id,
                card_name: card.name,
                card_image_url: card.image_url,
                quantity: 1
            })
        }
    }
    function decrement(card) {
        const cardPosition = card.is_extra ? extraCards.value : mainCards.value;
        const foundIndex = cardPosition.findIndex(c => c.id === card.id);
        if (foundIndex !== -1) {
            if (cardPosition[foundIndex].quantity > 1) {
                cardPosition[foundIndex].quantity--
            } else {
                cardPosition.splice(foundIndex, 1)
            }
        }
    }

    async function getDecks() {
        try {
            const response = await api.get('/decks/');
            decks.value = response.data.results
        } catch(error) {
            if (error.response.status === 401) {
                router.push('/login')
            }
        }
    }
    async function createDeck() {
        try {
            const response = await api.post('/decks/',
                {name: `Nouveau deck (${deckNumber.value})`},
            );
            deckId.value = response.data.id
            localStorage.setItem('deckId', response.data.id)
            deckName.value = response.data.name
            localStorage.setItem('deckName', response.data.name)

            router.push(`/decks/${deckName.value}`)
        } catch(error) {
            if (error.response.status === 401) {
                router.push('/login')
            }
        }
    }
    async function getDeckInfo(id = localStorage.getItem('deckId')) {
        try {
            deckId.value = id
            localStorage.setItem('deckId', id)
            const response = await api.get(`/decks/${id}/`)

            deckName.value = response.data.name
            localStorage.setItem('deckName', response.data.name)
            mainCards.value = response.data.main_cards
            extraCards.value = response.data.extra_cards
            mainCardsTotal.value = response.data.main_deck_total
            extraCardsTotal.value = response.data.extra_deck_total

            router.push(`/decks/${deckName.value}`)
        } catch(error) {
            if (error.response.status === 401) {
                router.push('/login')
            }
        }
    }
    async function updateDeck(name, main_cards, extra_cards, id = localStorage.getItem('deckId')) {
        try {
            const deckData = {
                extra_cards: extra_cards.map(card => ({
                    id: card.id,
                    quantity: card.quantity
                })),
                main_cards: main_cards.map(card => ({
                    id: card.id,
                    quantity: card.quantity
                })),
                name: name,
            }
            console.log(deckData)
            const response = await api.put(`/decks/${id}/`, deckData);

            deckId.value = response.data.id
            localStorage.setItem('deckId', response.data.id)

        } catch(error) {
            if (error.response.status === 401) {
                router.push('/login')
            }
        }
    }
    async function deleteDeck(id = localStorage.getItem('deckId')) {
        try {
            const response = await api.delete(`/decks/${id}/`);

            localStorage.removeItem('deckId')
            localStorage.removeItem('deckName')
            if (response.status === 204) {
                router.push('/decks')
            }
        } catch(error) {
            if (error.response.status === 401) {
                router.push('/login')
            }
            if (error.response.status === 404) {
                router.push('/decks')
            }
        }
    }

    return {
        decks, deckName, mainCards, extraCards,
        mainDeckSize, extraDeckSize,
        selectedDeck,currentDeck,
        increment, decrement,
        createDeck, getDecks, getDeckInfo, updateDeck, deleteDeck
    }
})