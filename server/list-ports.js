var sp = require("serialport");

sp.list(function (err, ports) {
  ports.forEach(function (port) {
    console.log(port);
  });
});
