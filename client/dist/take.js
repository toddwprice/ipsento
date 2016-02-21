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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRha2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BQWEsa0JBQWtCOzs7Ozs7Ozs7QUFBbEIsd0JBQWtCO2lCQUFsQixrQkFBa0I7Z0NBQWxCLGtCQUFrQjs7O3FCQUFsQixrQkFBa0I7O2lCQUN2QixnQkFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ25CLG1CQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1dBQzlCOzs7ZUFIVSxrQkFBa0IiLCJmaWxlIjoidGFrZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBUYWtlVmFsdWVDb252ZXJ0ZXIge1xuICB0b1ZpZXcoYXJyYXksIGNvdW50KSB7XG4gICAgcmV0dXJuIGFycmF5LnNsaWNlKDAsIGNvdW50KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
