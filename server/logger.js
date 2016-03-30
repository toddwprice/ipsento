var sp = require("serialport");
var io = require('socket.io')(8080);
var serialPort;
var start = null;
var pressureReadings = [];
const pressureAvgCount = 3;

Array.prototype.sum = Array.prototype.sum || function() {
  return this.reduce(function(sum, a) { return sum + Number(a) }, 0);
}

Array.prototype.average = Array.prototype.average || function() {
  return this.sum() / (this.length || 1);
}

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

var getWC = function (psi) {
  if (psi <= .02) psi = 0;
  if (pressureReadings.length < pressureAvgCount) {
    pressureReadings.push(psi);
  }
  else {
    pressureReadings.shift();
    pressureReadings.push(psi);
  }

  return pressureReadings.average() * 67;
};

var processMessage = function(incoming) {
  try {
    var message = JSON.parse(incoming);
    message.dateTime = new Date();
    if (start == null) start = new Date();
    message.key = message.dateTime.getTime() -  start.getTime();

    var data = {
      sensor_time: message.dateTime,
      roomTemp: message.roomTemp,
      drumTemp: message.dt,
      psi: message.psi,
      waterColumns: getWC(message.psi),
      beanTemp: message.bt
    };

    console.log(data);

    //   console.log(data);
    io.emit('dataStream', data);

    // addToRedis(message);
  }
  catch(e) {
    console.log('error', e);
  }
};

var findPort = function(next) {
  console.log('Searching for FTDI...');
  sp.list(function (err, ports) {
    var found = false;
    ports.forEach(function (port) {
      if (port.pnpId.toUpperCase().indexOf('FTDI') > -1) {
        console.log('using:', port.pnpId);
        found = true;
        return next(port.comName);
      }
    });

    if (!found) {
        console.log('No FTDI port found.');
        process.exit();
    }
  });
};

findPort(function(portName) {
  processData(portName);
});
