let page = 0;
let carSize = 25;
let carX;
let carY;
let carColor;
let released = [];
let pressed = [];
let controllers = []
let deadzone = 0.08;
let posX, posY;
let moveSpeed = 5;
let pothole = [];
let potholeAmount = 9;
let tree = [];
let treeAmount = 3;
//let line = [];
//let lineAmount = 2;
let iterator = 0;
let iterator2 = 0;
let img0;
let img1;
let img2;
let img3;
let imgEnd;
let garage1;
let garage2;
let garage3;
let garage4;
let garageChoice;
let lives = 30; 
let opac = 255;
let opacStart = 0;
let opacStart2 = 255;
let checkStart = 0;
let checkRestart = 0;
let check = 0;
let buttonlock = 0;

function preload() {
    img0 = loadImage('E36s.png');
    img1 = loadImage('mk5gti.png');
    img2 = loadImage('syclone.png');
    img3 = loadImage('rcf.png');
    imgEnd = loadImage('endpothole.png');
    garage1 = loadImage('g1.png');
    garage2 = loadImage('g2.png');
    garage3 = loadImage('g3.png');
    garage4 = loadImage('g4.png');
    treeimg = loadImage('tree.png');

    let volume = 0.2;
    deflate = loadSound('deflation.wav');
    endCrash = loadSound('endCrash.mp3');
    startup = loadSound('startup.m4a');
    //gameplaysong = loadSound('gameplaysong.m4a');
    deflate.setVolume(volume);
    endCrash.setVolume(volume);
    startup.setVolume(volume);
    //deflate.setVolume(volume);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    carX = width / 5;
    carY = height / 2.5;
    carColor = color(0);

    theCar = new car(carX, carY, 23);

    window.addEventListener("gamepadconnected", function(e) {
    gamepadHandler(e, true);
    console.log("Gamepad controller connected");
    });
    window.addEventListener("gamepaddisconnected", function(e) {
    console.log("Gamepad controller disconnected");
    gamepadHandler(e, false);
    });

    for(let i=0; i<potholeAmount; i++){
        pothole[i] = new Pothole();
    }

    for(let i=0; i<treeAmount; i++){
        tree[i] = new Tree();
    }

    //for(let i=0; i<lineAmount; i++){
        //line[i] = new Line();
    //}

    for (var i = 0; i < 17; i++) {
        released[i] = true;
        pressed[i] = false;
    }
    posX = width / 2;
    posY = height / 1.1;
}


function draw() {
    if (page == 0) { 
        //checkStart = 0;
        startPage();
    } else if (page == 1) { 
        playPage();
    } else if (page == 2) {
        endPage();
    }
    mouse();
    //steer();
    
    iterator++;
    iterator2++;
}   

function startPage() {
    background(255,255,0);  
    textAlign(CENTER);
    fill(52, 73, 94);
    textSize(40);
    text("S U M M I T   P O T H O L E   C H A L L E N G E", width/2, height/18);
    textSize(40);
    text("SELECT CAR", width/2, height/5);
    textSize(25); 
    text("PRESS A TO START", width/2, height/3);
    text("PRESS B TO START", width/2, height/2);
    text("PRESS X TO START", width/2, height/1.5);
    text("PRESS Y TO START", width/2, height/1.2);
    image(garage2, width/15, height/3, 350);
    image(garage1, width/15-10, height/6, 380);
    image(garage3, width/15, height/2, 350);
    image(garage4, width/15, height/1.5, 350);
    //image(treeimg, 200, 200, 60, 60);

    if (checkStart == 1) {
        background(255,255,opacStart); 
        fill(opacStart);
        checkRestart = 0;
        textSize(40);
        text("S U M M I T   P O T H O L E   C H A L L E N G E", width/2, height/2);
        // add start screen stuff here 
        fill(52, 73, 94);
        opacStart = opacStart + 2;
        if (opacStart > 254) {
            opacStart = 255;
            background(120, 120, 120);
            background(0,opacStart2);
            rect(width/6,0,10,1000);
            fill(52, 73, 94);
            textSize(70);
            text("GET READY", width/2, height/2);

            rect(width - (width/6),0,10,1000);
            fill(52, 173, 94);
            rect(0,0,width/6,1000);
            rect(width - (width/6)+10,0,width - (width/6),1000);
            opacStart2 = opacStart2 - 2;
            if (opacStart2 < 1) {
                opacStart2 = 0;
                playPage();
                page = 1;
                checkStart = 0;
            }
        }
    }
}

function playPage() {
    background(120, 120, 120);
    checkStart = 0;
    //gameplaysong.play();
    theCar.move();
    theCar.display();

    for (let i = 0; i < potholeAmount; i++) {
        pothole[i].move();
        pothole[i].display();
    }

    rect(width/6,0,10,1000);

    rect(width - (width/6),0,10,1000);
    fill(52, 173, 94);
    rect(0,0,width/6,1000);
    rect(width - (width/6)+10,0,width - (width/6),1000);
    fill(52, 73, 94);
    textSize(45);
    text(floor(lives/30*100)+"%", width/18, height/20);

    for (let i = 0; i < treeAmount; i++) {
        tree[i].move();
        tree[i].display();
    }
    //for (let i = 0; i < lineAmount; i++) {
        //line[i].move();
        //line[i].display();
    //}

}

function endPage() {
    // put counter
    background(imgEnd);
    background(0,opac);
    buttonlock = 0;
    theCar.hide();
    opac = opac - 1.3;
    lives = 30;
    if (opac < 1) {
        opac = 0;
        check = 1;
    }
    if (check == 1) {
        textAlign(CENTER);
        // GAVE OVER TEXT
        fill(52, 73, 94);
        textSize(100);
        text("GAME OVER", width/2, height/6);
        textSize(40);
        text("Press A, B, X, or Y to Restart", width/2, height-150);
        console.log("end");
    }
} 

function mouse() {
    var gamepads = navigator.getGamepads();
        for (let i in controllers) {
        let controller = gamepads[i];
        if (controller.buttons) {
            for (var btn = 0; btn < controller.buttons.length; btn++) {
                let val = controller.buttons[btn];
                if (page == 0) {
                    if (btn == 0 & buttonlock == 0) {
                        // how to limit number of times to hit button
                        if (buttonPressed(val, btn)) {
                            buttonlock = 1;
                            console.log("Button 0 - A");
                            garageChoice = 0;
                            theCar = new car(carX, carY, 23);
                            if (page == 0) { 
                                startup.play();
                                checkStart = 1;
                                //playPage();
                            }
                        }
                    }
                    if (btn == 1 & buttonlock == 0) {
                        if (buttonPressed(val, btn)) {
                            buttonlock = 1;
                            console.log("Button 1 - B");
                            garageChoice = 1;
                            theCar = new car(carX, carY, 23);
                            if (page == 0) { 
                                startup.play();
                                checkStart = 1;
                                //playPage();
                            }
                        }
                    }
                    if (btn == 2 & buttonlock == 0) {
                        if (buttonPressed(val, btn)) {
                            buttonlock = 1;
                            console.log("Button 2 - X");
                            garageChoice = 2;
                            theCar = new car(carX, carY, 23);
                            if (page == 0) { 
                                startup.play();
                                checkStart = 1;
                                //playPage();
                            }
                        }
                    }
                    if (btn == 3 & buttonlock == 0) {
                        if (buttonPressed(val, btn)) {
                            buttonlock = 1;
                            console.log("Button 3 - Y");
                            garageChoice = 3;
                            theCar = new car(carX, carY, 23);
                            if (page == 0) { 
                                startup.play();
                                checkStart = 1;
                                //playPage();
                            }
                        }
                    }
                }
                // End page to Start page (resets the game)
                if (page == 2) {
                    if (btn == 0 || btn == 1 || btn == 2 || btn == 3) {
                        if (buttonPressed(val, btn)) {
                            page = 0;
                            checkStart = 1;
                            buttonlock = 0;
                            checkRestart = 1;
                        }
                    }
                }
            }
        }
    }
}

function gamepadHandler(event, connecting) { //console log checking controller connection
    let gamepad = event.gamepad;
    if (connecting) {
      print("Connecting to controller " + gamepad.index);
      controllers[gamepad.index] = gamepad;
    } else {
      delete controllers[gamepad.index];
    }
  }
/*
function steer() {
    var gamepads = navigator.getGamepads();

    for (let i in controllers) {
        let controller = gamepads[i];

        if (controller.axes) {
            //console.log("L joystick");
            let axes = controller.axes;
            for (let axis = 0; axis < axes.length; axis++) {
                //console.log("L");
                let val = controller.axes[axis];
                if (axis == 0) {
                    //console.log("L joystick X axis");
                    if (abs(val) > deadzone) {
                        console.log("Left joystick");
                        if ((posX <= 0 && val > 0) || (posX >= width && val < 0) || (posX > 0 && posX < width)) {
                            posX += moveSpeed * val;
            }
          }
        }
      }
    }
  }
}
*/

class car {
    constructor(coords) {
        this.coords = coords;
        this.carWidth = height*0.06;
        this.carHeight = height*0.06;
        //this.windowSize = height*0.03;
        this.ease = 0.8;
        this.hitBox;
        this.x = 150;
        this.y = 150;
    }
    display() {
        fill(carColor);
        //rect(posX, posY, this.carWidth, this.carHeight);
        if (garageChoice == 0) {
            image(img0, posX, posY-15, this.carWidth+55, this.carHeight+30);
            this.hitBox = {x: posX, y: posY-15, w: this.carWidth+54, h: this.carHeight+29};
        } else if (garageChoice == 1) {
            image(img1, posX, posY-15, this.carWidth+75, this.carHeight+45);
            this.hitBox = {x: posX, y: posY-15, w: this.carWidth+74, h: this.carHeight+44};
        } else if (garageChoice == 2) {
            image(img2, posX, posY-15, this.carWidth+70, this.carHeight+40);
            this.hitBox = {x: posX, y: posY-15, w: this.carWidth+69, h: this.carHeight+39};
        } else if (garageChoice == 3) {
            image(img3, posX, posY-25, this.carWidth+105, this.carHeight+55);
            this.hitBox = {x: posX, y: posY-25, w: this.carWidth+104, h: this.carHeight+54};
        }
    }

    getHitBox() {
        return this.hitBox;
    }

    getX() { return this.coords.x }
    getY() { return this.coords.y }

    move() {
        var gamepads = navigator.getGamepads();

        for (let i in controllers) {
        let controller = gamepads[i];

        if (controller.axes) {
            //console.log("L joystick");
            let axes = controller.axes;
            for (let axis = 0; axis < axes.length; axis++) {
                //console.log("L");
                let val = controller.axes[axis];
                if (axis == 0) {
                    console.log("L joystick XXX axis");
                    if (abs(val) > deadzone) {
                        console.log(val);
                        if ((posX <= (width - (width/6) - 80) && val > 0) || (posX >= width/6 && val < 0) || (posX > width - (width/5) && posX < (width/6) - 40)) {
                            console.log("Left joystick limit2");
                            posX += moveSpeed * val;
                        }       
                    }
                }
                //if (axis == 1) {
                    //console.log("L joystick Y axis");
                    //if (abs(val) > deadzone) {
                        //if ((posY <= 0 && val > 0) || (posY >= height && val < 0) || (posY > 0 && posY < height)) {
                            //posY += moveSpeed * val;
                        //}
                    //}
                //}
            }
        }
      }
    }
  
    hide() {
        if (garageChoice == 0) {
            image(img0, width+100, height+100, this.carWidth+45, this.carHeight+20);
        } else if (garageChoice == 1) {
            image(img1, width+100, height+100, this.carWidth+45, this.carHeight+20);
        } else if (garageChoice == 2) {
            image(img2, width+100, height+100, this.carWidth+45, this.carHeight+20);
        } else if (garageChoice == 3) {
            image(img3, width+100, height+100, this.carWidth+45, this.carHeight+20);
        }
    }
}

class Pothole {
    constructor() {
        let x = random(200, width-200);
        this.coords = {x: x, y: 0};
        //this.coords = (width, random(0, height));
        this.diam = random(height*0.05, height*0.08);
        this.hitBox = {x: this.coords.x-this.diam*0.5, y: this.coords.y-this.diam*0.5, w: this.diam, h: this.diam};
        this.speed = 1;
        this.stallTime = (iterator, iterator+100);
    }
    display() {
        noStroke();
        fill("rgb(90, 90, 90)");
        circle(this.coords.x, this.coords.y, this.diam);
        //image(img2, this.coords.x, this.coords.y, this.diam);
    }
    move() {
        this.carCollision();

        if(this.stallTime < iterator){
            //this.coords.x-=this.speed;
            this.coords.y+=13;

        }
        if(this.coords.y>height+10){
            this.reset();
        }
    }

    carCollision() {
        let box = theCar.getHitBox();
        this.hitBox = {x: this.coords.x-this.diam*0.5, y: this.coords.y-this.diam*0.5, w: this.diam, h: this.diam};
        if(intersection(box, this.hitBox)) {
            lives -= 1;
            //maybe add a sound everytime you hit a pothole
            if (lives === 7) {
                deflate.play();
            }
            if (lives === 0) {
                endCrash.play();
                endPage();
                page = 2;
            }
        }

    }
    reset() {
        this.coords.x=random(200, width-200)
        this.coords.y=0-this.diam;
        this.stallTime = random(iterator, iterator+200);
        this.speed = 1;
        this.diam = random(height*0.05, height*0.08);
    }
}

class Tree {
    constructor() {
        let x = random(0, 150);
        let x2 = random(width-150, width-10);
        //let x3 = width/2;
        this.diam = 60;
        this.coords = {x: x, y: -30};
        this.coords = {x: x2, y: -30};
        //this.coords = {x: x3, y: -50};
        this.speed = 1;
        this.stallTime = (iterator2, iterator2+100);
    }
    display() {
        noStroke();
        fill(0);
        image(treeimg, this.coords.x, this.coords.y, this.diam, this.diam);
        image(treeimg, this.coords.x2, this.coords.y, this.diam, this.diam);
        // road lines code below
        //fill(241, 181, 0);
        //rect(this.coords.x3,this.coords.y,15,80);
        //circle(this.coords.x, this.coords.y, this.diam);
    }
    move() {
        if(this.stallTime < iterator2){
            //this.coords.x-=this.speed;
            this.coords.y+=13;
        }
        if(this.coords.y>height+10){
            this.reset();
        }
    }
    reset() {
        this.coords.x=random(0, 150);
        this.coords.x2=random(width-150, width-10);
        //this.coords.x3=width/2;
        this.coords.y=0-this.diam;
        this.stallTime = random(iterator2, iterator2+200);
        this.speed = 1;
        this.diam = 60;
    }
}
/*
class Line {
    constructor() {
        let x3 = width/2;
        this.coords = {x: x3, y: -30};
        this.speed = 1;
        this.stallTime = (iterator2 + 50);
    }
    display() {
        noStroke();
        fill(241, 181, 0);
        rect(this.coords.x3,this.coords.y,15,80);
    }
    move() {
        if(this.stallTime < iterator2){
            //this.coords.x-=this.speed;
            this.coords.y+=13;
        }
        if(this.coords.y>height+10){
            this.reset();
        }
    }
    reset() {
        this.coords.x3=width/2;
        this.stallTime = random(iterator2 + 50);
        this.speed = 1;
    }
}
*/

function intersection(cari, poti) {
    // cari = car intersection, poti = pot intersection
    var x1 = poti.x;
    var y1 = poti.y;
    var x2 = x1+poti.w;
    var y2 = y1+poti.h;

    if (cari.x > x1) { 
        x1 = cari.x;
        //setTimeout(intersection,1000); 
    }
	if (cari.y > y1) { 
        y1 = cari.y;
        //setTimeout(intersection,1000); 
    }
	if (cari.x + cari.w < x2) { 
        x2 = cari.x + cari.w;
        //setTimeout(intersection,1000); 
    }
	if (cari.y + cari.h < y2) { 
        y2 = cari.y + cari.h;
        //setTimeout(intersection,1000); 
    }
    return (x2 <= x1 || y2 <= y1) ? false : true;
}

/*
function potholeSpawn() { //spawn potholes in the game
    if (millis()-time > potholeInterval) {
        thePothole.push(20, randomY, 20, randomHeight);
        time=millis();
    }
}
*/
function buttonPressed(b, index) {
    if (typeof(b) == "object") {
      if (b.pressed) {
        pressed[index] = true;
      } else {
        pressed[index] = false;
        released[index] = true;
      }
      return pressed[index]; // binary 
    }
    return b > 0.9; // analog value
  }
