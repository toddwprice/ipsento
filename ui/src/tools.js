import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
import {Validation} from 'aurelia-validation';
import 'fetch';

@inject(HttpClient, Configure, Validation)
export class Tools {
  folder_id;
  new_parent_id;
  folder_path;
  folder_client;
  new_parent_path;
  new_folder_client;
  showDetails = false;
  buttonDisabled = "disabled";
  moveAnother = false;
  message = "";
  messageClass = "alert alert-info";

  get user() {
    return JSON.parse(window.localStorage.currentUser);
  }

  constructor(http,config,validation) {
    this.config = config;
    http.configure(cfg => {
      cfg
        .useStandardConfiguration()
        .withBaseUrl(this.config.get('apiUrl'));
    });

    this.http = http;

    this.validation = validation.on(this)
      .ensure('folder_id')
        .isNotEmpty()
        .isNumber()
      .ensure('new_parent_id')
        .isNotEmpty()
        .isNumber();
  }

  activate() {
  }

  validateMove() {
    this.message = "";
    this.messageClass = "alert alert-info";
    this.validation.validate().then(() => {
      let url1 = `/folder/${this.folder_id}/move-details?token=${this.user.token}`;
      this.http.fetch(url1)
        .then(response => response.json())
        .then(folder => {
          this.folder_client = folder.client_name;
          this.folder_path = folder.path;
        })
        .catch(err => this.handleError(err));

      let url2 = `/folder/${this.new_parent_id}/move-details?token=${this.user.token}`;
      this.http.fetch(url2)
        .then(response => response.json())
        .then(parent => {
          this.new_parent_client = parent.client_name;
          this.new_parent_path = parent.path;
        })
        .then(() => {
          this.showDetails = true;
          this.buttonDisabled = "";
        })
        .catch(err => this.handleError(err));
    });
  }

  submit() {
    let self = this;
    let url = `/folder/${this.folder_id}/move-to?token=${this.user.token}`;
    let data = {new_parent_id: this.new_parent_id};

    self.http.fetch(url, {
      method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: json(data)
      })
      .then(() => {
        self.message = 'The folder was moved!';
        this.moveAnother = true;
      })
      .catch(err => this.handleError(err));
  }

  handleError(err) {
    err.json().then(err => {
      console.log('err', err)
      this.message = err.message;
      this.messageClass = 'alert alert-danger';
    });
  }

  reset() {
    this.folder_id = null;
    this.new_parent_id = null;
    this.folder_path = null;
    this.folder_client = null;
    this.new_parent_path = null;
    this.new_folder_client = null;
    this.showDetails = false;
    this.buttonDisabled = "disabled";
    this.message = "";
    this.messageClass = "alert alert-info";
    this.moveAnother = false;
  }
}
