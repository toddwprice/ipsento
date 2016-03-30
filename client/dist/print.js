System.register(['aurelia-framework', 'moment', 'numeral'], function (_export) {
  'use strict';

  var customElement, bindable, moment, numeral, Print;

  var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

  return {
    setters: [function (_aureliaFramework) {
      customElement = _aureliaFramework.customElement;
      bindable = _aureliaFramework.bindable;
    }, function (_moment) {
      moment = _moment['default'];
    }, function (_numeral) {
      numeral = _numeral['default'];
    }],
    execute: function () {
      Print = (function () {
        var _instanceInitializers = {};

        function Print() {
          _classCallCheck(this, _Print);

          _defineDecoratedPropertyDescriptor(this, 'roast', _instanceInitializers);
        }

        _createDecoratedClass(Print, [{
          key: 'printPdf',
          value: function printPdf() {
            var lbl = function lbl(text) {
              return {
                text: text,
                style: 'label'
              };
            };

            var temp = function temp(number) {
              if (!number) return "";
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
                  body: [[lbl('Batch #'), this.roast.id], [lbl('Coffee'), this.roast.coffee], [lbl('Roaster'), this.roast.operator], [lbl('Equipment'), this.roast.roaster], [lbl('Roast start'), roastDate], [lbl('Duration'), duration], [lbl('Bean (F)'), temp(this.roast.startBeanTemp) + ' | ' + temp(this.roast.endBeanTemp)], [lbl('Roaster (F)'), temp(this.roast.startDrumTemp) + ' | ' + temp(this.roast.endDrumTemp)], [lbl('Room (F)'), temp(this.roast.startRoomTemp) + ' | ' + temp(this.roast.endRoomTemp)], [lbl('First crack'), firstCrack], [lbl('Weight in'), numeral(this.roast.weightIn).format('0.00')], [lbl('Weight out'), numeral(this.roast.weightOut).format('0.00')], [lbl('Weight loss'), numeral((this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn).format('0.00%')]]
                },

                layout: 'noBorders'
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
        }, {
          key: 'roast',
          decorators: [bindable],
          initializer: null,
          enumerable: true
        }], null, _instanceInitializers);

        var _Print = Print;
        Print = customElement('print')(Print) || Print;
        return Print;
      })();

      _export('Print', Print);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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O2FBQ0YsQ0FBQzs7QUFFRixtQkFBTyxDQUFDLEtBQUssR0FBRztBQUNkLGtCQUFJLEVBQUU7QUFDSixzQkFBTSxFQUFFLGtCQUFrQjtBQUMxQixvQkFBSSxFQUFFLGVBQWU7ZUFDdEI7YUFDRixDQUFDO0FBQ0YsbUJBQU8sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1dBQ3hEOzs7dUJBaEdBLFFBQVE7Ozs7O3FCQURFLEtBQUs7QUFBTCxhQUFLLEdBRGpCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FDVixLQUFLLEtBQUwsS0FBSztlQUFMLEtBQUsiLCJmaWxlIjoicHJpbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgcGRmTWFrZSAqL1xuaW1wb3J0IHtjdXN0b21FbGVtZW50LCBiaW5kYWJsZX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcblxuQGN1c3RvbUVsZW1lbnQoJ3ByaW50JylcbmV4cG9ydCBjbGFzcyBQcmludCB7XG4gIEBiaW5kYWJsZSByb2FzdDtcblxuICBwcmludFBkZigpIHtcbiAgICB2YXIgbGJsID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHN0eWxlOiAnbGFiZWwnXG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciB0ZW1wID0gZnVuY3Rpb24gKG51bWJlcikge1xuICAgICAgaWYgKCFudW1iZXIpIHJldHVybiBcIlwiO1xuICAgICAgcmV0dXJuIG51bWVyYWwobnVtYmVyKS5mb3JtYXQoJzAsMC4wJyk7XG4gICAgfTtcblxuICAgIHZhciByb2FzdERhdGUgPSBtb21lbnQodGhpcy5yb2FzdC5yb2FzdERhdGUpLmZvcm1hdCgnZGQgTS9EL1lZWVkgaDptbTpzIGEnKTtcbiAgICB2YXIgZW5kRGF0ZSA9IG1vbWVudCh0aGlzLnJvYXN0LmVuZERhdGUpLmZvcm1hdCgnZGQgTS9EL1lZWVkgaDptbTpzIGEnKTtcbiAgICB2YXIgZHVyYXRpb24gPSBtb21lbnQoKG1vbWVudCh0aGlzLnJvYXN0LmVuZERhdGUpLl9kKSAtIChtb21lbnQodGhpcy5yb2FzdC5yb2FzdERhdGUpLl9kKSkuZm9ybWF0KCdtbTpzcycpO1xuICAgIHZhciBmaXJzdENyYWNrID0gbW9tZW50KHRoaXMuZmlyc3RDcmFja1RpbWUpLmZvcm1hdCgnbW06c3MnKTtcblxuICAgIHZhciBkb2NEZWZpbml0aW9uID0ge1xuICAgICAgcGFnZVNpemU6ICdCOCcsXG4gICAgICBwYWdlT3JpZW50YXRpb246ICdwb3J0cmFpdCcsXG4gICAgICBwYWdlTWFyZ2luczogWyA1LCAwLCAwLCAwIF0sXG4gICAgICBjb250ZW50OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdHlsZTogJ2RhdGEnLFxuICAgICAgICAgIHRhYmxlOiB7XG4gICAgICAgICAgICBib2R5OiBbXG4gICAgICAgICAgICAgIFtsYmwoJ0JhdGNoICMnKSwgdGhpcy5yb2FzdC5pZF0sXG4gICAgICAgICAgICAgIFtsYmwoJ0NvZmZlZScpLCB0aGlzLnJvYXN0LmNvZmZlZV0sXG4gICAgICAgICAgICAgIFtsYmwoJ1JvYXN0ZXInKSwgdGhpcy5yb2FzdC5vcGVyYXRvcl0sXG4gICAgICAgICAgICAgIFtsYmwoJ0VxdWlwbWVudCcpLCB0aGlzLnJvYXN0LnJvYXN0ZXJdLFxuICAgICAgICAgICAgICBbbGJsKCdSb2FzdCBzdGFydCcpLCByb2FzdERhdGVdLFxuICAgICAgICAgICAgICAvLyBbbGJsKCdSb2FzdCBlbmQnKSwgZW5kRGF0ZV0sXG4gICAgICAgICAgICAgIFtsYmwoJ0R1cmF0aW9uJyksIGR1cmF0aW9uXSxcbiAgICAgICAgICAgICAgW2xibCgnQmVhbiAoRiknKSwgdGVtcCh0aGlzLnJvYXN0LnN0YXJ0QmVhblRlbXApICsgJyB8ICcgKyB0ZW1wKHRoaXMucm9hc3QuZW5kQmVhblRlbXApXSxcbiAgICAgICAgICAgICAgW2xibCgnUm9hc3RlciAoRiknKSwgdGVtcCh0aGlzLnJvYXN0LnN0YXJ0RHJ1bVRlbXApICsgJyB8ICcgKyB0ZW1wKHRoaXMucm9hc3QuZW5kRHJ1bVRlbXApXSxcbiAgICAgICAgICAgICAgW2xibCgnUm9vbSAoRiknKSwgdGVtcCh0aGlzLnJvYXN0LnN0YXJ0Um9vbVRlbXApICsgJyB8ICcgKyB0ZW1wKHRoaXMucm9hc3QuZW5kUm9vbVRlbXApXSxcbiAgICAgICAgICAgICAgW2xibCgnRmlyc3QgY3JhY2snKSwgZmlyc3RDcmFja10sXG4gICAgICAgICAgICAgIFtsYmwoJ1dlaWdodCBpbicpLCBudW1lcmFsKHRoaXMucm9hc3Qud2VpZ2h0SW4pLmZvcm1hdCgnMC4wMCcpXSxcbiAgICAgICAgICAgICAgW2xibCgnV2VpZ2h0IG91dCcpLCBudW1lcmFsKHRoaXMucm9hc3Qud2VpZ2h0T3V0KS5mb3JtYXQoJzAuMDAnKV0sXG4gICAgICAgICAgICAgIFtsYmwoJ1dlaWdodCBsb3NzJyksIG51bWVyYWwoKHRoaXMucm9hc3Qud2VpZ2h0SW4gLSB0aGlzLnJvYXN0LndlaWdodE91dCkgLyB0aGlzLnJvYXN0LndlaWdodEluKS5mb3JtYXQoJzAuMDAlJyldLFxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgLy8gdGFibGU6IHtcbiAgICAgICAgICAvLyAgICAgaGVhZGVyUm93czogMCxcbiAgICAgICAgICAvLyAgICAgYm9keTogW1xuICAgICAgICAgIC8vICAgICAgIFtsYmwoJ0NvZmZlZScpLCBsYmwoJ09wZXJhdG9yJyksIGxibCgnUm9hc3RlcicpXSxcbiAgICAgICAgICAvLyAgICAgICBbdGhpcy5yb2FzdC5jb2ZmZWUsIHRoaXMucm9hc3Qub3BlcmF0b3IsIHRoaXMucm9hc3Qucm9hc3Rlcl0sXG4gICAgICAgICAgLy8gICAgICAgWycnLCcnLCcnXSxcbiAgICAgICAgICAvLyAgICAgICBbbGJsKCdSb2FzdCBzdGFydCcpLCBsYmwoJ1JvYXN0IGVuZCcpLCBsYmwoJ0R1cmF0aW9uJyldLFxuICAgICAgICAgIC8vICAgICAgIFt7IHRleHQ6IFtyb2FzdERhdGUsIHJvYXN0VGltZV0gfSwgeyB0ZXh0OiBbZW5kRGF0ZSwgZW5kVGltZV0gfSwgZHVyYXRpb25dLFxuICAgICAgICAgIC8vICAgICAgIFsnJywnJywnJ10sXG4gICAgICAgICAgLy8gICAgICAgW2xibCgnQmVhbiBzdGFydCcpLCBsYmwoJ0RydW0gc3RhcnQnKSwgbGJsKCdSbSBzdGFydCcpXSxcbiAgICAgICAgICAvLyAgICAgICBbdGVtcCh0aGlzLnJvYXN0LnN0YXJ0QmVhblRlbXApLCB0ZW1wKHRoaXMucm9hc3Quc3RhcnREcnVtVGVtcCksIHRlbXAodGhpcy5yb2FzdC5zdGFydFJvb21UZW1wKV0sXG4gICAgICAgICAgLy8gICAgICAgWycnLCcnLCcnXSxcbiAgICAgICAgICAvLyAgICAgICBbbGJsKCdCZWFuIGVuZCcpLCBsYmwoJ0RydW0gZW5kJyksIGxibCgnUm0gZW5kJyldLFxuICAgICAgICAgIC8vICAgICAgIFt0ZW1wKHRoaXMucm9hc3QuZW5kQmVhblRlbXApLCB0ZW1wKHRoaXMucm9hc3QuZW5kRHJ1bVRlbXApLCB0ZW1wKHRoaXMucm9hc3QuZW5kUm9vbVRlbXApXVxuICAgICAgICAgIC8vICAgICBdXG4gICAgICAgICAgLy8gfSxcbiAgICAgICAgICBsYXlvdXQ6ICdub0JvcmRlcnMnXG4gICAgICAgIH1cbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGltYWdlOiB0aGlzLnJvYXN0LmdyYXBoLFxuICAgICAgICAvLyAgIHdpZHRoOiAxNjAsXG4gICAgICAgIC8vICAgaGVpZ2h0OiA1MFxuICAgICAgICAvLyB9XG5cbiAgICAgIF0sXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGZvbnRTaXplOiA4LFxuICAgICAgICAgIGJvbGQ6IHRydWUsXG4gICAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgICAgbWFyZ2luOiBbMCwgMCwgMCwgMF1cbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBmb250U2l6ZTogOCxcbiAgICAgICAgICBib2xkOiBmYWxzZSxcbiAgICAgICAgICBjb2xvcjogJyM3Nzc3NzcnLFxuICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDBdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgZm9udDogJ0xhdG8nXG4gICAgICB9XG4gICAgfTtcblxuICAgIHBkZk1ha2UuZm9udHMgPSB7XG4gICAgICBMYXRvOiB7XG4gICAgICAgIG5vcm1hbDogJ0xhdG8tUmVndWxhci50dGYnLFxuICAgICAgICBib2xkOiAnTGF0by1Cb2xkLnR0ZidcbiAgICAgIH1cbiAgICB9O1xuICAgIHBkZk1ha2UuY3JlYXRlUGRmKGRvY0RlZmluaXRpb24pLmRvd25sb2FkKCdyb2FzdC5wZGYnKTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
