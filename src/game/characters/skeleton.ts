import Phaser from 'phaser'
import { Direction } from 'src/game/Walkable'
import BaseSprite from '../BaseSprite'

export default class Skeleton extends BaseSprite {
  constructor (scene:Phaser.Scene, x:number, y:number, texture = 'skeleton', frame = 0) {
    super(scene, x, y, texture, frame)

    this.setBodySize(10, 18)
    this.setOffset(26, 38)

    this.walkable?.idle(this.lastDirection)
  }

  static preload (scene:Phaser.Scene) {
    scene.load.spritesheet('skeleton', '/game/sprites/characters/skeleton.png', {
      frameWidth: 64,
      frameHeight: 64
    })
  }

  loadData () {
    this.setData('animations', [
      { key: 'idle-x', frames: this.anims.generateFrameNumbers('skeleton', { start: 0, end: 5 }), frameRate: 8, repeat: -1 },
      { key: 'walking-x', frames: this.anims.generateFrameNumbers('skeleton', { start: 6, end: 11 }), frameRate: 8, repeat: -1 },
      { key: 'slash-x', frames: this.anims.generateFrameNumbers('skeleton', { start: 12, end: 16 }), frameRate: 8 },
      { key: 'hurt', frames: this.anims.generateFrameNumbers('skeleton', { start: 18, end: 20 }), frameRate: 8 },
      { key: 'die', frames: this.anims.generateFrameNumbers('skeleton', { start: 24, end: 28 }), frameRate: 8 },
      { key: 'revive', frames: this.anims.generateFrameNumbers('skeleton', { start: 28, end: 24 }), frameRate: 8 }
    ])

    this.setData('walkable', {
      walkAnimations: {
        [Direction.up]: { key: 'walking-x' },
        [Direction.down]: { key: 'walking-x' },
        [Direction.left]: { key: 'walking-x', flipX: true },
        [Direction.right]: { key: 'walking-x' }
      },
      idleAnimations: {
        [Direction.up]: { key: 'idle-x' },
        [Direction.down]: { key: 'idle-x' },
        [Direction.left]: { key: 'idle-x', flipX: true },
        [Direction.right]: { key: 'idle-x' }
      },
      speed: 100,
      dust: true
    })
  }
}
