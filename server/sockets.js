//NOTE: This file is for sending dummy data for testing only!
var io = require('socket.io')(8080);

var bottomTemp = 320;
var beanChange = .011;
var beanDirection = -1;
var wcDirection = 1;
var roomTemp = 76.8;
var drumTemp = 204.2;
var waterColumns = 4;
var beanTemp = 406;


io.on('connection', function(socket){
  console.log('a user connected');
});

setInterval(function () {
  var time = new Date();
  beanTemp = beanTemp + (beanTemp * beanChange * beanDirection);
  waterColumns = waterColumns * wcDirection;

  if (beanTemp < bottomTemp) {
    beanTemp = bottomTemp;
    beanChange = .006;
    beanDirection = 1;
    waterColumns = 11;
  }

  var data = {
    sensor_time: time,
    roomTemp: roomTemp,
    drumTemp: drumTemp,
    waterColumns: waterColumns,
    psi: waterColumns / 27.6799048425,
    beanTemp: beanTemp
  };

  console.log(data);
  io.emit('dataStream', data);
}, 1000);
