var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var form, player, game;
var car1, car2 , car3 , car4;
var cars = []
var allPlayers=[]
var carimg1,carimg2,carimg3,carimg4,track;
var finishedPlayers = 0;
var finish = false;
function preload(){
  carimg1 = loadImage("images/car1.png")
  carimg2 = loadImage("images/car2.png")
  carimg3 = loadImage("images/car3.png")
  carimg4 = loadImage("images/car4.png")
  track = loadImage("images/track.jpg")
  welcome = loadImage("images/welcome.jpg")
}
function setup(){
  canvas = createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(welcome)
  if(playerCount===4 && finishedPlayers===0){
    game.update(1)

  }
  if(gameState===1){
    clear()
    game.play()
  }
  if(finishedPlayers===4){
    gameState = 2;
    game.update(2)
  }
  if(gameState===2 && finishedPlayers===4){
    game.end()
  }
}
