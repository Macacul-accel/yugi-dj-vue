<script setup>
import { watch } from "vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    const appDiv = document.getElementById("app");

    if (["/login", "/register"].includes(newPath)) {
      appDiv.classList.remove("flex-column", "min-vh-100");
      appDiv.classList.add("align-items-center", "py-4", "bg-body-tertiary");
    } else {
      appDiv.classList.remove("align-items-center", "py-4", "bg-body-tertiary");
      appDiv.classList.add("flex-column", "min-vh-100");
    }
  },
  { immediate: true }
);
</script>


<template>

  <RouterView />
</template>