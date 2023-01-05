import Phaser, { Scene } from 'phaser'
import Player from './characters/player'
import Chest from './objects/chest'

class Level1 extends Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  lastDirection: string
  flip: boolean
  chest!: Chest
  player!: Player
  myLight!: Phaser.GameObjects.Light

  constructor (config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config)

    this.lastDirection = 'down'
    this.flip = false
  }

  preload () {
    // load game assets
    this.load.tilemapTiledJSON('level1', '/game/tilemaps/level1.json')
    this.load.image('plains', '/game/sprites/tilesets/plains.png')
    this.load.image('grass', '/game/sprites/tilesets/grass.png')
    this.load.image('water', '/game/sprites/tilesets/water.png')
    this.load.image('objects', '/game/sprites/objects/objects.png')
    this.load.spritesheet('dust', '/game/sprites/particles/dust_particles_01.png', {
      frameWidth: 12,
      frameHeight: 12
    })

    this.load.scenePlugin('AnimatedTiles', '/game/plugins/AnimatedTiles.js', 'animatedTiles', 'animatedTiles')

    Player.preload(this)
    Chest.preload(this)
  }

  /** @this Phaser.Scene */
  create () {
    const map = this.make.tilemap({ key: 'level1' })
    map.addTilesetImage('grass')
    map.addTilesetImage('water')
    map.addTilesetImage('objects')
    map.createLayer('water', ['water']).setPipeline('Light2D')
    map.createLayer('island', ['grass', 'water']).setPipeline('Light2D')
    map.createLayer('trees', ['objects']).setPipeline('Light2D')

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: There was no other way
    this.sys.animatedTiles.init(map)

    this.cursors = this.input.keyboard.createCursorKeys()

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
