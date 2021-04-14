

const cellWidth = 50;
const cellHeight = 50
let deep = 5;
let globalX ;
let globalY = 5;
let visibleBlockNumber = 12;
let leftBlock = 1;
let step = 10;

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
  'g','t','g','g','t','g','g','g','t','t','g','g','g','t','g','t','','t','g','g',
]
globalX = Math.round(world.length/2) * 50;
let grounds = []


let player = new PIXI.Graphics()
player.x = 150;
player.y = 130 ;
player.lineStyle(10,0x00ff00)
player.beginFill(0x66CCFF);
player.drawRect(100,100,10,10)
player.endFill()
app.stage.addChild(player)

let ramka = new PIXI.Graphics()
ramka.lineStyle(1,0x00ff00)
ramka.drawRect(150,100,500,200)
app.stage.addChild(ramka)



//constructor world
function beginWorl(){
  for(let i = world.length/2 - visibleBlockNumber/2;i<visibleBlockNumber; i++){
    sortElem(world[i],i)
}
}
beginWorl()


function sortElem(elem,indexElem){
  switch(elem){
    case't':
    createTree(globalX + indexElem * cellWidth,globalY * cellHeight)
    break
    case'n':
    break
    case'g':
    createGround(globalX + indexElem * cellWidth,globalY * cellHeight)
    break
  }
}sortElem()

function createBlock(){
  sortElem(world[leftBlock + 7],leftBlock + 7 * cellWidth,)
  // createGround(leftBlock + 10 *cellWidth,250)
}

function createGround(x,y){
  let text = new PIXI.Text('G',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  let ground  = new PIXI.Graphics()
  ground.x = x + globalX- 1050;
  ground.y = y;
  ground.lineStyle(1,0x00ff00)
  ground.drawRect(0,0,cellWidth,cellHeight)
  text.x = ground.width/2 - text.width/2;
  text.y = ground.height/2 - text.height/2;
  ground.endFill()
  app.stage.addChild(ground)
  ground.addChild(text)
  grounds.push(ground)
}

function createTree(x,y){
  let text = new PIXI.Text('T',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  let tree = new PIXI.Graphics()
  tree.x = x + globalX - 1050;
  tree.y = y;
  tree.lineStyle(1,0x00ff00)
  tree.drawRect(0,0,cellWidth,cellHeight)
  text.x = tree.width/2 - text.width/2;
  text.y = tree.height/2 - text.height/2;
  tree.endFill()
  app.stage.addChild(tree)
  tree.addChild(text)
  grounds.push(tree)
}

//constructor world
function movePlayer(e){
  switch (e.key) {
    case "a":
      ShiftLeft()
      // createLeftBlock()
      break;
    case "d":
      ShiftRight()
      createRightBlock()
      break;
    case "s":
      break;
    case "w":
      break;
  }
}

function ShiftRight(){
  if(globalX >= 0){
    grounds.forEach((elem)=>{
      elem.x -= step
    })
    globalX -= step
  }
}

function ShiftLeft(){
  if(globalX <= world.length * cellWidth){
    grounds.forEach((elem)=>{
      elem.x += step
    })
    globalX += step
  }

}

function createRightBlock(){
  console.log("globalX:"+globalX)
  console.log("positionBlodk:"+leftBlock)
  if(globalX/50 >= leftBlock){
    console.log('a')
    leftBlock += 1;
    createBlock()
  }
}

function createLeftBlock(){
  console.log('aaa')
  if(globalX/50 >= leftBlock){
    console.log(globalX)
    console.log(leftBlock)
    console.log('a')
    leftBlock += 1;
    createBlock()
    deleteFirstBlock()
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

container.addChild(player)
window.addEventListener("keydown", movePlayer)


















// let massOnKey = {
//   "a":false,
//   "w":false,
//   "d":false,
//   "s":false
// }


// function collader(object,action){
//   console.log('collaider')
//   let playerWidth =  player.width
//   let playerHeight =  player.height
//   object.forEach((object)=>{
//     console.log((object.x+object.width/2),(player.x + playerWidth/2))
//     if((player.x + playerWidth/2) >= (object.x - object.width/2) && (player.x - playerWidth/2) <= (object.x+object.width/2) &&(player.y - player.height/2 <=object.y + object.height/2  ) && (player.y + player.height/2 >=object.y - object.height/2  )   ){
//       console.log('collaid')}
//     })
//    }
 
// setInterval(()=>{collader(grounds)},1000)


// let world = [
//   [],
//   [],
//   [],
//   [],
//   [],
//   ['','','g','','','','g','g','g','','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','t','t','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
//   ['','g','g','','','','g','g','g','g','','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','t','t','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
//   ['g','g','g','','','','g','g','g','g','','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','t','t','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
//   ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','t','t','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g'],
//   ['g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','t','t','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g','g']
// ]
