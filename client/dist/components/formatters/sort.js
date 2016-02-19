System.register([], function (_export) {
  'use strict';

  var SortValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      SortValueConverter = (function () {
        function SortValueConverter() {
          _classCallCheck(this, SortValueConverter);
        }

        _createClass(SortValueConverter, [{
          key: 'toView',
          value: function toView(array, propertyName, direction) {
            var factor = direction === 'ascending' ? 1 : -1;
            return array.slice(0).sort(function (a, b) {
              return (a[propertyName] - b[propertyName]) * factor;
            });
          }
        }]);

        return SortValueConverter;
      })();

      _export('SortValueConverter', SortValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybWF0dGVycy9zb3J0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLGtCQUFrQjs7Ozs7Ozs7O0FBQWxCLHdCQUFrQjtpQkFBbEIsa0JBQWtCO2dDQUFsQixrQkFBa0I7OztxQkFBbEIsa0JBQWtCOztpQkFDdkIsZ0JBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUU7QUFDckMsZ0JBQUksTUFBTSxHQUFHLFNBQVMsS0FBSyxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2hELG1CQUFPLEtBQUssQ0FDVCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1IsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBSztBQUNkLHFCQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQSxHQUFJLE1BQU0sQ0FBQTthQUNwRCxDQUFDLENBQUM7V0FDTjs7O2VBUlUsa0JBQWtCIiwiZmlsZSI6ImNvbXBvbmVudHMvZm9ybWF0dGVycy9zb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNvcnRWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhhcnJheSwgcHJvcGVydHlOYW1lLCBkaXJlY3Rpb24pIHtcbiAgICB2YXIgZmFjdG9yID0gZGlyZWN0aW9uID09PSAnYXNjZW5kaW5nJyA/IDEgOiAtMTtcbiAgICByZXR1cm4gYXJyYXlcbiAgICAgIC5zbGljZSgwKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIChhW3Byb3BlcnR5TmFtZV0gLSBiW3Byb3BlcnR5TmFtZV0pICogZmFjdG9yXG4gICAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
