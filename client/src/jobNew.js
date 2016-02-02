import {inject} from 'aurelia-framework';
import io from 'socket.io-client';

export class JobNew {
  operators = [];
  jobRunning = false;
  hasData = false;
  lastUpdated;
  graph;
  dataStream = [];
  operator = "";
  beanDescription = "";


  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  get canPrint() {
    return !this.jobRunning && this.hasData;
  }

  // constructor() {

  // }

  activate() {
    this.operators = window.localStorage.operators.split('\n');
  }

  // attached() {

  // }

  ready() {
    this.isReady = true;
  }

  edit() {
    this.isReady = false;
  }

  startJob() {
    var self = this;
    this.jobRunning = true;
    this.socket = io('http://localhost:8080');
    var container = document.getElementById("chart");
    var ds = this.dataStream;
    var startTime = new Date();

    var
      roomTemp = [],
      drumTemp = [],
      waterColumns = [],
      beanTemp = [];

    var drawGraph = function () {
      // Draw Graph
      self.graph = Flotr.draw(container, [
        {data: roomTemp, label: 'room' },
        {data: drumTemp, label: 'drum' },
        {data: beanTemp, label: 'beans' },
        {data: waterColumns, label: 'wc', lines: {fill: true}, yaxis: 2 }
      ],
        {
          title : self.beanDescription,
          subtitle: self.operator + ' - ' + startTime,
          xaxis : {
            noTicks : 7,
            tickFormatter : function (n) { return '('+n+')'; },
            min : 1,
            max : 7.5,
            labelsAngle : 45,
            title : 'x Axis'
          },
          yaxis : {
            max : 500,
            title : 'Temperature'
          },
          y2axis: {
            color: '#FF0000',
            max: 30,
            title: 'Water Columns'
          },
          grid : {
            verticalLines : false,
            backgroundColor : 'white'
          },
          HtmlText : false,
          legend : {
            position : 'se'
          }
      });
    };


    this.socket.on('dataStream', function (msg) {
      self.dataStream.push(msg);
      var currentX = ((new Date()) - startTime) / 1000;

      roomTemp.push([currentX, msg.roomTemp]);
      drumTemp.push([currentX, msg.drumTemp]);
      beanTemp.push([currentX, msg.beanTemp]);
      waterColumns.push([currentX, msg.waterColumns]);


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
