import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import 'fetch';

@inject(HttpClient, Configure)
export class Job {
  job = {};
  items = [];
  sortBy = "id";
  sortDirection = "descending";
  itemsLastUpdated;
  jobId = 0;
  statusNames = [];
  statuses = [];
  totalItems = 0;

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  constructor(http,config) {
    http.configure(cfg => {
      cfg
        .useStandardConfiguration()
        .withBaseUrl(config.get('apiUrl'));
    });

    this.http = http;
  }

  activate(params) {
    this.jobId = params.id;
    this.refreshJobItems();
  }
  
  refreshJobItems() {
    let url = `/job/${this.jobId}?token=${this.user.token}`;
    this.http.fetch(url)
      .then(response => response.json())
      .then(job => this.job = job)
      .then(() => {
        let itemsUrl = `/job/${this.jobId}/items?token=${this.user.token}`;
        return this.http.fetch(itemsUrl)
          .then(response => response.json())
          .then(items => {
            this.items = items;
            
            this.statusNames = [];
            for (var row of items) {
              var status = row.item_status;
              if(!this.statusNames[status]) this.statusNames[status] = 1;
              else this.statusNames[status] += 1;
            }
            
            this.statuses = [];
            this.totalItems = 0;
            for (var status of Object.keys(this.statusNames)) {
              this.statuses.push({name: status, value: this.statusNames[status]});
              this.totalItems += this.statusNames[status];
            }

          });
      })
      .then(() => this.itemsLastUpdated = new Date());
  }
}
