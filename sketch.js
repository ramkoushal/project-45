var bg, bgImg;
var myspaceship,myspaceshipImg;
//var earth,earthImg;
var deadline;
var bullet,bulletImg;
var enemy,enemyImg1,enemyImg2,enemyImg3,enemyImg4,enemyImg5,enemyImg6,enemyImg7;
var bulletG,enemyG;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover,gameoverImg,restart,restartImg;

function preload() {
    bgImg = loadImage("pictures/space2.jpg");
    myspaceshipImg = loadImage("pictures/myspaceship.png");
   // earthImg = loadImage("pictures/earth.png");
    bulletImg = loadImage("pictures/D bullet.png");
    enemyImg1 = loadImage("pictures/alien1.png");
    enemyImg2 = loadImage("pictures/alien2.png");
    enemyImg3 = loadImage("pictures/alien3.png");
    enemyImg4 = loadImage("pictures/alien4.png");
    enemyImg5 = loadImage("pictures/alien5.png");
    enemyImg6 = loadImage("pictures/alien6.png");
    enemyImg7 = loadImage("pictures/alien7.png");
    gameoverImg = loadImage("pictures/gameover.png");
    restartImg = loadImage("pictures/restart.png");

}

function setup() {
    createCanvas(1000,800);

    bg = createSprite(400,400,800,800);
    bg.addImage("background",bgImg);
     
    edges = createEdgeSprites();

    deadline = createSprite(350,400,5,800);
    deadline.shapeColor = "red";

    //earth = createSprite(-80,400,10,10);
   // earth.addImage("earth",earthImg);
    //earth.scale = 2;

    myspaceship = createSprite(150,100,10,10);
    myspaceship.addImage("myspaceship",myspaceshipImg);
    myspaceship.scale = 0.35;
   
    bulletG = new Group();
    enemyG = new Group();

}

function draw(){
    background("blue");
    
    if(gameState === PLAY){

    
    bg.scale = 1.9;
    bg.velocityX = -5;

    if(bg.x < 0){
      bg.x = bg.width/2;
    }
  
    if(keyDown("up")){
        myspaceship.y = myspaceship.y-20;
    }

    if(keyDown("down")){
        myspaceship.y = myspaceship.y+20;
    }

    if(keyDown("left")){
        myspaceship.x = myspaceship.x-10;
    }

    if(keyDown("right")){
        myspaceship.x = myspaceship.x+10;
    }

    if(keyWentDown("space")){
        bullet = createSprite(260,100,20,20);
        bullet.addImage("bullet",bulletImg);
        bullet.scale = 0.2;
        bullet.velocityX = 6;
        bullet.y = myspaceship.y;
        bullet.x = myspaceship.x+100;
        bullet.lifetime = 250;
        bulletG.add(bullet);
    }

     

      if(enemyG.isTouching(bulletG)){
         enemyG.destroyEach(); 
         bulletG.destroyEach();

      }
    moveEnemies();
    

     if(enemyG.isTouching(deadline)) {
       gameState = END;
      }

    }

    myspaceship.bounceOff(deadline);
    myspaceship.bounceOff(edges[0]);
    myspaceship.bounceOff(edges[1]);
    myspaceship.bounceOff(edges[2]);
    myspaceship.bounceOff(edges[3]);

    if(gameState === END){
      stop();
    }

    drawSprites();
}

function moveEnemies(){
    if(frameCount%130===0){
        enemy = createSprite(1200,400,10,10);
        enemy.scale = 0.4;

        alien = Math.round(random(1,7));
        if(alien === 1){
            enemy.addImage(enemyImg1);
        } else if(alien === 2){
            enemy.addImage(enemyImg2);
        } else if(alien === 3){
            enemy.addImage(enemyImg3);
        } else if(alien === 4){
            enemy.addImage(enemyImg4);
        } else if(alien === 5){
            enemy.addImage(enemyImg5);
        } else if(alien === 6){
            enemy.addImage(enemyImg6);
        } else if(alien === 7){
            enemy.addImage(enemyImg7);
        } 

        enemy.y = Math.round(random(10,790));
        enemy.velocityX = -6;
        enemy.lifetime = 400;
        enemyG.add(enemy);
    }

}

function stop(){
    bg.velocityX = 0;
    enemyG.setVelocityXEach(0); 
    enemyG.setLifetimeEach(-1);

    gameover = createSprite(500,300,100,100);
    gameover.addImage(gameoverImg);

    restart = createSprite(500,500,100,100);
    restart.addImage(restartImg);
    restart.scale = 0.7;
}