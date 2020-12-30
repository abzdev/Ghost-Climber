var ghost, door, tower, climber, climberBottom;
var ghostJumpImg, ghostStandingImg, climberImg;
var doorImg, towerImg;
var gameState = 1;
var doorGroup, climberGroup, climberBottomGroup;
var score = 0;

function preload() {
  ghostJumpImg = loadImage("ghost-jumping.png");
  ghostStandingImg = loadImage("ghost-standing.png");
  
  doorImg = loadImage("door.png");
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
}

function setup() {
  createCanvas(600,600);
  
  tower = createSprite(300,100,10,10);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  tower.depth = 1;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostStandingImg);
  ghost.scale = 0.4;
  ghost.depth = 4;
  ghost.debug = true;
  ghost.setCollider("circle",0,0,100);
  
  doorGroup = new Group();
  climberGroup = new Group();
  climberBottomGroup = new Group();
  
  
}

function draw() {
  background("white");
  if(tower.y > 600) {
    tower.y = 300;
  }
  
  if(ghost.isTouching(climberGroup)) {
    score ++;
  }
  
  
  ghost.velocityY += 1;
  ghost.collide(climberGroup);
  
  if(gameState === 1) {
    
    
    if(frameCount % 300 === 0) {
      spawnDoorAndClimber();
    }

    if(keyDown("space")) {
      ghost.velocityY = -4;
    }
    if(keyDown("left")) {
      ghost.x -= 3;
    }
    if(keyDown("right")) {
      ghost.x += 3;
    }
    
    if(ghost.isTouching(climberBottomGroup) || ghost.y >= 600) {
      gameState = 0;
    }
    
  }
  if(gameState === 0) {
    tower.velocityY = 0;
    
    doorGroup.destroyEach();
    climberGroup.destroyEach();
    climberBottomGroup.destroyEach();
    ghost.destroy();
    tower.destroy();
    
    background("black");
    
    fill("yellow");
    textSize(30);
    text("GAME OVER",220,200);
  }
  
  textSize(20);
  text("Score: " + score, 300,100);
  
  
  
  drawSprites();
}

function spawnDoorAndClimber() {
  var xPos = Math.round(random(100,500));
  door = createSprite(xPos,0,10,10);
  door.addImage(doorImg);
  door.velocityY = 2;
  door.depth = 2;
  door.lifetime = 700;
  doorGroup.add(door);
  
  climber = createSprite(door.x,door.y+40,10,10);
  climber.addImage(climberImg);
  climber.velocityY = 2;
  climber.depth = 3;
  climber.lifetime = 700;
  climberGroup.add(climber);
  climber.debug = true;
  
  climberBottom = createSprite(climber.x,climber.y+10,80,5);
  climberBottom.velocityY = 2;
  climberBottomGroup.add(climberBottom);
  climberBottomGroup.setLifetimeEach(700);
  climberBottom.visible = true;
  climberBottom.debug = true;
  
}