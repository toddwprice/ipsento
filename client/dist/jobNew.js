System.register(['aurelia-framework', 'socket.io-client'], function (_export) {
  'use strict';

  var inject, io, JobNew;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_socketIoClient) {
      io = _socketIoClient['default'];
    }],
    execute: function () {
      JobNew = (function () {
        function JobNew() {
          _classCallCheck(this, JobNew);

          this.operators = [];
          this.jobRunning = false;
          this.hasData = false;
          this.dataStream = [];
          this.operator = "";
          this.beanDescription = "";
        }

        _createClass(JobNew, [{
          key: 'activate',
          value: function activate() {
            this.operators = window.localStorage.operators.split('\n');
          }
        }, {
          key: 'ready',
          value: function ready() {
            this.isReady = true;
          }
        }, {
          key: 'edit',
          value: function edit() {
            this.isReady = false;
          }
        }, {
          key: 'startJob',
          value: function startJob() {
            var self = this;
            this.jobRunning = true;
            this.socket = io('http://localhost:8080');
            var container = document.getElementById("chart");
            var ds = this.dataStream;
            var startTime = new Date();

            var roomTemp = [],
                drumTemp = [],
                waterColumns = [],
                beanTemp = [];

            var drawGraph = function drawGraph() {
              self.graph = Flotr.draw(container, [{ data: roomTemp, label: 'room' }, { data: drumTemp, label: 'drum' }, { data: beanTemp, label: 'beans' }, { data: waterColumns, label: 'wc', lines: { fill: true }, yaxis: 2 }], {
                title: self.beanDescription,
                subtitle: self.operator + ' - ' + startTime,
                xaxis: {
                  noTicks: 7,
                  tickFormatter: function tickFormatter(n) {
                    return '(' + n + ')';
                  },
                  min: 1,
                  max: 7.5,
                  labelsAngle: 45,
                  title: 'x Axis'
                },
                yaxis: {
                  max: 500,
                  title: 'Temperature'
                },
                y2axis: {
                  color: '#FF0000',
                  max: 30,
                  title: 'Water Columns'
                },
                grid: {
                  verticalLines: false,
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
              var currentX = (new Date() - startTime) / 1000;

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
//# sourceMappingURL=data:application/json;base64,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LGVBQUc7QUFDYixtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUN6Qzs7O2VBakJVLE1BQU0iLCJmaWxlIjoiam9iTmV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGNsYXNzIEpvYk5ldyB7XG4gIG9wZXJhdG9ycyA9IFtdO1xuICBqb2JSdW5uaW5nID0gZmFsc2U7XG4gIGhhc0RhdGEgPSBmYWxzZTtcbiAgbGFzdFVwZGF0ZWQ7XG4gIGdyYXBoO1xuICBkYXRhU3RyZWFtID0gW107XG4gIG9wZXJhdG9yID0gXCJcIjtcbiAgYmVhbkRlc2NyaXB0aW9uID0gXCJcIjtcblxuXG4gIGdldCB1c2VyKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICB9XG5cbiAgZ2V0IGNhblByaW50KCkge1xuICAgIHJldHVybiAhdGhpcy5qb2JSdW5uaW5nICYmIHRoaXMuaGFzRGF0YTtcbiAgfVxuXG4gIC8vIGNvbnN0cnVjdG9yKCkge1xuXG4gIC8vIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLm9wZXJhdG9ycyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uub3BlcmF0b3JzLnNwbGl0KCdcXG4nKTtcbiAgfVxuXG4gIC8vIGF0dGFjaGVkKCkge1xuXG4gIC8vIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgZWRpdCgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXJ0Sm9iKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcpO1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJ0XCIpO1xuICAgIHZhciBkcyA9IHRoaXMuZGF0YVN0cmVhbTtcbiAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgIHZhclxuICAgICAgcm9vbVRlbXAgPSBbXSxcbiAgICAgIGRydW1UZW1wID0gW10sXG4gICAgICB3YXRlckNvbHVtbnMgPSBbXSxcbiAgICAgIGJlYW5UZW1wID0gW107XG5cbiAgICB2YXIgZHJhd0dyYXBoID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gRHJhdyBHcmFwaFxuICAgICAgc2VsZi5ncmFwaCA9IEZsb3RyLmRyYXcoY29udGFpbmVyLCBbXG4gICAgICAgIHtkYXRhOiByb29tVGVtcCwgbGFiZWw6ICdyb29tJyB9LFxuICAgICAgICB7ZGF0YTogZHJ1bVRlbXAsIGxhYmVsOiAnZHJ1bScgfSxcbiAgICAgICAge2RhdGE6IGJlYW5UZW1wLCBsYWJlbDogJ2JlYW5zJyB9LFxuICAgICAgICB7ZGF0YTogd2F0ZXJDb2x1bW5zLCBsYWJlbDogJ3djJywgbGluZXM6IHtmaWxsOiB0cnVlfSwgeWF4aXM6IDIgfVxuICAgICAgXSxcbiAgICAgICAge1xuICAgICAgICAgIHRpdGxlIDogc2VsZi5iZWFuRGVzY3JpcHRpb24sXG4gICAgICAgICAgc3VidGl0bGU6IHNlbGYub3BlcmF0b3IgKyAnIC0gJyArIHN0YXJ0VGltZSxcbiAgICAgICAgICB4YXhpcyA6IHtcbiAgICAgICAgICAgIG5vVGlja3MgOiA3LFxuICAgICAgICAgICAgdGlja0Zvcm1hdHRlciA6IGZ1bmN0aW9uIChuKSB7IHJldHVybiAnKCcrbisnKSc7IH0sXG4gICAgICAgICAgICBtaW4gOiAxLFxuICAgICAgICAgICAgbWF4IDogNy41LFxuICAgICAgICAgICAgbGFiZWxzQW5nbGUgOiA0NSxcbiAgICAgICAgICAgIHRpdGxlIDogJ3ggQXhpcydcbiAgICAgICAgICB9LFxuICAgICAgICAgIHlheGlzIDoge1xuICAgICAgICAgICAgbWF4IDogNTAwLFxuICAgICAgICAgICAgdGl0bGUgOiAnVGVtcGVyYXR1cmUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5MmF4aXM6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnI0ZGMDAwMCcsXG4gICAgICAgICAgICBtYXg6IDMwLFxuICAgICAgICAgICAgdGl0bGU6ICdXYXRlciBDb2x1bW5zJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JpZCA6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsTGluZXMgOiBmYWxzZSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvciA6ICd3aGl0ZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIEh0bWxUZXh0IDogZmFsc2UsXG4gICAgICAgICAgbGVnZW5kIDoge1xuICAgICAgICAgICAgcG9zaXRpb24gOiAnc2UnXG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5zb2NrZXQub24oJ2RhdGFTdHJlYW0nLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBzZWxmLmRhdGFTdHJlYW0ucHVzaChtc2cpO1xuICAgICAgdmFyIGN1cnJlbnRYID0gKChuZXcgRGF0ZSgpKSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xuXG4gICAgICByb29tVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLnJvb21UZW1wXSk7XG4gICAgICBkcnVtVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmRydW1UZW1wXSk7XG4gICAgICBiZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICB3YXRlckNvbHVtbnMucHVzaChbY3VycmVudFgsIG1zZy53YXRlckNvbHVtbnNdKTtcblxuXG4gICAgICBzZWxmLmxhc3RVcGRhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgIHNlbGYuaGFzRGF0YSA9IHRydWU7XG4gICAgICBkcmF3R3JhcGgoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RvcEpvYigpIHtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcmludEpvYigpIHtcbiAgICB0aGlzLmdyYXBoLmRvd25sb2FkLnNhdmVJbWFnZSgncG5nJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
