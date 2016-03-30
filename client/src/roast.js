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
  firstCrackSet = false;
  isSaved = false;
  errorMessage = "";
  roomTemp = [];
  drumTemp = [];
  psi = [];
  beanTemp = [];
  startTime = null;

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

    this.waitForNewJob();
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

    this.roomTemp = [];
    this.drumTemp = [];
    this.psi = [];
    this.beanTemp = [];

    this.roast.roastDate = (new Date()).toUTCString();
    this.roast.startPsi = this.currentPsi;
    this.jobRunning = true;
    window.localStorage.lastOperator = this.roast.operator;
    this.startTime = new Date();
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
    this.errorMessage = "";
    if (!this.roast.weightOut) {
      this.errorMessage = "Please enter a weight out below the graph.";
      return;
    }
    this.roast.weightLoss = (this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn;
    this.roast.graph = this.graph.download.getImageBase64('png');
    localStorage.lastRoast = JSON.stringify(this.roast);
    this.isSaved = true;
  }

  waitForNewJob() {
    var self = this;
    this.socket = io('http://localhost:8080');
    this.socket.on('dataStream', function (msg) {
      self.dataStream.push(msg);
      if (this.jobRunning) {
        self.elapsed = (new Date()) - self.startTime;
      }
      self.currentBeanTemp = msg.beanTemp;
      self.currentRoomTemp = msg.roomTemp;
      self.currentDrumTemp = msg.drumTemp;
      self.currentPsi = msg.psi;
      // self.currentWc = msg.waterColumns;
      var currentX = self.elapsed / 1000;

      self.roomTemp.push([currentX, msg.roomTemp]);
      self.drumTemp.push([currentX, msg.drumTemp]);
      self.beanTemp.push([currentX, msg.beanTemp]);
      self.psi.push([currentX, msg.psi]);


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

      self.drawGraph();
    });
  }


  drawGraph() {
    // Draw Graph
    this.graph = Flotr.draw(document.getElementById("chart"), [
      {data: this.roomTemp, label: 'room' },
      {data: this.drumTemp, label: 'drum' },
      {data: this.beanTemp, label: 'beans' },
      {data: this.psi, label: 'psi', lines: { fill: true }, yaxis: 2 },
    ],
      {
        title : this.roast.id,
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
          title : 'Time'
        },
        yaxis: {
          color: '#E74B00',
          max : parseInt(this.roasterSettings.tempHigh),
          title : 'Temperature'
        },
        y2axis: {
          color: '#2566B7',
          max: parseInt(this.roasterSettings.wcHigh),
          title: 'PSI'
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
  }
}
