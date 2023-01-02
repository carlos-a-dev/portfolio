import Phaser from 'phaser'

export default class Chest extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param {Phaser.Scene} scene
   * @param {int} x
   * @param {int} y
   * @param {string | null} key
   */
  constructor (scene, x, y, key, type = 'silver') {
    super(scene, x, y, key)

    this.type = type

    this.setTexture('chest-' + this.type, 0)
    scene.add.existing(this)

    this._generateAnimations(8)

    scene.input.keyboard.on('keydown-C', () => {
      this.play('open', true)
      setTimeout(() => { this.playReverse('open', true) }, 1000)
    })
  }

  /**
   * @param {Phaser.Scene} scene
   */
  static preload (scene) {
    scene.load.spritesheet('chest-silver', '/game/sprites/objects/chest_01.png', {
      frameWidth: 16,
      frameHeight: 16
    })
    scene.load.spritesheet('chest-gold', '/game/sprites/objects/chest_02.png', {
      frameWidth: 16,
      frameHeight: 16
    })
  }

  open () {
    this.play('open')
  }

  /**
   * @param {int} frameRate
   */
  _generateAnimations (frameRate = 8) {
    this._createAnimation('open', 'chest-' + this.type, 0, 3, frameRate)
  }

  _createAnimation (key, spritesheet, startFrame, endFrame, frameRate = 8, repeat = 0, sprite = this) {
    sprite.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(spritesheet, { start: startFrame, end: endFrame }),
      frameRate,
      repeat
    })
  }
}
