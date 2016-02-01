import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import 'fetch';

@inject(HttpClient, Configure)
export class Accounts {
  heading = 'Accounts';
  accounts = [];

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
    let url = `/account?token=${this.user.token}`;
    return this.http.fetch(url)
      .then(response => response.json())
      .then(accounts => this.accounts = accounts);
  }
}
