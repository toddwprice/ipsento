var io = require('socket.io')(8080);

io.on('connection', function(socket){
  console.log('a user connected');
});

setInterval(function () {
  var value = Math.random() * (420 - 300) + 300;
  var data = { sensor_time: new Date(), sensor_value: value };
  console.log(data);
  io.emit('dataStream', data);
}, 1000);
