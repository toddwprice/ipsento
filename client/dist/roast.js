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
//# sourceMappingURL=data:application/json;base64,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QUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztXQUNwRDs7O2VBRVcsZUFBRztBQUNiLG1CQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1dBQ3pDOzs7ZUF0QlUsS0FBSyIsImZpbGUiOiJyb2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBjbGFzcyBSb2FzdCB7XG4gIHJvYXN0ZXJTZXR0aW5ncztcbiAgb3BlcmF0b3JzO1xuICBqb2JSdW5uaW5nID0gZmFsc2U7XG4gIGhhc0RhdGEgPSBmYWxzZTtcbiAgbGFzdFVwZGF0ZWQ7XG4gIGdyYXBoO1xuICBkYXRhU3RyZWFtID0gW107XG4gIG9wZXJhdG9yID0gXCJcIjtcbiAgYmVhbkRlc2NyaXB0aW9uID0gXCJcIjtcbiAgcm9hc3RlcklkID0gd2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVySWQ7XG4gIGVsYXBzZWQgPSAwO1xuICBjdXJyZW50VGVtcDtcbiAgY3VycmVudFBzaTtcbiAgY3VycmVudFdjO1xuXG4gIGdldCB1c2VyKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICB9XG5cbiAgZ2V0IGNhblByaW50KCkge1xuICAgIHJldHVybiAhdGhpcy5qb2JSdW5uaW5nICYmIHRoaXMuaGFzRGF0YTtcbiAgfVxuXG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5yb2FzdGVyU2V0dGluZ3MgPSB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MpIDoge307XG4gICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLnJvYXN0ZXJTZXR0aW5ncy5vcGVyYXRvcnMgPyAgdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzLnNwbGl0KCdcXG4nKSA6IFtdO1xuICAgIHRoaXMub3BlcmF0b3IgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmxhc3RPcGVyYXRvcjtcbiAgfVxuXG4gIC8vIGF0dGFjaGVkKCkge1xuXG4gIC8vIH1cblxuICByZWFkeSgpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICB9XG5cbiAgZWRpdEpvYigpIHtcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIHRvZ2dsZURldGFpbHMoKSB7XG4gIC8vICAgdGhpcy5zaG93RGV0YWlscyA9ICF0aGlzLnNob3dEZXRhaWxzO1xuICAvLyB9XG5cbiAgc3RhcnRKb2IoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuam9iUnVubmluZyA9IHRydWU7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5sYXN0T3BlcmF0b3IgPSB0aGlzLm9wZXJhdG9yO1xuICAgIHRoaXMuc29ja2V0ID0gaW8oJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcpO1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJ0XCIpO1xuICAgIHZhciBkcyA9IHRoaXMuZGF0YVN0cmVhbTtcbiAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnNvbGUubG9nKG1vbWVudCgpKTtcblxuICAgIHZhclxuICAgICAgcm9vbVRlbXAgPSBbXSxcbiAgICAgIGRydW1UZW1wID0gW10sXG4gICAgICB3YXRlckNvbHVtbnMgPSBbXSxcbiAgICAgIGJlYW5UZW1wID0gW107XG5cblxuICAgIHZhciBkcmF3R3JhcGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBEcmF3IEdyYXBoXG4gICAgICBzZWxmLmdyYXBoID0gRmxvdHIuZHJhdyhjb250YWluZXIsIFtcbiAgICAgICAge2RhdGE6IHJvb21UZW1wLCBsYWJlbDogJ3Jvb20nIH0sXG4gICAgICAgIHtkYXRhOiBkcnVtVGVtcCwgbGFiZWw6ICdkcnVtJyB9LFxuICAgICAgICB7ZGF0YTogYmVhblRlbXAsIGxhYmVsOiAnYmVhbnMnIH0sXG4gICAgICAgIHtkYXRhOiB3YXRlckNvbHVtbnMsIGxhYmVsOiAnd2MnLCBsaW5lczoge2ZpbGw6IHRydWV9LCB5YXhpczogMiB9XG4gICAgICBdLFxuICAgICAgICB7XG4gICAgICAgICAgdGl0bGUgOiBzZWxmLmJlYW5EZXNjcmlwdGlvbixcbiAgICAgICAgICBzdWJ0aXRsZTogYCR7c2VsZi5vcGVyYXRvcn0gLSAke3NlbGYucm9hc3RlclNldHRpbmdzLnJvYXN0ZXJJZH0gLSAke3N0YXJ0VGltZX1gLFxuICAgICAgICAgIHhheGlzOiB7XG4gICAgICAgICAgICBtb2RlOiAndGltZScsXG4gICAgICAgICAgICBzaG93TWlub3JMYWJlbHM6IHRydWUsXG4gICAgICAgICAgICB0aWNrczogWzAsIDYwLCAxMjAsIDE4MCwgMjQwLCAzMDAsIDM2MCwgNDIwLCA0ODAsIDU0MCwgNjAwLCA2NjAsIDcyMCwgNzgwLCA4NDAsIDkwMCwgOTYwLCAxMDIwXSxcbiAgICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgIC8vIHJldHVybiBuO1xuICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCcyMDAwLTAxLTAxIDAwOjAwOjAwJykuYWRkKG1vbWVudC5kdXJhdGlvbihuKjEwMDApKS5mb3JtYXQoJ21tOnNzJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWluIDogMCxcbiAgICAgICAgICAgIG1heDogMTAyMCxcbiAgICAgICAgICAgIGxhYmVsc0FuZ2xlIDogNDUsXG4gICAgICAgICAgICB0aXRsZSA6ICdTZWNvbmRzJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgeWF4aXM6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnI0U3NEIwMCcsXG4gICAgICAgICAgICBtYXggOiBwYXJzZUludChzZWxmLnJvYXN0ZXJTZXR0aW5ncy50ZW1wSGlnaCksXG4gICAgICAgICAgICB0aXRsZSA6ICdUZW1wZXJhdHVyZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHkyYXhpczoge1xuICAgICAgICAgICAgY29sb3I6ICcjMjU2NkI3JyxcbiAgICAgICAgICAgIG1heDogcGFyc2VJbnQoc2VsZi5yb2FzdGVyU2V0dGluZ3Mud2NIaWdoKSxcbiAgICAgICAgICAgIHRpdGxlOiAnV2F0ZXIgQ29sdW1ucydcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdyaWQgOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbExpbmVzIDogdHJ1ZSxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvciA6ICd3aGl0ZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIEh0bWxUZXh0IDogZmFsc2UsXG4gICAgICAgICAgbGVnZW5kIDoge1xuICAgICAgICAgICAgcG9zaXRpb24gOiAnc2UnXG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy5zb2NrZXQub24oJ2RhdGFTdHJlYW0nLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBzZWxmLmRhdGFTdHJlYW0ucHVzaChtc2cpO1xuICAgICAgc2VsZi5lbGFwc2VkID0gKG5ldyBEYXRlKCkpIC0gc3RhcnRUaW1lO1xuICAgICAgc2VsZi5jdXJyZW50VGVtcCA9IG1zZy5iZWFuVGVtcDtcbiAgICAgIHNlbGYuY3VycmVudFBzaSA9IG1zZy5wc2k7XG4gICAgICBzZWxmLmN1cnJlbnRXYyA9IG1zZy53YXRlckNvbHVtbnM7XG4gICAgICB2YXIgY3VycmVudFggPSBzZWxmLmVsYXBzZWQgLyAxMDAwO1xuXG4gICAgICByb29tVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLnJvb21UZW1wXSk7XG4gICAgICBkcnVtVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmRydW1UZW1wXSk7XG4gICAgICBiZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICB3YXRlckNvbHVtbnMucHVzaChbY3VycmVudFgsIG1zZy53YXRlckNvbHVtbnNdKTtcblxuXG4gICAgICBzZWxmLmxhc3RVcGRhdGVkID0gbmV3IERhdGUoKTtcbiAgICAgIHNlbGYuaGFzRGF0YSA9IHRydWU7XG4gICAgICBkcmF3R3JhcGgoKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc3RvcEpvYigpIHtcbiAgICB0aGlzLmpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBwcmludEpvYigpIHtcbiAgICB0aGlzLmdyYXBoLmRvd25sb2FkLnNhdmVJbWFnZSgncG5nJyk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
