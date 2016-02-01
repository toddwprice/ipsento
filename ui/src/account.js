import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import 'fetch';

@inject(HttpClient, Configure)
export class Account {
  heading = 'Account Details';
  account = {};

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  get implementationType() {
    var type = '';
    switch(this.account.use_load_balancer) {
      case 0:
        type = 'dedicated instances';
        break;
      case 1:
        type = 'shared licensing';
        break;
      case 2:
        type = 'broker gateway';
        break;
    }
    return type;
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
    let url = `/account/${params.id}?token=${this.user.token}`;
    return this.http.fetch(url)
      .then(response => response.json())
      .then(account => this.account = account);
  }
}
