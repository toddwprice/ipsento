import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import 'fetch';

@inject(HttpClient, Configure)
export class Jobs {
  jobs = [];
  jobsLastUpdated;

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  constructor(http,config) {
    this.config = config;
    http.configure(cfg => {
      cfg
        .useStandardConfiguration()
        .withBaseUrl(this.config.get('apiUrl'));
    });

    this.http = http;
  }

  activate() {
    //retrieve default settings from the last run, if any
    this.refreshJobs();
  }

  refreshJobs() {
    let url = `/job?token=${this.user.token}`;
    return this.http.fetch(url)
      .then(response => response.json())
      .then(jobs => {
        this.jobs = jobs;
        window.localStorage.jobs = JSON.stringify(jobs);
      })
      .then(() => this.jobsLastUpdated = new Date());
  }

  jobDetails(jobId) {
    location.href = '#/jobs/' + jobId;
  }
}
