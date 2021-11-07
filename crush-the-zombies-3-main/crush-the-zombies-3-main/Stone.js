class Stone{
    constructor(x,y,r){
        var opt = {
            isStatic:false,
            restitution: 0.001,
            friction: 7.3,
            density: 8.4,
        }
        this.body = Bodies.circle(x, y, r, opt);
        this.r=RADIUS;
        //this.image=loadImage("./pics/stone.png");
        //this.animation = [this.image];
        World.add(world, this.body);
    }
    show() {
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        ellipse(pos.x,pos.y, this.body.r);
        //image(this.animation[this.image],this.r); 
        pop();
      }
}
