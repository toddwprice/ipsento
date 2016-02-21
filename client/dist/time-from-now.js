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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWUtZnJvbS1ub3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2NBRWEseUJBQXlCOzs7Ozs7Ozs7OztBQUF6QiwrQkFBeUI7aUJBQXpCLHlCQUF5QjtnQ0FBekIseUJBQXlCOzs7cUJBQXpCLHlCQUF5Qjs7aUJBQzlCLGdCQUFDLEtBQUssRUFBRTtBQUNaLG1CQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztXQUNoQzs7O2VBSFUseUJBQXlCIiwiZmlsZSI6InRpbWUtZnJvbS1ub3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBUaW1lRnJvbU5vd1ZhbHVlQ29udmVydGVyIHtcbiAgdG9WaWV3KHZhbHVlKSB7XG4gICAgcmV0dXJuIG1vbWVudCh2YWx1ZSkuZnJvbU5vdygpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
