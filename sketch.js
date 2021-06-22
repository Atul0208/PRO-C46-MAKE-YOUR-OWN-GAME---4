var gameState="start";
var egg;
var score = 0;
var life = 3;
function preload(){
    eggImg=loadImage("egg.png")
    catcherImg=loadImage("basket.png")
    groundImg=loadImage("Spikes.png")
    gameOverImg=loadImage("gameOver.png")
    restartImg=loadImage("restart.png")
}

function setup() {
	createCanvas( 1349,617);
    eggGroup = new Group();
	ground=createSprite(1380/2-50,595,1499,20)
    ground.addImage(groundImg)
    ground.scale=0.5
    catcher=createSprite(200,520,70,15)
    catcher.addImage(catcherImg)
    catcher.scale=0.3;
    restart=createSprite(640,324,20,20)
    restart.addImage(restartImg)
    restart.scale=0.6
    gameOver=createSprite(displayWidth/2-30,displayHeight/2-100,20,20)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.8
                 
}


function draw() {
background("white")


if(gameState==="start"){
    gameOver.visible=false;
    restart.visible=false;
textSize(30)
fill("black")
text("Press Space to start",displayWidth/2-151,displayHeight/2-50)
if(keyDown("space")){
    gameState="play"
    }
}
if(gameState==="play"){
    gameOver.visible=false;
    restart.visible=false;
    spawnEgg();
    
    if(keyDown("Left")){
        catcher.x=catcher.x-30
        }
        if(keyDown("Right")){
        catcher.x=catcher.x+30
        }
  if(catcher.x<20){
catcher.x=20
  }
  if(catcher.x>1345){
catcher.x=1345
  }
   
    
           
               for(var i = 0 ; i<eggGroup.length; i ++){
                   if(eggGroup.get(i).isTouching(catcher)){
                   eggGroup.get(i).destroy();
                   score+=70
   
                   }
                   if(eggGroup.get(i).isTouching(ground)){
                       eggGroup.get(i).collide(ground)
                                   life=life-1
                                   eggGroup.get(i).lifetime=0
   
                   }
      
               }
             
               if(life===0){
gameState="end"
               }
               
}else if(gameState==="end"){
    gameOver.visible = true;
  restart.visible = true;
if(mousePressedOver(restart)){
gameState="start"
life=3;
score=0;
}
}

textSize(35)
fill("red")
text("Score  " + score, width-300, 50)
textSize(35)
fill("black")
text("life:  " + life, 36, 50)




            if(life<0){
                life=0
                }
               
                       
                      
            
drawSprites();
}

function spawnEgg(){
    if(frameCount%60===0){
        egg=createSprite(0,0,20,20)
        egg.addImage(eggImg)
        egg.scale=0.1
        egg.x=Math.round(random(20,1345))
        egg.velocityY=7
        eggGroup.add(egg)
        eggGroup.setLifetimeEach(300)
    }
    
}

