import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupNumbers',
})
export class GroupNumbersPipe implements PipeTransform {
  transform(value: number): string {
    let s = String(value);
    const len = s.length;
    if (len < 4) {
      return s;
    }
    if (len < 7) {
      return s.slice(0, len - 3) + ',' + s.slice(len - 3);
    }
    if (len >= 7) {
      let result = s.slice(0, len - 6) + ',' + s.slice(len - 6);
      result = result.slice(0, len - 2) + ',' + result.slice(len - 2);
      return result;
    }
    return s;
  }
}
// 1,000 4 => 1
// 10,000 5 -> 2
// 100,000 6 -> 3
// 1,000,000 7  -
//
//
