System.register(['aurelia-framework', 'aurelia-router', 'moment', 'socket.io-client'], function (_export) {
  'use strict';

  var inject, Redirect, moment, io, Roast;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }, function (_moment) {
      moment = _moment['default'];
    }, function (_socketIoClient) {
      io = _socketIoClient['default'];
    }],
    execute: function () {
      Roast = (function () {
        function Roast() {
          _classCallCheck(this, Roast);

          this.roast = {};
          this.jobRunning = false;
          this.hasData = false;
          this.dataStream = [];
          this.elapsed = 0;
          this.firstCrackSet = false;
        }

        _createClass(Roast, [{
          key: 'activate',
          value: function activate() {
            this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};
            this.operators = this.roasterSettings.operators ? this.roasterSettings.operators.split('\n') : [];

            this.roast = {
              coffee: null,
              operator: window.localStorage.lastOperator,
              roaster: this.roasterSettings.roasterId
            };
          }
        }, {
          key: 'ready',
          value: function ready() {
            this.isReady = true;
          }
        }, {
          key: 'editJob',
          value: function editJob() {
            this.isReady = false;
          }
        }, {
          key: 'startJob',
          value: function startJob() {
            var self = this;
            this.roast.roastDate = new Date().toUTCString();
            this.roast.startWc = this.currentWc;
            this.jobRunning = true;
            window.localStorage.lastOperator = this.roast.operator;
            this.socket = io('http://localhost:8080');
            var container = document.getElementById("chart");
            var ds = this.dataStream;
            var startTime = new Date();

            console.log(moment());

            var roomTemp = [],
                drumTemp = [],
                waterColumns = [],
                beanTemp = [];

            var drawGraph = function drawGraph() {
              self.graph = Flotr.draw(container, [{ data: roomTemp, label: 'room' }, { data: drumTemp, label: 'drum' }, { data: beanTemp, label: 'beans' }, { data: waterColumns, label: 'wc', lines: { fill: true }, yaxis: 2 }], {
                title: self.roast.coffee,
                subtitle: self.roast.id,
                xaxis: {
                  mode: 'time',
                  showMinorLabels: true,
                  ticks: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900],
                  tickFormatter: function tickFormatter(n) {
                    return moment('2000-01-01 00:00:00').add(moment.duration(n * 1000)).format('mm:ss');
                  },
                  min: 0,
                  max: 900,
                  labelsAngle: 45,
                  title: 'Seconds'
                },
                yaxis: {
                  color: '#E74B00',
                  max: parseInt(self.roasterSettings.tempHigh),
                  title: 'Temperature'
                },
                y2axis: {
                  color: '#2566B7',
                  max: parseInt(self.roasterSettings.wcHigh),
                  title: 'Water Columns'
                },
                grid: {
                  verticalLines: true,
                  backgroundColor: 'white'
                },
                HtmlText: false,
                legend: {
                  position: 'se'
                }
              });
            };

            this.socket.on('dataStream', function (msg) {
              self.dataStream.push(msg);
              self.elapsed = new Date() - startTime;
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

              if (!self.firstCrackSet && self.elapsed > 0 * 60 * 1000 && self.currentBeanTemp >= 395) {
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
        }, {
          key: 'stopJob',
          value: function stopJob() {
            this.roast.endBeanTemp = this.currentBeanTemp;
            this.roast.endRoomTemp = this.currentRoomTemp;
            this.roast.endDrumTemp = this.currentDrumTemp;
            this.roast.endWc = this.currentWc;
            this.roast.endDate = new Date().toUTCString();
            this.roast.elapsed = this.roast.roastDate - this.roast.startDate;
            this.jobRunning = false;
            this.socket.disconnect();
          }
        }, {
          key: 'saveJob',
          value: function saveJob() {
            this.roast.weightLoss = (this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn;
            this.roast.graph = this.graph.download.getImageBase64('png');
            localStorage.lastRoast = JSON.stringify(this.roast);
          }
        }, {
          key: 'user',
          get: function get() {
            return JSON.parse(window.localStorage.currentUser);
          }
        }, {
          key: 'canPrint',
          get: function get() {
            return !this.jobRunning && this.hasData;
          }
        }]);

        return Roast;
      })();

      _export('Roast', Roast);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUNqRSxnQkFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7V0FDMUI7OztpQkFFTSxtQkFBRztBQUNSLGdCQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDM0YsZ0JBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3RCx3QkFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUVyRDs7O2VBbktPLGVBQUc7QUFDVCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDcEQ7OztlQUVXLGVBQUc7QUFDYixtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUN6Qzs7O2VBdkJVLEtBQUsiLCJmaWxlIjoicm9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgY2xhc3MgUm9hc3Qge1xuICByb2FzdCA9IHt9O1xuICByb2FzdGVyU2V0dGluZ3M7XG4gIG9wZXJhdG9ycztcbiAgam9iUnVubmluZyA9IGZhbHNlO1xuICBoYXNEYXRhID0gZmFsc2U7XG4gIGxhc3RVcGRhdGVkO1xuICBncmFwaDtcbiAgZGF0YVN0cmVhbSA9IFtdO1xuICBlbGFwc2VkID0gMDtcbiAgY3VycmVudEJlYW5UZW1wO1xuICBjdXJyZW50RHJ1bVRlbXA7XG4gIGN1cnJlbnRSb29tVGVtcDtcbiAgY3VycmVudFBzaTtcbiAgY3VycmVudFdjO1xuICBmaXJzdENyYWNrU2V0ID0gZmFsc2U7XG5cbiAgZ2V0IHVzZXIoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcik7XG4gIH1cblxuICBnZXQgY2FuUHJpbnQoKSB7XG4gICAgcmV0dXJuICF0aGlzLmpvYlJ1bm5pbmcgJiYgdGhpcy5oYXNEYXRhO1xuICB9XG5cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnJvYXN0ZXJTZXR0aW5ncyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlclNldHRpbmdzID8gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncykgOiB7fTtcbiAgICB0aGlzLm9wZXJhdG9ycyA9IHRoaXMucm9hc3RlclNldHRpbmdzLm9wZXJhdG9ycyA/ICB0aGlzLnJvYXN0ZXJTZXR0aW5ncy5vcGVyYXRvcnMuc3BsaXQoJ1xcbicpIDogW107XG5cbiAgICB0aGlzLnJvYXN0ID0ge1xuICAgICAgY29mZmVlOiBudWxsLFxuICAgICAgb3BlcmF0b3I6IHdpbmRvdy5sb2NhbFN0b3JhZ2UubGFzdE9wZXJhdG9yLFxuICAgICAgcm9hc3RlcjogdGhpcy5yb2FzdGVyU2V0dGluZ3Mucm9hc3RlcklkXG4gICAgfTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIH1cblxuICBlZGl0Sm9iKCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gaGFzaENvZGUoc3RyKSB7XG4gIC8vICAgdmFyIGhhc2ggPSAwO1xuICAvLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gIC8vICAgICAgIGhhc2ggPSB+figoKGhhc2ggPDwgNSkgLSBoYXNoKSArIHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIGhhc2gudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIC8vIH1cblxuICAvLyBnZXQgcm9hc3RJZCgpIHtcbiAgLy8gICB2YXIgcmV0dmFsID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArICctJ1xuICAvLyAgIHJldHZhbCArPSB0aGlzLnJvYXN0LmNvZmZlZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJykgKyAnLSc7XG4gIC8vICAgcmV0dmFsICs9IHRoaXMucm9hc3Qub3BlcmF0b3IucmVwbGFjZSgvW15BLVpdL2csICcnKSArICctJztcbiAgLy8gICByZXR2YWwgKz0gdGhpcy5yb2FzdC5yb2FzdGVyO1xuICAvLyAgIHJldHVybiB0aGlzLmhhc2hDb2RlKHJldHZhbCk7XG4gIC8vIH1cblxuICBzdGFydEpvYigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5yb2FzdC5yb2FzdERhdGUgPSAobmV3IERhdGUoKSkudG9VVENTdHJpbmcoKTtcbiAgICB0aGlzLnJvYXN0LnN0YXJ0V2MgPSB0aGlzLmN1cnJlbnRXYztcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSB0cnVlO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGFzdE9wZXJhdG9yID0gdGhpcy5yb2FzdC5vcGVyYXRvcjtcbiAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwODAnKTtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKTtcbiAgICB2YXIgZHMgPSB0aGlzLmRhdGFTdHJlYW07XG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhtb21lbnQoKSk7XG5cbiAgICB2YXJcbiAgICAgIHJvb21UZW1wID0gW10sXG4gICAgICBkcnVtVGVtcCA9IFtdLFxuICAgICAgd2F0ZXJDb2x1bW5zID0gW10sXG4gICAgICBiZWFuVGVtcCA9IFtdO1xuXG5cbiAgICB2YXIgZHJhd0dyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRHJhdyBHcmFwaFxuICAgICAgc2VsZi5ncmFwaCA9IEZsb3RyLmRyYXcoY29udGFpbmVyLCBbXG4gICAgICAgIHtkYXRhOiByb29tVGVtcCwgbGFiZWw6ICdyb29tJyB9LFxuICAgICAgICB7ZGF0YTogZHJ1bVRlbXAsIGxhYmVsOiAnZHJ1bScgfSxcbiAgICAgICAge2RhdGE6IGJlYW5UZW1wLCBsYWJlbDogJ2JlYW5zJyB9LFxuICAgICAgICB7ZGF0YTogd2F0ZXJDb2x1bW5zLCBsYWJlbDogJ3djJywgbGluZXM6IHsgZmlsbDogdHJ1ZSB9LCB5YXhpczogMiB9LFxuICAgICAgXSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlOiBzZWxmLnJvYXN0LmNvZmZlZSxcbiAgICAgICAgICBzdWJ0aXRsZSA6IHNlbGYucm9hc3QuaWQsXG4gICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICAgIHNob3dNaW5vckxhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2tzOiBbMCwgNjAsIDEyMCwgMTgwLCAyNDAsIDMwMCwgMzYwLCA0MjAsIDQ4MCwgNTQwLCA2MDAsIDY2MCwgNzIwLCA3ODAsIDg0MCwgOTAwXSxcbiAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBuO1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCcyMDAwLTAxLTAxIDAwOjAwOjAwJykuYWRkKG1vbWVudC5kdXJhdGlvbihuKjEwMDApKS5mb3JtYXQoJ21tOnNzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWluIDogMCxcbiAgICAgICAgICAgIG1heDogOTAwLFxuICAgICAgICAgICAgbGFiZWxzQW5nbGUgOiA0NSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1NlY29uZHMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgY29sb3I6ICcjRTc0QjAwJyxcbiAgICAgICAgICAgIG1heCA6IHBhcnNlSW50KHNlbGYucm9hc3RlclNldHRpbmdzLnRlbXBIaWdoKSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1RlbXBlcmF0dXJlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeTJheGlzOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMyNTY2QjcnLFxuICAgICAgICAgICAgbWF4OiBwYXJzZUludChzZWxmLnJvYXN0ZXJTZXR0aW5ncy53Y0hpZ2gpLFxuICAgICAgICAgICAgdGl0bGU6ICdXYXRlciBDb2x1bW5zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZCA6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsTGluZXMgOiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogJ3doaXRlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgSHRtbFRleHQgOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQgOiB7XG4gICAgICAgICAgICBwb3NpdGlvbiA6ICdzZSdcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLnNvY2tldC5vbignZGF0YVN0cmVhbScsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIHNlbGYuZGF0YVN0cmVhbS5wdXNoKG1zZyk7XG4gICAgICBzZWxmLmVsYXBzZWQgPSAobmV3IERhdGUoKSkgLSBzdGFydFRpbWU7XG4gICAgICBzZWxmLmN1cnJlbnRCZWFuVGVtcCA9IG1zZy5iZWFuVGVtcDtcbiAgICAgIHNlbGYuY3VycmVudFJvb21UZW1wID0gbXNnLnJvb21UZW1wO1xuICAgICAgc2VsZi5jdXJyZW50RHJ1bVRlbXAgPSBtc2cuZHJ1bVRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnRQc2kgPSBtc2cucHNpO1xuICAgICAgc2VsZi5jdXJyZW50V2MgPSBtc2cud2F0ZXJDb2x1bW5zO1xuICAgICAgdmFyIGN1cnJlbnRYID0gc2VsZi5lbGFwc2VkIC8gMTAwMDtcblxuICAgICAgcm9vbVRlbXAucHVzaChbY3VycmVudFgsIG1zZy5yb29tVGVtcF0pO1xuICAgICAgZHJ1bVRlbXAucHVzaChbY3VycmVudFgsIG1zZy5kcnVtVGVtcF0pO1xuICAgICAgYmVhblRlbXAucHVzaChbY3VycmVudFgsIG1zZy5iZWFuVGVtcF0pO1xuICAgICAgd2F0ZXJDb2x1bW5zLnB1c2goW2N1cnJlbnRYLCBtc2cud2F0ZXJDb2x1bW5zXSk7XG5cblxuICAgICAgc2VsZi5sYXN0VXBkYXRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICBzZWxmLmhhc0RhdGEgPSB0cnVlO1xuXG4gICAgICAvL2FmdGVyIDkgbWludXRlcyBzdGFydCBsaXN0ZW5pbmcgZm9yIGZpcnN0IGNyYWNrIGF0IDM5NUZcbiAgICAgIGlmICghc2VsZi5maXJzdENyYWNrU2V0ICYmIHNlbGYuZWxhcHNlZCA+ICgwICogNjAgKiAxMDAwKSAmJiBzZWxmLmN1cnJlbnRCZWFuVGVtcCA+PSAzOTUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpcnN0Q3JhY2s6Jywgc2VsZi5lbGFwc2VkKTtcbiAgICAgICAgc2VsZi5yb2FzdC5maXJzdENyYWNrVGltZSA9IHNlbGYuZWxhcHNlZDtcbiAgICAgICAgc2VsZi5maXJzdENyYWNrU2V0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzZWxmLnJvYXN0LnN0YXJ0QmVhblRlbXApIHtcbiAgICAgICAgc2VsZi5yb2FzdC5zdGFydEJlYW5UZW1wID0gc2VsZi5jdXJyZW50QmVhblRlbXA7XG4gICAgICAgIHNlbGYucm9hc3Quc3RhcnRSb29tVGVtcCA9IHNlbGYuY3VycmVudFJvb21UZW1wO1xuICAgICAgICBzZWxmLnJvYXN0LnN0YXJ0RHJ1bVRlbXAgPSBzZWxmLmN1cnJlbnREcnVtVGVtcDtcbiAgICAgIH1cblxuICAgICAgZHJhd0dyYXBoKCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHN0b3BKb2IoKSB7XG4gICAgdGhpcy5yb2FzdC5lbmRCZWFuVGVtcCA9IHRoaXMuY3VycmVudEJlYW5UZW1wO1xuICAgIHRoaXMucm9hc3QuZW5kUm9vbVRlbXAgPSB0aGlzLmN1cnJlbnRSb29tVGVtcDtcbiAgICB0aGlzLnJvYXN0LmVuZERydW1UZW1wID0gdGhpcy5jdXJyZW50RHJ1bVRlbXA7XG4gICAgdGhpcy5yb2FzdC5lbmRXYyA9IHRoaXMuY3VycmVudFdjO1xuICAgIHRoaXMucm9hc3QuZW5kRGF0ZSA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xuICAgIHRoaXMucm9hc3QuZWxhcHNlZCA9IHRoaXMucm9hc3Qucm9hc3REYXRlIC0gdGhpcy5yb2FzdC5zdGFydERhdGU7XG4gICAgdGhpcy5qb2JSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgc2F2ZUpvYigpIHtcbiAgICB0aGlzLnJvYXN0LndlaWdodExvc3MgPSAodGhpcy5yb2FzdC53ZWlnaHRJbiAtIHRoaXMucm9hc3Qud2VpZ2h0T3V0KSAvIHRoaXMucm9hc3Qud2VpZ2h0SW47XG4gICAgdGhpcy5yb2FzdC5ncmFwaCA9IHRoaXMuZ3JhcGguZG93bmxvYWQuZ2V0SW1hZ2VCYXNlNjQoJ3BuZycpO1xuICAgIGxvY2FsU3RvcmFnZS5sYXN0Um9hc3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJvYXN0KTtcblxuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
