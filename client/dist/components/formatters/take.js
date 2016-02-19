System.register([], function (_export) {
  "use strict";

  var TakeValueConverter;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      TakeValueConverter = (function () {
        function TakeValueConverter() {
          _classCallCheck(this, TakeValueConverter);
        }

        _createClass(TakeValueConverter, [{
          key: "toView",
          value: function toView(array, count) {
            return array.slice(0, count);
          }
        }]);

        return TakeValueConverter;
      })();

      _export("TakeValueConverter", TakeValueConverter);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZm9ybWF0dGVycy90YWtlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLGtCQUFrQjs7Ozs7Ozs7O0FBQWxCLHdCQUFrQjtpQkFBbEIsa0JBQWtCO2dDQUFsQixrQkFBa0I7OztxQkFBbEIsa0JBQWtCOztpQkFDdkIsZ0JBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtBQUNuQixtQkFBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztXQUM5Qjs7O2VBSFUsa0JBQWtCIiwiZmlsZSI6ImNvbXBvbmVudHMvZm9ybWF0dGVycy90YWtlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRha2VWYWx1ZUNvbnZlcnRlciB7XG4gIHRvVmlldyhhcnJheSwgY291bnQpIHtcbiAgICByZXR1cm4gYXJyYXkuc2xpY2UoMCwgY291bnQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
