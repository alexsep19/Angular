import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impureJoin',
  pure: false
})
export class ImpureJoinPipe implements PipeTransform {

  transform(value: Array<any>, args?: string): string {
    return value.join(args);
  }
}
