const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var g1,g2;
var link;
var stone,stoneImg;
var stones=[];
var zombie,zombie1,zombie2,zombie3,zombie4,sad;
var bg;
var button,axe;
var sad,sadImg;
function preload(){
  zombie1=loadImage("zombie1.png");
  zombie2=loadImage("zombie2.png");
  zombie3=loadImage("zombie3.png");
  zombie4=loadImage("zombie4.png");
  bg=loadImage("background.png");
  axe=loadImage("axe.png");
  stoneImg=loadImage("stone.png");
  sadImg=loadImage("sad_zombie.png");

  //sad.playing = true;
  //sad.looping= false;
}
function setup() {
  createCanvas(1500,700);
  engine = Engine.create();
  world = engine.world;

  frameRate(80);
  bridge=new Bridge(9,{x:370,y:450});
  g1=new Ground(200,400,600,30)
  g2=new Ground(1350,400,600,30)
  link=new Link(bridge,g2);
  Matter.Composite.add(bridge.body,g2)
  stone = Bodies.circle(300,300,15,{density:0.001});
  //stone.addImage("stone",stoneImg);

  for (var i = 0; i <= 8; i++) 
  {  var x = random(width / 2 - 200, width / 2 + 300);
     var y = random(-10, 140); 
     var stone = new Stone(x, y, 25); 
     stones.push(stone);
  }

  zombie=createSprite(700,590);
  zombie.addAnimation("lefttoRight",zombie1,zombie2,zombie1);
  zombie.addAnimation("rightoLeft",zombie3,zombie4,zombie3);
  zombie.addAnimation("sadzombie",sadImg);
  zombie.scale=0.1;
  zombie.velocityX=1;
  button = createImg('cut_btn.png');
  button.position(1070,430);
  button.size(50,50);
  button.mouseClicked(handleButtonPress);
  //sad=addAnimation("sad",sadImg);
}

function draw() {
  background(51);

  image(bg,5,5,1500,700);
  
  bridge.show();
  g1.show();
  g2.show();
  //ellipse(stone.position.x,stone.position.y,15);
  //stone.show();
  for(var stone of stones){
    stone.show();
  }
  Engine.update(engine);

  for (var stone of stones){
    stone.show();
    var pos=stone.body.position;
    var distance=dist(zombie.position.x,zombie.position.y,pos.x,pos.y)
    if(distance<=50){
      zombie.velocityX=0;
      Matter.Body.setVelocity(stone.body,{x:10,y:-10})
      zombie.changeImage("sadzombie");
      //collided=true;
    }
  }
  drawSprites();
}

function handleButtonPress(){
  link.detatch();
  setTimeout(()=> {
    bridge.break();
  },1500);
}