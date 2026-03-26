<script setup>
import Nav from './components/Nav.vue';
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl" />
    
    <div class="relative z-10">
      <Nav/>
      <router-view/>
    </div>
  </div>
</template>