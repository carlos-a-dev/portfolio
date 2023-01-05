import Phaser from 'phaser'

export default class Skelly extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texture = 'skeleton', frame = 0) {
    super(scene, x, y, texture, frame)

    this.dust1 = new Phaser.GameObjects.Sprite(scene, 0, 0)
    this.dust2 = new Phaser.GameObjects.Sprite(scene, 0, 0)
    scene.add.existing(this.dust1)
    scene.add.existing(this.dust2)

    scene.add.existing(this)

    this.lastDirection = 'down'
    this.alive = true

    this._generateAnimations(8)
    this.idle()
  }

  /**
   * @param {Phaser.Scene} scene
   */
  static preload (scene) {
    scene.load.spritesheet('skeleton', '/game/sprites/characters/skeleton.png', {
      frameWidth: 64,
      frameHeight: 64
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
    this.play('idle', true)
  }

  walk () {
    if (!this.alive) {
      return
    }
    this.play('walking', true)

    const xOffset = this.flipX ? 5 : -5
    if (!this.dust1.anims.isPlaying) {
      this.dust1.setPosition(this.x + xOffset, this.y + 25)
      this.dust1.play('dustin', true)
    }
    if (!this.dust2.anims.isPlaying) {
      this.dust2.setPosition(this.x + xOffset, this.y + 25)
      this.dust2.playAfterDelay('dustin', 50)
    }
  }

  slash () {
    if (!this.alive) {
      return
    }
    this.play('slash')
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
    this._createAnimation('idle', 'skeleton', 0, 5, frameRate)
    this._createAnimation('walking', 'skeleton', 6, 11, frameRate, 0)
    this._createAnimation('slash', 'skeleton', 12, 16, frameRate * 2, 0)
    this._createAnimation('hurt', 'skeleton', 18, 20, frameRate, 0)
    this._createAnimation('die', 'skeleton', 24, 28, frameRate, 0)
    this._createAnimation('revive', 'skeleton', 28, 24, frameRate, 0)
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
