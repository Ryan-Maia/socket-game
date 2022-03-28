const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// const users = [
//   {
//     username: 'ryan',
//     socketId: 'asd'
//   }
// ]

const ROOMS = []


io.on('connection', (socket) => {
  socket.join('lobby')

  socket.on('createRoom', (e)=>{

    socket.rooms.forEach(room => { //Sai de outras salas
      socket.leave(room)
    })

    let roomId = generateUID() //Gera id da sala

    console.log('🚀 ~ file: index.js ~ line 27 ~ roomId', roomId);

    while(ROOMS.includes(roomId)){ //Garante que o id é único
      roomId = generateUID()
    }

    ROOMS.push(roomId) //Adiciona id da sala no array de salas

    socket.join(roomId) //Auto-join na nova sala
    
    io.to('lobby').emit('rooms', ROOMS)
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

function generateUID() {
  // I generate the UID from two parts here 
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}