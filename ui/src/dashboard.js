import {inject} from 'aurelia-framework';
import io from 'socket.io-client';

export class Dashboard {
  jobRunning = false;
  hasData = false;
  lastUpdated;
  graph;
  dataStream = [];

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  get canPrint() {
    return !this.jobRunning && this.hasData;
  }

  // constructor() {

  // }

  // activate() {

  // }

  // attached() {

  // }

  startJob() {
    var self = this;
    this.jobRunning = true;
    this.socket = io('http://localhost:8080');
    var container = document.getElementById("chart");
    var ds = this.dataStream;
    var startTime = new Date();

    var
      drumTemp = [],
      beanTemp = [],
      pressure = [];

    var drawGraph = function () {
      // Draw Graph
      self.graph = Flotr.draw(container, [ drumTemp ], {
        xaxis: {
          minorTickFreq: 4
        },
        grid: {
          minorVerticalLines: true
        }
      });
    };


    this.socket.on('dataStream', function (msg) {
      var currentX = ((new Date()) - startTime) / 1000;
      drumTemp.push([currentX, msg.sensor_value]);
      drumTemp.push(msg);
      self.lastUpdated = new Date();
      self.hasData = true;
      drawGraph();
    });

  }

  stopJob() {
    this.jobRunning = false;
    this.socket.disconnect();
  }

  printJob() {
    this.graph.download.saveImage('png');
  }
}
