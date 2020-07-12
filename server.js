const app = require('express')();
const server = require('http').Server(app);
const io =require('socket.io')(server);
const next= require('next');
const dev = process.env.NOED_ENV !== 'production'
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler()
var path = require('path');
var player = require(path.join(__dirname,  'game', 'player'));
let port = '8080'
var games = {};


io.on('connect', socket =>{
  socket.emit('message',{
    
    message: 'hola'
  })
   socket.on('message', (data) => {
    console.log(data)
  })
   
   socket.on('createRoom', (data) => {
    
  })
  
  
})

nextApp.prepare().then(()=>{
  
  
  app.get('*',(req,res) => {
    
    return nextHandler(req,res)
  })
  
  server.listen(port,(err) =>{
   var testingMatchMaker = new player.createMatchMaker('sam')
   console.log(testingMatchMaker._powerDescription);
    if(err) throw err;
    console.log(' ready')
  })
  
})