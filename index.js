var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const port=6600;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');


  // pass new visitor 
  socket.on('new_visitor', user => {
    console.log('new_visitor',user)
    socket.user = user
  })

  socket.on('disconnect', function () {
    console.log('User Disconnected ')
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});