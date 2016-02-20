import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import moment from 'moment';
import io from 'socket.io-client';

export class Roast {
  roast = {};
  roasterSettings;
  operators;
  jobRunning = false;
  hasData = false;
  lastUpdated;
  graph;
  dataStream = [];
  elapsed = 0;
  currentBeanTemp;
  currentDrumTemp;
  currentRoomTemp;
  currentPsi;
  currentWc;
  firstCrackSet = false;
  isSaved = false;

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  get canSave() {
    return !this.jobRunning && this.hasData;
  }

  get canPrint() {
    return this.isSaved;
  }

  activate() {
    this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};
    this.operators = this.roasterSettings.operators ?  this.roasterSettings.operators.split('\n') : [];

    this.roast = {
      coffee: null,
      operator: window.localStorage.lastOperator,
      roaster: this.roasterSettings.roasterId
    };
  }

  ready() {
    this.isReady = true;
  }

  editJob() {
    this.isReady = false;
  }

  // hashCode(str) {
  //   var hash = 0;
  //   for (var i = 0; i < str.length; i++) {
  //       hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
  //   }
  //   return hash.toString(16).toUpperCase();
  // }

  // get roastId() {
  //   var retval = (new Date()).getTime() + '-'
  //   retval += this.roast.coffee.toLowerCase().replace(/\s/g, '') + '-';
  //   retval += this.roast.operator.replace(/[^A-Z]/g, '') + '-';
  //   retval += this.roast.roaster;
  //   return this.hashCode(retval);
  // }

  startJob() {
    var self = this;
    this.roast.roastDate = (new Date()).toUTCString();
    this.roast.startWc = this.currentWc;
    this.jobRunning = true;
    window.localStorage.lastOperator = this.roast.operator;
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
        {data: waterColumns, label: 'wc', lines: { fill: true }, yaxis: 2 },
      ],
        {
          title: self.roast.coffee,
          subtitle : self.roast.id,
          xaxis: {
            mode: 'time',
            showMinorLabels: true,
            ticks: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900],
            tickFormatter: function (n) {
              // return n;
              return moment('2000-01-01 00:00:00').add(moment.duration(n*1000)).format('mm:ss');
            },
            min : 0,
            max: 900,
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
      self.currentBeanTemp = msg.beanTemp;
      self.currentRoomTemp = msg.roomTemp;
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

      //after 9 minutes start listening for first crack at 395F
      if (!self.firstCrackSet && self.elapsed > (0 * 60 * 1000) && self.currentBeanTemp >= 395) {
        console.log('firstCrack:', self.elapsed);
        self.roast.firstCrackTime = self.elapsed;
        self.firstCrackSet = true;
      }

      if (!self.roast.startBeanTemp) {
        self.roast.startBeanTemp = self.currentBeanTemp;
        self.roast.startRoomTemp = self.currentRoomTemp;
        self.roast.startDrumTemp = self.currentDrumTemp;
      }

      drawGraph();
    });

  }

  stopJob() {
    this.roast.endBeanTemp = this.currentBeanTemp;
    this.roast.endRoomTemp = this.currentRoomTemp;
    this.roast.endDrumTemp = this.currentDrumTemp;
    this.roast.endWc = this.currentWc;
    this.roast.endDate = (new Date()).toUTCString();
    this.roast.elapsed = this.roast.roastDate - this.roast.startDate;
    this.jobRunning = false;
    this.socket.disconnect();
  }

  saveJob() {
    this.roast.weightLoss = (this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn;
    this.roast.graph = this.graph.download.getImageBase64('png');
    localStorage.lastRoast = JSON.stringify(this.roast);
    this.isSaved = true;
  }
}
