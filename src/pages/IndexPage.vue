<template>
  <q-page id="game" class="q-pa-0 q-ma-0">
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import Phaser from 'phaser'
import Boot from 'src/game/boot'
import Preload from 'src/game/preload'
import Game from 'src/game/game'

onMounted(() => {
  const zoom = 4
  const config = {
    type: Phaser.AUTO,
    width: (document.getElementById('game').clientWidth / zoom) * 0.98,
    height: (document.getElementById('game').clientHeight / zoom) * 0.98,
    backgroundColor: '#2d2d2d',
    parent: 'game',
    scale: {
      zoom
    }
  }

  const PortfolioGame = {}
  PortfolioGame.game = new Phaser.Game(config)
  PortfolioGame.game.scene.add('Boot', Boot)
  PortfolioGame.game.scene.add('Preload', Preload)
  PortfolioGame.game.scene.add('Game', Game)

  PortfolioGame.game.scene.start('Boot')
})
</script>
