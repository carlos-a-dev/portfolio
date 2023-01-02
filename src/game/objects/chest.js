import Phaser from 'phaser'

export default class Chest extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {int} x
   * @param {int} y
   * @param {string} texture
   * @param {int} frame
   */
  constructor (scene, x, y, texture = 'chest-silver', frame = 0) {
    super(scene, x, y, texture, frame)
    scene.add.existing(this)
    this._generateAnimations(8)
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
    this.play('open', true)
  }

  close () {
    this.playReverse('open', true)
  }

  /**
   * @param {int} frameRate
   */
  _generateAnimations (frameRate = 8) {
    this._createAnimation('open', this.texture.key, 0, 3, frameRate)
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
