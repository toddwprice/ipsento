/* global pdfMake */
import {customElement, bindable} from 'aurelia-framework'
import moment from 'moment';
import numeral from 'numeral';

@customElement('print')
export class Print {
  @bindable roast;

  printPdf() {
    var lbl = function (text) {
      return {
        text: text,
        style: 'label'
      }
    };

    var temp = function (number) {
      if (!number) return "";
      return numeral(number).format('0,0.0');
    };

    var roastDate = moment(this.roast.roastDate).format('dd M/D/YYYY h:mm:s a');
    var endDate = moment(this.roast.endDate).format('dd M/D/YYYY h:mm:s a');
    var duration = moment((moment(this.roast.endDate)._d) - (moment(this.roast.roastDate)._d)).format('mm:ss');
    var firstCrack = moment(this.firstCrackTime).format('mm:ss');

    var docDefinition = {
      pageSize: 'B8',
      pageOrientation: 'portrait',
      pageMargins: [ 5, 0, 0, 0 ],
      content: [
        {
          style: 'data',
          table: {
            body: [
              [lbl('Batch #'), this.roast.id],
              [lbl('Coffee'), this.roast.coffee],
              [lbl('Roaster'), this.roast.operator],
              [lbl('Equipment'), this.roast.roaster],
              [lbl('Roast start'), roastDate],
              [lbl('Roast end'), endDate],
              [lbl('Duration'), duration],
              [lbl('Bean (F)'), temp(this.roast.startBeanTemp) + ' | ' + temp(this.roast.endBeanTemp)],
              [lbl('Drum (F)'), temp(this.roast.startDrumTemp) + ' | ' + temp(this.roast.endDrumTemp)],
              [lbl('Room (F)'), temp(this.roast.startRoomTemp) + ' | ' + temp(this.roast.endRoomTemp)],
              [lbl('First crack'), firstCrack],
              [lbl('Weight in'), numeral(this.roast.weightIn).format('0.00')],
              [lbl('Weight out'), numeral(this.roast.weightOut).format('0.00')],
              [lbl('Weight loss'), numeral((this.roast.weightIn - this.roast.weightOut) / this.roast.weightIn).format('0.00%')],
            ]
          },
          // table: {
          //     headerRows: 0,
          //     body: [
          //       [lbl('Coffee'), lbl('Operator'), lbl('Roaster')],
          //       [this.roast.coffee, this.roast.operator, this.roast.roaster],
          //       ['','',''],
          //       [lbl('Roast start'), lbl('Roast end'), lbl('Duration')],
          //       [{ text: [roastDate, roastTime] }, { text: [endDate, endTime] }, duration],
          //       ['','',''],
          //       [lbl('Bean start'), lbl('Drum start'), lbl('Rm start')],
          //       [temp(this.roast.startBeanTemp), temp(this.roast.startDrumTemp), temp(this.roast.startRoomTemp)],
          //       ['','',''],
          //       [lbl('Bean end'), lbl('Drum end'), lbl('Rm end')],
          //       [temp(this.roast.endBeanTemp), temp(this.roast.endDrumTemp), temp(this.roast.endRoomTemp)]
          //     ]
          // },
          layout: 'noBorders'
        },
        {
          image: this.roast.graph,
          width: 160,
          height: 50
        }

      ],
      styles: {
        data: {
          fontSize: 8,
          bold: true,
          color: 'black',
          margin: [0, 0, 0, 0]
        },
        label: {
          fontSize: 8,
          bold: false,
          color: '#777777',
          margin: [0, 0, 0, 0]
        }
      },
      defaultStyle: {
        font: 'Lato'
      }
    };

    pdfMake.fonts = {
      Lato: {
        normal: 'Lato-Regular.ttf',
        bold: 'Lato-Bold.ttf'
      }
    };
    pdfMake.createPdf(docDefinition).download('roast.pdf');
  }
}