class Game {
  constructor(){}

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,100)
    car2 = createSprite(100,100)
    car3 = createSprite(100,100)
    car4 = createSprite(100,100)

    car1.addImage(carimg1);
    car2.addImage(carimg2);
    car3.addImage(carimg3);
    car4.addImage(carimg4);
    
    cars = [car1, car2 , car3 , car4];

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getFinishedPlayers()


    if(allPlayers !== undefined){
      background("green")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      var x = 200;
      var y = 0;
      var index = 0;
      var display_position = 130;
      for(var plr in allPlayers){
        index+= 1
        x+= 220;
        y = displayHeight-allPlayers[plr].distance
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red")
          ellipse(x, y, 60 , 80)
          cars[index-1].shapeColor = "purple"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y
        }
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, cars[index-1].x,cars[index-1].y+70)
      }
    }
    if(player.distance>4300 && finishedPlayers<=4 && finish !==true){
      //gameState = 2
      Player.updateFinishedPlayers()
      player.rank = finishedPlayers
      player.update()
    finish = true;
    }
    if(keyIsDown(UP_ARROW) && player.index !== null && finish !==true){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }
  end(){
    camera.position.x = 0;
    camera.position.y = 0;
    console.log("game end")
    background("red")
    textSize(40)
    text("CONGRATULATION",25,0);
    Player.getPlayerInfo()
    textSize(25)
    fill("black")
    for(var plr in allPlayers){
      if(allPlayers[plr].rank===1){
        text("First:"+allPlayers[plr].name,50,50)
      }
      if(allPlayers[plr].rank===2){
        text("second:"+allPlayers[plr].name,50,100)
      }
      if(allPlayers[plr].rank===3){
        text("third:"+allPlayers[plr].name,50,150)
      }
      if(allPlayers[plr].rank===4){
        text("Fourth:"+allPlayers[plr].name,50,200)
      }
    }
  }
}