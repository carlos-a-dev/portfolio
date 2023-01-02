import Phaser from 'phaser'
import Level1 from 'src/game/level1'

function init (containerId, gameScale = 4) {
  /** @config Phaser.Types.Core.GameConfig */
  const config = {
    type: Phaser.AUTO,
    width: (document.getElementById(containerId).clientWidth / gameScale) * 0.99,
    height: (document.getElementById(containerId).clientHeight / gameScale) * 0.99,
    backgroundColor: '#2d2d2d',
    parent: containerId,
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
}

export default {
  init
}
