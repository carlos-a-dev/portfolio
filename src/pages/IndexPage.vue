<template>
  <q-page id="game" class="q-pa-0 q-ma-0">
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import Game from 'src/game/main'
onMounted(() => {
  Game.init('game', 4)
})
</script>
