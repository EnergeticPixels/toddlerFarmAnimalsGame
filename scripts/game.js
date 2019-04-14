var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
  preload: function( ) {
    this.load.image('background', '../images/background.png');
    this.load.image('arrow', '../images/arrow.png');

    this.load.spritesheet('chicken', '../images/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('horse', '../images/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('pig', '../images/pig_spritesheet.png', 297, 200, 3);
    this.load.spritesheet('sheep', '../images/sheep_spritesheet.png', 244, 200, 3);

    // phaser is smart enough to know which sound to play according to platform/browser sniffing
    this.load.audio('chickenSound', ['../audio/chicken.ogg', '../audio/chicken.mp3']);
    this.load.audio('horseSound', ['../audio/horse.ogg', '../audio/horse.mp3']);
    this.load.audio('pigSound', ['../audio/pig.ogg', '../audio/pig.mp3']);
    this.load.audio('sheepSound', ['../audio/sheep.ogg', '../audio/sheep.mp3']);
  },
  create: function() {

    // scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // have the game centered horizontally and vertically
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.background = this.game.add.sprite(0, 0, 'background');

    // group for animals
    var animalData = [
      {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
      {key: 'horse', text: 'HORSE', audio: 'horseSound'},
      {key: 'pig', text: 'PIG', audio: 'pigSound'},
      {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'}
    ];

    this.animals = this.game.add.group();

    var self = this;
    var animal;

    animalData.forEach(function(element) {
      animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
      animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
      animal.anchor.setTo(0.5);

      // create animal animation
      animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

    // left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    // left arrow allow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    // right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    // right arrow allow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

  },
  update: function() {

  },

  animateAnimal: function(sprite, event) {
    //console.log('anime animal')
    sprite.play('animate');
    sprite.customParams.sound.play()
  },
  
  switchAnimal: function(sprite, event) {
    if(this.isMoving) {
      return false
    }
    this.isMoving = true;

    var newAnimal, endX;

    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      newAnimal.x = -newAnimal.width/2;
      endX = 640 + this.currentAnimal.width/2;
    } else {
      newAnimal = this.animals.previous();
      newAnimal.x = 640 + newAnimal.width/2;
      endX = this.currentAnimal.width/2;
    }
    
    var newAnimalMovement = game.add.tween(newAnimal);
    newAnimalMovement.to({ x: this.game.world.centerX }, 1000 );
    newAnimalMovement.onComplete.add(function() {
      this.isMoving = false;
    }, this);
    newAnimalMovement.start();

    var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
    currentAnimalMovement.to({ x: endX}, 1000 );
    currentAnimalMovement.start();

    this.currentAnimal = newAnimal;
  }

};

game.state.add('GameState', GameState);
game.state.start('GameState');