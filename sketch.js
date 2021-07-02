var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var xPosition = 0;
var distance = 0;
var database;
var missile,missile1Image,missile2Image,missileGroup;
var astroid;
var astroid1Image,astroid2Image,astroid3Image,astroid4Image,astroid5Image;
var astroidGroup;
var score=0;

var form, game;
var player;

var rocket1,rocket2,rockets;
var rocket1Image,rocket2Image;

var bg1,bg2;

function preload(){
  bg1 = loadImage("images/bg.png");
  bg2 = loadImage("images/bg2.png");

  rocket1Image=loadImage("images/rocket1.png");
  rocket2Image=loadImage("images/rocket2.png");

  missile1Image=loadImage("images/missile.png");
  missile2Image=loadImage("images/missile1.png");  

  astroid1Image=loadImage("images/astroid1.png");
  astroid2Image=loadImage("images/astroid2.png");
  astroid3Image=loadImage("images/astroid3.png");
  astroid4Image=loadImage("images/astroid4.png");
  astroid5Image=loadImage("images/astroid5.png");

  astroidGroup=new Group();
  missileGroup=new Group()
}

function setup(){
  canvas = createCanvas(1500, 650);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background(bg1);
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
