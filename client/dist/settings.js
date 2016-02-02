System.register([], function (_export) {
  'use strict';

  var Settings;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [],
    execute: function () {
      Settings = (function () {
        function Settings() {
          _classCallCheck(this, Settings);
        }

        _createClass(Settings, [{
          key: 'activate',
          value: function activate() {
            this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};
          }
        }, {
          key: 'save',
          value: function save() {
            window.localStorage.roasterSettings = JSON.stringify(this.roasterSettings);

            $('#message').fadeIn().delay(3000).fadeOut();
          }
        }]);

        return Settings;
      })();

      _export('Settings', Settings);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztNQUFhLFFBQVE7Ozs7Ozs7OztBQUFSLGNBQVE7aUJBQVIsUUFBUTtnQ0FBUixRQUFROzs7cUJBQVIsUUFBUTs7aUJBR1gsb0JBQUc7QUFDVCxnQkFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1dBU25IOzs7aUJBRUcsZ0JBQUc7QUFDTCxrQkFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7O0FBTzNFLGFBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7V0FDOUM7OztlQXhCVSxRQUFRIiwiZmlsZSI6InNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNldHRpbmdzIHtcbiAgcm9hc3RlclNldHRpbmdzO1xuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMucm9hc3RlclNldHRpbmdzID0gd2luZG93LmxvY2FsU3RvcmFnZS5yb2FzdGVyU2V0dGluZ3MgPyBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlclNldHRpbmdzKSA6IHt9O1xuXG4gICAgLy8gdGhpcy5vcGVyYXRvcnMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLm9wZXJhdG9ycztcbiAgICAvLyB0aGlzLnJvYXN0ZXJJZCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uucm9hc3RlcklkO1xuICAgIC8vIHRoaXMuc2hvd0RldGFpbHMgPSAod2luZG93LmxvY2FsU3RvcmFnZS5zaG93RGV0YWlscyA9PSAndHJ1ZScpO1xuICAgIC8vIHRoaXMudGVtcExvdyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UudGVtcExvdztcbiAgICAvLyB0aGlzLnRlbXBIaWdoID0gd2luZG93LmxvY2FsU3RvcmFnZS50ZW1wSGlnaDtcbiAgICAvLyB0aGlzLndjTG93ID0gd2luZG93LmxvY2FsU3RvcmFnZS53Y0xvdztcbiAgICAvLyB0aGlzLndjSGlnaCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2Uud2NIaWdoO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJTZXR0aW5ncyA9IEpTT04uc3RyaW5naWZ5KHRoaXMucm9hc3RlclNldHRpbmdzKTtcbiAgICAvLyB3aW5kb3cubG9jYWxTdG9yYWdlLnJvYXN0ZXJJZCA9IHRoaXMucm9hc3RlcklkO1xuICAgIC8vIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2hvd0RldGFpbHMgPSB0aGlzLnNob3dEZXRhaWxzO1xuICAgIC8vIHdpbmRvdy5sb2NhbFN0b3JhZ2UudGVtcExvdyA9IHRoaXMudGVtcExvdztcbiAgICAvLyB3aW5kb3cubG9jYWxTdG9yYWdlLnRlbXBIaWdoID0gdGhpcy50ZW1wSGlnaDtcbiAgICAvLyB3aW5kb3cubG9jYWxTdG9yYWdlLndjTG93ID0gdGhpcy53Y0xvdztcbiAgICAvLyB3aW5kb3cubG9jYWxTdG9yYWdlLndjSGlnaCA9IHRoaXMud2NIaWdoO1xuICAgICQoJyNtZXNzYWdlJykuZmFkZUluKCkuZGVsYXkoMzAwMCkuZmFkZU91dCgpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
