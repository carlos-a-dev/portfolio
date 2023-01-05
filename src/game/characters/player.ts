import Phaser from 'phaser'
import { Direction } from 'src/game/Walkable'
import BaseSprite from '../BaseSprite'

export default class Player extends BaseSprite {
  constructor (scene:Phaser.Scene, x:number, y:number, texture = 'player', frame = 0) {
    super(scene, x, y, texture, frame)

    this.setBodySize(16, 22)
    this.setOffset(16, 20)

    this.walkable?.idle(this.lastDirection)
  }

  static preload (scene:Phaser.Scene) {
    scene.load.spritesheet('player', '/game/sprites/characters/player.png', {
      frameWidth: 48,
      frameHeight: 48
    })
  }

  loadData () {
    this.setData('animations', [
      { key: 'idle-down', frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }), frameRate: 8, repeat: -1 },
      { key: 'idle-x', frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }), frameRate: 8, repeat: -1 },
      { key: 'idle-up', frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }), frameRate: 8, repeat: -1 },
      { key: 'walking-down', frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }), frameRate: 8, repeat: -1 },
      { key: 'walking-x', frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }), frameRate: 8, repeat: -1 },
      { key: 'walking-up', frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }), frameRate: 8, repeat: -1 },
      { key: 'slash-down', frames: this.anims.generateFrameNumbers('player', { start: 36, end: 39 }), frameRate: 8 },
      { key: 'slash-x', frames: this.anims.generateFrameNumbers('player', { start: 42, end: 45 }), frameRate: 8 },
      { key: 'slash-up', frames: this.anims.generateFrameNumbers('player', { start: 48, end: 51 }), frameRate: 8 },
      { key: 'die', frames: this.anims.generateFrameNumbers('player', { start: 54, end: 56 }), frameRate: 8 },
      { key: 'revive', frames: this.anims.generateFrameNumbers('player', { start: 56, end: 54 }), frameRate: 8 }
    ])

    this.setData('walkable', {
      walkAnimations: {
        [Direction.up]: { key: 'walking-up' },
        [Direction.down]: { key: 'walking-down' },
        [Direction.left]: { key: 'walking-x', flipX: true },
        [Direction.right]: { key: 'walking-x' }
      },
      idleAnimations: {
        [Direction.up]: { key: 'idle-up' },
        [Direction.down]: { key: 'idle-down' },
        [Direction.left]: { key: 'idle-x', flipX: true },
        [Direction.right]: { key: 'idle-x' }
      },
      speed: 100,
      dust: true
    })
  }
}
