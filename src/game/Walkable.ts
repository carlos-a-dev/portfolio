import Phaser from 'phaser'
import AnimatedParticle from 'src/game/particles/AnimatedParticle'

export enum Direction {
  up,
  down,
  left,
  right
}

export type AnimationConfig = {
  key: string,
  flipX?: boolean,
  flipY?: boolean
 }

export type AnimationList = {
  [Direction.up]: AnimationConfig,
  [Direction.down]: AnimationConfig,
  [Direction.left]: AnimationConfig,
  [Direction.right]: AnimationConfig
}

export type WalkableConfig = {
  walkAnimations: AnimationList,
  idleAnimations: AnimationList,
  speed: number,
  dust?: boolean
}

export default class Walkable {
  private sprite: Phaser.Physics.Arcade.Sprite
  walkAnimations: AnimationList
  idleAnimations: AnimationList
  speed: number
  dust?: Phaser.GameObjects.Particles.ParticleEmitter

  constructor (sprite: Phaser.Physics.Arcade.Sprite) {
    this.sprite = sprite

    const { walkAnimations, idleAnimations, speed, dust } = this.sprite.getData('walkable') as WalkableConfig

    this.walkAnimations = walkAnimations
    this.idleAnimations = idleAnimations
    this.speed = speed ?? 100

    if (dust) {
      this.sprite.anims.create({ key: 'dust', frames: this.sprite.anims.generateFrameNumbers('dust', { start: 0, end: 3 }), frameRate: 32 })
      this.dust = this.sprite.scene.add.particles('dust').createEmitter({
        on: false,
        frequency: 100,
        lifespan: 150,
        follow: this.sprite,
        followOffset: new Phaser.Math.Vector2(0, 16),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: There was no other way
        particleClass: AnimatedParticle
      })
      Object.defineProperty(this.dust, 'animation', { value: this.sprite.anims.get('dust') })
    }
  }

  walk (dir: Direction, speed?: number) {
    speed = speed ?? this.speed
    const config: AnimationConfig = this.walkAnimations[dir]

    this.sprite.play(config.key, true)
    this.sprite.setFlip(config.flipX ?? false, config.flipY ?? false)
    if (this.dust) {
      this.dust.on = true
    }

    switch (dir) {
      case Direction.up:
        this.sprite.setVelocity(0, -speed)
        break
      case Direction.down:
        this.sprite.setVelocity(0, speed)
        break
      case Direction.left:
        this.sprite.setVelocity(-speed, 0)
        break
      case Direction.right:
        this.sprite.setVelocity(speed, 0)
        break
    }
  }

  idle (dir: Direction = Direction.down) {
    const config: AnimationConfig = this.idleAnimations[dir]

    this.sprite.play(config.key, true)
    this.sprite.setFlip(config.flipX ?? false, config.flipY ?? false)

    this.sprite.setVelocity(0, 0)
  }
}
