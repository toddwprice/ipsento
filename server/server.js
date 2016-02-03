var sp = require("serialport");
var io = require('socket.io')(8080);
var serialPort;
var start = null;
  // redis = require("redis"),
  // client = redis.createClient(),

io.on('connection', function(socket){
  console.log('a user connected');
});


var processData = function(portName) {
  serialPort = new sp.SerialPort(portName, {
    baudrate: 9600,
    parser: sp.parsers.readline("\n")
  });

  serialPort.on("open", function () {
    console.log('serial port open');
    serialPort.on('data', function(data) {
      processMessage(data);
    });
  });
};

var processMessage = function(incoming) {
  try {
    var message = JSON.parse(incoming);
    message.dateTime = new Date();
    if (start == null) start = new Date();
    message.key = message.dateTime.getTime() -  start.getTime();
    console.log(message);
    var data = {
      sensor_time: message.dateTime,
      roomTemp: message.roomTemp,
      drumTemp: message.dt,
      psi: message.psi,
      waterColumns: message.psi * 27.6799048425,
      beanTemp: message.bt
    };

    //   console.log(data);
    io.emit('dataStream', data);

    // addToRedis(message);
  }
  catch(e) {
    console.log('error', e);
  }
};

var addToRedis = function(message) {
   client.set(message.key, JSON.stringify(message), redis.print);
};

var findPort = function(next) {
  sp.list(function (err, ports) {
    ports.forEach(function (port) {
      if (port.comName.indexOf('usbserial') > -1) {
        console.log('using:', port.comName);
        next(port.comName);
      }
    });
  });
};

findPort(function(portName) {
  processData(portName);
});
