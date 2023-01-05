import Phaser from 'phaser'
import Level1 from 'src/game/level1'

function init (containerId:string) {
  /** @config Phaser.Types.Core.GameConfig */
  const container = document.getElementById(containerId)
  if (!container) {
    console.error('Can not find container')
    return
  }
  const config = {
    type: Phaser.AUTO,
    width: container.clientWidth,
    height: container.clientHeight,
    parent: containerId,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: [
      Level1
    ]
  }

  const game = new Phaser.Game(config)
  game.scene.start('Level1')

  window.addEventListener('resize', () => {
    game.scale.resize(container.clientWidth, container.clientHeight)
  })
}

export default {
  init
}
