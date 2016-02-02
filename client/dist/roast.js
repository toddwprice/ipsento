System.register(['aurelia-framework', 'moment', 'socket.io-client'], function (_export) {
  'use strict';

  var inject, moment, io, Roast;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_moment) {
      moment = _moment['default'];
    }, function (_socketIoClient) {
      io = _socketIoClient['default'];
    }],
    execute: function () {
      Roast = (function () {
        function Roast() {
          _classCallCheck(this, Roast);

          this.jobRunning = false;
          this.hasData = false;
          this.dataStream = [];
          this.operator = "";
          this.beanDescription = "";
          this.roasterId = window.localStorage.roasterId;
          this.elapsed = 0;
        }

        _createClass(Roast, [{
          key: 'activate',
          value: function activate() {
            this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};
            this.operators = this.roasterSettings.operators ? this.roasterSettings.operators.split('\n') : [];
            this.operator = window.localStorage.lastOperator;
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
            this.jobRunning = true;
            window.localStorage.lastOperator = this.operator;
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
                title: self.beanDescription,
                subtitle: self.operator + ' - ' + self.roasterSettings.roasterId + ' - ' + startTime,
                xaxis: {
                  mode: 'time',
                  showMinorLabels: true,
                  ticks: [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020],
                  tickFormatter: function tickFormatter(n) {
                    return moment('2000-01-01 00:00:00').add(moment.duration(n * 1000)).format('mm:ss');
                  },
                  min: 0,
                  max: 1020,
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
              self.currentTemp = msg.beanTemp;
              self.currentPressure = msg.waterColumns;
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
        }, {
          key: 'stopJob',
          value: function stopJob() {
            this.jobRunning = false;
            this.socket.disconnect();
          }
        }, {
          key: 'printJob',
          value: function printJob() {
            this.graph.download.saveImage('png');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvYXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzswQkFJYSxLQUFLOzs7Ozs7OztpQ0FKVixNQUFNOzs7Ozs7O0FBSUQsV0FBSztpQkFBTCxLQUFLO2dDQUFMLEtBQUs7O2VBR2hCLFVBQVUsR0FBRyxLQUFLO2VBQ2xCLE9BQU8sR0FBRyxLQUFLO2VBR2YsVUFBVSxHQUFHLEVBQUU7ZUFDZixRQUFRLEdBQUcsRUFBRTtlQUNiLGVBQWUsR0FBRyxFQUFFO2VBQ3BCLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVM7ZUFDekMsT0FBTyxHQUFHLENBQUM7OztxQkFYQSxLQUFLOztpQkF3QlIsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2xILGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkcsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7V0FDbEQ7OztpQkFNSSxpQkFBRztBQUNOLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztXQUNyQjs7O2lCQUVNLG1CQUFHO0FBQ1IsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1dBQ3RCOzs7aUJBTU8sb0JBQUc7QUFDVCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixrQkFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNqRCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUMxQyxnQkFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNqRCxnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUN6QixnQkFBSSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7QUFFM0IsbUJBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7QUFFdEIsZ0JBQ0UsUUFBUSxHQUFHLEVBQUU7Z0JBQ2IsUUFBUSxHQUFHLEVBQUU7Z0JBQ2IsWUFBWSxHQUFHLEVBQUU7Z0JBQ2pCLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR2hCLGdCQUFJLFNBQVMsR0FBRyxTQUFaLFNBQVMsR0FBZTtBQUUxQixrQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUNqQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUNoQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUNoQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUNqQyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUNsRSxFQUNDO0FBQ0UscUJBQUssRUFBRyxJQUFJLENBQUMsZUFBZTtBQUM1Qix3QkFBUSxFQUFLLElBQUksQ0FBQyxRQUFRLFdBQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLFdBQU0sU0FBUyxBQUFFO0FBQy9FLHFCQUFLLEVBQUU7QUFDTCxzQkFBSSxFQUFFLE1BQU07QUFDWixpQ0FBZSxFQUFFLElBQUk7QUFDckIsdUJBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDO0FBQy9GLCtCQUFhLEVBQUUsdUJBQVUsQ0FBQyxFQUFFO0FBRTFCLDJCQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzttQkFDbkY7QUFDRCxxQkFBRyxFQUFHLENBQUM7QUFDUCxxQkFBRyxFQUFFLElBQUk7QUFDVCw2QkFBVyxFQUFHLEVBQUU7QUFDaEIsdUJBQUssRUFBRyxTQUFTO2lCQUNsQjtBQUNELHFCQUFLLEVBQUU7QUFDTCx1QkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQUcsRUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7QUFDN0MsdUJBQUssRUFBRyxhQUFhO2lCQUN0QjtBQUNELHNCQUFNLEVBQUU7QUFDTix1QkFBSyxFQUFFLFNBQVM7QUFDaEIscUJBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFDMUMsdUJBQUssRUFBRSxlQUFlO2lCQUN2QjtBQUNELG9CQUFJLEVBQUc7QUFDTCwrQkFBYSxFQUFHLElBQUk7QUFDcEIsaUNBQWUsRUFBRyxPQUFPO2lCQUMxQjtBQUNELHdCQUFRLEVBQUcsS0FBSztBQUNoQixzQkFBTSxFQUFHO0FBQ1AsMEJBQVEsRUFBRyxJQUFJO2lCQUNoQjtlQUNKLENBQUMsQ0FBQzthQUNKLENBQUM7O0FBR0YsZ0JBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUMxQyxrQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsa0JBQUksQ0FBQyxPQUFPLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxHQUFJLFNBQVMsQ0FBQztBQUN4QyxrQkFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO0FBQ2hDLGtCQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDeEMsa0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztBQUVuQyxzQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN4QyxzQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN4QyxzQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN4QywwQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7QUFHaEQsa0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM5QixrQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsdUJBQVMsRUFBRSxDQUFDO2FBQ2IsQ0FBQyxDQUFDO1dBRUo7OztpQkFFTSxtQkFBRztBQUNSLGdCQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN4QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztXQUMxQjs7O2lCQUVPLG9CQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztXQUN0Qzs7O2VBMUhPLGVBQUc7QUFDVCxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDcEQ7OztlQUVXLGVBQUc7QUFDYixtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUN6Qzs7O2VBckJVLEtBQUsiLCJmaWxlIjoicm9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2luamVjdH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGlvIGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgY2xhc3MgUm9hc3Qge1xuICByb2FzdGVyU2V0dGluZ3M7XG4gIG9wZXJhdG9ycztcbiAgam9iUnVubmluZyA9IGZhbHNlO1xuICBoYXNEYXRhID0gZmFsc2U7XG4gIGxhc3RVcGRhdGVkO1xuICBncmFwaDtcbiAgZGF0YVN0cmVhbSA9IFtdO1xuICBvcGVyYXRvciA9IFwiXCI7XG4gIGJlYW5EZXNjcmlwdGlvbiA9IFwiXCI7XG4gIHJvYXN0ZXJJZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlcklkO1xuICBlbGFwc2VkID0gMDtcbiAgY3VycmVudFRlbXA7XG4gIGN1cnJlbnRQcmVzc3VyZTtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGdldCBjYW5QcmludCgpIHtcbiAgICByZXR1cm4gIXRoaXMuam9iUnVubmluZyAmJiB0aGlzLmhhc0RhdGE7XG4gIH1cblxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMucm9hc3RlclNldHRpbmdzID0gd2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MgPyBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlclNldHRpbmdzKSA6IHt9O1xuICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzID8gIHRoaXMucm9hc3RlclNldHRpbmdzLm9wZXJhdG9ycy5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICB0aGlzLm9wZXJhdG9yID0gd2luZG93LmxvY2FsU3RvcmFnZS5sYXN0T3BlcmF0b3I7XG4gIH1cblxuICAvLyBhdHRhY2hlZCgpIHtcblxuICAvLyB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGVkaXRKb2IoKSB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gIH1cblxuICAvLyB0b2dnbGVEZXRhaWxzKCkge1xuICAvLyAgIHRoaXMuc2hvd0RldGFpbHMgPSAhdGhpcy5zaG93RGV0YWlscztcbiAgLy8gfVxuXG4gIHN0YXJ0Sm9iKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSB0cnVlO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGFzdE9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcbiAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwODAnKTtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKTtcbiAgICB2YXIgZHMgPSB0aGlzLmRhdGFTdHJlYW07XG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhtb21lbnQoKSk7XG5cbiAgICB2YXJcbiAgICAgIHJvb21UZW1wID0gW10sXG4gICAgICBkcnVtVGVtcCA9IFtdLFxuICAgICAgd2F0ZXJDb2x1bW5zID0gW10sXG4gICAgICBiZWFuVGVtcCA9IFtdO1xuXG5cbiAgICB2YXIgZHJhd0dyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRHJhdyBHcmFwaFxuICAgICAgc2VsZi5ncmFwaCA9IEZsb3RyLmRyYXcoY29udGFpbmVyLCBbXG4gICAgICAgIHtkYXRhOiByb29tVGVtcCwgbGFiZWw6ICdyb29tJyB9LFxuICAgICAgICB7ZGF0YTogZHJ1bVRlbXAsIGxhYmVsOiAnZHJ1bScgfSxcbiAgICAgICAge2RhdGE6IGJlYW5UZW1wLCBsYWJlbDogJ2JlYW5zJyB9LFxuICAgICAgICB7ZGF0YTogd2F0ZXJDb2x1bW5zLCBsYWJlbDogJ3djJywgbGluZXM6IHtmaWxsOiB0cnVlfSwgeWF4aXM6IDIgfVxuICAgICAgXSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlIDogc2VsZi5iZWFuRGVzY3JpcHRpb24sXG4gICAgICAgICAgc3VidGl0bGU6IGAke3NlbGYub3BlcmF0b3J9IC0gJHtzZWxmLnJvYXN0ZXJTZXR0aW5ncy5yb2FzdGVySWR9IC0gJHtzdGFydFRpbWV9YCxcbiAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgbW9kZTogJ3RpbWUnLFxuICAgICAgICAgICAgc2hvd01pbm9yTGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgdGlja3M6IFswLCA2MCwgMTIwLCAxODAsIDI0MCwgMzAwLCAzNjAsIDQyMCwgNDgwLCA1NDAsIDYwMCwgNjYwLCA3MjAsIDc4MCwgODQwLCA5MDAsIDk2MCwgMTAyMF0sXG4gICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAvLyByZXR1cm4gbjtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgnMjAwMC0wMS0wMSAwMDowMDowMCcpLmFkZChtb21lbnQuZHVyYXRpb24obioxMDAwKSkuZm9ybWF0KCdtbTpzcycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbiA6IDAsXG4gICAgICAgICAgICBtYXg6IDEwMjAsXG4gICAgICAgICAgICBsYWJlbHNBbmdsZSA6IDQ1LFxuICAgICAgICAgICAgdGl0bGUgOiAnU2Vjb25kcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICBjb2xvcjogJyNFNzRCMDAnLFxuICAgICAgICAgICAgbWF4IDogcGFyc2VJbnQoc2VsZi5yb2FzdGVyU2V0dGluZ3MudGVtcEhpZ2gpLFxuICAgICAgICAgICAgdGl0bGUgOiAnVGVtcGVyYXR1cmUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5MmF4aXM6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzI1NjZCNycsXG4gICAgICAgICAgICBtYXg6IHBhcnNlSW50KHNlbGYucm9hc3RlclNldHRpbmdzLndjSGlnaCksXG4gICAgICAgICAgICB0aXRsZTogJ1dhdGVyIENvbHVtbnMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmlkIDoge1xuICAgICAgICAgICAgdmVydGljYWxMaW5lcyA6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBIdG1sVGV4dCA6IGZhbHNlLFxuICAgICAgICAgIGxlZ2VuZCA6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogJ3NlJ1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIHRoaXMuc29ja2V0Lm9uKCdkYXRhU3RyZWFtJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgc2VsZi5kYXRhU3RyZWFtLnB1c2gobXNnKTtcbiAgICAgIHNlbGYuZWxhcHNlZCA9IChuZXcgRGF0ZSgpKSAtIHN0YXJ0VGltZTtcbiAgICAgIHNlbGYuY3VycmVudFRlbXAgPSBtc2cuYmVhblRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnRQcmVzc3VyZSA9IG1zZy53YXRlckNvbHVtbnM7XG4gICAgICB2YXIgY3VycmVudFggPSBzZWxmLmVsYXBzZWQgLyAxMDAwO1xuXG4gICAgICByb29tVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLnJvb21UZW1wXSk7XG4gICAgICBkcnVtVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmRydW1UZW1wXSk7XG4gICAgICBiZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICB3YXRlckNvbHVtbnMucHVzaChbY3VycmVudFgsIG1zZy53YXRlckNvbHVtbnNdKTtcblxuXG4gICAgICBzZWxmLmxhc3RVcGRhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgIHNlbGYuaGFzRGF0YSA9IHRydWU7XG4gICAgICBkcmF3R3JhcGgoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RvcEpvYigpIHtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcmludEpvYigpIHtcbiAgICB0aGlzLmdyYXBoLmRvd25sb2FkLnNhdmVJbWFnZSgncG5nJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
