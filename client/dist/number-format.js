System.register(['numeral'], function (_export) {
  'use strict';

  var numeral, NumberFormatValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_numeral) {
      numeral = _numeral['default'];
    }],
    execute: function () {
      NumberFormatValueConverter = (function () {
        function NumberFormatValueConverter() {
          _classCallCheck(this, NumberFormatValueConverter);
        }

        _createClass(NumberFormatValueConverter, [{
          key: 'toView',
          value: function toView(value, format) {
            return numeral(value).format(format);
          }
        }]);

        return NumberFormatValueConverter;
      })();

      _export('NumberFormatValueConverter', NumberFormatValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1mb3JtYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2VBRWEsMEJBQTBCOzs7Ozs7Ozs7OztBQUExQixnQ0FBMEI7aUJBQTFCLDBCQUEwQjtnQ0FBMUIsMEJBQTBCOzs7cUJBQTFCLDBCQUEwQjs7aUJBQy9CLGdCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztXQUN0Qzs7O2VBSFUsMEJBQTBCIiwiZmlsZSI6Im51bWJlci1mb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbnVtZXJhbCBmcm9tICdudW1lcmFsJztcblxuZXhwb3J0IGNsYXNzIE51bWJlckZvcm1hdFZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gbnVtZXJhbCh2YWx1ZSkuZm9ybWF0KGZvcm1hdCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
