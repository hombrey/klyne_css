//{{{variable declarations
"use strict";
let timeStamp;
let context_bgX;
let bgX;
let img_bgX;
let sprite,spriteNum;
let movX, movY;
let jumpSound, fallSound, fallenSound, loseSound, callSound, settleSound, winSound;
;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keyup", evalKey, false); //capture keypress on bubbling (false) phase
function evalKey(evnt) {
    let keyPressed = evnt.keyCode;
    console.log ("Pressed: ",keyPressed);
    if (keyPressed==37) spriteJump("down");
    if (keyPressed==39) spriteJump("up");
} //evalKey(event)
//}}}event listeners

//{{{initializations
const checkElement = async selector => {
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) )
  } //while ( document.querySelector(selector) === null)
  return document.querySelector(selector); 
}; //const checkElement = async selector

function initWin() {
setTimeout (function() { //set delay before calculating drawable parameters
    //Get a reference to the canvas
    bgX = document.getElementById('backgroundX');
    sprite = document.getElementById('sprite');
    spriteNum = 1;
    let bgXstyle = window.getComputedStyle(bgX);

    jumpSound = new sound("./src/Klyne/wav/jump.mp3");
    fallSound = new sound("./src/Klyne/wav/fall.mp3");
    fallenSound = new sound("./src/Klyne/wav/fallen.mp3");
    loseSound = new sound("./src/Klyne/wav/lose.mp3");
    callSound = new sound("./src/Klyne/wav/call.mp3");
    settleSound = new sound("./src/Klyne/wav/settle.mp3");
    winSound = new sound("./src/Klyne/wav/win.mp3");
    //context_bgX = bgX.getContext('2d');
    //resizeElements();
    //console.log ("windowWidth: "+ window.innerWidth);

    //console.log ("bgX CSS-height: "+ bgXstyle.height);
    //console.log ("bgX CSS-width: "+ bgXstyle.width);
    //console.log ("bgX posX: "+ bgX.offsetLeft);
    //console.log ("bgX posY: "+ bgX.offsetTop);
    //console.log ("bgX clientWidth: "+ bgX.clientWidth);
    //console.log ("bgX naturalWidth: "+ bgX.naturalWidth); //images have natural widths

    //let comVal;
    //comVal =  Math.round(180/80);
    //console.log ("Ans: "+comVal);

    //window.requestAnimationFrame(animateLoop);
}, 3);//setTimeOut (function()
} //function init()

function resizeElements() {
    bgX.width = 0.8*window.innerWidth;
    bgX.height = 0.8*window.innerHeight;
} //function resizeCanvas()

function animateLoop(timeStamp) {

    //set delay between executions
    setTimeout (function() {
        window.requestAnimationFrame(animateLoop);
    }, 100);//setInterval (function()

} //function animateLoop(timeStap)
//}}}window init

//{{{handler functions
function spriteJump(jumpDirection) {

    //console.log(spriteNum);
    if (jumpDirection=="up") {
        jumpSound.play();
        spriteNum++;
        //console.log("jump up");
        if (spriteNum==6) spriteNum=5;
    } //if (jumpDirection=="up)
    if (jumpDirection=="down") {
        fallSound.play();
        spriteNum--;
        console.log("jump down");
        if (spriteNum==0) spriteNum=1;
    } //if (jumpDirection=="down)

    //console.log("spriteNum: "+spriteNum);

    movX = [0, 1*15, 2*15+1 , 3*15+2, 4*15+3];
    movY = [0, 1*-10, 2*-10, 3*-10, 4*-10+1];
    //sprite.style.cssText ="transform: translate("+movX[spriteNum-1]+"vw,"+movY[spriteNum-1]+"vh);transition: transform 900ms;";
    insertCss ("#sprite {transform: translate("+movX[spriteNum-1]+"vw,"+movY[spriteNum-1]+"vh);}");
    
    setTimeout (function() {
        sprite.src ="./src/Klyne/img/sprite"+spriteNum+".png"; 
        if (spriteNum==5) {
            bgX.src ="./src/Klyne/img/BG6.jpg"; 
            winSound.play();
        }// if spriteNum == 5)
        if ( (spriteNum<5) && (jumpDirection=="up") ) settleSound.play();
    }, 900);//setInterval (function()


} //function spriteJump(direction)


//}}}handler functions

//{{{helper functions
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    } //this.play = function(){
    this.stop = function(){
        this.sound.pause();
    }//this.stop = function(){    
}//function sound(src)

function insertCss( code ) {
    var style = document.createElement('style');
    style.innerHTML = code;

    document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)

//}}}helper functions
