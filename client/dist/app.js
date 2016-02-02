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

            config.map([{ route: '/', redirect: 'roast' }, { route: '/roast', name: 'roast', moduleId: 'roast', nav: true, title: '<i class="fa fa-fire"></i> Roast', auth: false }, { route: '/settings', name: 'settings', moduleId: 'settings', nav: true, title: '<i class="fa fa-gear"></i> Settings', auth: false }]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBR2EsR0FBRyxFQTBCVixhQUFhOzs7Ozs7OztnQ0E3QlgsUUFBUTs7Ozs7QUFHSCxTQUFHO2lCQUFILEdBQUc7Z0NBQUgsR0FBRzs7O3FCQUFILEdBQUc7O2lCQVFDLHlCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDOztBQUV6QixrQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUNULEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBSy9CLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsa0NBQWtDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUN4SCxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLHFDQUFxQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FFckksQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztXQUN0Qjs7O2VBdEJPLGVBQUc7QUFDVCxnQkFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsS0FFbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxDQUFDO1dBQ2xEOzs7ZUFOVSxHQUFHOzs7OztBQTBCVixtQkFBYTtpQkFBYixhQUFhO2dDQUFiLGFBQWE7OztxQkFBYixhQUFhOztpQkFDZCxhQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRTtBQUMvQixnQkFBSSxxQkFBcUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7cUJBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQUEsQ0FBQyxFQUFFO0FBQ3ZFLGtCQUFJLElBQUksR0FBSSxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFDLEFBQUMsQ0FBQztBQUN6RyxrQkFBSSxVQUFVLEdBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLEFBQUMsQ0FBQztBQUNwQyxrQkFBSSxDQUFDLFVBQVUsRUFBRTtBQUNmLHVCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztlQUMzQzthQUNGOztBQUVELG1CQUFPLElBQUksRUFBRSxDQUFDO1dBQ2Y7OztlQVhHLGFBQWEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWRpcmVjdH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgZ2V0IHVzZXIoKSB7XG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpXG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgICBlbHNlXG4gICAgICByZXR1cm4ge2ZpcnN0X25hbWU6J0d1ZXN0JywgbGFzdF9uYW1lOiAnVXNlcid9O1xuICB9XG5cbiAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XG4gICAgY29uZmlnLnRpdGxlID0gJ0lwc2VudG8nO1xuICAgIC8vIGNvbmZpZy5hZGRQaXBlbGluZVN0ZXAoJ2F1dGhvcml6ZScsIEF1dGhvcml6ZVN0ZXApO1xuICAgIGNvbmZpZy5tYXAoW1xuICAgICAge3JvdXRlOiAnLycsIHJlZGlyZWN0OiAncm9hc3QnfSxcbiAgICAgIC8vIHtyb3V0ZTogJy9ob21lJywgbmFtZTogJ2hvbWUnLCBtb2R1bGVJZDogJ2hvbWUnLCBuYXY6IHRydWUsIHRpdGxlOiAnSG9tZScsIGF1dGg6IHRydWV9LFxuICAgICAgLy8ge3JvdXRlOiAnL2pvYnMnLCBuYW1lOiAnam9icycsIG1vZHVsZUlkOiAnam9icycsIG5hdjogZmFsc2UsIHRpdGxlOiAnSm9icycsIGF1dGg6IHRydWV9LFxuICAgICAgLy8ge3JvdXRlOiAnL2pvYnMvOmlkJywgbmFtZTogJ2pvYicsIG1vZHVsZUlkOiAnam9iJywgbmF2OiBmYWxzZSwgdGl0bGU6ICdKb2IgRGV0YWlsJywgYXV0aDogdHJ1ZX0sXG4gICAgICAvLyB7IHJvdXRlOiAnL2pvYnMvbmV3JywgbmFtZTogJ2pvYk5ldycsIG1vZHVsZUlkOiAnam9iTmV3JywgbmF2OiBmYWxzZSwgdGl0bGU6ICdOZXcgSm9iJywgYXV0aDogdHJ1ZSB9LFxuICAgICAgeyByb3V0ZTogJy9yb2FzdCcsIG5hbWU6ICdyb2FzdCcsIG1vZHVsZUlkOiAncm9hc3QnLCBuYXY6IHRydWUsIHRpdGxlOiAnPGkgY2xhc3M9XCJmYSBmYS1maXJlXCI+PC9pPiBSb2FzdCcsIGF1dGg6IGZhbHNlIH0sXG4gICAgICB7IHJvdXRlOiAnL3NldHRpbmdzJywgbmFtZTogJ3NldHRpbmdzJywgbW9kdWxlSWQ6ICdzZXR0aW5ncycsIG5hdjogdHJ1ZSwgdGl0bGU6ICc8aSBjbGFzcz1cImZhIGZhLWdlYXJcIj48L2k+IFNldHRpbmdzJywgYXV0aDogZmFsc2UgfSxcbiAgICAgIC8vIHtyb3V0ZTogJy9yZXBvcnRzJywgbmFtZTogJ3JlcG8xYCAgMWBydHMnLCBtb2R1bGVJZDogJ3JlcG9ydHMnLCBuYXY6IHRydWUsIHRpdGxlOiAnUmVwb3J0cycsIGF1dGg6IHRydWV9LFxuICAgIF0pO1xuXG4gICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG4gIH1cbn1cblxuY2xhc3MgQXV0aG9yaXplU3RlcCB7XG4gIHJ1bihuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQpIHtcbiAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xuICAgICAgbGV0IHVzZXIgPSAod2luZG93LmxvY2FsU3RvcmFnZS5jdXJyZW50VXNlciA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcikgOiB7dG9rZW46ICcnfSk7XG4gICAgICB2YXIgaXNMb2dnZWRJbiA9ICh1c2VyLnRva2VuICE9ICcnKTtcbiAgICAgIGlmICghaXNMb2dnZWRJbikge1xuICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dCgpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
