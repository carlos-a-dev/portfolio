<template>
  <q-page id="game">
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Game from 'src/game/main'

onMounted(() => {
  Game.init('game')
})
</script>
