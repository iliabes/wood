const blockWidth = 50,
      blockHeight = 50

let deep = 5;
    globalX = 0;
    globalY = 9;
    visibleBlockNumber = 12 ;
    rightCount = 0;
    step = blockWidth / 5;
    shift = blockWidth;
    playerGround = false;



let app = new PIXI.Application({
    width: 500,
    height: 200,
    antialias: true,
    resolution: 1,
    backgroundColor:0x01000B
})

let game = new PIXI.Container()
app.renderer.resize(innerWidth, 500);
document.body.appendChild(app.view);
app.stage.addChild(game)

let world = [
  '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
];
// let world = []
let grounds = []


;(function() {
  // for(let i = 0; i < 100; i++){
  //   world.push(''+i)
  // }
  for(let i = 0;i<visibleBlockNumber; i++){
    createBlock(world[i],i)}
  })();




let player = new PIXI.Graphics()
player.x = 150
player.y = 330
player.lineStyle(1,0x00ff00)
player.beginFill(0x66CCFF);
player.drawRect(0,0,20,80)
player.endFill()
game.addChild(player);

let keys = {
  'a':false,
  'd':false,
  'space':false,
}

function movePlayerDown(e){
  console.log(e.keyCode)
  switch (e.keyCode) {
    case 65:
      keys.a = true
      createLeftBlock()
      break;
    case 68:
      keys.d = true
      createRightBlock()
      break;
    case 83:
      moveDown()
      break;
    case 32:
      keys.space = true
      jump()
      break;
  }
}

function movePlayerUp(e){
  switch (e.keyCode) {
    case 65:
      keys.a = false
      break;
    case 68:
      keys.d = false
      break;
    case 83:
      break;
    case 32:
      keys.space = false
      break;
  }
}


function moveing(){
  if(keys.a && !keys.d){
    console.log('moving')
    if(globalX < 0 - step){
      grounds.forEach((elem)=>{
        elem.x += step
      })
      globalX += step
    }
  }
  if(keys.d && !keys.a){
    if(Math.abs(globalX) < world.length * blockWidth - visibleBlockNumber * blockWidth){
      grounds.forEach((elem)=>{
        elem.x -= step
      })
      globalX -= step
    } 

  }
}



function moveDown(){
  if(!playerGround ){
    player.y += 5
  }
}



function jump(){
  count = 0
  playerGround = true
  let jumpInterval = setInterval(()=>{
    player.y-=10
    count++
    if(count > 10){
      playerGround = false
      count = 0
      clearInterval(jumpInterval)
    }
  },100)
}

function createBlock(elem,x,unshift){
  let block = new PIXI.Graphics()
  block.x = x * blockWidth + globalX - blockWidth + 150
  block.y = globalY * blockHeight
  block.lineStyle(1,0x00ff00)
  block.drawRect(0,0,blockWidth,blockHeight)
  block.width = blockWidth
  block.endFill()
  game.addChild(block)
  let text = new PIXI.Text(elem,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
  text.x = block.width/2 - text.width/2
  text.y = block.height/2 - text.height/2
  block.addChild(text)
  if(unshift){
    grounds.unshift(block)
  }else{
    grounds.push(block)
  }
}


function createRightBlock(){
  //первое if видимые блоки то остаеся в рамке
  if(Math.abs(globalX)<= world.length * blockWidth - visibleBlockNumber * blockWidth && globalX< 0 - step){
    //счетчик сооношения номеров блоков
    if(Math.abs(globalX/blockWidth) >= rightCount + 1 ){
      createBlock(world[visibleBlockNumber + rightCount],visibleBlockNumber + rightCount)
      rightCount += 1
      deleteFirstBlock()
    }
  }
}

function createLeftBlock(){
  console.log('rightCount:'+rightCount,'globalX:' + globalX)
  //не больше нуля потомучто в начале 
  if(globalX < 0 - step){
     //счетчик сооношения номеров блоков
    if(Math.abs(globalX/blockWidth) <= rightCount ){
      createBlock(world[rightCount], rightCount,1)
      rightCount -= 1;
      deleteLastBlock()
    }
  }
}

function deleteFirstBlock(){
  grounds[0].destroy()
  grounds.shift()
}

function deleteLastBlock(){
  grounds[grounds.length-1].destroy()
  grounds.pop()
}



function collision(){
  grounds.forEach((object)=>{
       if((player.x + player.width >= object.x) && (player.x <= object.x+object.width) 
       &&(player.y + player.height >=object.y ) && (player.y  <=object.y + object.height)){
         playerGround = 1;
       }
  })
}


let gameInterval = setInterval(()=>{
      moveDown()
      collision()
      moveing()
    },100)
window.addEventListener("keyup", movePlayerUp)
window.addEventListener("keydown", movePlayerDown)



// let ramka = new PIXI.Graphics()
// ramka.lineStyle(1,0x00ff00)
// ramka.drawRect(50,100,500,200)
// app.stage.addChild(ramka)


// function createGround(x,y){
//   let text = new PIXI.Text('G',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
//   let ground  = new PIXI.Graphics()
//   ground.x = x + globalX- 1050;
//   ground.y = y;
//   ground.lineStyle(1,0x00ff00)
//   ground.drawRect(0,0,blockWidth,blockHeight)
//   text.x = ground.width/2 - text.width/2;
//   text.y = ground.height/2 - text.height/2;
//   ground.endFill()
//   app.stage.addChild(ground)
//   ground.addChild(text)
//   grounds.push(ground)
// }

// function createTree(x,y){
//   let text = new PIXI.Text('T',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
//   let tree = new PIXI.Graphics()
//   tree.x = x + globalX - 1050;
//   tree.y = y;
//   tree.lineStyle(1,0x00ff00)
//   tree.drawRect(0,0,blockWidth,blockHeight)
//   text.x = tree.width/2 - text.width/2;
//   text.y = tree.height/2 - text.height/2;
//   tree.endFill()
//   app.stage.addChild(tree)
//   tree.addChild(text)
//   grounds.push(tree)
// }



// function ShiftRight(){
//   if(Math.abs(globalX)<= world.length * blockWidth - visibleBlockNumber * blockWidth){
//     grounds.forEach((elem)=>{
//       elem.x -= step
//     })
//     globalX -= step
//   }
// }

// function ShiftLeft(){
//   if(globalX < 0 - step){
//     grounds.forEach((elem)=>{
//       elem.x += step
//     })
//     globalX += step
//   }
// }




