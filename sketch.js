var PLAY = 1;
var END = 0;
var gameState = s;
var monkey , monkey_running
var  obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var ground;
var bI
var banana
var hunger=200;
var restart,ri;
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  obstaceImage = loadImage("obstacle.png");
 bI=loadImage("banana.png");
  bg=loadImage("jungle.jpg")
  restart=loadImage("restart.png")
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(80,315,20,20);
  
  monkey.scale=0.2;
  monkey.addAnimation("monkey",monkey_running);
  monkey.visible=true
  ground=createSprite(450,375,900,10);
  
  ground.x=ground.width/2;
  ground.shapeColor="black"
  ground.visible=false
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  ri=createSprite(300,250,10,10)
  ri.addImage("R",restart)
  ri.scale=0.75
  ri.visible=false
}


function draw() {
  background(bg)
  monkey.visible=true
  if(gameState===s&&keyDown("enter")){
    gameState=PLAY
  }
  if(gameState===s){
    textSize(20)
    text("press enter to start",250,200)
    textSize(20)
    text("if(hunger reaches 0 you will lose)",200,225)
    ri.visible=false
    monkey.collide(ground)
  }
  if(gameState===PLAY){
    hunger=hunger-Math.round(getFrameRate()/60);
    if(monkey.isTouching(foodGroup)){
      hunger=hunger+75
   }
    ri.visible=false
    if(hunger>200){
      hunger=200
    }
    if(hunger<0){
      hunger=0
      gameState=END
    }
    console.log(hunger)
  score = score + Math.round(getFrameRate()/60);
    textSize(15)
  text("survival time:"+score,475,25)
    textSize(15)
  text("hunger:"+hunger,375,25)
  if (ground.x < 150){
      ground.x = ground.width/2;
    }
    ground.velocityX=-4;
  monkey.collide(ground);
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -18;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 1
  b();
  s();
   if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
     monkey.scale=0.2
  }
    if(obstacleGroup.isTouching(monkey)&&monkey.scale===0.2){
      monkey.scale=0.1
      obstacleGroup.destroyEach();
    }
    if(monkey.scale===0.1){
      if(obstacleGroup.isTouching(monkey)){
        gameState=END;
      }
    }
  }
  if(gameState===END){
    obstacleGroup.setVelocityEach(0,0);
    foodGroup.setVelocityEach(0,0);
    monkey.x=80;
    monkey.y=315;
    ground.velocityX=0;
    monkey.visible=false;
    textSize(20)
    text("survival time:"+score,250,150)
    ri.visible=true
    if(mousePressedOver(ri)){
      gameState=s
      obstacleGroup.destroyEach();
      monkey.scale=0.2
      foodGroup.destroyEach();
      hunger=200;
      score=0
    }
  }
  drawSprites();
}
function b(){
  if(frameCount%(150||200)===0){
    
    banana=createSprite(600,250,20,20)
    banana.velocityX=-11
    banana.addImage("b",bI)
    banana.scale=0.1;
    banana.y=random(100,250)
      foodGroup.add(banana);
  }
}
function s(){
  if(frameCount%100===0){
    obstacle=createSprite(600,350,10,10)
    obstacle.velocityX=-11;
    obstacle.addImage("o",obstaceImage)
    obstacle.scale=0.3;
    
    obstacle.debug=false
    obstacle.setCollider("circle",0,-50,150);
    obstacleGroup.add(obstacle);
  }
}
  






