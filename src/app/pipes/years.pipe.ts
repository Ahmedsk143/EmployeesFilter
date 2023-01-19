import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'years',
})
export class YearsPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1) {
      return Math.round(value * 12) + ' months';
    } else if (value == 1) {
      return value + ' year';
    } else if (value > 1) {
      return value + ' years';
    } else {
      return String(value);
    }
  }
}
