System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-configuration', 'fetch'], function (_export) {
  'use strict';

  var inject, HttpClient, Configure, Reports;

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
      Reports = (function () {
        _createClass(Reports, [{
          key: 'user',
          get: function get() {
            return JSON.parse(window.localStorage.currentUser);
          }
        }]);

        function Reports(http, config) {
          var _this = this;

          _classCallCheck(this, _Reports);

          this.subscription_cost = 195;
          this.format = "html";
          this.accounts = [];

          this.config = config;
          http.configure(function (cfg) {
            cfg.useStandardConfiguration().withBaseUrl(_this.config.get('apiUrl'));
          });

          this.http = http;
        }

        _createClass(Reports, [{
          key: 'activate',
          value: function activate() {
            if (window.localStorage.reportSettings) {
              var settings = JSON.parse(window.localStorage.reportSettings);
              this.report_id = settings.report_id;
              this.account_id = settings.account_id;
              this.date_from = settings.date_from;
              this.date_to = settings.date_to;
              this.subscription_cost = settings.subscription_cost;
              this.format = settings.format;
            }

            this.getAccounts();
          }
        }, {
          key: 'getAccounts',
          value: function getAccounts() {
            var _this2 = this;

            var url = '/account?token=' + this.user.token;
            return this.http.fetch(url).then(function (response) {
              return response.json();
            }).then(function (accounts) {
              return _this2.accounts = accounts;
            });
          }
        }, {
          key: 'submit',
          value: function submit() {
            window.localStorage.reportSettings = JSON.stringify({
              report_id: this.report_id,
              account_id: this.account_id,
              date_from: this.date_from,
              date_to: this.date_to,
              subscription_cost: this.subscription_cost,
              format: this.format
            });

            var url = '/report/' + this.report_id + '?token=' + this.user.token + '&date_from=' + this.date_from + '&date_to=' + this.date_to + '&account_id=' + this.account_id + '&format=' + this.format + '&subscription_cost=' + this.subscription_cost;

            if (this.format == 'html') {
              $("#report_results").fadeOut();
              this.http.fetch(url, { mode: 'cors' }).then(function (response) {
                return response.text();
              }).then(function (reportHtml) {
                var d = $("#report_results")[0].contentWindow.document;
                d.open();d.close();
                $("body", d).append(reportHtml);
                $("#report_results").fadeIn();
              })['catch'](function (e) {
                return console.log(e);
              });
            } else {
              url = this.config.get('apiUrl') + url;
              window.open(url);
            }
          }
        }]);

        var _Reports = Reports;
        Reports = inject(HttpClient, Configure)(Reports) || Reports;
        return Reports;
      })();

      _export('Reports', Reports);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,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QUFFO0FBQ3pCLGVBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQy9CLGtCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FDaEMsSUFBSSxDQUFDLFVBQUEsUUFBUTt1QkFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2VBQUEsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxVQUFVLEVBQUk7QUFDbEIsb0JBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDdkQsaUJBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxBQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNwQixpQkFBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEMsaUJBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2VBQy9CLENBQUMsU0FDSSxDQUFDLFVBQUEsQ0FBQzt1QkFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztlQUFBLENBQUMsQ0FBQzthQUMvQixNQUNJO0FBQ0gsaUJBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDdEMsb0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7V0FDRjs7O3VCQTVFVSxPQUFPO0FBQVAsZUFBTyxHQURuQixNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUNqQixPQUFPLEtBQVAsT0FBTztlQUFQLE9BQU8iLCJmaWxlIjoicmVwb3J0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCB7Q29uZmlndXJlfSBmcm9tICdhdXJlbGlhLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0ICdmZXRjaCc7XG5cbkBpbmplY3QoSHR0cENsaWVudCwgQ29uZmlndXJlKVxuZXhwb3J0IGNsYXNzIFJlcG9ydHMge1xuICByZXBvcnRfaWQ7XG4gIGFjY291bnRfaWQ7XG4gIGRhdGVfZnJvbTtcbiAgZGF0ZV90bztcbiAgc3Vic2NyaXB0aW9uX2Nvc3QgPSAxOTU7XG4gIGZvcm1hdCA9IFwiaHRtbFwiO1xuICBhY2NvdW50cyA9IFtdO1xuXG4gIGdldCB1c2VyKCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoaHR0cCxjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICBodHRwLmNvbmZpZ3VyZShjZmcgPT4ge1xuICAgICAgY2ZnXG4gICAgICAgIC51c2VTdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgICAgICAud2l0aEJhc2VVcmwodGhpcy5jb25maWcuZ2V0KCdhcGlVcmwnKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmh0dHAgPSBodHRwO1xuICB9XG5cbiAgYWN0aXZhdGUoKSB7XG4gICAgLy9yZXRyaWV2ZSBkZWZhdWx0IHNldHRpbmdzIGZyb20gdGhlIGxhc3QgcnVuLCBpZiBhbnlcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5yZXBvcnRTZXR0aW5ncykge1xuICAgICAgbGV0IHNldHRpbmdzID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLnJlcG9ydFNldHRpbmdzKTtcbiAgICAgIHRoaXMucmVwb3J0X2lkID0gc2V0dGluZ3MucmVwb3J0X2lkO1xuICAgICAgdGhpcy5hY2NvdW50X2lkID0gc2V0dGluZ3MuYWNjb3VudF9pZDtcbiAgICAgIHRoaXMuZGF0ZV9mcm9tID0gc2V0dGluZ3MuZGF0ZV9mcm9tO1xuICAgICAgdGhpcy5kYXRlX3RvID0gc2V0dGluZ3MuZGF0ZV90bztcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uX2Nvc3QgPSBzZXR0aW5ncy5zdWJzY3JpcHRpb25fY29zdDtcbiAgICAgIHRoaXMuZm9ybWF0ID0gc2V0dGluZ3MuZm9ybWF0O1xuICAgIH1cblxuICAgIC8vcmV0cmlldmUgYWNjb3VudHMgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICB0aGlzLmdldEFjY291bnRzKCk7XG4gIH1cblxuICBnZXRBY2NvdW50cygpIHtcbiAgICBsZXQgdXJsID0gYC9hY2NvdW50P3Rva2VuPSR7dGhpcy51c2VyLnRva2VufWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCh1cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihhY2NvdW50cyA9PiB0aGlzLmFjY291bnRzID0gYWNjb3VudHMpO1xuICB9XG5cbiAgc3VibWl0KCkge1xuICAgIC8vc3RvcmUgdGhlc2Ugc2V0dGluZ3MgYXMgZGVmYXVsdHMgZm9yIG5leHQgdGltZVxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVwb3J0U2V0dGluZ3MgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICByZXBvcnRfaWQ6IHRoaXMucmVwb3J0X2lkLFxuICAgICAgYWNjb3VudF9pZDogdGhpcy5hY2NvdW50X2lkLFxuICAgICAgZGF0ZV9mcm9tOiB0aGlzLmRhdGVfZnJvbSxcbiAgICAgIGRhdGVfdG86IHRoaXMuZGF0ZV90byxcbiAgICAgIHN1YnNjcmlwdGlvbl9jb3N0OiB0aGlzLnN1YnNjcmlwdGlvbl9jb3N0LFxuICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdFxuICAgIH0pO1xuXG4gICAgbGV0IHVybCA9IGAvcmVwb3J0LyR7dGhpcy5yZXBvcnRfaWR9P3Rva2VuPSR7dGhpcy51c2VyLnRva2VufSZkYXRlX2Zyb209JHt0aGlzLmRhdGVfZnJvbX0mZGF0ZV90bz0ke3RoaXMuZGF0ZV90b30mYWNjb3VudF9pZD0ke3RoaXMuYWNjb3VudF9pZH0mZm9ybWF0PSR7dGhpcy5mb3JtYXR9JnN1YnNjcmlwdGlvbl9jb3N0PSR7dGhpcy5zdWJzY3JpcHRpb25fY29zdH1gO1xuICAgIC8vIGNvbnNvbGUubG9nKHVybCk7XG4gICAgaWYgKHRoaXMuZm9ybWF0ID09ICdodG1sJykge1xuICAgICAgJChcIiNyZXBvcnRfcmVzdWx0c1wiKS5mYWRlT3V0KCk7XG4gICAgICB0aGlzLmh0dHAuZmV0Y2godXJsLCB7bW9kZTonY29ycyd9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgICAgIC50aGVuKHJlcG9ydEh0bWwgPT4ge1xuICAgICAgICAgIHZhciBkID0gJChcIiNyZXBvcnRfcmVzdWx0c1wiKVswXS5jb250ZW50V2luZG93LmRvY3VtZW50OyAvLyBjb250ZW50V2luZG93IHdvcmtzIGluIElFNyBhbmQgRkZcbiAgICAgICAgICBkLm9wZW4oKTsgZC5jbG9zZSgpOyAvLyBtdXN0IG9wZW4gYW5kIGNsb3NlIGRvY3VtZW50IG9iamVjdCB0byBzdGFydCB1c2luZyBpdCFcbiAgICAgICAgICAkKFwiYm9keVwiLCBkKS5hcHBlbmQocmVwb3J0SHRtbCk7XG4gICAgICAgICAgJChcIiNyZXBvcnRfcmVzdWx0c1wiKS5mYWRlSW4oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHVybCA9IHRoaXMuY29uZmlnLmdldCgnYXBpVXJsJykgKyB1cmw7XG4gICAgICB3aW5kb3cub3Blbih1cmwpO1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
