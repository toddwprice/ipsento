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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BQWEsa0JBQWtCOzs7Ozs7Ozs7QUFBbEIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQUN2QixnQkFBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRTtBQUNyQyxnQkFBSSxNQUFNLEdBQUcsU0FBUyxLQUFLLFdBQVcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDaEQsbUJBQU8sS0FBSyxDQUNULEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDUixJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ2QscUJBQU8sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFBLEdBQUksTUFBTSxDQUFBO2FBQ3BELENBQUMsQ0FBQztXQUNOOzs7ZUFSVSxrQkFBa0IiLCJmaWxlIjoic29ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTb3J0VmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcoYXJyYXksIHByb3BlcnR5TmFtZSwgZGlyZWN0aW9uKSB7XG4gICAgdmFyIGZhY3RvciA9IGRpcmVjdGlvbiA9PT0gJ2FzY2VuZGluZycgPyAxIDogLTE7XG4gICAgcmV0dXJuIGFycmF5XG4gICAgICAuc2xpY2UoMClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiAoYVtwcm9wZXJ0eU5hbWVdIC0gYltwcm9wZXJ0eU5hbWVdKSAqIGZhY3RvclxuICAgICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
