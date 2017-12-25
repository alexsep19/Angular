import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat'
})
export class RepeaterPipe implements PipeTransform {

  transform(value: string, args?: number): string {
    return value.repeat(args || 1);
  }
}
