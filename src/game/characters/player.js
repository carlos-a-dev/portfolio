import Phaser from 'phaser'
import AnimatedParticle from 'src/game/particles/AnimatedParticle'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  /**
   *
   * @param {Phaser.Scene} scene
   * @param {int} x
   * @param {int} y
   * @param {string} texture
   * @param {int} frame
   */
  constructor (scene, x, y, texture = 'player', frame = 0) {
    super(scene, x, y, texture, frame)

    this._generateAnimations(8)

    this.dust = scene.add.particles('dust').createEmitter({
      on: false,
      frequency: 100,
      lifespan: 150,
      follow: this,
      followOffset: new Phaser.Math.Vector2(0, 16),
      particleClass: AnimatedParticle
    })
    this.dust.animation = this.anims.get('dustin')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.lastDirection = 'down'
    this.alive = true

    this.idle()

    scene.input.keyboard.on('keydown-SPACE', () => {
      this.slash()
    })

    scene.input.keyboard.on('keydown-A', () => {
      this.die()
    })
    scene.input.keyboard.on('keydown-S', () => {
      this.revive()
    })
  }

  /**
   * @param {Phaser.Scene} scene
   */
  static preload (scene) {
    scene.load.spritesheet('player', '/game/sprites/characters/player.png', {
      frameWidth: 48,
      frameHeight: 48
    })
    scene.load.spritesheet('dust', '/game/sprites/particles/dust_particles_01.png', {
      frameWidth: 12,
      frameHeight: 12
    })
  }

  /**
   * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursors
   */
  update (cursors) {
    if (!this.alive) {
      return
    }
    this.setVelocity(0, 0)
    if (this.anims.isPlaying && this.anims.currentAnim.key.startsWith('slash-')) {
      return
    }

    let walking = false
    let velocityX = 0
    let velocityY = 0

    if (cursors.up.isDown) {
      velocityY -= 1
      this.lastDirection = 'up'
      walking = true
    } else if (cursors.down.isDown) {
      velocityY += 1
      this.lastDirection = 'down'
      walking = true
    }
    if (cursors.left.isDown) {
      this.setFlipX(true)
      velocityX -= 1
      this.lastDirection = 'left'
      walking = true
    } else if (cursors.right.isDown) {
      this.setFlipX(false)
      velocityX += 1
      this.lastDirection = 'right'
      walking = true
    }

    if (velocityY && velocityX) {
      velocityX *= 0.6
      velocityY *= 0.6
    }

    this.setVelocity(velocityX * 100, velocityY * 100)

    if (walking) {
      this.walk()
    }

    this.dust.setSpeedX(-velocityX * 100)
    this.dust.setSpeedY(-velocityY * 100)
    this.dust.on = walking

    if (!this.anims.isPlaying) {
      this.idle()
    }
  }

  idle () {
    if (!this.alive) {
      return
    }
    switch (this.lastDirection) {
      case 'left':
      case 'right':
        this.play('idle-x', true)
        break
      case 'up':
        this.play('idle-up', true)
        break
      case 'down':
      default:
        this.play('idle-down', true)
    }
  }

  walk () {
    if (!this.alive) {
      return
    }
    switch (this.lastDirection) {
      case 'left':
      case 'right':
        this.play('walking-x', true)
        break
      case 'up':
        this.play('walking-up', true)
        break
      case 'down':
      default:
        this.play('walking-down', true)
    }
  }

  slash () {
    if (!this.alive) {
      return
    }
    switch (this.lastDirection) {
      case 'left':
      case 'right':
        this.play('slash-x')
        break
      case 'up':
        this.play('slash-up')
        break
      case 'down':
      default:
        this.play('slash-down')
    }
  }

  die () {
    if (this.alive) {
      this.alive = false
      this.play('die')
    }
  }

  revive () {
    if (!this.alive) {
      this.alive = true
      this.play('revive')
    }
  }

  /**
   * @param {int} frameRate
   */
  _generateAnimations (frameRate = 8) {
    this._createAnimation('idle-down', 'player', 0, 5, frameRate)
    this._createAnimation('idle-x', 'player', 6, 11, frameRate)
    this._createAnimation('idle-up', 'player', 12, 17, frameRate)
    this._createAnimation('walking-down', 'player', 18, 23, frameRate, 0)
    this._createAnimation('walking-x', 'player', 24, 29, frameRate, 0)
    this._createAnimation('walking-up', 'player', 30, 35, frameRate, 0)
    this._createAnimation('slash-down', 'player', 36, 39, frameRate, 0)
    this._createAnimation('slash-x', 'player', 42, 45, frameRate, 0)
    this._createAnimation('slash-up', 'player', 48, 51, frameRate, 0)
    this._createAnimation('die', 'player', 54, 56, frameRate, 0)
    this._createAnimation('revive', 'player', 56, 54, frameRate, 0)
    this._createAnimation('dustin', 'dust', 0, 3, frameRate * 4, 0)
  }

  _createAnimation (key, spritesheet, startFrame, endFrame, frameRate = 8, repeat = -1, sprite = this) {
    sprite.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(spritesheet, { start: startFrame, end: endFrame }),
      frameRate,
      repeat
    })
  }
}
