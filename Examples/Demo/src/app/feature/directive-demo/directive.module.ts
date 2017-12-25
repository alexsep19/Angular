import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogService } from '../../services/log.service';
import { DirectiveComponent } from './directive.component';
import { MarkerDirective } from '../../directives/marker.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DirectiveComponent, MarkerDirective]
})
export class DirectiveModule {
  constructor(private logService: LogService) {
    logService.log('DirectiveModule is created');
  }
 }
