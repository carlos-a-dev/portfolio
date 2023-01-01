import { Scene } from 'phaser'
import Player from './characters/player'

class Level1 extends Scene {
  preload () {
    // load game assets
    this.load.tilemapTiledJSON('level1', '/game/tilemaps/level1.json')
    this.load.image('plains', '/game/sprites/tilesets/plains.png')
    this.load.image('grass', '/game/sprites/tilesets/grass.png')
    this.load.image('water1', '/game/sprites/tilesets/water1.png')
    this.load.image('objects', '/game/sprites/objects/objects.png')

    Player.preload(this)
  }

  /** @this Phaser.Scene */
  create () {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.lastDirection = 'down'
    this.flip = false

    const map = this.make.tilemap({ key: 'level1' })
    map.addTilesetImage('player')
    map.addTilesetImage('plains')
    map.addTilesetImage('grass')
    map.addTilesetImage('water1')
    map.addTilesetImage('objects')
    map.createLayer('water', ['water1'])
    map.createLayer('island', ['grass', 'water1'])
    map.createLayer('trees', ['objects'])

    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player)
  }

  update () {
    this.player.update(this.cursors)
  }
}

export default Level1
