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
    map.createLayer('water', ['water']).setPipeline('Light2D')
    map.createLayer('island', ['grass', 'water']).setPipeline('Light2D')
    map.createLayer('trees', ['objects']).setPipeline('Light2D')
    this.sys.animatedTiles.init(map)

    this.chest = new Chest(this, 200, 150)
    this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2)
    this.player.setPipeline('Light2D')

    this.myLight = this.lights.addLight(0, 0, 70)
    this.lights.enable().setAmbientColor(0x777777)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setZoom(4)

    this.physics.add.collider(this.player, this.chest)
  }

  update () {
    this.player.update(this.cursors)
    this.myLight.setPosition(this.player.x, this.player.y)
  }
}

export default Level1
