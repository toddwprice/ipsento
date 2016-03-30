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
          this.isSaved = false;
          this.errorMessage = "";
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
            this.roast.startPsi = this.currentPsi;
            this.jobRunning = true;
            window.localStorage.lastOperator = this.roast.operator;
            this.socket = io('http://localhost:8080');
            var container = document.getElementById("chart");
            var ds = this.dataStream;
            var startTime = new Date();

            console.log(moment());

            var roomTemp = [],
                drumTemp = [],
                psi = [],
                beanTemp = [];

            var drawGraph = function drawGraph() {
              self.graph = Flotr.draw(container, [{ data: roomTemp, label: 'room' }, { data: drumTemp, label: 'drum' }, { data: beanTemp, label: 'beans' }, { data: psi, label: 'psi', lines: { fill: true }, yaxis: 2 }], {
                title: self.roast.id,
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
                  title: 'Time'
                },
                yaxis: {
                  color: '#E74B00',
                  max: parseInt(self.roasterSettings.tempHigh),
                  title: 'Temperature'
                },
                y2axis: {
                  color: '#2566B7',
                  max: parseInt(self.roasterSettings.wcHigh),
                  title: 'PSI'
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

              var currentX = self.elapsed / 1000;

              roomTemp.push([currentX, msg.roomTemp]);
              drumTemp.push([currentX, msg.drumTemp]);
              beanTemp.push([currentX, msg.beanTemp]);
              psi.push([currentX, msg.psi]);

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
        }, {
          key: 'user',
          get: function get() {
            return JSON.parse(window.localStorage.currentUser);
          }
        }, {
          key: 'canSave',
          get: function get() {
            return !this.jobRunning && this.hasData;
          }
        }, {
          key: 'canPrint',
          get: function get() {
            return this.isSaved;
          }
        }]);

        return Roast;
      })();

      _export('Roast', Roast);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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Q0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0FBQ2pFLGdCQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN4QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUMxQjs7O2lCQUVNLG1CQUFHO0FBQ1IsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7QUFDekIsa0JBQUksQ0FBQyxZQUFZLEdBQUcsNENBQTRDLENBQUM7QUFDakUscUJBQU87YUFDUjtBQUNELGdCQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFBLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7QUFDM0YsZ0JBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3RCx3QkFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7V0FDckI7OztlQTFLTyxlQUFHO0FBQ1QsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1dBQ3BEOzs7ZUFFVSxlQUFHO0FBQ1osbUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7V0FDekM7OztlQUVXLGVBQUc7QUFDYixtQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1dBQ3JCOzs7ZUE1QlUsS0FBSyIsImZpbGUiOiJyb2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge1JlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBjbGFzcyBSb2FzdCB7XG4gIHJvYXN0ID0ge307XG4gIHJvYXN0ZXJTZXR0aW5ncztcbiAgb3BlcmF0b3JzO1xuICBqb2JSdW5uaW5nID0gZmFsc2U7XG4gIGhhc0RhdGEgPSBmYWxzZTtcbiAgbGFzdFVwZGF0ZWQ7XG4gIGdyYXBoO1xuICBkYXRhU3RyZWFtID0gW107XG4gIGVsYXBzZWQgPSAwO1xuICBjdXJyZW50QmVhblRlbXA7XG4gIGN1cnJlbnREcnVtVGVtcDtcbiAgY3VycmVudFJvb21UZW1wO1xuICBjdXJyZW50UHNpO1xuICBmaXJzdENyYWNrU2V0ID0gZmFsc2U7XG4gIGlzU2F2ZWQgPSBmYWxzZTtcbiAgZXJyb3JNZXNzYWdlID0gXCJcIjtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGdldCBjYW5TYXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5qb2JSdW5uaW5nICYmIHRoaXMuaGFzRGF0YTtcbiAgfVxuXG4gIGdldCBjYW5QcmludCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhdmVkO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5yb2FzdGVyU2V0dGluZ3MgPSB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MpIDoge307XG4gICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLnJvYXN0ZXJTZXR0aW5ncy5vcGVyYXRvcnMgPyAgdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzLnNwbGl0KCdcXG4nKSA6IFtdO1xuXG4gICAgdGhpcy5yb2FzdCA9IHtcbiAgICAgIGNvZmZlZTogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiB3aW5kb3cubG9jYWxTdG9yYWdlLmxhc3RPcGVyYXRvcixcbiAgICAgIHJvYXN0ZXI6IHRoaXMucm9hc3RlclNldHRpbmdzLnJvYXN0ZXJJZFxuICAgIH07XG4gIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgZWRpdEpvYigpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGhhc2hDb2RlKHN0cikge1xuICAvLyAgIHZhciBoYXNoID0gMDtcbiAgLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAvLyAgICAgICBoYXNoID0gfn4oKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBzdHIuY2hhckNvZGVBdChpKSk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiBoYXNoLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAvLyB9XG5cbiAgLy8gZ2V0IHJvYXN0SWQoKSB7XG4gIC8vICAgdmFyIHJldHZhbCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyAnLSdcbiAgLy8gICByZXR2YWwgKz0gdGhpcy5yb2FzdC5jb2ZmZWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpICsgJy0nO1xuICAvLyAgIHJldHZhbCArPSB0aGlzLnJvYXN0Lm9wZXJhdG9yLnJlcGxhY2UoL1teQS1aXS9nLCAnJykgKyAnLSc7XG4gIC8vICAgcmV0dmFsICs9IHRoaXMucm9hc3Qucm9hc3RlcjtcbiAgLy8gICByZXR1cm4gdGhpcy5oYXNoQ29kZShyZXR2YWwpO1xuICAvLyB9XG5cbiAgc3RhcnRKb2IoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMucm9hc3Qucm9hc3REYXRlID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCk7XG4gICAgdGhpcy5yb2FzdC5zdGFydFBzaSA9IHRoaXMuY3VycmVudFBzaTtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSB0cnVlO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGFzdE9wZXJhdG9yID0gdGhpcy5yb2FzdC5vcGVyYXRvcjtcbiAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwODAnKTtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKTtcbiAgICB2YXIgZHMgPSB0aGlzLmRhdGFTdHJlYW07XG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhtb21lbnQoKSk7XG5cbiAgICB2YXJcbiAgICAgIHJvb21UZW1wID0gW10sXG4gICAgICBkcnVtVGVtcCA9IFtdLFxuICAgICAgcHNpID0gW10sXG4gICAgICBiZWFuVGVtcCA9IFtdO1xuXG5cbiAgICB2YXIgZHJhd0dyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRHJhdyBHcmFwaFxuICAgICAgc2VsZi5ncmFwaCA9IEZsb3RyLmRyYXcoY29udGFpbmVyLCBbXG4gICAgICAgIHtkYXRhOiByb29tVGVtcCwgbGFiZWw6ICdyb29tJyB9LFxuICAgICAgICB7ZGF0YTogZHJ1bVRlbXAsIGxhYmVsOiAnZHJ1bScgfSxcbiAgICAgICAge2RhdGE6IGJlYW5UZW1wLCBsYWJlbDogJ2JlYW5zJyB9LFxuICAgICAgICB7ZGF0YTogcHNpLCBsYWJlbDogJ3BzaScsIGxpbmVzOiB7IGZpbGw6IHRydWUgfSwgeWF4aXM6IDIgfSxcbiAgICAgIF0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZSA6IHNlbGYucm9hc3QuaWQsXG4gICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICAgIHNob3dNaW5vckxhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2tzOiBbMCwgNjAsIDEyMCwgMTgwLCAyNDAsIDMwMCwgMzYwLCA0MjAsIDQ4MCwgNTQwLCA2MDAsIDY2MCwgNzIwLCA3ODAsIDg0MCwgOTAwXSxcbiAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBuO1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCcyMDAwLTAxLTAxIDAwOjAwOjAwJykuYWRkKG1vbWVudC5kdXJhdGlvbihuKjEwMDApKS5mb3JtYXQoJ21tOnNzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWluIDogMCxcbiAgICAgICAgICAgIG1heDogOTAwLFxuICAgICAgICAgICAgbGFiZWxzQW5nbGUgOiA0NSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1RpbWUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgY29sb3I6ICcjRTc0QjAwJyxcbiAgICAgICAgICAgIG1heCA6IHBhcnNlSW50KHNlbGYucm9hc3RlclNldHRpbmdzLnRlbXBIaWdoKSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1RlbXBlcmF0dXJlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeTJheGlzOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMyNTY2QjcnLFxuICAgICAgICAgICAgbWF4OiBwYXJzZUludChzZWxmLnJvYXN0ZXJTZXR0aW5ncy53Y0hpZ2gpLFxuICAgICAgICAgICAgdGl0bGU6ICdQU0knXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmlkIDoge1xuICAgICAgICAgICAgdmVydGljYWxMaW5lcyA6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBIdG1sVGV4dCA6IGZhbHNlLFxuICAgICAgICAgIGxlZ2VuZCA6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogJ3NlJ1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIHRoaXMuc29ja2V0Lm9uKCdkYXRhU3RyZWFtJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgc2VsZi5kYXRhU3RyZWFtLnB1c2gobXNnKTtcbiAgICAgIHNlbGYuZWxhcHNlZCA9IChuZXcgRGF0ZSgpKSAtIHN0YXJ0VGltZTtcbiAgICAgIHNlbGYuY3VycmVudEJlYW5UZW1wID0gbXNnLmJlYW5UZW1wO1xuICAgICAgc2VsZi5jdXJyZW50Um9vbVRlbXAgPSBtc2cucm9vbVRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnREcnVtVGVtcCA9IG1zZy5kcnVtVGVtcDtcbiAgICAgIHNlbGYuY3VycmVudFBzaSA9IG1zZy5wc2k7XG4gICAgICAvLyBzZWxmLmN1cnJlbnRXYyA9IG1zZy53YXRlckNvbHVtbnM7XG4gICAgICB2YXIgY3VycmVudFggPSBzZWxmLmVsYXBzZWQgLyAxMDAwO1xuXG4gICAgICByb29tVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLnJvb21UZW1wXSk7XG4gICAgICBkcnVtVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmRydW1UZW1wXSk7XG4gICAgICBiZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICBwc2kucHVzaChbY3VycmVudFgsIG1zZy5wc2ldKTtcblxuXG4gICAgICBzZWxmLmxhc3RVcGRhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgIHNlbGYuaGFzRGF0YSA9IHRydWU7XG5cbiAgICAgIC8vYWZ0ZXIgOSBtaW51dGVzIHN0YXJ0IGxpc3RlbmluZyBmb3IgZmlyc3QgY3JhY2sgYXQgMzk1RlxuICAgICAgaWYgKCFzZWxmLmZpcnN0Q3JhY2tTZXQgJiYgc2VsZi5lbGFwc2VkID4gKDAgKiA2MCAqIDEwMDApICYmIHNlbGYuY3VycmVudEJlYW5UZW1wID49IDM5NSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmlyc3RDcmFjazonLCBzZWxmLmVsYXBzZWQpO1xuICAgICAgICBzZWxmLnJvYXN0LmZpcnN0Q3JhY2tUaW1lID0gc2VsZi5lbGFwc2VkO1xuICAgICAgICBzZWxmLmZpcnN0Q3JhY2tTZXQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNlbGYucm9hc3Quc3RhcnRCZWFuVGVtcCkge1xuICAgICAgICBzZWxmLnJvYXN0LnN0YXJ0QmVhblRlbXAgPSBzZWxmLmN1cnJlbnRCZWFuVGVtcDtcbiAgICAgICAgc2VsZi5yb2FzdC5zdGFydFJvb21UZW1wID0gc2VsZi5jdXJyZW50Um9vbVRlbXA7XG4gICAgICAgIHNlbGYucm9hc3Quc3RhcnREcnVtVGVtcCA9IHNlbGYuY3VycmVudERydW1UZW1wO1xuICAgICAgfVxuXG4gICAgICBkcmF3R3JhcGgoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RvcEpvYigpIHtcbiAgICB0aGlzLnJvYXN0LmVuZEJlYW5UZW1wID0gdGhpcy5jdXJyZW50QmVhblRlbXA7XG4gICAgdGhpcy5yb2FzdC5lbmRSb29tVGVtcCA9IHRoaXMuY3VycmVudFJvb21UZW1wO1xuICAgIHRoaXMucm9hc3QuZW5kRHJ1bVRlbXAgPSB0aGlzLmN1cnJlbnREcnVtVGVtcDtcbiAgICB0aGlzLnJvYXN0LmVuZFdjID0gdGhpcy5jdXJyZW50V2M7XG4gICAgdGhpcy5yb2FzdC5lbmREYXRlID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCk7XG4gICAgdGhpcy5yb2FzdC5lbGFwc2VkID0gdGhpcy5yb2FzdC5yb2FzdERhdGUgLSB0aGlzLnJvYXN0LnN0YXJ0RGF0ZTtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBzYXZlSm9iKCkge1xuICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJcIjtcbiAgICBpZiAoIXRoaXMucm9hc3Qud2VpZ2h0T3V0KSB7XG4gICAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiUGxlYXNlIGVudGVyIGEgd2VpZ2h0IG91dCBiZWxvdyB0aGUgZ3JhcGguXCI7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucm9hc3Qud2VpZ2h0TG9zcyA9ICh0aGlzLnJvYXN0LndlaWdodEluIC0gdGhpcy5yb2FzdC53ZWlnaHRPdXQpIC8gdGhpcy5yb2FzdC53ZWlnaHRJbjtcbiAgICB0aGlzLnJvYXN0LmdyYXBoID0gdGhpcy5ncmFwaC5kb3dubG9hZC5nZXRJbWFnZUJhc2U2NCgncG5nJyk7XG4gICAgbG9jYWxTdG9yYWdlLmxhc3RSb2FzdCA9IEpTT04uc3RyaW5naWZ5KHRoaXMucm9hc3QpO1xuICAgIHRoaXMuaXNTYXZlZCA9IHRydWU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
