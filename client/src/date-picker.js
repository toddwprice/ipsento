import {inject, customElement, bindable} from 'aurelia-framework';
import moment from 'moment';
// import {pikaday} from 'dbushell/pikaday';
// import 'dbushell/pikaday/css/pikaday.css!';

@inject(Element)
@bindable("value")
export class DatePicker {

    @bindable format = "DD/MM/YY";

    constructor(element) {
        this.element = element;
    }

    attached() {
      this.datepicker = $(this.element).find('input');
      this.datepicker.val(this.value);
        // this.datePicker = $(this.element).find('.input-group.date')
        //     .datetimepicker({
        //         format: this.format,
        //         showClose: true,
        //         showTodayButton: true
        //     });
        //
        // this.datePicker.on("dp.change", (e) => {
        //     this.value = moment(e.date).format(this.format);
        // });
    }
}
