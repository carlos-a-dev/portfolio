export default
{
  preload: function () {
    // assets we'll use in the loading screen
    this.load.image('preloadbar', '/game/images/loading.gif')
  },
  create: function () {
    this.scene.start('Preload')
  }
}
