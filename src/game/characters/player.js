import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)

    this.dust1 = new Phaser.GameObjects.Sprite(scene, 0, 0)
    this.dust2 = new Phaser.GameObjects.Sprite(scene, 0, 0)
    scene.add.existing(this.dust1)
    scene.add.existing(this.dust2)

    scene.add.existing(this)

    this.lastDirection = 'down'
    this.alive = true

    this._generateAnimations(8)
    this.idle()

    scene.input.keyboard.on('keydown-SPACE', () => {
      this.slash()
    })

    scene.input.keyboard.on('keydown-A', () => {
      if (this.alive) {
        this.alive = false
        this.play('die')
      }
    })
    scene.input.keyboard.on('keydown-S', () => {
      if (!this.alive) {
        this.alive = true
        this.play('revive')
      }
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
    if (this.anims.isPlaying && this.anims.currentAnim.key.startsWith('slash-')) {
      return
    }

    let walking = false

    if (cursors.up.isDown) {
      this.setY(this.y - 1)
      this.lastDirection = 'up'
      walking = true
    } else if (cursors.down.isDown) {
      this.setY(this.y + 1)
      this.lastDirection = 'down'
      walking = true
    }
    if (cursors.left.isDown) {
      this.setFlipX(true)
      this.setX(this.x - 1)
      this.lastDirection = 'left'
      walking = true
    } else if (cursors.right.isDown) {
      this.setFlipX(false)
      this.setX(this.x + 1)
      this.lastDirection = 'right'
      walking = true
    }

    if (walking) {
      this.walk()
    }

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

    const xOffset = this.flipX ? 5 : -5
    if (!this.dust1.anims.isPlaying) {
      this.dust1.setPosition(this.x + xOffset, this.y + 15)
      this.dust1.play('dustin', true)
    }
    if (!this.dust2.anims.isPlaying) {
      this.dust2.setPosition(this.x + xOffset, this.y + 15)
      this.dust2.playAfterDelay('dustin', 50)
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
    this._createAnimation('dustin', 'dust', 0, 3, frameRate * 3, 0, this.dust1)
    this._createAnimation('dustin', 'dust', 0, 3, frameRate * 3, 0, this.dust2)
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
