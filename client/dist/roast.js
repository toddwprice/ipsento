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
          this.roomTemp = [];
          this.drumTemp = [];
          this.psi = [];
          this.beanTemp = [];
          this.startTime = null;
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

            this.waitForNewJob();
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

            this.roomTemp = [];
            this.drumTemp = [];
            this.psi = [];
            this.beanTemp = [];

            this.roast.roastDate = new Date().toUTCString();
            this.roast.startPsi = this.currentPsi;
            this.jobRunning = true;
            window.localStorage.lastOperator = this.roast.operator;
            this.startTime = new Date();
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
          key: 'waitForNewJob',
          value: function waitForNewJob() {
            var self = this;
            this.socket = io('http://localhost:8080');
            this.socket.on('dataStream', function (msg) {
              self.dataStream.push(msg);
              if (this.jobRunning) {
                self.elapsed = new Date() - self.startTime;
              }
              self.currentBeanTemp = msg.beanTemp;
              self.currentRoomTemp = msg.roomTemp;
              self.currentDrumTemp = msg.drumTemp;
              self.currentPsi = msg.psi;

              var currentX = self.elapsed / 1000;

              self.roomTemp.push([currentX, msg.roomTemp]);
              self.drumTemp.push([currentX, msg.drumTemp]);
              self.beanTemp.push([currentX, msg.beanTemp]);
              self.psi.push([currentX, msg.psi]);

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

              self.drawGraph();
            });
          }
        }, {
          key: 'drawGraph',
          value: function drawGraph() {
            this.graph = Flotr.draw(document.getElementById("chart"), [{ data: this.roomTemp, label: 'room' }, { data: this.drumTemp, label: 'drum' }, { data: this.beanTemp, label: 'beans' }, { data: this.psi, label: 'psi', lines: { fill: true }, yaxis: 2 }], {
              title: this.roast.id,
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
                max: parseInt(this.roasterSettings.tempHigh),
                title: 'Temperature'
              },
              y2axis: {
                color: '#2566B7',
                max: parseInt(this.roasterSettings.wcHigh),
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
//# sourceMappingURL=data:application/json;base64,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QUFDLENBQUM7V0FDcEQ7OztlQUVVLGVBQUc7QUFDWixtQkFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztXQUN6Qzs7O2VBRVcsZUFBRztBQUNiLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7V0FDckI7OztlQWpDVSxLQUFLIiwiZmlsZSI6InJvYXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGNsYXNzIFJvYXN0IHtcbiAgcm9hc3QgPSB7fTtcbiAgcm9hc3RlclNldHRpbmdzO1xuICBvcGVyYXRvcnM7XG4gIGpvYlJ1bm5pbmcgPSBmYWxzZTtcbiAgaGFzRGF0YSA9IGZhbHNlO1xuICBsYXN0VXBkYXRlZDtcbiAgZ3JhcGg7XG4gIGRhdGFTdHJlYW0gPSBbXTtcbiAgZWxhcHNlZCA9IDA7XG4gIGN1cnJlbnRCZWFuVGVtcDtcbiAgY3VycmVudERydW1UZW1wO1xuICBjdXJyZW50Um9vbVRlbXA7XG4gIGN1cnJlbnRQc2k7XG4gIGZpcnN0Q3JhY2tTZXQgPSBmYWxzZTtcbiAgaXNTYXZlZCA9IGZhbHNlO1xuICBlcnJvck1lc3NhZ2UgPSBcIlwiO1xuICByb29tVGVtcCA9IFtdO1xuICBkcnVtVGVtcCA9IFtdO1xuICBwc2kgPSBbXTtcbiAgYmVhblRlbXAgPSBbXTtcbiAgc3RhcnRUaW1lID0gbnVsbDtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGdldCBjYW5TYXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5qb2JSdW5uaW5nICYmIHRoaXMuaGFzRGF0YTtcbiAgfVxuXG4gIGdldCBjYW5QcmludCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NhdmVkO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5yb2FzdGVyU2V0dGluZ3MgPSB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MpIDoge307XG4gICAgdGhpcy5vcGVyYXRvcnMgPSB0aGlzLnJvYXN0ZXJTZXR0aW5ncy5vcGVyYXRvcnMgPyAgdGhpcy5yb2FzdGVyU2V0dGluZ3Mub3BlcmF0b3JzLnNwbGl0KCdcXG4nKSA6IFtdO1xuXG4gICAgdGhpcy5yb2FzdCA9IHtcbiAgICAgIGNvZmZlZTogbnVsbCxcbiAgICAgIG9wZXJhdG9yOiB3aW5kb3cubG9jYWxTdG9yYWdlLmxhc3RPcGVyYXRvcixcbiAgICAgIHJvYXN0ZXI6IHRoaXMucm9hc3RlclNldHRpbmdzLnJvYXN0ZXJJZFxuICAgIH07XG5cbiAgICB0aGlzLndhaXRGb3JOZXdKb2IoKTtcbiAgfVxuXG4gIHJlYWR5KCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gIH1cblxuICBlZGl0Sm9iKCkge1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICB9XG5cbiAgLy8gaGFzaENvZGUoc3RyKSB7XG4gIC8vICAgdmFyIGhhc2ggPSAwO1xuICAvLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gIC8vICAgICAgIGhhc2ggPSB+figoKGhhc2ggPDwgNSkgLSBoYXNoKSArIHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuIGhhc2gudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG4gIC8vIH1cblxuICAvLyBnZXQgcm9hc3RJZCgpIHtcbiAgLy8gICB2YXIgcmV0dmFsID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKSArICctJ1xuICAvLyAgIHJldHZhbCArPSB0aGlzLnJvYXN0LmNvZmZlZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccy9nLCAnJykgKyAnLSc7XG4gIC8vICAgcmV0dmFsICs9IHRoaXMucm9hc3Qub3BlcmF0b3IucmVwbGFjZSgvW15BLVpdL2csICcnKSArICctJztcbiAgLy8gICByZXR2YWwgKz0gdGhpcy5yb2FzdC5yb2FzdGVyO1xuICAvLyAgIHJldHVybiB0aGlzLmhhc2hDb2RlKHJldHZhbCk7XG4gIC8vIH1cblxuICBzdGFydEpvYigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLnJvb21UZW1wID0gW107XG4gICAgdGhpcy5kcnVtVGVtcCA9IFtdO1xuICAgIHRoaXMucHNpID0gW107XG4gICAgdGhpcy5iZWFuVGVtcCA9IFtdO1xuXG4gICAgdGhpcy5yb2FzdC5yb2FzdERhdGUgPSAobmV3IERhdGUoKSkudG9VVENTdHJpbmcoKTtcbiAgICB0aGlzLnJvYXN0LnN0YXJ0UHNpID0gdGhpcy5jdXJyZW50UHNpO1xuICAgIHRoaXMuam9iUnVubmluZyA9IHRydWU7XG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5sYXN0T3BlcmF0b3IgPSB0aGlzLnJvYXN0Lm9wZXJhdG9yO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKTtcbiAgfVxuXG4gIHN0b3BKb2IoKSB7XG4gICAgdGhpcy5yb2FzdC5lbmRCZWFuVGVtcCA9IHRoaXMuY3VycmVudEJlYW5UZW1wO1xuICAgIHRoaXMucm9hc3QuZW5kUm9vbVRlbXAgPSB0aGlzLmN1cnJlbnRSb29tVGVtcDtcbiAgICB0aGlzLnJvYXN0LmVuZERydW1UZW1wID0gdGhpcy5jdXJyZW50RHJ1bVRlbXA7XG4gICAgdGhpcy5yb2FzdC5lbmRXYyA9IHRoaXMuY3VycmVudFdjO1xuICAgIHRoaXMucm9hc3QuZW5kRGF0ZSA9IChuZXcgRGF0ZSgpKS50b1VUQ1N0cmluZygpO1xuICAgIHRoaXMucm9hc3QuZWxhcHNlZCA9IHRoaXMucm9hc3Qucm9hc3REYXRlIC0gdGhpcy5yb2FzdC5zdGFydERhdGU7XG4gICAgdGhpcy5qb2JSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgc2F2ZUpvYigpIHtcbiAgICB0aGlzLmVycm9yTWVzc2FnZSA9IFwiXCI7XG4gICAgaWYgKCF0aGlzLnJvYXN0LndlaWdodE91dCkge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBcIlBsZWFzZSBlbnRlciBhIHdlaWdodCBvdXQgYmVsb3cgdGhlIGdyYXBoLlwiO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJvYXN0LndlaWdodExvc3MgPSAodGhpcy5yb2FzdC53ZWlnaHRJbiAtIHRoaXMucm9hc3Qud2VpZ2h0T3V0KSAvIHRoaXMucm9hc3Qud2VpZ2h0SW47XG4gICAgdGhpcy5yb2FzdC5ncmFwaCA9IHRoaXMuZ3JhcGguZG93bmxvYWQuZ2V0SW1hZ2VCYXNlNjQoJ3BuZycpO1xuICAgIGxvY2FsU3RvcmFnZS5sYXN0Um9hc3QgPSBKU09OLnN0cmluZ2lmeSh0aGlzLnJvYXN0KTtcbiAgICB0aGlzLmlzU2F2ZWQgPSB0cnVlO1xuICB9XG5cbiAgd2FpdEZvck5ld0pvYigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyk7XG4gICAgdGhpcy5zb2NrZXQub24oJ2RhdGFTdHJlYW0nLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICBzZWxmLmRhdGFTdHJlYW0ucHVzaChtc2cpO1xuICAgICAgaWYgKHRoaXMuam9iUnVubmluZykge1xuICAgICAgICBzZWxmLmVsYXBzZWQgPSAobmV3IERhdGUoKSkgLSBzZWxmLnN0YXJ0VGltZTtcbiAgICAgIH1cbiAgICAgIHNlbGYuY3VycmVudEJlYW5UZW1wID0gbXNnLmJlYW5UZW1wO1xuICAgICAgc2VsZi5jdXJyZW50Um9vbVRlbXAgPSBtc2cucm9vbVRlbXA7XG4gICAgICBzZWxmLmN1cnJlbnREcnVtVGVtcCA9IG1zZy5kcnVtVGVtcDtcbiAgICAgIHNlbGYuY3VycmVudFBzaSA9IG1zZy5wc2k7XG4gICAgICAvLyBzZWxmLmN1cnJlbnRXYyA9IG1zZy53YXRlckNvbHVtbnM7XG4gICAgICB2YXIgY3VycmVudFggPSBzZWxmLmVsYXBzZWQgLyAxMDAwO1xuXG4gICAgICBzZWxmLnJvb21UZW1wLnB1c2goW2N1cnJlbnRYLCBtc2cucm9vbVRlbXBdKTtcbiAgICAgIHNlbGYuZHJ1bVRlbXAucHVzaChbY3VycmVudFgsIG1zZy5kcnVtVGVtcF0pO1xuICAgICAgc2VsZi5iZWFuVGVtcC5wdXNoKFtjdXJyZW50WCwgbXNnLmJlYW5UZW1wXSk7XG4gICAgICBzZWxmLnBzaS5wdXNoKFtjdXJyZW50WCwgbXNnLnBzaV0pO1xuXG5cbiAgICAgIHNlbGYubGFzdFVwZGF0ZWQgPSBuZXcgRGF0ZSgpO1xuICAgICAgc2VsZi5oYXNEYXRhID0gdHJ1ZTtcblxuICAgICAgLy9hZnRlciA5IG1pbnV0ZXMgc3RhcnQgbGlzdGVuaW5nIGZvciBmaXJzdCBjcmFjayBhdCAzOTVGXG4gICAgICBpZiAoIXNlbGYuZmlyc3RDcmFja1NldCAmJiBzZWxmLmVsYXBzZWQgPiAoMCAqIDYwICogMTAwMCkgJiYgc2VsZi5jdXJyZW50QmVhblRlbXAgPj0gMzk1KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmaXJzdENyYWNrOicsIHNlbGYuZWxhcHNlZCk7XG4gICAgICAgIHNlbGYucm9hc3QuZmlyc3RDcmFja1RpbWUgPSBzZWxmLmVsYXBzZWQ7XG4gICAgICAgIHNlbGYuZmlyc3RDcmFja1NldCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZi5yb2FzdC5zdGFydEJlYW5UZW1wKSB7XG4gICAgICAgIHNlbGYucm9hc3Quc3RhcnRCZWFuVGVtcCA9IHNlbGYuY3VycmVudEJlYW5UZW1wO1xuICAgICAgICBzZWxmLnJvYXN0LnN0YXJ0Um9vbVRlbXAgPSBzZWxmLmN1cnJlbnRSb29tVGVtcDtcbiAgICAgICAgc2VsZi5yb2FzdC5zdGFydERydW1UZW1wID0gc2VsZi5jdXJyZW50RHJ1bVRlbXA7XG4gICAgICB9XG5cbiAgICAgIHNlbGYuZHJhd0dyYXBoKCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIGRyYXdHcmFwaCgpIHtcbiAgICAvLyBEcmF3IEdyYXBoXG4gICAgdGhpcy5ncmFwaCA9IEZsb3RyLmRyYXcoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFydFwiKSwgW1xuICAgICAge2RhdGE6IHRoaXMucm9vbVRlbXAsIGxhYmVsOiAncm9vbScgfSxcbiAgICAgIHtkYXRhOiB0aGlzLmRydW1UZW1wLCBsYWJlbDogJ2RydW0nIH0sXG4gICAgICB7ZGF0YTogdGhpcy5iZWFuVGVtcCwgbGFiZWw6ICdiZWFucycgfSxcbiAgICAgIHtkYXRhOiB0aGlzLnBzaSwgbGFiZWw6ICdwc2knLCBsaW5lczogeyBmaWxsOiB0cnVlIH0sIHlheGlzOiAyIH0sXG4gICAgXSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGUgOiB0aGlzLnJvYXN0LmlkLFxuICAgICAgICB4YXhpczoge1xuICAgICAgICAgIG1vZGU6ICd0aW1lJyxcbiAgICAgICAgICBzaG93TWlub3JMYWJlbHM6IHRydWUsXG4gICAgICAgICAgdGlja3M6IFswLCA2MCwgMTIwLCAxODAsIDI0MCwgMzAwLCAzNjAsIDQyMCwgNDgwLCA1NDAsIDYwMCwgNjYwLCA3MjAsIDc4MCwgODQwLCA5MDBdLFxuICAgICAgICAgIHRpY2tGb3JtYXR0ZXI6IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbjtcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoJzIwMDAtMDEtMDEgMDA6MDA6MDAnKS5hZGQobW9tZW50LmR1cmF0aW9uKG4qMTAwMCkpLmZvcm1hdCgnbW06c3MnKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1pbiA6IDAsXG4gICAgICAgICAgbWF4OiA5MDAsXG4gICAgICAgICAgbGFiZWxzQW5nbGUgOiA0NSxcbiAgICAgICAgICB0aXRsZSA6ICdUaW1lJ1xuICAgICAgICB9LFxuICAgICAgICB5YXhpczoge1xuICAgICAgICAgIGNvbG9yOiAnI0U3NEIwMCcsXG4gICAgICAgICAgbWF4IDogcGFyc2VJbnQodGhpcy5yb2FzdGVyU2V0dGluZ3MudGVtcEhpZ2gpLFxuICAgICAgICAgIHRpdGxlIDogJ1RlbXBlcmF0dXJlJ1xuICAgICAgICB9LFxuICAgICAgICB5MmF4aXM6IHtcbiAgICAgICAgICBjb2xvcjogJyMyNTY2QjcnLFxuICAgICAgICAgIG1heDogcGFyc2VJbnQodGhpcy5yb2FzdGVyU2V0dGluZ3Mud2NIaWdoKSxcbiAgICAgICAgICB0aXRsZTogJ1BTSSdcbiAgICAgICAgfSxcbiAgICAgICAgZ3JpZCA6IHtcbiAgICAgICAgICB2ZXJ0aWNhbExpbmVzIDogdHJ1ZSxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgOiAnd2hpdGUnXG4gICAgICAgIH0sXG4gICAgICAgIEh0bWxUZXh0IDogZmFsc2UsXG4gICAgICAgIGxlZ2VuZCA6IHtcbiAgICAgICAgICBwb3NpdGlvbiA6ICdzZSdcbiAgICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
