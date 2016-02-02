System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-configuration', 'fetch'], function (_export) {
  'use strict';

  var inject, HttpClient, Configure, Job;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
    }, function (_aureliaFetchClient) {
      HttpClient = _aureliaFetchClient.HttpClient;
    }, function (_aureliaConfiguration) {
      Configure = _aureliaConfiguration.Configure;
    }, function (_fetch) {}],
    execute: function () {
      Job = (function () {
        _createClass(Job, [{
          key: 'user',
          get: function get() {
            return JSON.parse(window.localStorage.currentUser);
          }
        }]);

        function Job(http, config) {
          _classCallCheck(this, _Job);

          this.job = {};
          this.items = [];
          this.sortBy = "id";
          this.sortDirection = "descending";
          this.jobId = 0;
          this.statusNames = [];
          this.statuses = [];
          this.totalItems = 0;

          http.configure(function (cfg) {
            cfg.useStandardConfiguration().withBaseUrl(config.get('apiUrl'));
          });

          this.http = http;
        }

        _createClass(Job, [{
          key: 'activate',
          value: function activate(params) {
            this.jobId = params.id;
            this.refreshJobItems();
          }
        }, {
          key: 'refreshJobItems',
          value: function refreshJobItems() {
            var _this = this;

            var url = '/job/' + this.jobId + '?token=' + this.user.token;
            this.http.fetch(url).then(function (response) {
              return response.json();
            }).then(function (job) {
              return _this.job = job;
            }).then(function () {
              var itemsUrl = '/job/' + _this.jobId + '/items?token=' + _this.user.token;
              return _this.http.fetch(itemsUrl).then(function (response) {
                return response.json();
              }).then(function (items) {
                _this.items = items;

                _this.statusNames = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                  for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row = _step.value;

                    var status = row.item_status;
                    if (!_this.statusNames[status]) _this.statusNames[status] = 1;else _this.statusNames[status] += 1;
                  }
                } catch (err) {
                  _didIteratorError = true;
                  _iteratorError = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                      _iterator['return']();
                    }
                  } finally {
                    if (_didIteratorError) {
                      throw _iteratorError;
                    }
                  }
                }

                _this.statuses = [];
                _this.totalItems = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = Object.keys(_this.statusNames)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var status = _step2.value;

                    _this.statuses.push({ name: status, value: _this.statusNames[status] });
                    _this.totalItems += _this.statusNames[status];
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                      _iterator2['return']();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              });
            }).then(function () {
              return _this.itemsLastUpdated = new Date();
            });
          }
        }]);

        var _Job = Job;
        Job = inject(HttpClient, Configure)(Job) || Job;
        return Job;
      })();

      _export('Job', Job);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUMsTUFBTSxDQUFDLENBQUM7bUJBQzdDOzs7Ozs7Ozs7Ozs7Ozs7ZUFFRixDQUFDLENBQUM7YUFDTixDQUFDLENBQ0QsSUFBSSxDQUFDO3FCQUFNLE1BQUssZ0JBQWdCLEdBQUcsSUFBSSxJQUFJLEVBQUU7YUFBQSxDQUFDLENBQUM7V0FDbkQ7OzttQkEzRFUsR0FBRztBQUFILFdBQUcsR0FEZixNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUNqQixHQUFHLEtBQUgsR0FBRztlQUFILEdBQUciLCJmaWxlIjoiam9iLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbmplY3R9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0IHtDb25maWd1cmV9IGZyb20gJ2F1cmVsaWEtY29uZmlndXJhdGlvbic7XG5pbXBvcnQgJ2ZldGNoJztcblxuQGluamVjdChIdHRwQ2xpZW50LCBDb25maWd1cmUpXG5leHBvcnQgY2xhc3MgSm9iIHtcbiAgam9iID0ge307XG4gIGl0ZW1zID0gW107XG4gIHNvcnRCeSA9IFwiaWRcIjtcbiAgc29ydERpcmVjdGlvbiA9IFwiZGVzY2VuZGluZ1wiO1xuICBpdGVtc0xhc3RVcGRhdGVkO1xuICBqb2JJZCA9IDA7XG4gIHN0YXR1c05hbWVzID0gW107XG4gIHN0YXR1c2VzID0gW107XG4gIHRvdGFsSXRlbXMgPSAwO1xuXG4gIGdldCB1c2VyKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoaHR0cCxjb25maWcpIHtcbiAgICBodHRwLmNvbmZpZ3VyZShjZmcgPT4ge1xuICAgICAgY2ZnXG4gICAgICAgIC51c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgICAgICAud2l0aEJhc2VVcmwoY29uZmlnLmdldCgnYXBpVXJsJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgfVxuXG4gIGFjdGl2YXRlKHBhcmFtcykge1xuICAgIHRoaXMuam9iSWQgPSBwYXJhbXMuaWQ7XG4gICAgdGhpcy5yZWZyZXNoSm9iSXRlbXMoKTtcbiAgfVxuICBcbiAgcmVmcmVzaEpvYkl0ZW1zKCkge1xuICAgIGxldCB1cmwgPSBgL2pvYi8ke3RoaXMuam9iSWR9P3Rva2VuPSR7dGhpcy51c2VyLnRva2VufWA7XG4gICAgdGhpcy5odHRwLmZldGNoKHVybClcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgIC50aGVuKGpvYiA9PiB0aGlzLmpvYiA9IGpvYilcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbGV0IGl0ZW1zVXJsID0gYC9qb2IvJHt0aGlzLmpvYklkfS9pdGVtcz90b2tlbj0ke3RoaXMudXNlci50b2tlbn1gO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmZldGNoKGl0ZW1zVXJsKVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbihpdGVtcyA9PiB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzTmFtZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyBvZiBpdGVtcykge1xuICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gcm93Lml0ZW1fc3RhdHVzO1xuICAgICAgICAgICAgICBpZighdGhpcy5zdGF0dXNOYW1lc1tzdGF0dXNdKSB0aGlzLnN0YXR1c05hbWVzW3N0YXR1c10gPSAxO1xuICAgICAgICAgICAgICBlbHNlIHRoaXMuc3RhdHVzTmFtZXNbc3RhdHVzXSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnN0YXR1c2VzID0gW107XG4gICAgICAgICAgICB0aGlzLnRvdGFsSXRlbXMgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgc3RhdHVzIG9mIE9iamVjdC5rZXlzKHRoaXMuc3RhdHVzTmFtZXMpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMucHVzaCh7bmFtZTogc3RhdHVzLCB2YWx1ZTogdGhpcy5zdGF0dXNOYW1lc1tzdGF0dXNdfSk7XG4gICAgICAgICAgICAgIHRoaXMudG90YWxJdGVtcyArPSB0aGlzLnN0YXR1c05hbWVzW3N0YXR1c107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAudGhlbigoKSA9PiB0aGlzLml0ZW1zTGFzdFVwZGF0ZWQgPSBuZXcgRGF0ZSgpKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
