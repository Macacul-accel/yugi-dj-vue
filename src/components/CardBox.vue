<script setup>
const props = defineProps({
  cards: Object,
  loading: Boolean,
});
</script>

<template>
  <!-- Card list -->
  <div v-if="loading" class="loader">Chargement en cours...</div>
  <div v-else>
    <div v-if="cards" class="border rounded">
      <div v-for="card in cards" :key="card.id" class="border px-2">
        <div class="row mb-2">
          <!-- Card image -->
          <div class="col-sm-6 col-md-4 my-3 d-flex justify-content-center">
            <img
              :src="card.image_url || '../assets/default.jpg'"
              :alt="card.name"
              loading="lazy"
              width="270px"
              height="370px"
            />
          </div>

          <!-- Card detail -->
          <div class="col-sm-6 col-md-8 mt-3">
            <div class="text-center col">
              <h3>{{ card.name }}</h3>
            </div>
            <div class="col d-flex justify-content-between my-3">
              <span>{{ card.type }}</span>
              <span v-if="card.type === 'Trap Card' || card.type === 'Spell Card'">
                {{ card.spell_trap_race }}
              </span>
              <span>{{ card.monster_race }}</span>
              <span v-if="card.attribute">{{ card.attribute }}</span>
              <span v-if="card.archetype">{{ card.archetype }}</span>
            </div>
            <div class="col d-flex justify-content-between my-3">
              <span v-if="card.level_rank"> LVL: {{ card.level_rank }}</span>
              <span v-if="card.attack">ATK: {{ card.attack }} </span>
              <span v-if="card.defense">DEF: {{ card.defense }} </span>
            </div>
            <div class="text-start">
              <span>{{ card.effect }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span v-else>Aucune carte ne correspond à ce filtre.</span>
  </div>
</template>
