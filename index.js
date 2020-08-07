var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port=6600;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const getVisitors =()=>{
  // creacte clients this will give us object of connected sokets
  let clients =io.sockets.clients().connected;
  //Object.value function grab all values from clients object 
  //And create an array for using  those values 
  //and return us all connected sockets
  let sockets = Object.values(clients);
  ///create array user
   let users = sockets.map(s=>s.user);
   return users ;
}

//  create another function to emits all users
 const emitVisitors =()=>{
   io.emit('Visitors',getVisitors());
 };

io.on('connection', (socket) => {
  console.log('a user connected');


  // pass new visitor 
  socket.on('new_visitor', user => {
    console.log('new_visitor',user);
    socket.user = user;
    // whenever new user is connected here emit this evets
    emitVisitors();
  })

  socket.on('disconnect', function () {
    //when ever new user disconnecting fire the events again
    emitVisitors();
    console.log('User Disconnected ')
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});