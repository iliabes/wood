const blockWidth = 150;
const blockHeight = 50

let deep = 5;
let globalX = 0;
let globalY = 9;
let visibleBlockNumber = 12 ;
let rightCount = 0;
let step = blockWidth / 5;
let shift = blockWidth;
let playerGround = 0;
let app = new PIXI.Application({
  width: 500,
  height: 200,
  antialias: true,
  resolution: 1,
  backgroundColor:0x01000B
})

let game = new PIXI.Container()
app.renderer.resize(innerWidth, 500);
let container = new PIXI.Container();
app.stage.addChild(container);
document.body.appendChild(app.view);


let world = [
  '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20',
]

world  = []
function createWorld(n){
  for(let i = 0; i < n; i++){
    world.push(''+i)
  }
}createWorld(100)
shift = world.length/2 * blockWidth;
let grounds = []


let player = new PIXI.Graphics()
player.x = 150
player.y = 130
player.lineStyle(10,0x00ff00)
player.beginFill(0x66CCFF);
player.drawRect(0,0,10,10)
player.endFill()
app.stage.addChild(player)


// let ramka = new PIXI.Graphics()
// ramka.lineStyle(1,0x00ff00)
// ramka.drawRect(50,100,500,200)
// app.stage.addChild(ramka)



//constructor world
function beginWorld(){
  for(let i = 0;i<visibleBlockNumber; i++){
    createBlock(world[i],i)
}
}beginWorld()

function createBlock(elem,x,unshift){
  console.log('create block:'+elem+ "/"+ x)
  let text = new PIXI.Text(elem,{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'})
  let block = new PIXI.Graphics()
  block.x = x * blockWidth + globalX - blockWidth
  block.y = globalY * blockHeight
  block.lineStyle(1,0x00ff00)
  block.drawRect(0,0,blockWidth,blockHeight)
  block.width = blockWidth
  text.x = block.width/2 - text.width/2
  text.y = block.height/2 - text.height/2
  block.endFill()
  app.stage.addChild(block)
  block.addChild(text)
  if(unshift){
    grounds.unshift(block)
  }else{
    grounds.push(block)
  }
}

//constructor world
function movePlayer(e){
  switch (e.key) {
    case "a":
      ShiftLeft()
      createLeftBlock()
      break;
    case "d":
      ShiftRight()
      createRightBlock()
      break;
    case "s":
      moveDown()
      break;
    case "w":
      jump()
      break;
  }
}

function ShiftRight(){
  if(Math.abs(globalX)<= world.length * blockWidth - visibleBlockNumber * blockWidth){
    grounds.forEach((elem)=>{
      elem.x -= step
    })
    globalX -= step
  }
}

function ShiftLeft(){
  if(globalX < 0 - step){
    grounds.forEach((elem)=>{
      elem.x += step
    })
    globalX += step
  }
}

function createRightBlock(){
  console.log('rightCount:'+rightCount,'globalX:' + globalX)
  if(Math.abs(globalX)<= world.length * blockWidth - visibleBlockNumber * blockWidth && globalX< 0 - step){
    if(Math.abs(globalX/blockWidth) >= rightCount + 1 ){
      createBlock(world[visibleBlockNumber + rightCount],visibleBlockNumber + rightCount)
      rightCount += 1
      deleteFirstBlock()
    }
  }
}

function createLeftBlock(){
  console.log('rightCount:'+rightCount,'globalX:' + globalX)
  if(globalX < 0 - step){
    if(Math.abs(globalX/blockWidth) <= rightCount ){
      console.log('create')
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
    let playerWidth =  player.width
    let playerHeight =  player.height
      // console.log((object.x+object.width/2),(player.x + playerWidth/2))
       if((player.x + playerWidth/2) >= (object.x - object.width/2) && (player.x - playerWidth/2) <= (object.x+object.width/2) &&(player.y - player.height/2 <=object.y + object.height/2  ) && (player.y + player.height/2 >=object.y - object.height/2  )   ){
         console.log('collaid')
         playerGround = 1;
       }
  })
}

function moveDown(){
  if(!playerGround){
    player.y += 10
  }
}

function jump(){
  for(let i = 0; i < 3;i++ ){
    player.y -= 10
  }
}

setInterval(()=>{
  moveDown()
  collision()
},200)
container.addChild(player)
window.addEventListener("keydown", movePlayer)






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











