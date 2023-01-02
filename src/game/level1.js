import { Scene } from 'phaser'
import Player from './characters/player'
import Chest from './objects/chest'

class Level1 extends Scene {
  preload () {
    // load game assets
    this.load.tilemapTiledJSON('level1', '/game/tilemaps/level1.json')
    this.load.image('plains', '/game/sprites/tilesets/plains.png')
    this.load.image('grass', '/game/sprites/tilesets/grass.png')
    this.load.image('water', '/game/sprites/tilesets/water.png')
    this.load.image('objects', '/game/sprites/objects/objects.png')

    this.load.scenePlugin('AnimatedTiles', '/game/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles')

    Player.preload(this)
    Chest.preload(this)
  }

  /** @this Phaser.Scene */
  create () {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.lastDirection = 'down'
    this.flip = false

    const map = this.make.tilemap({ key: 'level1' })
    map.addTilesetImage('grass')
    map.addTilesetImage('water')
    map.addTilesetImage('objects')
    map.createLayer('water', ['water'])
    map.createLayer('island', ['grass', 'water'])
    map.createLayer('trees', ['objects'])
    this.sys.animatedTiles.init(map)

    this.chest = new Chest(this, 200, 150)
    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player)
  }

  update () {
    this.player.update(this.cursors)
  }
}

export default Level1
