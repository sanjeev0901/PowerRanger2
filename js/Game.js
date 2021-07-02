class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player=new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    rocket1 = createSprite(100,200);
    rocket1.addImage(rocket2Image);
    rocket1.scale=0.8;
    rocket2 = createSprite(300,200);
    rocket2.addImage(rocket1Image);
    rocket2.scale=0.8;
    rockets=[rocket1,rocket2];
  }

  play(){
    form.hide();
    
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(bg2);
     
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x ;
      var y=70;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        x = 600 - allPlayers[plr].xPosition;
        rockets[index-1].y = y;
        rockets[index-1].x = x;
        y = y + 500;

      }
    }


    if(keyDown(RIGHT_ARROW) && player.index !== null){
      player.xPosition -=10
      player.update();
    }

    if(keyDown(LEFT_ARROW) && player.index !== null){
      player.xPosition +=10
      player.update();
    }

    if(keyDown("space")&&player.index!==null){
      if(index===player.index){
        missile=createSprite(400,400,20,40);
        missile.addImage(missile1Image);
        missile.scale=0.1;
        missile.x=rocket2.x;
        missile.y=rocket2.y-30;
        missile.velocityY=-5;
      }else{
        missile=createSprite(400,400,20,40);
        missile.addImage(missile2Image);
        missile.scale=0.1;
        missile.x=rocket1.x;
        missile.y=rocket1.y+30;
        missile.velocityY=5;
      }
      missileGroup.add(missile);
    }

    if (frameCount %100 === 0) {
      astroid = createSprite(-50, random(200,370), 100, 100);
      astroid.velocityX=6;
      astroid.scale=1.3;
      var rand = Math.round(random(1,5));
      switch(rand){
          case 1: astroid.addImage("astroid1",astroid1Image);
          break;
          case 2: astroid.addImage("astroid1",astroid2Image);
          break;
          case 3: astroid.addImage("astroid1",astroid3Image);
          break;
          case 4: astroid.addImage("astroid1",astroid4Image);
          break;
          case 5: astroid.addImage("astroid1",astroid5Image);
          break;
      }
      astroidGroup.add(astroid);
    }

    if (player.index !== null) {
      for (var i = 0; i < missileGroup.length; i++) {
          if (astroid.isTouching(missileGroup.get(i))) {
              missileGroup.get(i).remove();
              astroid.destroy();
          }
      }
  }
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
