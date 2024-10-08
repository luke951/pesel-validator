<template>
  <div class="container">
    <h1 class="title text-center">Home page</h1>
    <pesel-validator></pesel-validator>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
const PeselValidator = defineAsyncComponent(() => import('./components/PeselValidator/PeselValidator.vue'))
</script>