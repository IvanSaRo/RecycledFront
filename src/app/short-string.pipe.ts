import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortString'
})
export class ShortStringPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // Cuantos caracteres de 0 a 70
    return value.substring(0, 30) + '...';
  }
}
