export class Settings {
  roasterSettings;

  activate() {
    this.roasterSettings = window.localStorage.roasterSettings ? JSON.parse(window.localStorage.roasterSettings) : {};

    // this.operators = window.localStorage.operators;
    // this.roasterId = window.localStorage.roasterId;
    // this.showDetails = (window.localStorage.showDetails == 'true');
    // this.tempLow = window.localStorage.tempLow;
    // this.tempHigh = window.localStorage.tempHigh;
    // this.wcLow = window.localStorage.wcLow;
    // this.wcHigh = window.localStorage.wcHigh;
  }

  save() {
    window.localStorage.roasterSettings = JSON.stringify(this.roasterSettings);
    // window.localStorage.roasterId = this.roasterId;
    // window.localStorage.showDetails = this.showDetails;
    // window.localStorage.tempLow = this.tempLow;
    // window.localStorage.tempHigh = this.tempHigh;
    // window.localStorage.wcLow = this.wcLow;
    // window.localStorage.wcHigh = this.wcHigh;
    $('#message').fadeIn().delay(3000).fadeOut();
  }
}