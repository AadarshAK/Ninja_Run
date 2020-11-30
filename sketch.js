var player, backS, backI, blocks,blocksI, blockGroup, playerImage, es, ei, esg, score=0;
 //var play=1;
//var lives=5;
var swordSprite, swordImage, swordGroup;
var song;
var plb, pi;

function preload(){
   playerImage=loadImage("ninja0.png");
   blocksI=loadImage("climber.png");
   backI=loadImage("back.jpg");
   ei=loadImage("ghost-standing.png");
   swordImage=loadImage("sword0.png");
   pli=loadImage("play0.png");
   song = loadSound("BlowTheSpeakersUp.mp3");
}

function setup(){
   createCanvas(windowWidth,windowHeight);
   backS=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
   backS.addImage(backI);
   backS.scale=2;
   player=createSprite(width-1500,height-700,50,50);
   player.addImage(playerImage);
   plb=createSprite(width-1700,height-760,40,40);
   plb.addImage(pli);
   blockGroup=new Group();
   esg=new Group();
   swordGroup=new Group();
   
}

function draw(){
   //background("green");
   //player.velocityX=8;
   //score=8*frameCount/35;
   lives=5;
   if(keyDown("space")){
      player.velocityY=-8;
   }

   if (mousePressedOver(player)||(keyDown("s"))){
      spawnSwords();
   }

   if(mousePressedOver(plb)){
      song.loop();
   }

   swordGroup.setLifetimeEach(windowWidth/8);


   if(keyDown("right")){
      player.velocityX=2;
   } 

   if(keyDown("left")){
      player.velocityX=-2;
   } 

   if(player.isTouching(blockGroup)){
      player.velocityY=0;
  }

  
   if(swordGroup.isTouching(esg)){
      esg.destroyEach();
      score=score+10;
      player.scale=player.scale+0.1;
   }

   player.velocityY=player.velocityY+0.3;
   player.lifetime=(windowHeight/-8);
   blockGroup.setLifetimeEach=(windowWidth/-8);
   esg.setLifetimeEach=(windowWidth/-8);

   if(player.scale<0.6){
      player.scale=1;
   }

   if(player.scale>1){
      player.scale=1;
   }
   
   player.setCollider("rectangle",0,0,200,200);

   enemy();
   spawnBlocks();

   drawSprites();

if(esg.isTouching(player)){
   esg.destroyEach();
   player.scale=player.scale-0.1;
}

   fill("green");
   stroke("red");
   textSize(62);
   text("Score: "+score,width-980,height-760);
   //text("Lives: "+lives,width-980,height-700);
   //text("player"+player.scale,450,650);
   text("(c) Ninja Run by Aadarsh A.K",width-1200,height-680);
}

function spawnBlocks(){
   if(frameCount%180===0){
       blocks=createSprite(windowWidth+10, Math.round(random(200,600)),50,50)
       blocks.shapeColor=color(225);
       blocks.velocityX=-(8+frameCount/60);
       blocks.addImage(blocksI);
       blocks.scale=2;
       blocks.debug=false;

       blockGroup.add(blocks);
   }
}

function  enemy(){
   if(frameCount%200===0){
      es=createSprite(windowWidth+10, Math.round(random(250,550)),50,50);
      es.addImage(ei);
      es.velocityX=-(8+frameCount/35);
      esg.add(es);
   }
}

function spawnSwords() {
      swordSprite=createSprite(player.x,player.y,50,50);
      swordSprite.addImage(swordImage);
      swordSprite.velocityX=8;
      swordGroup.add(swordSprite);
}