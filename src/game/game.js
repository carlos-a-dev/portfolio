// import { Scene } from 'phaser'
export default
{
  /** @this Phaser.Scene */
  create: function () {
    const map = this.make.tilemap({ key: 'level1' })
    map.addTilesetImage('player')
    map.addTilesetImage('plains')
    map.addTilesetImage('water1')
    map.addTilesetImage('objects')
    map.createLayer('water', ['water1'])
    map.createLayer('island', ['plains', 'water1'])
    map.createLayer('trees', ['objects'])
    map.createLayer('player', ['player'])

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels, true)
  },
  update: function () {
  }
}
//
