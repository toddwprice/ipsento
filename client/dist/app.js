System.register(['aurelia-router', 'moment'], function (_export) {
  'use strict';

  var Redirect, moment, App, AuthorizeStep;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }, function (_moment) {
      moment = _moment['default'];
    }],
    execute: function () {
      App = (function () {
        function App() {
          _classCallCheck(this, App);
        }

        _createClass(App, [{
          key: 'configureRouter',
          value: function configureRouter(config, router) {
            config.title = 'Ipsento';

            config.map([{ route: '/', redirect: 'roast' }, { route: '/roast', name: 'roast', moduleId: 'roast', nav: true, title: 'Roast', settings: { html: '<i class="fa fa-fire"></i> Roast' }, auth: false }, { route: '/settings', name: 'settings', moduleId: 'settings', nav: true, title: 'Settings', settings: { html: '<i class="fa fa-gear"></i> Settings' }, auth: false }, { route: '/print', name: 'print', moduleId: 'print', nav: false, auth: true }]);

            this.router = router;
          }
        }, {
          key: 'user',
          get: function get() {
            if (window.localStorage.currentUser) return JSON.parse(window.localStorage.currentUser);else return { first_name: 'Guest', last_name: 'User' };
          }
        }]);

        return App;
      })();

      _export('App', App);

      AuthorizeStep = (function () {
        function AuthorizeStep() {
          _classCallCheck(this, AuthorizeStep);
        }

        _createClass(AuthorizeStep, [{
          key: 'run',
          value: function run(navigationInstruction, next) {
            if (navigationInstruction.getAllInstructions().some(function (i) {
              return i.config.auth;
            })) {
              var user = window.localStorage.currentUser ? JSON.parse(window.localStorage.currentUser) : { token: '' };
              var isLoggedIn = user.token != '';
              if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
              }
            }

            return next();
          }
        }]);

        return AuthorizeStep;
      })();
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBR2EsR0FBRyxFQXNCVixhQUFhOzs7Ozs7OztnQ0F6QlgsUUFBUTs7Ozs7QUFHSCxTQUFHO2lCQUFILEdBQUc7Z0NBQUgsR0FBRzs7O3FCQUFILEdBQUc7O2lCQVFDLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDOztBQUV6QixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQy9CLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxrQ0FBa0MsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFDckosRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLHFDQUFxQyxFQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUNsSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUM5RSxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1dBQ3RCOzs7ZUFsQk8sZUFBRztBQUNULGdCQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUNqQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUVuRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLENBQUM7V0FDbEQ7OztlQU5VLEdBQUc7Ozs7O0FBc0JWLG1CQUFhO2lCQUFiLGFBQWE7Z0NBQWIsYUFBYTs7O3FCQUFiLGFBQWE7O2lCQUNkLGFBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFFO0FBQy9CLGdCQUFJLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztxQkFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7YUFBQSxDQUFDLEVBQUU7QUFDdkUsa0JBQUksSUFBSSxHQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUMsQUFBQyxDQUFDO0FBQ3pHLGtCQUFJLFVBQVUsR0FBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQUFBQyxDQUFDO0FBQ3BDLGtCQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2YsdUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2VBQzNDO2FBQ0Y7O0FBRUQsbUJBQU8sSUFBSSxFQUFFLENBQUM7V0FDZjs7O2VBWEcsYUFBYSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlZGlyZWN0fSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBnZXQgdXNlcigpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcilcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB7Zmlyc3RfbmFtZTonR3Vlc3QnLCBsYXN0X25hbWU6ICdVc2VyJ307XG4gIH1cblxuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcbiAgICBjb25maWcudGl0bGUgPSAnSXBzZW50byc7XG4gICAgLy8gY29uZmlnLmFkZFBpcGVsaW5lU3RlcCgnYXV0aG9yaXplJywgQXV0aG9yaXplU3RlcCk7XG4gICAgY29uZmlnLm1hcChbXG4gICAgICB7cm91dGU6ICcvJywgcmVkaXJlY3Q6ICdyb2FzdCd9LFxuICAgICAgeyByb3V0ZTogJy9yb2FzdCcsIG5hbWU6ICdyb2FzdCcsIG1vZHVsZUlkOiAncm9hc3QnLCBuYXY6IHRydWUsIHRpdGxlOiAnUm9hc3QnLCBzZXR0aW5nczogeyBodG1sOiAnPGkgY2xhc3M9XCJmYSBmYS1maXJlXCI+PC9pPiBSb2FzdCcgfSwgYXV0aDogZmFsc2UgfSxcbiAgICAgIHsgcm91dGU6ICcvc2V0dGluZ3MnLCBuYW1lOiAnc2V0dGluZ3MnLCBtb2R1bGVJZDogJ3NldHRpbmdzJywgbmF2OiB0cnVlLCB0aXRsZTogJ1NldHRpbmdzJywgc2V0dGluZ3M6IHtodG1sOiAnPGkgY2xhc3M9XCJmYSBmYS1nZWFyXCI+PC9pPiBTZXR0aW5ncyd9LCBhdXRoOiBmYWxzZSB9LFxuICAgICAgeyByb3V0ZTogJy9wcmludCcsIG5hbWU6ICdwcmludCcsIG1vZHVsZUlkOiAncHJpbnQnLCBuYXY6IGZhbHNlLCBhdXRoOiB0cnVlIH1cbiAgICBdKTtcblxuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB9XG59XG5cbmNsYXNzIEF1dGhvcml6ZVN0ZXAge1xuICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uLCBuZXh0KSB7XG4gICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5jb25maWcuYXV0aCkpIHtcbiAgICAgIGxldCB1c2VyID0gKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIgPyBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpIDoge3Rva2VuOiAnJ30pO1xuICAgICAgdmFyIGlzTG9nZ2VkSW4gPSAodXNlci50b2tlbiAhPSAnJyk7XG4gICAgICBpZiAoIWlzTG9nZ2VkSW4pIHtcbiAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCgnbG9naW4nKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
