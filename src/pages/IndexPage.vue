<template>
  <q-page id="game" class="q-pa-0 q-ma-0">
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import Phaser from 'phaser'
import Level1 from 'src/game/level1'

onMounted(() => {
  const gameScale = 4

  /** @config Phaser.Types.Core.GameConfig */
  const config = {
    type: Phaser.AUTO,
    width: (document.getElementById('game').clientWidth / gameScale) * 0.99,
    height: (document.getElementById('game').clientHeight / gameScale) * 0.99,
    backgroundColor: '#2d2d2d',
    parent: 'game',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scale: {
      zoom: gameScale
    },
    scene: [
      Level1
    ]
  }

  const game = new Phaser.Game(config)
  game.scene.start('Level1')
})
</script>
