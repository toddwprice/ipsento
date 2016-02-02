import {inject,router} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import {Redirect} from 'aurelia-router';
import 'fetch';

@inject(HttpClient,Configure,Router)
export class Login {
  login_name = "";
  password = "";
  error = "";
  get hasError() {
    return this.error != "";
  }


  constructor(http,config,router) {
    http.configure(cfg => {
      cfg
        .useStandardConfiguration()
        .withBaseUrl(config.get('apiUrl'));
    });

    this.http = http;
    this.router = router;
  }

  submit() {
    let url = `/auth?login_name=${this.login_name}&password=${this.password}`;
    this.http.fetch(url).then(response => {
        if (response.status !== 200) {
          return this.error = `Login failed: ${response.statusText}`;
        }
        else {
          return response.json();
        }
      })
      .then(data => {
        if (!data.id) {
          //login failed
          return this.error = data;
        }

        var user = data;

        if (user.claims.CAN_ACCESS_ADMIN_APP) {
          window.localStorage.currentUser = JSON.stringify(user);
          this.router.navigateToRoute('home');
        }
        else {
          this.error = "Access denied."
        }
      })
      .catch(e => {
        this.error = e.toString();
        console.log(e);
      })
  }


  // activate() {
  //   return this.http.fetch('account?token=771556504441d4af7e1f8f7a6678dc78b7a9f4c6bbb0d286d4967a8cd638165b')
  //     .then(response => response.json())
  //     .then(accounts => this.accounts = accounts);
  // }
}
