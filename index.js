const express = require("express");

const app = express();
   
app.use(express.static(__dirname + "/public"));
 
app.use("/", function(request, response){
     
    // response.send("<h1>Главная страница</h1>");
    response.sendFile( __dirname + '/public/index.html')
});

app.listen(3000, '0.0.0.0',console.log('server has been started'));