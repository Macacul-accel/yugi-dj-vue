<script setup>
import RangeFilterField from "./RangeFilterField.vue";
import SelectFilterField from "./SelectFilterField.vue";
import {
  PAGE_SIZE,
  FRAME_TYPE,
  SPELL_TRAP_RACE,
  TYPE,
  MONSTER_RACE,
  ATTRIBUTE,
  ARCHETYPE,
} from "../constants/options.js";

const props = defineProps(["filters"]);
</script>

<template>
  <div class="pt-5">
    <h1 class="my-5">Liste des cartes</h1>
    <!-- Filter box -->
    <form @change="$emit('new-filters')">
      <div class="form-group d-flex align-items-center position relative">
        <input
          type="search"
          v-model="filters.search"
          placeholder="Search by name"
          class="form-control form-control-lg"
          @keydown.enter.prevent=""
        />
      </div>
      <div class="toggle-buttons d-flex justify-content-center align-items-center py-5">
        <a
          class="filter-button"
          data-bs-toggle="collapse"
          data-bs-target="#toggleSearchFilters"
          aria-expanded="false"
          aria-controls="toggleSearchFilters"
        >
          <i class="fas fa-filter"></i>
        </a>

        <!-- Select filters -->
        <SelectFilterField
          labelPlaceholder="Cards on page :"
          class="px-5"
          v-model="filters.page_size"
          :options="PAGE_SIZE"
        />
      </div>
      <div class="p-3 border rounded collapse" id="toggleSearchFilters">
        <div class="d-flex justify-content-center flex-wrap">
          <SelectFilterField
            labelPlaceholder="Card type"
            class=""
            v-model="filters.frame_type"
            :options="FRAME_TYPE"
          />
          <SelectFilterField
            labelPlaceholder="Spell Trap type"
            class=""
            v-model="filters.spell_trap_race"
            :options="SPELL_TRAP_RACE"
          />
          <SelectFilterField
            labelPlaceholder="Monster type"
            class=""
            v-model="filters.type"
            :options="TYPE"
          />
          <SelectFilterField
            labelPlaceholder="Monster race"
            class=""
            v-model="filters.monster_race"
            :options="MONSTER_RACE"
          />
          <SelectFilterField
            labelPlaceholder="Attribute"
            class=""
            v-model="filters.attribute"
            :options="ATTRIBUTE"
          />
          <SelectFilterField
            labelPlaceholder="Archetype"
            class=""
            v-model="filters.archetype"
            :options="ARCHETYPE"
          />

          <!-- Range filters -->
          <RangeFilterField
            labelPlaceholder="Attack :"
            :minValue="0"
            :maxValue="5000"
            :stepValue="50"
            v-model:modelValueMin="filters.min_attack"
            v-model:modelValueMax="filters.max_attack"
          />
          <RangeFilterField
            labelPlaceholder="Defense :"
            :minValue="0"
            :maxValue="5000"
            :stepValue="50"
            v-model:modelValueMin="filters.min_defense"
            v-model:modelValueMax="filters.max_defense"
          />
          <RangeFilterField
            labelPlaceholder="Level/Rank :"
            :minValue="0"
            :maxValue="13"
            :stepValue="1"
            v-model:modelValueMin="filters.min_level_rank"
            v-model:modelValueMax="filters.max_level_rank"
          />
          <div class="d-flex justify-content-center py-4">
            <button type="button" @click="$emit('reset-filters')" class="btn btn-danger">
              Reset filters
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.fas.fa-filter {
  font-size: 30px;
  color: #ffff;
}
.filter-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1.5px solid #ccc;
  background-color: #6b6b6b;
}
</style>
