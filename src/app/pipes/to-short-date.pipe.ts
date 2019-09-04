import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toShortDate' // " 1231 2222 4453 "
})
export class ToShortDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    if(value.toLowerCase() === 'asap'){
      return `dès que possible`;
    }else if(value.indexOf('-') > 1){
      let fullDate, rest;
      [fullDate, rest] = value.toLowerCase().split('t'); // '2019-06-01T01:23:30Z'
      let year, month, date;
      [year, month, date] = fullDate.split('-'); // ['2019', '04', '09']

      return `${date}/${month}/${year}`;
    } else {
      return ' -- ';
    }
  }

}
