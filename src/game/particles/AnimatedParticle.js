import Phaser from 'phaser'

export default
class AnimatedParticle extends Phaser.GameObjects.Particles.Particle {
  constructor (emitter) {
    super(emitter)

    this.t = 0
    this.i = 0

    if (this.emitter.animation) {
      this.frame = this.emitter.animation.frames[0].frame
    }
  }

  fire (x, y) {
    this.i = 0
    this.t = 0
    super.fire(x, y)
  }

  update (delta, step, processors) {
    const result = super.update(delta, step, processors)

    if (!this.emitter.animation) {
      return result
    }

    this.t += delta

    if (this.t >= this.emitter.animation.msPerFrame) {
      this.i++

      if (this.i > 3) {
        return result
      }

      this.frame = this.emitter.animation.frames[this.i].frame

      this.t -= this.emitter.animation.msPerFrame
    }

    return result
  }
}
