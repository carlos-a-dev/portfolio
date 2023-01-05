import Phaser from 'phaser'

export default
class AnimatedParticle extends Phaser.GameObjects.Particles.Particle {
  t: number
  i: number
  animation: Phaser.Animations.Animation

  constructor (emitter: Phaser.GameObjects.Particles.ParticleEmitter) {
    super(emitter)

    this.t = 0
    this.i = 0

    type ObjectKey = keyof typeof this.emitter
    const myVar = 'animation' as ObjectKey
    // eslint-disable-next-line dot-notation
    this.animation = (this.emitter[myVar] as Phaser.Animations.Animation)

    if (this.animation) {
      this.frame = this.animation.frames[0].frame
    }
  }

  fire (x: number, y: number) {
    this.i = 0
    this.t = 0
    super.fire(x, y)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update (delta: number, step: number, processors: any[]) {
    const result = super.update(delta, step, processors)

    if (!this.animation) {
      return result
    }

    this.t += delta

    if (this.t >= this.animation.msPerFrame) {
      this.i++

      if (this.i > 3) {
        return result
      }

      this.frame = this.animation.frames[this.i].frame

      this.t -= this.animation.msPerFrame
    }

    return result
  }
}
