const cellWidth = 50;
const cellHeight = 50
let globalX = 0;
let globalY = 0;
let visibleBlockNumber = 10;
let leftBlock = 1;

let app = new PIXI.Application({
  width: 500,
  height: 200,
  antialias: true,
  resolution: 1,
  backgroundColor:0x01000B
});

let game = new PIXI.Container()
app.renderer.resize(innerWidth, 500);
let container = new PIXI.Container();
app.stage.addChild(container);
document.body.appendChild(app.view);



let world = [
  [],
  [],
  [],
  [],
  [],
  ['g','','g','g','','g','g','g','','g','g','g','g','','g','g','g','g','g','g','g','g','g']
]

let grounds = []
let trees = []

let player = new PIXI.Graphics()
player.x =globalX + 100;
player.y =globalY + 200;
player.lineStyle(10,0x00ff00)
player.beginFill(0x66CCFF);
player.drawRect(100,100,10,10)
player.endFill()
app.stage.addChild(player)


//constructor world
function create(){
  for(let i = 0;i<world.length; i++){
    for(let z = 0;z<visibleBlockNumber; z++){
      contrWorld(world[i][z],i,z)
    }
    // world[i].forEach((elem,indexElem) => {
    //   contrWorld(elem,i,indexElem)
    // })
  }
}create()


function contrWorld(elem,worldLayer,indexElem){
  switch(elem){
    case't':
    createTree(globalX + indexElem * cellWidth,globalY + worldLayer * cellHeight)
    break
    case'n':
   
    break
    case'g':
    createGround(globalX + indexElem * cellWidth,globalY + worldLayer * cellHeight)
    break
  }
}contrWorld()



function createGround(x,y){
  let text = new PIXI.Text('G',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  let ground  = new PIXI.Graphics()
  ground.x = x;
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
  tree.x = x;
  tree.y = y;
  tree.lineStyle(1,0x00ff00)
  tree.drawRect(0,0,cellWidth,cellHeight)
  text.x = tree.width/2 - text.width/2;
  text.y = tree.height/2 - text.height/2;
  tree.endFill()
  app.stage.addChild(tree)
  tree.addChild(text)
  trees.push(tree)
}

//constructor world


function movePlayer(e) {
  switch (e.key) {
    case "a":
      // player.x = player.x - 15;
      globalX = globalX - 10
      ShiftRight()

      break;
    case "d":
      globalX = globalX + 10
      ShiftLeft()
      // player.x = player.x + 15;
      console.log(globalX)
      break;
    case "s":
      break;
    case "w":
      break;
  }
}

function ShiftRight(){
  grounds.forEach((elem)=>{
    elem.x = elem.x + 10
  })
  trees.forEach((elem)=>{
    elem.x = elem.x + 10
  })
}

function ShiftLeft(){
  grounds.forEach((elem)=>{
    elem.x = elem.x - 10
  })
  trees.forEach((elem)=>{
    elem.x = elem.x - 10
  })
}

function addBlockRight(){
  if(globalX/50 >= leftBlock){
    console.log(globalX)
    console.log(leftBlock)
    console.log('a')
    leftBlock += 1;
  }
  if(globalX/50 <= leftBlock){
    console.log(globalX)
    console.log(leftBlock)
    console.log('a')
    leftBlock -= 1;
  }

}
setInterval(()=>{addBlockRight()},100)

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
