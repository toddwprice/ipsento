import moment from 'moment';

export class TimeFromNowValueConverter {
  toView(value) {
    return moment(value).fromNow();
  }
}
