var sp    = require("serialport"),
    redis = require("redis"),
    client = redis.createClient(),
    serialPort = new sp.SerialPort("/dev/cu.usbserial-A5026YSX", {
      baudrate: 9600,
      parser: sp.parsers.readline("\n")
    });

var start = null;

var processData = function() {
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
    addToRedis(message);
  }
  catch(e) {
    console.log('error', e);
  }
};

var addToRedis = function(message) {
   client.set(message.key, JSON.stringify(message), redis.print);
};

var listPorts = function(next) {
  sp.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(port.comName);
      console.log(port.pnpId);
      console.log(port.manufacturer);
    });
    next();
  });
};

listPorts(function() { 
  processData();
});