System.register(["aurelia-framework"], function (_export) {
  "use strict";

  var inject, Settings;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework["default"];
    }],
    execute: function () {
      Settings = (function () {
        function Settings() {
          _classCallCheck(this, Settings);

          this.operators = "";
        }

        _createClass(Settings, [{
          key: "activate",
          value: function activate() {
            this.operators = window.localStorage.operators;
          }
        }, {
          key: "save",
          value: function save() {
            window.localStorage.operators = this.operators;
          }
        }]);

        return Settings;
      })();

      _export("Settings", Settings);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztjQUVhLFFBQVE7Ozs7Ozs7Ozs7O0FBQVIsY0FBUTtpQkFBUixRQUFRO2dDQUFSLFFBQVE7O2VBQ25CLFNBQVMsR0FBRyxFQUFFOzs7cUJBREgsUUFBUTs7aUJBR1gsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztXQUNoRDs7O2lCQUVHLGdCQUFHO0FBQ0wsa0JBQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7V0FDaEQ7OztlQVRVLFFBQVEiLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5qZWN0IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcbiAgb3BlcmF0b3JzID0gXCJcIjtcblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLm9wZXJhdG9ycyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uub3BlcmF0b3JzO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLm9wZXJhdG9ycyA9IHRoaXMub3BlcmF0b3JzO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
