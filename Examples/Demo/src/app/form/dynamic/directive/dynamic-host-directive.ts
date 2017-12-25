import { Directive, ViewContainerRef } from '@angular/core';
import { LogService } from '../../../services/log.service';

@Directive({
  selector: '[dynamicHost]'
})
export class DynamicHostDirective {
  constructor(public viewContainerRef: ViewContainerRef, private logService: LogService) {
    logService.log('DynamicHostDirective is created');
  }
}
