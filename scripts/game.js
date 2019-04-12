var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
  preload: function( ) {
    this.load.image('background', '../images/background.png');
    this.load.image('chicken', '../images/chicken.png');
    this.load.image('horse', '../images/horse.png');
    this.load.image('pig', '../images/pig.png');
    this.load.image('sheep', '../images/sheep3.png');
  },
  create: function() {

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.background = this.game.add.sprite(0, 0, 'background');
    this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    this.chicken.anchor.setTo(0.5);

    //this.chicken.scale.setTo();

    this.pig = this.game.add.sprite(500, 300, 'pig' );
    this.pig.anchor.setTo(0.5);
    this.pig.scale.setTo(-1, 1);

    this.sheep = this.game.add.sprite(100, 250, 'sheep');
    this.sheep.scale.setTo(0.5);
    this.sheep.anchor.setTo(0.5);
    this.sheep.angle = -45;

  },
  update: function() {

  }
};

game.state.add('GameState', GameState);
game.state.start('GameState');