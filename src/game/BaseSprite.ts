import Phaser from 'phaser'
import Walkable, { Direction } from 'src/game/Walkable'

export type SpriteData = {
  animations?: Array<Phaser.Types.Animations.Animation>
}

export default class BaseSprite extends Phaser.Physics.Arcade.Sprite {
  lastDirection: Direction = Direction.down
  walkable?: Walkable

  constructor (scene:Phaser.Scene, x:number, y:number, texture: string | Phaser.Textures.Texture, frame?: string | number) {
    super(scene, x, y, texture, frame)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.loadData()
    this.init()
  }

  loadData () {
    // Implement in child to load configuration
  }

  init () {
    this.generateAnimations()
    this.setupWalkable()
  }

  generateAnimations () {
    const animations: Array<Phaser.Types.Animations.Animation> = this.data.get('animations')

    if (!animations) {
      return
    }

    animations.forEach(animation => {
      this.anims.create(animation)
    })
  }

  setupWalkable () {
    if (this.data.has('walkable')) {
      this.walkable = new Walkable(this)
    }
  }
}
