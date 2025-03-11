<script setup>
const props = defineProps({
    previous: String,
    next: String,
    count: Number,
})
</script>

<template>
    <div class="pagination justify-content-center align-items-center py-3 mt-4">
        <button :disabled="!previous" @click="$emit('previous-page')" class="page-link rounded px-3">
            &lsaquo; Previous
        </button>
        <span class="px-2">{{ count }} cards</span>
        <button :disabled="!next" @click="$emit('next-page')" class="page-link rounded px-3">
            Next &rsaquo;
        </button>
    </div>
</template>

<style scoped>
.page-link {
    border: 1px solid #ccc;
    background-color: #6b6b6b;
    color: #ffff;
}
</style>