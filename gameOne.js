/*========= DOM ========*/
const container = document.getElementById('container');
//create a 'div'tag
const square = document.createElement('div');
    container.append(square);
 //square.style.attribute
//square.style.border = 'solid 2px black'
    square.style.borderRadius = '10px'
    square.style.backgroundColor = 'white'
    square.style.width = "250px"
    square.style.height = "150px"
    square.style.position = "absolute"
    square.style.top = '50%'
    square.style.left= '50%'
    square.style.transform = 'translate(-50%,-50%)'
    square.style.textAlign = 'center'
   
//create a 'text tag'
const textTag = document.createElement('h3')
    square.append(textTag)
    textTag.style.padding= '5px 5px 5px 5px';

//Create a div for the Staring Page
const sDiv = document.createElement('div')
    sDiv.setAttribute('id','sDiv');
    document.body.append(sDiv);


//Create a 'Starting Page Image'
const zImage = document.createElement('IMG');
zImage.setAttribute('id','zImage')
zImage.src = 'https://c.tenor.com/Fc22vaevNrcAAAAd/alexander-zverev-temper-tantrum.gif'
zImage.style.borderRadius = '50px'
zImage.style.marginTop = '15vh'
zImage.style.width = "40vh"
zImage.style.height = "40vh"
sDiv.append(zImage)  

//Create a 'Instruction Start Button'
const start = document.createElement('div')
    start.setAttribute('id','start')
    start.innerText = "Start?"
    start.style.margin = '50px auto'
    start.style.width = '300px'
    start.style.border = "solid 2px black"
    start.style.fontSize = '30px'
    start.style.padding = '10px 40px 10px 40px'
    start.style.borderRadius = '10px'
    sDiv.append(start)

// Create a 'Game Start Button'
const gameStart = document.createElement('div')
    gameStart.setAttribute('id','gameStart')
    gameStart.innerText = "Start a game?"
    gameStart.style.margin = '100px auto'
    gameStart.style.width = '100px'
    gameStart.style.border = "solid 1px black"
    gameStart.style.fontSize = '12px'
    gameStart.style.padding = '10px 40px 10px 40px'
   
    document.body.append(gameStart)
    gameStart.style.display = 'none' 

//create a 'restart button'
const restart = document.createElement('button')
   restart.innerText = "Restart\n(space key)"
   square.append(restart)
   square.style.display = "none" 

// create a time count board tags and texts
const board = document.getElementById('board');
   let secondText = document.createElement('h3');
   board.append(secondText);
   let seconds = 0;
   secondText.innerText = "Time\n"+ seconds;
   board.style.display = "none" 


   
/* ======== create image tags ========= */
//   imgP.onload=function(){
//     ctx.drawImage(imgP,0,0,game.width,game.height);
//     };
  imgP = new Image();
  imgP.src ="Image/smileTwo.png";
  imgP2 = new Image();
  imgP2.src ="Image/smile.png";
  imgP3 = new Image();
  imgP3.src ="Image/angry.png";
  ballY = new Image();
  ballY.src ="Image/ballYellow.png";
  ballR = new Image();
  ballR.src ="Image/ballRed.png";
  ballP = new Image();
  ballP.src ="Image/ballpurple.png";
  ballO = new Image();
  ballO.src ="Image/ball orange.png";


/*========= VARIABLES ========*/
let game = document.querySelector("#game");

let zverev;
let r = 20;//!!this variable is deciding player circle's radius & movement speed!!
let rs = 40;
let os =30;
let rv = Math.floor(Math.random()*10-4);
let rrv = Math.floor(Math.random()*8);
let arrayR = [20,-20,-5,5,-10,35,-50,40]
// this creates a 2 dimensional canvas => 
let ctx = game.getContext("2d"); 

game.setAttribute("height", getComputedStyle(game)["height"]);
game.setAttribute("width", getComputedStyle(game)["width"]);

//controler
document.addEventListener("keydown", movementHandler)

start.addEventListener("click",() => {
    instructorInit()
    gameStart.style.display = 'block' 
    })

// gameStart.addEventListener("click",() => {
  
//     gameInit()})

/*=================== class Collections======================*/

class ImagePlayer{
    constructor(x,y,width,height,radius){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
         this.radius = radius;
        this.alive = true;
        this.face = true;
       
    }
   
    draw(){ 
        if(this.face === true ){
     ctx.drawImage(imgP,this.x,this.y,this.width,this.height) 
     setTimeout(() =>{this.face =false},300)
        }else if(this.alive === false){
            ctx.drawImage(imgP3,this.x,this.y,this.width,this.height)  
        }
           else{
            ctx.drawImage(imgP2,this.x,this.y,this.width,this.height)
            setTimeout(() =>{this.face =true},300)
        }
        }

}

//Build a obstacle class
class Obstacle{
    constructor(x,y,width,height,velocity){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.alive = true;
    }
    //adding obstacle's function: render 

    render(){
        if(this.alive){
        ctx.drawImage(ballY,this.x,this.y,this.width,this.height)
       }
    }
    renderOrange(){
        if(this.alive){
        ctx.drawImage(ballO,this.x,this.y,this.width,this.height)
       }
    }
    //Ball bounce if it hits a wall
    //Ball goes back to the top and restart dropping if it hits bottom
    launchYellow(){
        this.render();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.x + this.width > game.width || this.x <= 0){
          this.velocity.x = -1*this.velocity.x  
        }else if(this.y - this.width > game.height){
            this.y = 0;
            // this.velocity.x = Math.floor(Math.random()*9-4)
            this.velocity.x =rv
            this.y += this.velocity.y;
        }
    }

    launchOrange(){
        this.renderOrange();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if(this.x + this.width > game.width || this.x <= 0){
          this.velocity.x = -1*this.velocity.x  
        }else if(this.y - this.width > game.height){
            this.y = -40;
            this.velocity.x = Math.floor(Math.random()*10+10)
            this.y += this.velocity.y;
        }
    }
}

//Build another type of obstacle class
class topSpin{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
    }
    //adding obstacle's function: render 

    renderRed(){
        if(this.alive){
        ctx.drawImage(ballR,this.x,this.y,this.width,this.height)
       }}
    renderPurple(){
        if(this.alive){
        ctx.drawImage(ballP,this.x,this.y,this.width,this.height)
       }}
    //moving automatically
    //Ball goes straight down
    //Ball goes back to the top and restart dropping if it hits bottom
    launch(){
        this.renderRed();
        this.y += 25 
        if(this.y - this.width > game.height){
           setTimeout(()=>{ 
            //adding a little delay 
            this.y = -60;
            this.x = Math.floor(Math.random()*(game.width-30))
            this.y += 30;
        },100)
        } 
    }
    launchP(){
        this.renderPurple();
        this.y += 20 
        if(this.y - this.width > game.height){
            this.y = -60;
            this.x = Math.floor(Math.random()*(game.width-rs)/1.5)
            this.y += 30; 
        } }
    

}

/*======== Build Array =======*/
let allBalls = [];
/*=================== Game Player Constructions ======================*/
//construct game players here.
// const you = new Player(game.width/2,game.height-r,r,'grey')
// ball always comes down from the top and x rocation alters randomly everytime.
//velocity is an object which has x and y value so I can control the speed and angle of the ball movement.

// let rrv = Math.floor(Math.random()*13+15);

const yellow = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,os,os,{x:rv,y:20})
const orange = new Obstacle(Math.floor(Math.random()*(game.width-30)),-30,os,os,{x:arrayR[rrv],y:20})
const red = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)
const purple = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)
const purpleIns = new topSpin(Math.floor(Math.random()*(game.width-30)),-30,os,os)

const smile = new ImagePlayer((game.width-rs)/2,game.height-rs,rs,rs,rs);






/*============== Keyboard Control ====================*/
//KEYBOARD INTERACTION LOGIC
function movementHandler(e) {
    // console.log("the key that was pressed was:" + e.key)
    // console.log(smile.y)

    switch (e.key) {
        case "ArrowUp":
            smile.y > 0 ? smile.y -= rs: null;
            break
        case "ArrowDown":
            (smile.y + smile.height) < game.height ? smile.y += rs : null;
            break
        case "ArrowLeft":
           ( smile.x ) >= -100 ? smile.x -= rs: null;
        //    console.log(smile.x)
            break
        case "ArrowRight":
            (smile.x + smile.width ) <= game.width ? smile.x += rs: null;
            // console.log(smile.x)
            break
        case ' ' :
            restarting();
            // console.log('working')
            break
        case 'Enter' :
            start.removeEventListener("click",() => {
                instructorInit()
                gameStart.style.display = 'block' 
            })
            // text = null;
            // clearInterval();
            gameInit()
            // gameInit();
            // console.log('enter')
            break
                 
    }    
}

/* ================= functions ========================*/ 

//Restarting
function restarting(){
   window.onload()
   reloadP()
    }
// function restarting(){
//        clearInterval()
//        smile.alive = true;
//        seconds = 0;
//        gameInit()
       
//          }
//reloading
    window.onload = function() {
        var reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
           
            gameInit2();
           
        }
    }
    
    function reloadP() {
        sessionStorage.setItem("reloading", "true");
        document.location.reload();
    }
//instruction Initiation
function instructorInit(){
  
    sDiv.style.display = 'none'
    
    game.style.display = "block";
    instructor();
}
//Game Initiation//
function gameInit(){

        text = null;
        clearInterval();
       
        board.style.display = "block" 
        
       setInterval(timeCount,1000)
        runGame(); 
    }
    function gameInit2(){
        sDiv.style.display = 'none'
        text = null;
        clearInterval();
        game.style.display = "block";
        board.style.display = "block" 
        
       setInterval(timeCount,1000)
        runGame(); 
    }
    
//Game Loop
function gameLoop() {
   
    ctx.clearRect(0, 0, game.width, game.height);
    
    if(smile.alive){    
    
    yellow.launchYellow();
    red.launch()
    detectHit(smile,yellow);  
    detectHit(smile,red);  

    if(seconds >= 5){
        orange.launchOrange();
        detectHit(smile,orange);
    }
    if(seconds >= 15){
        purple.launchP();
        tShot(smile,purple) 
        detectHit(smile,purple);
    }
    }else{ctx.clearRect(0, 0, game.width, game.height)}
    
    smile.draw();
    victory(); 
   
}


//Detect hit between player and obstacles
function circleD (p1,p2){
    let xD = p1.x -p2.x ;
    let yD = p1.y - p2.y ;
    return Math.sqrt(Math.pow(xD,2)+Math.pow(yD,2));
}

function detectHit(p1,p2) {

    let hitTest =  p1.y + p1.height > p2.y &&
    p1.y < p2.y + p2.height &&
    p1.x + p1.width > p2.x &&
    p1.x < p2.x + p2.width; 
  
    // if (circleD(p1,p2) < p1.width/2+p2.radius) {
    if (hitTest) {
        p1.alive = false;
        p2.alive = false;
      
       gameOver() ;   
    } 
}  
//curve ball 
function tShot(p1,p2){
    let v = 8.5;
    let detection = 300
    if(circleD(p1,p2)<detection&& p1.x > p2.x ){
        p2.x += v; 
        if(p2.x >= game.width){ v = -1*v}
    }else if(circleD(p1,p2)<detection && p2.x > p1.x){
        p2.x -= v;
        if(p2.x <= 0){ v = -1*v}
    }
}
//Game over Text
function gameOver(){
   
    if(smile.alive){
        square.style.display = "none"
    }else{
        textTag.innerText = "Oh...No...\n GameOver!"
        square.style.display = "block"
    }
   
}
function victory(){ 
   
    if(seconds === 30){
        textTag.innerText = "You Won!"
        square.style.display = "block"
        square.style.removeProperty("background-color")
    }else if(seconds >= 33){
        
        square.style.display = "none"
    }
   
}

//Run Game
function runGame() {  
    setInterval(gameLoop,45);
    
}


function timeCount(){
    if(smile.alive)
  {  seconds +=1;
    secondText.innerText = "Time\n"+ seconds}
   
}
let text = true
/*=========== Instructing Sequence ==========*/
function instructor (){
   
let textTwo = true
function instruction(){
if(text === false)
   { ctx.clearRect(0, 0, game.width, game.height)
    smile.draw();
    const purpleInter = setInterval(purpleIns.launchP(),3000)
    tShot(smile,purpleIns) 
    // text
    ctx.font = "20px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
    
    ctx.fillText("Can you dodge it?", (game.width)/2,game.height/2+60);
    ctx.fillText("When you are ready,", (game.width)/2,game.height/2+80);
    ctx.fillText("hit ENTER key!", (game.width)/2,game.height/2+100);
    
console.log('ins')
  }}
  
  function texting() {
    ctx.font = "20px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
    if(text === true){
    ctx.fillText("You have to avoid", (game.width)/2,game.height/2+60);
    ctx.fillText("all the balls, coming", (game.width)/2,game.height/2+80);
    ctx.fillText("to you. Use arrow keys", (game.width)/2,game.height/2+100);
    ctx.fillText("to avoid the balls.", (game.width)/2,game.height/2+120);
    }   

  }
  function textingTwo() {
    ctx.clearRect(0, 0, game.width, game.height)
    ctx.font = "20px Arial";
    ctx.textAlign = "center"
    ctx.fillStyle = 'white'
    if(textTwo === true){
    ctx.fillText("After 15 seconds,", (game.width)/2,game.height/2+60);
    ctx.fillText("Zverev is going to shoot ", (game.width)/2,game.height/2+80);
    ctx.fillText("you Magic Purple Shots!", (game.width)/2,game.height/2+100);
    ctx.fillText("Be careful!.", (game.width)/2,game.height/2+120);
    ctx.fillText("I'll show you ", (game.width)/2,game.height/2+140);
    ctx.fillText("what it is. ", (game.width)/2,game.height/2+160);
    }   
  }
//   setInterval(instruction,45)
   texting()
   
   setTimeout(textingTwo,4500)
   setTimeout(()=>{text = false},9000)
   const insInter = setInterval(instruction,45)
}
/*============ bin ==================*/
