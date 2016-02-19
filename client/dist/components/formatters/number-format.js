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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybWF0dGVycy9udW1iZXItZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztlQUVhLDBCQUEwQjs7Ozs7Ozs7Ozs7QUFBMUIsZ0NBQTBCO2lCQUExQiwwQkFBMEI7Z0NBQTFCLDBCQUEwQjs7O3FCQUExQiwwQkFBMEI7O2lCQUMvQixnQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0FBQ3BCLG1CQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7V0FDdEM7OztlQUhVLDBCQUEwQiIsImZpbGUiOiJjb21wb25lbnRzL2Zvcm1hdHRlcnMvbnVtYmVyLWZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBudW1lcmFsIGZyb20gJ251bWVyYWwnO1xuXG5leHBvcnQgY2xhc3MgTnVtYmVyRm9ybWF0VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUsIGZvcm1hdCkge1xuICAgIHJldHVybiBudW1lcmFsKHZhbHVlKS5mb3JtYXQoZm9ybWF0KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
