export default
{
  preload: function () {
    // show logo in loading screen
    // this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
    // this.splash.anchor.setTo(0.5)

    this.preloadBar = this.add.sprite(this.game.canvas.centerX, this.game.canvas.centerY + 128, 'preloadbar')
    // this.preloadBar.anchor.setTo(0.5)

    // this.load.setPreloadSprite(this.preloadBar)

    // load game assets
    this.load.tilemapTiledJSON('level1', '/game/tilemaps/level1.json')
    this.load.image('player', '/game/sprites/characters/player.png')
    this.load.image('plains', '/game/sprites/tilesets/plains.png')
    this.load.image('water1', '/game/sprites/tilesets/water1.png')
    this.load.image('objects', '/game/sprites/objects/objects.png')
  },
  create: function () {
    this.scene.start('Game')
  }
}
