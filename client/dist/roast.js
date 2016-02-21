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
//# sourceMappingURL=data:application/json;base64,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QUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7QUFDakUsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1dBQzFCOzs7aUJBRU0sbUJBQUc7QUFDUixnQkFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQzNGLGdCQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0Qsd0JBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1dBQ3JCOzs7ZUFyS08sZUFBRztBQUNULG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNwRDs7O2VBRVUsZUFBRztBQUNaLG1CQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1dBQ3pDOzs7ZUFFVyxlQUFHO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUNyQjs7O2VBNUJVLEtBQUsiLCJmaWxlIjoicm9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgY2xhc3MgUm9hc3Qge1xuICByb2FzdCA9IHt9O1xuICByb2FzdGVyU2V0dGluZ3M7XG4gIG9wZXJhdG9ycztcbiAgam9iUnVubmluZyA9IGZhbHNlO1xuICBoYXNEYXRhID0gZmFsc2U7XG4gIGxhc3RVcGRhdGVkO1xuICBncmFwaDtcbiAgZGF0YVN0cmVhbSA9IFtdO1xuICBlbGFwc2VkID0gMDtcbiAgY3VycmVudEJlYW5UZW1wO1xuICBjdXJyZW50RHJ1bVRlbXA7XG4gIGN1cnJlbnRSb29tVGVtcDtcbiAgY3VycmVudFBzaTtcbiAgY3VycmVudFdjO1xuICBmaXJzdENyYWNrU2V0ID0gZmFsc2U7XG4gIGlzU2F2ZWQgPSBmYWxzZTtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGdldCBjYW5TYXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5qb2JSdW5uaW5nICYmIHRoaXMuaGFzRGF0YTtcbiAgfVxuXG4gIGdldCBjYW5QcmludCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhdmVkO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5yb2FzdGVyU2V0dGluZ3MgPSB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MpIDoge307XG4gICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLnJvYXN0ZXJTZXR0aW5ncy5vcGVyYXRvcnMgPyAgdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzLnNwbGl0KCdcXG4nKSA6IFtdO1xuXG4gICAgdGhpcy5yb2FzdCA9IHtcbiAgICAgIGNvZmZlZTogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiB3aW5kb3cubG9jYWxTdG9yYWdlLmxhc3RPcGVyYXRvcixcbiAgICAgIHJvYXN0ZXI6IHRoaXMucm9hc3RlclNldHRpbmdzLnJvYXN0ZXJJZFxuICAgIH07XG4gIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgZWRpdEpvYigpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGhhc2hDb2RlKHN0cikge1xuICAvLyAgIHZhciBoYXNoID0gMDtcbiAgLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAvLyAgICAgICBoYXNoID0gfn4oKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBzdHIuY2hhckNvZGVBdChpKSk7XG4gIC8vICAgfVxuICAvLyAgIHJldHVybiBoYXNoLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAvLyB9XG5cbiAgLy8gZ2V0IHJvYXN0SWQoKSB7XG4gIC8vICAgdmFyIHJldHZhbCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgKyAnLSdcbiAgLy8gICByZXR2YWwgKz0gdGhpcy5yb2FzdC5jb2ZmZWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMvZywgJycpICsgJy0nO1xuICAvLyAgIHJldHZhbCArPSB0aGlzLnJvYXN0Lm9wZXJhdG9yLnJlcGxhY2UoL1teQS1aXS9nLCAnJykgKyAnLSc7XG4gIC8vICAgcmV0dmFsICs9IHRoaXMucm9hc3Qucm9hc3RlcjtcbiAgLy8gICByZXR1cm4gdGhpcy5oYXNoQ29kZShyZXR2YWwpO1xuICAvLyB9XG5cbiAgc3RhcnRKb2IoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMucm9hc3Qucm9hc3REYXRlID0gKG5ldyBEYXRlKCkpLnRvVVRDU3RyaW5nKCk7XG4gICAgdGhpcy5yb2FzdC5zdGFydFdjID0gdGhpcy5jdXJyZW50V2M7XG4gICAgdGhpcy5qb2JSdW5uaW5nID0gdHJ1ZTtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmxhc3RPcGVyYXRvciA9IHRoaXMucm9hc3Qub3BlcmF0b3I7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcnRcIik7XG4gICAgdmFyIGRzID0gdGhpcy5kYXRhU3RyZWFtO1xuICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgY29uc29sZS5sb2cobW9tZW50KCkpO1xuXG4gICAgdmFyXG4gICAgICByb29tVGVtcCA9IFtdLFxuICAgICAgZHJ1bVRlbXAgPSBbXSxcbiAgICAgIHdhdGVyQ29sdW1ucyA9IFtdLFxuICAgICAgYmVhblRlbXAgPSBbXTtcblxuXG4gICAgdmFyIGRyYXdHcmFwaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIERyYXcgR3JhcGhcbiAgICAgIHNlbGYuZ3JhcGggPSBGbG90ci5kcmF3KGNvbnRhaW5lciwgW1xuICAgICAgICB7ZGF0YTogcm9vbVRlbXAsIGxhYmVsOiAncm9vbScgfSxcbiAgICAgICAge2RhdGE6IGRydW1UZW1wLCBsYWJlbDogJ2RydW0nIH0sXG4gICAgICAgIHtkYXRhOiBiZWFuVGVtcCwgbGFiZWw6ICdiZWFucycgfSxcbiAgICAgICAge2RhdGE6IHdhdGVyQ29sdW1ucywgbGFiZWw6ICd3YycsIGxpbmVzOiB7IGZpbGw6IHRydWUgfSwgeWF4aXM6IDIgfSxcbiAgICAgIF0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aXRsZSA6IHNlbGYucm9hc3QuaWQsXG4gICAgICAgICAgeGF4aXM6IHtcbiAgICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICAgIHNob3dNaW5vckxhYmVsczogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2tzOiBbMCwgNjAsIDEyMCwgMTgwLCAyNDAsIDMwMCwgMzYwLCA0MjAsIDQ4MCwgNTQwLCA2MDAsIDY2MCwgNzIwLCA3ODAsIDg0MCwgOTAwXSxcbiAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBuO1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCcyMDAwLTAxLTAxIDAwOjAwOjAwJykuYWRkKG1vbWVudC5kdXJhdGlvbihuKjEwMDApKS5mb3JtYXQoJ21tOnNzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWluIDogMCxcbiAgICAgICAgICAgIG1heDogOTAwLFxuICAgICAgICAgICAgbGFiZWxzQW5nbGUgOiA0NSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1NlY29uZHMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5YXhpczoge1xuICAgICAgICAgICAgY29sb3I6ICcjRTc0QjAwJyxcbiAgICAgICAgICAgIG1heCA6IHBhcnNlSW50KHNlbGYucm9hc3RlclNldHRpbmdzLnRlbXBIaWdoKSxcbiAgICAgICAgICAgIHRpdGxlIDogJ1RlbXBlcmF0dXJlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeTJheGlzOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMyNTY2QjcnLFxuICAgICAgICAgICAgbWF4OiBwYXJzZUludChzZWxmLnJvYXN0ZXJTZXR0aW5ncy53Y0hpZ2gpLFxuICAgICAgICAgICAgdGl0bGU6ICdXYXRlciBDb2x1bW5zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZCA6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsTGluZXMgOiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yIDogJ3doaXRlJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgSHRtbFRleHQgOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQgOiB7XG4gICAgICAgICAgICBwb3NpdGlvbiA6ICdzZSdcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLnNvY2tldC5vbignZGF0YVN0cmVhbScsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIHNlbGYuZGF0YVN0cmVhbS5wdXNoKG1zZyk7XG4gICAgICBzZWxmLmVsYXBzZWQgPSAobmV3IERhdGUoKSkgLSBzdGFydFRpbWU7XG4gICAgICBzZWxmLmN1cnJlbnRCZWFuVGVtcCA9IG1zZy5iZWFuVGVtcDtcbiAgICAgIHNlbGYuY3VycmVudFJvb21UZW1wID0gbXNnLnJvb21UZW1wO1xuICAgICAgc2VsZi5jdXJyZW50RHJ1bVRlbXAgPSBtc2cuZHJ1bVRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnRQc2kgPSBtc2cucHNpO1xuICAgICAgc2VsZi5jdXJyZW50V2MgPSBtc2cud2F0ZXJDb2x1bW5zO1xuICAgICAgdmFyIGN1cnJlbnRYID0gc2VsZi5lbGFwc2VkIC8gMTAwMDtcblxuICAgICAgcm9vbVRlbXAucHVzaChbY3VycmVudFgsIG1zZy5yb29tVGVtcF0pO1xuICAgICAgZHJ1bVRlbXAucHVzaChbY3VycmVudFgsIG1zZy5kcnVtVGVtcF0pO1xuICAgICAgYmVhblRlbXAucHVzaChbY3VycmVudFgsIG1zZy5iZWFuVGVtcF0pO1xuICAgICAgd2F0ZXJDb2x1bW5zLnB1c2goW2N1cnJlbnRYLCBtc2cud2F0ZXJDb2x1bW5zXSk7XG5cblxuICAgICAgc2VsZi5sYXN0VXBkYXRlZCA9IG5ldyBEYXRlKCk7XG4gICAgICBzZWxmLmhhc0RhdGEgPSB0cnVlO1xuXG4gICAgICAvL2FmdGVyIDkgbWludXRlcyBzdGFydCBsaXN0ZW5pbmcgZm9yIGZpcnN0IGNyYWNrIGF0IDM5NUZcbiAgICAgIGlmICghc2VsZi5maXJzdENyYWNrU2V0ICYmIHNlbGYuZWxhcHNlZCA+ICgwICogNjAgKiAxMDAwKSAmJiBzZWxmLmN1cnJlbnRCZWFuVGVtcCA+PSAzOTUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpcnN0Q3JhY2s6Jywgc2VsZi5lbGFwc2VkKTtcbiAgICAgICAgc2VsZi5yb2FzdC5maXJzdENyYWNrVGltZSA9IHNlbGYuZWxhcHNlZDtcbiAgICAgICAgc2VsZi5maXJzdENyYWNrU2V0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzZWxmLnJvYXN0LnN0YXJ0QmVhblRlbXApIHtcbiAgICAgICAgc2VsZi5yb2FzdC5zdGFydEJlYW5UZW1wID0gc2VsZi5jdXJyZW50QmVhblRlbXA7XG4gICAgICAgIHNlbGYucm9hc3Quc3RhcnRSb29tVGVtcCA9IHNlbGYuY3VycmVudFJvb21UZW1wO1xuICAgICAgICBzZWxmLnJvYXN0LnN0YXJ0RHJ1bVRlbXAgPSBzZWxmLmN1cnJlbnREcnVtVGVtcDtcbiAgICAgIH1cblxuICAgICAgZHJhd0dyYXBoKCk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHN0b3BKb2IoKSB7XG4gICAgdGhpcy5yb2FzdC5lbmRCZWFuVGVtcCA9IHRoaXMuY3VycmVudEJlYW5UZW1wO1xuICAgIHRoaXMucm9hc3QuZW5kUm9vbVRlbXAgPSB0aGlzLmN1cnJlbnRSb29tVGVtcDtcbiAgICB0aGlzLnJvYXN0LmVuZERydW1UZW1wID0gdGhpcy5jdXJyZW50RHJ1bVRlbXA7XG4gICAgdGhpcy5yb2FzdC5lbmRXYyA9IHRoaXMuY3VycmVudFdjO1xuICAgIHRoaXMucm9hc3QuZW5kRGF0ZSA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xuICAgIHRoaXMucm9hc3QuZWxhcHNlZCA9IHRoaXMucm9hc3Qucm9hc3REYXRlIC0gdGhpcy5yb2FzdC5zdGFydERhdGU7XG4gICAgdGhpcy5qb2JSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgc2F2ZUpvYigpIHtcbiAgICB0aGlzLnJvYXN0LndlaWdodExvc3MgPSAodGhpcy5yb2FzdC53ZWlnaHRJbiAtIHRoaXMucm9hc3Qud2VpZ2h0T3V0KSAvIHRoaXMucm9hc3Qud2VpZ2h0SW47XG4gICAgdGhpcy5yb2FzdC5ncmFwaCA9IHRoaXMuZ3JhcGguZG93bmxvYWQuZ2V0SW1hZ2VCYXNlNjQoJ3BuZycpO1xuICAgIGxvY2FsU3RvcmFnZS5sYXN0Um9hc3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJvYXN0KTtcbiAgICB0aGlzLmlzU2F2ZWQgPSB0cnVlO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
