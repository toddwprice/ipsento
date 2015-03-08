var sp = require("serialport");

var serialPort = new sp.SerialPort("/dev/cu.usbserial-A5026YSX", {
  baudrate: 9600,
  parser: sp.parsers.readline("\n")
});


var processData = function() {
  serialPort.on("open", function () {
    console.log('open');
    serialPort.on('data', function(data) {
      // incoming += data;
      // if (incoming.indexOf("\r")>=0) {
        //we got the end of the message - parse it
        processMessage(data);
      // }
    });
  });
};

var processMessage = function(incoming) {
  try {
    var message = JSON.parse(incoming);
    message.dateTime = new Date();
    console.log(message);
  }
  catch(e) {
    console.log('error', e);
  }
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
  // process.exit();
});
