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

function random (low, high) {
    return Math.random() * (high - low) + low;
}

setInterval(function () {
  var time = new Date();
  beanTemp = beanTemp + (beanTemp * beanChange * beanDirection) + random(-5,5);
  waterColumns = waterColumns * wcDirection;

  if (beanTemp < bottomTemp) {
    beanTemp = bottomTemp;
    beanChange = .0025;
    beanDirection = 1;
    waterColumns = 8.9;
  }

  var data = {
    sensor_time: time,
    roomTemp: roomTemp,
    drumTemp: drumTemp,
    waterColumns: waterColumns + random(-0.1, 0.1),
    psi: waterColumns / 27.6799048425,
    beanTemp: beanTemp
  };

  console.log(data);
  io.emit('dataStream', data);
}, 1000);
