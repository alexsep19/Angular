import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureJoin'
})
export class PureJoinPipe implements PipeTransform {

  transform(value: Array<any>, args?: string): string {
    return value.join(args);
  }
}
