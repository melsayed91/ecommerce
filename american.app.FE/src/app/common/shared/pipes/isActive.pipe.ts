import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isActive' })
/** Returns elemets of the array that have isActive=true */
export class isActivePipe implements PipeTransform {
  transform(list: any[]) {
    return list ? list.filter(function (item) { return item.isActive === true }): [];
  }
}
