import {inject} from 'aurelia-framework';
import moment from 'moment';
import io from 'socket.io-client';

export class Roast {
  roasterSettings;
  operators;
  jobRunning = false;
  hasData = false;
  lastUpdated;
  graph;
  dataStream = [];
  operator = "";
  beanDescription = "";
  roasterId = window.localStorage.roasterId;
  elapsed = 0;
  currentTemp;
  currentDrumTemp;
  currentPsi;
  currentWc;

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  get canPrint() {
    return !this.jobRunning && this.hasData;
  }


  activate() {
    this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};
    this.operators = this.roasterSettings.operators ?  this.roasterSettings.operators.split('\n') : [];
    this.operator = window.localStorage.lastOperator;
  }

  // attached() {

  // }

  ready() {
    this.isReady = true;
  }

  editJob() {
    this.isReady = false;
  }

  // toggleDetails() {
  //   this.showDetails = !this.showDetails;
  // }

  startJob() {
    var self = this;
    this.jobRunning = true;
    window.localStorage.lastOperator = this.operator;
    this.socket = io('http://localhost:8080');
    var container = document.getElementById("chart");
    var ds = this.dataStream;
    var startTime = new Date();

    console.log(moment());

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
          subtitle: `${self.operator} - ${self.roasterSettings.roasterId} - ${startTime}`,
          xaxis: {
            mode: 'time',
            showMinorLabels: true,
            ticks: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020],
            tickFormatter: function (n) {
              // return n;
              return moment('2000-01-01 00:00:00').add(moment.duration(n*1000)).format('mm:ss');
            },
            min : 0,
            max: 1020,
            labelsAngle : 45,
            title : 'Seconds'
          },
          yaxis: {
            color: '#E74B00',
            max : parseInt(self.roasterSettings.tempHigh),
            title : 'Temperature'
          },
          y2axis: {
            color: '#2566B7',
            max: parseInt(self.roasterSettings.wcHigh),
            title: 'Water Columns'
          },
          grid : {
            verticalLines : true,
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
      self.elapsed = (new Date()) - startTime;
      self.currentTemp = msg.beanTemp;
      self.currentDrumTemp = msg.drumTemp;
      self.currentPsi = msg.psi;
      self.currentWc = msg.waterColumns;
      var currentX = self.elapsed / 1000;

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
