System.register(['moment'], function (_export) {
  'use strict';

  var moment, TimeFromNowValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      TimeFromNowValueConverter = (function () {
        function TimeFromNowValueConverter() {
          _classCallCheck(this, TimeFromNowValueConverter);
        }

        _createClass(TimeFromNowValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return moment(value).fromNow();
          }
        }]);

        return TimeFromNowValueConverter;
      })();

      _export('TimeFromNowValueConverter', TimeFromNowValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybWF0dGVycy90aW1lLWZyb20tbm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztjQUVhLHlCQUF5Qjs7Ozs7Ozs7Ozs7QUFBekIsK0JBQXlCO2lCQUF6Qix5QkFBeUI7Z0NBQXpCLHlCQUF5Qjs7O3FCQUF6Qix5QkFBeUI7O2lCQUM5QixnQkFBQyxLQUFLLEVBQUU7QUFDWixtQkFBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7V0FDaEM7OztlQUhVLHlCQUF5QiIsImZpbGUiOiJjb21wb25lbnRzL2Zvcm1hdHRlcnMvdGltZS1mcm9tLW5vdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGNsYXNzIFRpbWVGcm9tTm93VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcodmFsdWUpIHtcbiAgICByZXR1cm4gbW9tZW50KHZhbHVlKS5mcm9tTm93KCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
