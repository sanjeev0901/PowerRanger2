class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset=createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Power Ranger Game");
    this.title.position(displayWidth/2-250,0);
    this.title.style('font-size', '60px');
    this.title.style('color', 'red');
  
    this.input.position(displayWidth/2 - 70 , displayHeight/2 - 80);
    this.input.style('width', '200px');
    this.input.style('height', '20px');
    this.input.style('background', 'yellow');

    this.button.position(displayWidth/2 - 20, displayHeight/2);
    this.button.style('width', '100px');
    this.button.style('height', '20px');
    this.button.style('background', 'lightpink');

    this.reset.position(displayWidth-100,20);
  
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.style('background', 'lightgreen');
      this.greeting.position(displayWidth/2 - 70, displayHeight/2);
    });
  
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      database.ref('players').remove();
    });
  }
}
