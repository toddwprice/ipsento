import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import 'fetch';

@inject(HttpClient, Configure)
export class Reports {
  report_id;
  account_id;
  date_from;
  date_to;
  subscription_cost = 195;
  format = "html";
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
    //retrieve default settings from the last run, if any
    if (window.localStorage.reportSettings) {
      let settings = JSON.parse(window.localStorage.reportSettings);
      this.report_id = settings.report_id;
      this.account_id = settings.account_id;
      this.date_from = settings.date_from;
      this.date_to = settings.date_to;
      this.subscription_cost = settings.subscription_cost;
      this.format = settings.format;
    }

    //retrieve accounts from localStorage
    this.getAccounts();
  }

  getAccounts() {
    let url = `/account?token=${this.user.token}`;
    return this.http.fetch(url)
      .then(response => response.json())
      .then(accounts => this.accounts = accounts);
  }

  submit() {
    //store these settings as defaults for next time
    window.localStorage.reportSettings = JSON.stringify({
      report_id: this.report_id,
      account_id: this.account_id,
      date_from: this.date_from,
      date_to: this.date_to,
      subscription_cost: this.subscription_cost,
      format: this.format
    });

    let url = `/report/${this.report_id}?token=${this.user.token}&date_from=${this.date_from}&date_to=${this.date_to}&account_id=${this.account_id}&format=${this.format}&subscription_cost=${this.subscription_cost}`;
    // console.log(url);
    if (this.format == 'html') {
      $("#report_results").fadeOut();
      this.http.fetch(url, {mode:'cors'})
        .then(response => response.text())
        .then(reportHtml => {
          var d = $("#report_results")[0].contentWindow.document; // contentWindow works in IE7 and FF
          d.open(); d.close(); // must open and close document object to start using it!
          $("body", d).append(reportHtml);
          $("#report_results").fadeIn();
        })
        .catch(e => console.log(e));
    }
    else {
      url = this.config.get('apiUrl') + url;
      window.open(url);
    }
  }
}
