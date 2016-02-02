System.register(['aurelia-framework', 'aurelia-fetch-client', 'aurelia-configuration', 'fetch'], function (_export) {
  'use strict';

  var inject, HttpClient, Configure, Jobs;

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
      Jobs = (function () {
        _createClass(Jobs, [{
          key: 'user',
          get: function get() {
            return JSON.parse(window.localStorage.currentUser);
          }
        }]);

        function Jobs(http, config) {
          var _this = this;

          _classCallCheck(this, _Jobs);

          this.jobs = [];

          this.config = config;
          http.configure(function (cfg) {
            cfg.useStandardConfiguration().withBaseUrl(_this.config.get('apiUrl'));
          });

          this.http = http;
        }

        _createClass(Jobs, [{
          key: 'activate',
          value: function activate() {
            this.refreshJobs();
          }
        }, {
          key: 'refreshJobs',
          value: function refreshJobs() {
            var _this2 = this;

            var url = '/job?token=' + this.user.token;
            return this.http.fetch(url).then(function (response) {
              return response.json();
            }).then(function (jobs) {
              _this2.jobs = jobs;
              window.localStorage.jobs = JSON.stringify(jobs);
            }).then(function () {
              return _this2.jobsLastUpdated = new Date();
            });
          }
        }, {
          key: 'jobDetails',
          value: function jobDetails(jobId) {
            location.href = '#/jobs/' + jobId;
          }
        }]);

        var _Jobs = Jobs;
        Jobs = inject(HttpClient, Configure)(Jobs) || Jobs;
        return Jobs;
      })();

      _export('Jobs', Jobs);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FDQU1hLElBQUk7Ozs7Ozs7O2lDQU5ULE1BQU07O3VDQUNOLFVBQVU7O3dDQUNWLFNBQVM7OztBQUlKLFVBQUk7cUJBQUosSUFBSTs7ZUFJUCxlQUFHO0FBQ1QsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1dBQ3BEOzs7QUFFVSxpQkFSQSxJQUFJLENBUUgsSUFBSSxFQUFDLE1BQU0sRUFBRTs7Ozs7ZUFQekIsSUFBSSxHQUFHLEVBQUU7O0FBUVAsY0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsY0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNwQixlQUFHLENBQ0Esd0JBQXdCLEVBQUUsQ0FDMUIsV0FBVyxDQUFDLE1BQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1dBQzNDLENBQUMsQ0FBQzs7QUFFSCxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjs7cUJBakJVLElBQUk7O2lCQW1CUCxvQkFBRztBQUVULGdCQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7V0FDcEI7OztpQkFFVSx1QkFBRzs7O0FBQ1osZ0JBQUksR0FBRyxtQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEFBQUUsQ0FBQztBQUMxQyxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDeEIsSUFBSSxDQUFDLFVBQUEsUUFBUTtxQkFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQUEsQ0FBQyxDQUNqQyxJQUFJLENBQUMsVUFBQSxJQUFJLEVBQUk7QUFDWixxQkFBSyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLG9CQUFNLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pELENBQUMsQ0FDRCxJQUFJLENBQUM7cUJBQU0sT0FBSyxlQUFlLEdBQUcsSUFBSSxJQUFJLEVBQUU7YUFBQSxDQUFDLENBQUM7V0FDbEQ7OztpQkFFUyxvQkFBQyxLQUFLLEVBQUU7QUFDaEIsb0JBQVEsQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQztXQUNuQzs7O29CQXJDVSxJQUFJO0FBQUosWUFBSSxHQURoQixNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUNqQixJQUFJLEtBQUosSUFBSTtlQUFKLElBQUkiLCJmaWxlIjoiam9icy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5qZWN0fSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcbmltcG9ydCB7Q29uZmlndXJlfSBmcm9tICdhdXJlbGlhLWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0ICdmZXRjaCc7XG5cbkBpbmplY3QoSHR0cENsaWVudCwgQ29uZmlndXJlKVxuZXhwb3J0IGNsYXNzIEpvYnMge1xuICBqb2JzID0gW107XG4gIGpvYnNMYXN0VXBkYXRlZDtcblxuICBnZXQgdXNlcigpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmN1cnJlbnRVc2VyKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGh0dHAsY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgaHR0cC5jb25maWd1cmUoY2ZnID0+IHtcbiAgICAgIGNmZ1xuICAgICAgICAudXNlU3RhbmRhcmRDb25maWd1cmF0aW9uKClcbiAgICAgICAgLndpdGhCYXNlVXJsKHRoaXMuY29uZmlnLmdldCgnYXBpVXJsJykpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5odHRwID0gaHR0cDtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIC8vcmV0cmlldmUgZGVmYXVsdCBzZXR0aW5ncyBmcm9tIHRoZSBsYXN0IHJ1biwgaWYgYW55XG4gICAgdGhpcy5yZWZyZXNoSm9icygpO1xuICB9XG5cbiAgcmVmcmVzaEpvYnMoKSB7XG4gICAgbGV0IHVybCA9IGAvam9iP3Rva2VuPSR7dGhpcy51c2VyLnRva2VufWA7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5mZXRjaCh1cmwpXG4gICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAudGhlbihqb2JzID0+IHtcbiAgICAgICAgdGhpcy5qb2JzID0gam9icztcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5qb2JzID0gSlNPTi5zdHJpbmdpZnkoam9icyk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5qb2JzTGFzdFVwZGF0ZWQgPSBuZXcgRGF0ZSgpKTtcbiAgfVxuXG4gIGpvYkRldGFpbHMoam9iSWQpIHtcbiAgICBsb2NhdGlvbi5ocmVmID0gJyMvam9icy8nICsgam9iSWQ7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
