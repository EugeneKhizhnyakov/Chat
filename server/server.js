const express = require('express');
const config = require('config');
const mongoose = require('mongoose');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Room = require('./models/Room');
const Message = require('./models/Message');

const PORT = config.get('port') || 9999;


app.use(express.json());
app.use('/sign', require('./route/signRoute'));
app.use('/rooms', require('./route/roomRoute'));




io.on('connection', (socket) => {
  socket.on('join', ({ roomId, userName, userId }) => {
    socket.join(roomId);
  });

  socket.on('message', async ({ userName, text, roomId  }) => {
    const message = new Message({text, userName, owner: roomId});
    await message.save();
    socket.to(roomId).broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
  });
});


async function start(){
  try{
      await mongoose.connect(config.get('mongoUrl'), {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false 
      });
      server.listen(PORT, () =>{
          console.log(`server has been started on ${PORT}`);
      })
  }
  catch(err){
      console.log(err);
  }
}

start();