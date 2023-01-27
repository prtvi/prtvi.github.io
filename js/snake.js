let width = 600;
let height = 600;
let snake;
let food;
let scl = 20;

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.update = function(){

        if (this.total === this.tail.length){
            for (let i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);
        

        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);

    }

    this.death = function(){
        for (let i = 0; i < this.tail.length; i++){
            let pos = this.tail[i];
            let d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1){
                this.total = 0;
                this.tail = [];
            }
        }
    }

    this.show = function(){
        fill(255);
        
        for (let i = 0; i < this.total; i ++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        
        rect(this.x, this.y, scl, scl);
    }

    this.move = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }

    this.eat = function(pos){
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1){
            this.total += 1;
            return true;
        }
        return false;
    }
}


function pickLocation(){
    let cols = floor(width/scl);
    let rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function setup(){
    createCanvas(width, height);
    frameRate(10);
    snake = new Snake();
    pickLocation();
}

function draw(){
    background(51);
    
    if (snake.eat(food)){
        pickLocation();
    }
    
    snake.death();
    snake.update();
    snake.show();

    fill(0, 255, 0);
    rect(food.x, food.y, scl, scl);
}


function keyPressed(){
    if (keyCode === UP_ARROW){
        snake.move(0, -1);
    } else if (keyCode === DOWN_ARROW){
        snake.move(0, 1);
    } else if (keyCode === LEFT_ARROW){
        snake.move(-1, 0);
    } else if (keyCode === RIGHT_ARROW){
        snake.move(1, 0);
    }
}
