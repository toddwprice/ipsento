System.register(['aurelia-framework', 'moment', 'socket.io-client'], function (_export) {
  'use strict';

  var inject, moment, io, JobNew;

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
      JobNew = (function () {
        function JobNew() {
          _classCallCheck(this, JobNew);

          this.jobRunning = false;
          this.hasData = false;
          this.dataStream = [];
          this.operator = "";
          this.beanDescription = "";
          this.roasterId = window.localStorage.roasterId;
          this.elapsed = 0;
        }

        _createClass(JobNew, [{
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

        return JobNew;
      })();

      _export('JobNew', JobNew);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QVcsQ0FBQyxDQUFDO1dBQ3BEOzs7ZUFFVyxlQUFHO0FBQ2IsbUJBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7V0FDekM7OztlQXJCVSxNQUFNIiwiZmlsZSI6ImpvYk5ldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBjbGFzcyBKb2JOZXcge1xuICByb2FzdGVyU2V0dGluZ3M7XG4gIG9wZXJhdG9ycztcbiAgam9iUnVubmluZyA9IGZhbHNlO1xuICBoYXNEYXRhID0gZmFsc2U7XG4gIGxhc3RVcGRhdGVkO1xuICBncmFwaDtcbiAgZGF0YVN0cmVhbSA9IFtdO1xuICBvcGVyYXRvciA9IFwiXCI7XG4gIGJlYW5EZXNjcmlwdGlvbiA9IFwiXCI7XG4gIHJvYXN0ZXJJZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlcklkO1xuICBlbGFwc2VkID0gMDtcbiAgY3VycmVudFRlbXA7XG4gIGN1cnJlbnRQcmVzc3VyZTtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGdldCBjYW5QcmludCgpIHtcbiAgICByZXR1cm4gIXRoaXMuam9iUnVubmluZyAmJiB0aGlzLmhhc0RhdGE7XG4gIH1cblxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMucm9hc3RlclNldHRpbmdzID0gd2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MgPyBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlclNldHRpbmdzKSA6IHt9O1xuICAgIHRoaXMub3BlcmF0b3JzID0gdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzID8gIHRoaXMucm9hc3RlclNldHRpbmdzLm9wZXJhdG9ycy5zcGxpdCgnXFxuJykgOiBbXTtcbiAgICB0aGlzLm9wZXJhdG9yID0gd2luZG93LmxvY2FsU3RvcmFnZS5sYXN0T3BlcmF0b3I7XG4gIH1cblxuICAvLyBhdHRhY2hlZCgpIHtcblxuICAvLyB9XG5cbiAgcmVhZHkoKSB7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGVkaXRKb2IoKSB7XG4gICAgdGhpcy5pc1JlYWR5ID0gZmFsc2U7XG4gIH1cblxuICAvLyB0b2dnbGVEZXRhaWxzKCkge1xuICAvLyAgIHRoaXMuc2hvd0RldGFpbHMgPSAhdGhpcy5zaG93RGV0YWlscztcbiAgLy8gfVxuXG4gIHN0YXJ0Sm9iKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSB0cnVlO1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGFzdE9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcbiAgICB0aGlzLnNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjgwODAnKTtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKTtcbiAgICB2YXIgZHMgPSB0aGlzLmRhdGFTdHJlYW07XG4gICAgdmFyIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG5cbiAgICBjb25zb2xlLmxvZyhtb21lbnQoKSk7XG5cbiAgICB2YXJcbiAgICAgIHJvb21UZW1wID0gW10sXG4gICAgICBkcnVtVGVtcCA9IFtdLFxuICAgICAgd2F0ZXJDb2x1bW5zID0gW10sXG4gICAgICBiZWFuVGVtcCA9IFtdO1xuXG5cbiAgICB2YXIgZHJhd0dyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRHJhdyBHcmFwaFxuICAgICAgc2VsZi5ncmFwaCA9IEZsb3RyLmRyYXcoY29udGFpbmVyLCBbXG4gICAgICAgIHtkYXRhOiByb29tVGVtcCwgbGFiZWw6ICdyb29tJyB9LFxuICAgICAgICB7ZGF0YTogZHJ1bVRlbXAsIGxhYmVsOiAnZHJ1bScgfSxcbiAgICAgICAge2RhdGE6IGJlYW5UZW1wLCBsYWJlbDogJ2JlYW5zJyB9LFxuICAgICAgICB7ZGF0YTogd2F0ZXJDb2x1bW5zLCBsYWJlbDogJ3djJywgbGluZXM6IHtmaWxsOiB0cnVlfSwgeWF4aXM6IDIgfVxuICAgICAgXSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlIDogc2VsZi5iZWFuRGVzY3JpcHRpb24sXG4gICAgICAgICAgc3VidGl0bGU6IGAke3NlbGYub3BlcmF0b3J9IC0gJHtzZWxmLnJvYXN0ZXJTZXR0aW5ncy5yb2FzdGVySWR9IC0gJHtzdGFydFRpbWV9YCxcbiAgICAgICAgICB4YXhpczoge1xuICAgICAgICAgICAgbW9kZTogJ3RpbWUnLFxuICAgICAgICAgICAgc2hvd01pbm9yTGFiZWxzOiB0cnVlLFxuICAgICAgICAgICAgdGlja3M6IFswLCA2MCwgMTIwLCAxODAsIDI0MCwgMzAwLCAzNjAsIDQyMCwgNDgwLCA1NDAsIDYwMCwgNjYwLCA3MjAsIDc4MCwgODQwLCA5MDAsIDk2MCwgMTAyMF0sXG4gICAgICAgICAgICB0aWNrRm9ybWF0dGVyOiBmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICAvLyByZXR1cm4gbjtcbiAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgnMjAwMC0wMS0wMSAwMDowMDowMCcpLmFkZChtb21lbnQuZHVyYXRpb24obioxMDAwKSkuZm9ybWF0KCdtbTpzcycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pbiA6IDAsXG4gICAgICAgICAgICBtYXg6IDEwMjAsXG4gICAgICAgICAgICBsYWJlbHNBbmdsZSA6IDQ1LFxuICAgICAgICAgICAgdGl0bGUgOiAnU2Vjb25kcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHlheGlzOiB7XG4gICAgICAgICAgICBjb2xvcjogJyNFNzRCMDAnLFxuICAgICAgICAgICAgbWF4IDogcGFyc2VJbnQoc2VsZi5yb2FzdGVyU2V0dGluZ3MudGVtcEhpZ2gpLFxuICAgICAgICAgICAgdGl0bGUgOiAnVGVtcGVyYXR1cmUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5MmF4aXM6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzI1NjZCNycsXG4gICAgICAgICAgICBtYXg6IHBhcnNlSW50KHNlbGYucm9hc3RlclNldHRpbmdzLndjSGlnaCksXG4gICAgICAgICAgICB0aXRsZTogJ1dhdGVyIENvbHVtbnMnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBncmlkIDoge1xuICAgICAgICAgICAgdmVydGljYWxMaW5lcyA6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBIdG1sVGV4dCA6IGZhbHNlLFxuICAgICAgICAgIGxlZ2VuZCA6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uIDogJ3NlJ1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIHRoaXMuc29ja2V0Lm9uKCdkYXRhU3RyZWFtJywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgc2VsZi5kYXRhU3RyZWFtLnB1c2gobXNnKTtcbiAgICAgIHNlbGYuZWxhcHNlZCA9IChuZXcgRGF0ZSgpKSAtIHN0YXJ0VGltZTtcbiAgICAgIHNlbGYuY3VycmVudFRlbXAgPSBtc2cuYmVhblRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnRQcmVzc3VyZSA9IG1zZy53YXRlckNvbHVtbnM7XG4gICAgICB2YXIgY3VycmVudFggPSBzZWxmLmVsYXBzZWQgLyAxMDAwO1xuXG4gICAgICByb29tVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLnJvb21UZW1wXSk7XG4gICAgICBkcnVtVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmRydW1UZW1wXSk7XG4gICAgICBiZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICB3YXRlckNvbHVtbnMucHVzaChbY3VycmVudFgsIG1zZy53YXRlckNvbHVtbnNdKTtcblxuXG4gICAgICBzZWxmLmxhc3RVcGRhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgIHNlbGYuaGFzRGF0YSA9IHRydWU7XG4gICAgICBkcmF3R3JhcGgoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RvcEpvYigpIHtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcmludEpvYigpIHtcbiAgICB0aGlzLmdyYXBoLmRvd25sb2FkLnNhdmVJbWFnZSgncG5nJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
