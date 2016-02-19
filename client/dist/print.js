System.register(['moment', 'numeral'], function (_export) {
  'use strict';

  var moment, numeral, Print;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }, function (_numeral) {
      numeral = _numeral['default'];
    }],
    execute: function () {
      Print = (function () {
        function Print() {
          _classCallCheck(this, Print);
        }

        _createClass(Print, [{
          key: 'activate',
          value: function activate() {
            this.roast = JSON.parse(localStorage.lastRoast);
            console.log(this.roast);
          }
        }, {
          key: 'printPdf',
          value: function printPdf() {
            var lbl = function lbl(text) {
              return {
                text: text,
                style: 'label'
              };
            };

            var temp = function temp(number) {
              return numeral(number).format('0,0.0');
            };

            var roastDate = moment(this.roast.roastDate).format('dd M/D/YYYY h:mm:s a');
            var endDate = moment(this.roast.endDate).format('dd M/D/YYYY h:mm:s a');
            var duration = moment(moment(this.roast.endDate)._d - moment(this.roast.roastDate)._d).format('mm:ss');
            var firstCrack = moment(this.firstCrackTime).format('mm:ss');

            var docDefinition = {
              pageSize: 'B8',
              pageOrientation: 'portrait',
              pageMargins: [5, 0, 0, 0],
              content: [{
                style: 'data',
                table: {
                  body: [[lbl('Batch #'), this.roast.id], [lbl('Coffee'), this.roast.coffee], [lbl('Roaster'), this.roast.operator], [lbl('Equipment'), this.roast.roaster], [lbl('Roast start'), roastDate], [lbl('Roast end'), endDate], [lbl('Duration'), duration], [lbl('Bean (F)'), temp(this.roast.startBeanTemp) + ' | ' + temp(this.roast.endBeanTemp)], [lbl('Drum (F)'), temp(this.roast.startDrumTemp) + ' | ' + temp(this.roast.endDrumTemp)], [lbl('Room (F)'), temp(this.roast.startRoomTemp) + ' | ' + temp(this.roast.endRoomTemp)], [lbl('First crack'), firstCrack], [lbl('Weight in'), numeral(this.roast.weightIn).format('0.00')], [lbl('Weight out'), numeral(this.roast.weightOut).format('0.00')], [lbl('Weight loss'), numeral((this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn).format('0.00%')]]
                },

                layout: 'noBorders'
              }, {
                image: this.roast.graph,
                width: 160
              }],
              styles: {
                data: {
                  fontSize: 8,
                  bold: true,
                  color: 'black',
                  margin: [0, 0, 0, 0]
                },
                label: {
                  fontSize: 8,
                  bold: false,
                  color: '#777777',
                  margin: [0, 0, 0, 0]
                }
              },
              defaultStyle: {
                font: 'Lato'
              }
            };

            pdfMake.fonts = {
              Lato: {
                normal: 'Lato-Regular.ttf',
                bold: 'Lato-Bold.ttf'
              }
            };
            pdfMake.createPdf(docDefinition).download('roast.pdf');
          }
        }]);

        return Print;
      })();

      _export('Print', Print);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QkFDckI7QUFDRCxxQkFBSyxFQUFFO0FBQ0wsMEJBQVEsRUFBRSxDQUFDO0FBQ1gsc0JBQUksRUFBRSxLQUFLO0FBQ1gsdUJBQUssRUFBRSxTQUFTO0FBQ2hCLHdCQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3JCO2VBQ0Y7QUFDRCwwQkFBWSxFQUFFO0FBQ1osb0JBQUksRUFBRSxNQUFNO2VBQ2I7YUFDRixDQUFDOztBQUVGLG1CQUFPLENBQUMsS0FBSyxHQUFHO0FBQ2Qsa0JBQUksRUFBRTtBQUNKLHNCQUFNLEVBQUUsa0JBQWtCO0FBQzFCLG9CQUFJLEVBQUUsZUFBZTtlQUN0QjthQUNGLENBQUM7QUFDRixtQkFBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDeEQ7OztlQWxHVSxLQUFLIiwiZmlsZSI6InByaW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHBkZk1ha2UgKi9cbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xuXG5leHBvcnQgY2xhc3MgUHJpbnQge1xuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnJvYXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UubGFzdFJvYXN0KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnJvYXN0KTtcbiAgfVxuXG4gIHByaW50UGRmKCkge1xuICAgIHZhciBsYmwgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgc3R5bGU6ICdsYWJlbCdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHRlbXAgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gICAgICByZXR1cm4gbnVtZXJhbChudW1iZXIpLmZvcm1hdCgnMCwwLjAnKTtcbiAgICB9O1xuXG4gICAgdmFyIHJvYXN0RGF0ZSA9IG1vbWVudCh0aGlzLnJvYXN0LnJvYXN0RGF0ZSkuZm9ybWF0KCdkZCBNL0QvWVlZWSBoOm1tOnMgYScpO1xuICAgIHZhciBlbmREYXRlID0gbW9tZW50KHRoaXMucm9hc3QuZW5kRGF0ZSkuZm9ybWF0KCdkZCBNL0QvWVlZWSBoOm1tOnMgYScpO1xuICAgIHZhciBkdXJhdGlvbiA9IG1vbWVudCgobW9tZW50KHRoaXMucm9hc3QuZW5kRGF0ZSkuX2QpIC0gKG1vbWVudCh0aGlzLnJvYXN0LnJvYXN0RGF0ZSkuX2QpKS5mb3JtYXQoJ21tOnNzJyk7XG4gICAgdmFyIGZpcnN0Q3JhY2sgPSBtb21lbnQodGhpcy5maXJzdENyYWNrVGltZSkuZm9ybWF0KCdtbTpzcycpO1xuXG4gICAgdmFyIGRvY0RlZmluaXRpb24gPSB7XG4gICAgICBwYWdlU2l6ZTogJ0I4JyxcbiAgICAgIHBhZ2VPcmllbnRhdGlvbjogJ3BvcnRyYWl0JyxcbiAgICAgIHBhZ2VNYXJnaW5zOiBbIDUsIDAsIDAsIDAgXSxcbiAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0eWxlOiAnZGF0YScsXG4gICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgIGJvZHk6IFtcbiAgICAgICAgICAgICAgW2xibCgnQmF0Y2ggIycpLCB0aGlzLnJvYXN0LmlkXSxcbiAgICAgICAgICAgICAgW2xibCgnQ29mZmVlJyksIHRoaXMucm9hc3QuY29mZmVlXSxcbiAgICAgICAgICAgICAgW2xibCgnUm9hc3RlcicpLCB0aGlzLnJvYXN0Lm9wZXJhdG9yXSxcbiAgICAgICAgICAgICAgW2xibCgnRXF1aXBtZW50JyksIHRoaXMucm9hc3Qucm9hc3Rlcl0sXG4gICAgICAgICAgICAgIFtsYmwoJ1JvYXN0IHN0YXJ0JyksIHJvYXN0RGF0ZV0sXG4gICAgICAgICAgICAgIFtsYmwoJ1JvYXN0IGVuZCcpLCBlbmREYXRlXSxcbiAgICAgICAgICAgICAgW2xibCgnRHVyYXRpb24nKSwgZHVyYXRpb25dLFxuICAgICAgICAgICAgICBbbGJsKCdCZWFuIChGKScpLCB0ZW1wKHRoaXMucm9hc3Quc3RhcnRCZWFuVGVtcCkgKyAnIHwgJyArIHRlbXAodGhpcy5yb2FzdC5lbmRCZWFuVGVtcCldLFxuICAgICAgICAgICAgICBbbGJsKCdEcnVtIChGKScpLCB0ZW1wKHRoaXMucm9hc3Quc3RhcnREcnVtVGVtcCkgKyAnIHwgJyArIHRlbXAodGhpcy5yb2FzdC5lbmREcnVtVGVtcCldLFxuICAgICAgICAgICAgICBbbGJsKCdSb29tIChGKScpLCB0ZW1wKHRoaXMucm9hc3Quc3RhcnRSb29tVGVtcCkgKyAnIHwgJyArIHRlbXAodGhpcy5yb2FzdC5lbmRSb29tVGVtcCldLFxuICAgICAgICAgICAgICBbbGJsKCdGaXJzdCBjcmFjaycpLCBmaXJzdENyYWNrXSxcbiAgICAgICAgICAgICAgW2xibCgnV2VpZ2h0IGluJyksIG51bWVyYWwodGhpcy5yb2FzdC53ZWlnaHRJbikuZm9ybWF0KCcwLjAwJyldLFxuICAgICAgICAgICAgICBbbGJsKCdXZWlnaHQgb3V0JyksIG51bWVyYWwodGhpcy5yb2FzdC53ZWlnaHRPdXQpLmZvcm1hdCgnMC4wMCcpXSxcbiAgICAgICAgICAgICAgW2xibCgnV2VpZ2h0IGxvc3MnKSwgbnVtZXJhbCgodGhpcy5yb2FzdC53ZWlnaHRJbiAtIHRoaXMucm9hc3Qud2VpZ2h0T3V0KSAvIHRoaXMucm9hc3Qud2VpZ2h0SW4pLmZvcm1hdCgnMC4wMCUnKV0sXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyB0YWJsZToge1xuICAgICAgICAgIC8vICAgICBoZWFkZXJSb3dzOiAwLFxuICAgICAgICAgIC8vICAgICBib2R5OiBbXG4gICAgICAgICAgLy8gICAgICAgW2xibCgnQ29mZmVlJyksIGxibCgnT3BlcmF0b3InKSwgbGJsKCdSb2FzdGVyJyldLFxuICAgICAgICAgIC8vICAgICAgIFt0aGlzLnJvYXN0LmNvZmZlZSwgdGhpcy5yb2FzdC5vcGVyYXRvciwgdGhpcy5yb2FzdC5yb2FzdGVyXSxcbiAgICAgICAgICAvLyAgICAgICBbJycsJycsJyddLFxuICAgICAgICAgIC8vICAgICAgIFtsYmwoJ1JvYXN0IHN0YXJ0JyksIGxibCgnUm9hc3QgZW5kJyksIGxibCgnRHVyYXRpb24nKV0sXG4gICAgICAgICAgLy8gICAgICAgW3sgdGV4dDogW3JvYXN0RGF0ZSwgcm9hc3RUaW1lXSB9LCB7IHRleHQ6IFtlbmREYXRlLCBlbmRUaW1lXSB9LCBkdXJhdGlvbl0sXG4gICAgICAgICAgLy8gICAgICAgWycnLCcnLCcnXSxcbiAgICAgICAgICAvLyAgICAgICBbbGJsKCdCZWFuIHN0YXJ0JyksIGxibCgnRHJ1bSBzdGFydCcpLCBsYmwoJ1JtIHN0YXJ0JyldLFxuICAgICAgICAgIC8vICAgICAgIFt0ZW1wKHRoaXMucm9hc3Quc3RhcnRCZWFuVGVtcCksIHRlbXAodGhpcy5yb2FzdC5zdGFydERydW1UZW1wKSwgdGVtcCh0aGlzLnJvYXN0LnN0YXJ0Um9vbVRlbXApXSxcbiAgICAgICAgICAvLyAgICAgICBbJycsJycsJyddLFxuICAgICAgICAgIC8vICAgICAgIFtsYmwoJ0JlYW4gZW5kJyksIGxibCgnRHJ1bSBlbmQnKSwgbGJsKCdSbSBlbmQnKV0sXG4gICAgICAgICAgLy8gICAgICAgW3RlbXAodGhpcy5yb2FzdC5lbmRCZWFuVGVtcCksIHRlbXAodGhpcy5yb2FzdC5lbmREcnVtVGVtcCksIHRlbXAodGhpcy5yb2FzdC5lbmRSb29tVGVtcCldXG4gICAgICAgICAgLy8gICAgIF1cbiAgICAgICAgICAvLyB9LFxuICAgICAgICAgIGxheW91dDogJ25vQm9yZGVycydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGltYWdlOiB0aGlzLnJvYXN0LmdyYXBoLFxuICAgICAgICAgIHdpZHRoOiAxNjBcbiAgICAgICAgfVxuXG4gICAgICBdLFxuICAgICAgc3R5bGVzOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICBib2xkOiB0cnVlLFxuICAgICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDBdXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgZm9udFNpemU6IDgsXG4gICAgICAgICAgYm9sZDogZmFsc2UsXG4gICAgICAgICAgY29sb3I6ICcjNzc3Nzc3JyxcbiAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAwXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVmYXVsdFN0eWxlOiB7XG4gICAgICAgIGZvbnQ6ICdMYXRvJ1xuICAgICAgfVxuICAgIH07XG5cbiAgICBwZGZNYWtlLmZvbnRzID0ge1xuICAgICAgTGF0bzoge1xuICAgICAgICBub3JtYWw6ICdMYXRvLVJlZ3VsYXIudHRmJyxcbiAgICAgICAgYm9sZDogJ0xhdG8tQm9sZC50dGYnXG4gICAgICB9XG4gICAgfTtcbiAgICBwZGZNYWtlLmNyZWF0ZVBkZihkb2NEZWZpbml0aW9uKS5kb3dubG9hZCgncm9hc3QucGRmJyk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
