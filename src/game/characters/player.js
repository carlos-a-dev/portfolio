import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)

    this._generateAnimations()
    this.play('idle-down')

    scene.input.keyboard.on('keydown-SPACE', () => {
      this.play('slash-down')
    })
  }

  static preload (scene) {
    scene.load.spritesheet('player', '/game/sprites/characters/player.png', {
      frameWidth: 48,
      frameHeight: 48
    })
  }

  update (cursors) {
    if (this.anims.currentAnim.key === 'slash-down' && this.anims.isPlaying) {
      return
    }

    if (cursors.left.isDown) {
      this.play('walking-x', true)
      this.setFlipX(true)
      this.setX(this.x - 1)
    } else if (cursors.right.isDown) {
      this.play('walking-x', true)
      this.setFlipX(false)
      this.setX(this.x + 1)
    }
    if (cursors.up.isDown) {
      if (this.anims.currentAnim.key !== 'walking-x' || (!cursors.right.isDown && !cursors.left.isDown)) {
        this.play('walking-up', true)
        this.setFlipX(false)
      }
      this.setY(this.y - 1)
    } else if (cursors.down.isDown) {
      if (this.anims.currentAnim.key !== 'walking-x' || (!cursors.right.isDown && !cursors.left.isDown)) {
        this.play('walking-down', true)
        this.setFlipX(false)
      }
      this.setY(this.y + 1)
    }

    if (!this.anims.isPlaying) {
      this.play('idle-down', true)
    }
  }

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
  }

  _createAnimation (key, spritesheet, startFrame, endFrame, frameRate = 8, repeat = -1) {
    this.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(spritesheet, { start: startFrame, end: endFrame }),
      frameRate,
      repeat
    })
  }
}
//
