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

            config.map([{ route: '/', redirect: 'home' }, { route: '/home', name: 'home', moduleId: 'home', nav: true, title: 'Home', auth: true }, { route: '/jobs', name: 'jobs', moduleId: 'jobs', nav: false, title: 'Jobs', auth: true }, { route: '/jobs/:id', name: 'job', moduleId: 'job', nav: false, title: 'Job Detail', auth: true }, { route: '/jobs/new', name: 'jobNew', moduleId: 'jobNew', nav: false, title: 'New Job', auth: true }, { route: '/settings', name: 'settings', moduleId: 'settings', nav: true, title: 'Settings', auth: true }]);

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
//# sourceMappingURL=data:application/json;base64,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cm9tICdhdXJlbGlhLXJvdXRlcic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBnZXQgdXNlcigpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5jdXJyZW50VXNlcilcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB7Zmlyc3RfbmFtZTonR3Vlc3QnLCBsYXN0X25hbWU6ICdVc2VyJ307XG4gIH1cblxuICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcbiAgICBjb25maWcudGl0bGUgPSAnSXBzZW50byc7XG4gICAgLy8gY29uZmlnLmFkZFBpcGVsaW5lU3RlcCgnYXV0aG9yaXplJywgQXV0aG9yaXplU3RlcCk7XG4gICAgY29uZmlnLm1hcChbXG4gICAgICB7cm91dGU6ICcvJywgcmVkaXJlY3Q6ICdob21lJ30sXG4gICAgICB7cm91dGU6ICcvaG9tZScsIG5hbWU6ICdob21lJywgbW9kdWxlSWQ6ICdob21lJywgbmF2OiB0cnVlLCB0aXRsZTogJ0hvbWUnLCBhdXRoOiB0cnVlfSxcbiAgICAgIHtyb3V0ZTogJy9qb2JzJywgbmFtZTogJ2pvYnMnLCBtb2R1bGVJZDogJ2pvYnMnLCBuYXY6IGZhbHNlLCB0aXRsZTogJ0pvYnMnLCBhdXRoOiB0cnVlfSxcbiAgICAgIHtyb3V0ZTogJy9qb2JzLzppZCcsIG5hbWU6ICdqb2InLCBtb2R1bGVJZDogJ2pvYicsIG5hdjogZmFsc2UsIHRpdGxlOiAnSm9iIERldGFpbCcsIGF1dGg6IHRydWV9LFxuICAgICAgeyByb3V0ZTogJy9qb2JzL25ldycsIG5hbWU6ICdqb2JOZXcnLCBtb2R1bGVJZDogJ2pvYk5ldycsIG5hdjogZmFsc2UsIHRpdGxlOiAnTmV3IEpvYicsIGF1dGg6IHRydWUgfSxcbiAgICAgIHsgcm91dGU6ICcvc2V0dGluZ3MnLCBuYW1lOiAnc2V0dGluZ3MnLCBtb2R1bGVJZDogJ3NldHRpbmdzJywgbmF2OiB0cnVlLCB0aXRsZTogJ1NldHRpbmdzJywgYXV0aDogdHJ1ZSB9LFxuICAgICAgLy8ge3JvdXRlOiAnL3JlcG9ydHMnLCBuYW1lOiAncmVwbzFgICAxYHJ0cycsIG1vZHVsZUlkOiAncmVwb3J0cycsIG5hdjogdHJ1ZSwgdGl0bGU6ICdSZXBvcnRzJywgYXV0aDogdHJ1ZX0sXG4gICAgXSk7XG5cbiAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgfVxufVxuXG5jbGFzcyBBdXRob3JpemVTdGVwIHtcbiAgcnVuKG5hdmlnYXRpb25JbnN0cnVjdGlvbiwgbmV4dCkge1xuICAgIGlmIChuYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24uZ2V0QWxsSW5zdHJ1Y3Rpb25zKCkuc29tZShpID0+IGkuY29uZmlnLmF1dGgpKSB7XG4gICAgICBsZXQgdXNlciA9ICh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyID8gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKSA6IHt0b2tlbjogJyd9KTtcbiAgICAgIHZhciBpc0xvZ2dlZEluID0gKHVzZXIudG9rZW4gIT0gJycpO1xuICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XG4gICAgICAgIHJldHVybiBuZXh0LmNhbmNlbChuZXcgUmVkaXJlY3QoJ2xvZ2luJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0KCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
