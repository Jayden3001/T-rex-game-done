var trex,trex_running,trex_collided
var ground,groundimg,invisableground
var sun,sunimg
var obstacle,obstacle1img,obstacle2img,obstacle3img,obstacle4img
var cloud,cloudimg
var obstacleGroup
 var cloudgroup
 var PLAY=1
var END=0
var gamestate=1
var score=0
var gameOver,restart
var gameOverimg,restartimg


function preload(){
  trex_running=loadAnimation("trex_1.png","trex_2.png","trex_3.png")
  trex_collided=loadAnimation("trex_collided.png")
  groundimg=loadImage("ground.png")
  sunimg=loadImage("sun.png")
  obstacle1img=loadImage("obstacle1.png")
  obstacle2img=loadImage("obstacle2.png")
  obstacle3img=loadImage("obstacle3.png")
  obstacle4img=loadImage("obstacle4.png")
  cloudimg=loadImage("cloud.png")
  gameOverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex=createSprite(30,height-150,10,15)
  trex.addAnimation("trexrunning",trex_running)
  trex.addAnimation("trexcollided",trex_collided)
  trex.scale=0.08
  
   sun=createSprite(width-50,50,30,30)
  sun.addImage(sunimg)
  sun.scale=0.1
  
  gameOver=createSprite(width/2,height/2-50,30,30)
  gameOver.addImage(gameOverimg)
  gameOver.visible=false
  restart=createSprite(width/2,height/2,20,20)
  restart.addImage(restartimg)
  restart.scale=0.1
  restart.visible=false
  
  ground=createSprite(width/2,height-20,width,20)
  ground.addImage("ground",groundimg)
  ground.velocityX=-3
   
  invisableground=createSprite(width/2,height-90,width,20)
  invisableground.visible=false
  obstacleGroup= new Group();
   cloudgroup= new Group(); 
  
  trex.debug=true
  trex.setCollider("circle",0,0,300)
}

function draw() {
  background(220);
  drawSprites()
  fill("black")
  text("Score: "+score,320,20)

  console.log(trex.y)
    
  if(gamestate==PLAY){
    ground.velocityX= -3
    score=score+Math.round((getFrameRate()/62))
    
    if(touches.length>0 ||keyDown("space") && trex.y >=  height-200) {
      trex.velocityY = -12;
      touches=[] 
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    clouds()
  obstacles()
    if(obstacleGroup.isTouching(trex)){
      gamestate=END
    }
    
    trex.collide(invisableground)
    
  }
  
  else if(gamestate===END){
    ground.velocityX=0
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    trex.changeAnimation("trexcollided",trex_collided)
    
  gameOver.visible=true
    restart.visible=true
  
  }
  
  if(touches.length>0 ||(keyDown("space") && trex.y >=  height-200) || mousePressedOver(restart)) {
  reset();
      }
  
}
function clouds(){
  if(frameCount%100==0){
  var cloud=createSprite(410,random(270,10),10,10);
  cloud.addImage(cloudimg)
  cloud.velocityX=-3
    cloud.scale=0.5
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloud.lifetime=136
  }

}

function obstacles(){
if(frameCount%100==0){
  var obstacle=createSprite(width+20,height-120,10,40)
  obstacle.velocityX=-3
  obstacle.scale=0.3
  var chose=Math.round(random(1,4))
  if(chose==1){
    obstacle.addImage(obstacle1img)
    obstacle.scale=0.4
  }
 else if(chose==2){
    obstacle.addImage(obstacle2img)
   obstacle.scale=0.4
  }
  else if(chose==3){
    obstacle.addImage(obstacle3img)
    obstacle.scale=0.2
  }
  else if(chose==4){
    obstacle.addImage(obstacle4img)
    obstacle.scale=0.2
  }
  obstacleGroup.add(obstacle)
  obstacle.lifetime=300
}
}

function reset(){
gamestate = PLAY;
obstacleGroup.destroyEach();
 cloudgroup.destroyEach();
  gameOver.visible=false;
  restart.visible= false;
  trex.changeAnimation("trexrunning",trex_running)
  score=0
  touches=[] 
  
  
}  
