System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-configuration', 'aurelia-router', 'fetch'], function (_export) {
  'use strict';

  var inject, router, HttpClient, Configure, Redirect, Login;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      router = _aureliaFramework.router;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaConfiguration) {
      Configure = _aureliaConfiguration.Configure;
    }, function (_aureliaRouter) {
      Redirect = _aureliaRouter.Redirect;
    }, function (_fetch) {}],
    execute: function () {
      Login = (function () {
        _createClass(Login, [{
          key: 'hasError',
          get: function get() {
            return this.error != "";
          }
        }]);

        function Login(http, config, router) {
          _classCallCheck(this, _Login);

          this.login_name = "";
          this.password = "";
          this.error = "";

          http.configure(function (cfg) {
            cfg.useStandardConfiguration().withBaseUrl(config.get('apiUrl'));
          });

          this.http = http;
          this.router = router;
        }

        _createClass(Login, [{
          key: 'submit',
          value: function submit() {
            var _this = this;

            var url = '/auth?login_name=' + this.login_name + '&password=' + this.password;
            this.http.fetch(url).then(function (response) {
              if (response.status !== 200) {
                return _this.error = 'Login failed: ' + response.statusText;
              } else {
                return response.json();
              }
            }).then(function (data) {
              if (!data.id) {
                return _this.error = data;
              }

              var user = data;

              if (user.claims.CAN_ACCESS_ADMIN_APP) {
                window.localStorage.currentUser = JSON.stringify(user);
                _this.router.navigateToRoute('home');
              } else {
                _this.error = "Access denied.";
              }
            })['catch'](function (e) {
              _this.error = e.toString();
              console.log(e);
            });
          }
        }]);

        var _Login = Login;
        Login = inject(HttpClient, Configure, Router)(Login) || Login;
        return Login;
      })();

      _export('Login', Login);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1REFPYSxLQUFLOzs7Ozs7OztpQ0FQVixNQUFNO2lDQUFDLE1BQU07O3VDQUNiLFVBQVU7O3dDQUNWLFNBQVM7O2dDQUNULFFBQVE7OztBQUlILFdBQUs7cUJBQUwsS0FBSzs7ZUFJSixlQUFHO0FBQ2IsbUJBQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7V0FDekI7OztBQUdVLGlCQVRBLEtBQUssQ0FTSixJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBRTs7O2VBUmhDLFVBQVUsR0FBRyxFQUFFO2VBQ2YsUUFBUSxHQUFHLEVBQUU7ZUFDYixLQUFLLEdBQUcsRUFBRTs7QUFPUixjQUFJLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ3BCLGVBQUcsQ0FDQSx3QkFBd0IsRUFBRSxDQUMxQixXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1dBQ3RDLENBQUMsQ0FBQzs7QUFFSCxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixjQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0Qjs7cUJBbEJVLEtBQUs7O2lCQW9CVixrQkFBRzs7O0FBQ1AsZ0JBQUksR0FBRyx5QkFBdUIsSUFBSSxDQUFDLFVBQVUsa0JBQWEsSUFBSSxDQUFDLFFBQVEsQUFBRSxDQUFDO0FBQzFFLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRLEVBQUk7QUFDbEMsa0JBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7QUFDM0IsdUJBQU8sTUFBSyxLQUFLLHNCQUFvQixRQUFRLENBQUMsVUFBVSxBQUFFLENBQUM7ZUFDNUQsTUFDSTtBQUNILHVCQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztlQUN4QjthQUNGLENBQUMsQ0FDRCxJQUFJLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDWixrQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFFWix1QkFBTyxNQUFLLEtBQUssR0FBRyxJQUFJLENBQUM7ZUFDMUI7O0FBRUQsa0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFaEIsa0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRTtBQUNwQyxzQkFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RCxzQkFBSyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2VBQ3JDLE1BQ0k7QUFDSCxzQkFBSyxLQUFLLEdBQUcsZ0JBQWdCLENBQUE7ZUFDOUI7YUFDRixDQUFDLFNBQ0ksQ0FBQyxVQUFBLENBQUMsRUFBSTtBQUNWLG9CQUFLLEtBQUssR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDMUIscUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEIsQ0FBQyxDQUFBO1dBQ0w7OztxQkFsRFUsS0FBSztBQUFMLGFBQUssR0FEakIsTUFBTSxDQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQ3ZCLEtBQUssS0FBTCxLQUFLO2VBQUwsS0FBSyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0LHJvdXRlcn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdhdXJlbGlhLWZldGNoLWNsaWVudCc7XG5pbXBvcnQge0NvbmZpZ3VyZX0gZnJvbSAnYXVyZWxpYS1jb25maWd1cmF0aW9uJztcbmltcG9ydCB7UmVkaXJlY3R9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCAnZmV0Y2gnO1xuXG5AaW5qZWN0KEh0dHBDbGllbnQsQ29uZmlndXJlLFJvdXRlcilcbmV4cG9ydCBjbGFzcyBMb2dpbiB7XG4gIGxvZ2luX25hbWUgPSBcIlwiO1xuICBwYXNzd29yZCA9IFwiXCI7XG4gIGVycm9yID0gXCJcIjtcbiAgZ2V0IGhhc0Vycm9yKCkge1xuICAgIHJldHVybiB0aGlzLmVycm9yICE9IFwiXCI7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKGh0dHAsY29uZmlnLHJvdXRlcikge1xuICAgIGh0dHAuY29uZmlndXJlKGNmZyA9PiB7XG4gICAgICBjZmdcbiAgICAgICAgLnVzZVN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICAgICAgIC53aXRoQmFzZVVybChjb25maWcuZ2V0KCdhcGlVcmwnKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIGxldCB1cmwgPSBgL2F1dGg/bG9naW5fbmFtZT0ke3RoaXMubG9naW5fbmFtZX0mcGFzc3dvcmQ9JHt0aGlzLnBhc3N3b3JkfWA7XG4gICAgdGhpcy5odHRwLmZldGNoKHVybCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yID0gYExvZ2luIGZhaWxlZDogJHtyZXNwb25zZS5zdGF0dXNUZXh0fWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoIWRhdGEuaWQpIHtcbiAgICAgICAgICAvL2xvZ2luIGZhaWxlZFxuICAgICAgICAgIHJldHVybiB0aGlzLmVycm9yID0gZGF0YTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1c2VyID0gZGF0YTtcblxuICAgICAgICBpZiAodXNlci5jbGFpbXMuQ0FOX0FDQ0VTU19BRE1JTl9BUFApIHtcbiAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XG4gICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVUb1JvdXRlKCdob21lJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5lcnJvciA9IFwiQWNjZXNzIGRlbmllZC5cIlxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICB0aGlzLmVycm9yID0gZS50b1N0cmluZygpO1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIH0pXG4gIH1cblxuXG4gIC8vIGFjdGl2YXRlKCkge1xuICAvLyAgIHJldHVybiB0aGlzLmh0dHAuZmV0Y2goJ2FjY291bnQ/dG9rZW49NzcxNTU2NTA0NDQxZDRhZjdlMWY4ZjdhNjY3OGRjNzhiN2E5ZjRjNmJiYjBkMjg2ZDQ5NjdhOGNkNjM4MTY1YicpXG4gIC8vICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC8vICAgICAudGhlbihhY2NvdW50cyA9PiB0aGlzLmFjY291bnRzID0gYWNjb3VudHMpO1xuICAvLyB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
