let app = new PIXI.Application({
    width: 500,
    height: 200,
    antialias: true,
    resolution: 1,
    backgroundColor:0x010056 
  });


  app.renderer.resize(innerWidth, 500);
  document.body.appendChild(app.view);

 