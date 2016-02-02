import inject from 'aurelia-framework';

export class Settings {
  operators = "";

  activate() {
    this.operators = window.localStorage.operators;
  }

  save() {
    window.localStorage.operators = this.operators;
  }
}