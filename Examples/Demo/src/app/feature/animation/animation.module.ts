import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationRouterModule } from './animation-router.module';
import { AnimationComponent } from './animation.component';
import { LogService } from '../../services/log.service';

@NgModule({
  imports: [
    CommonModule,
    AnimationRouterModule
  ],
  declarations: [AnimationComponent]
})
export class AnimationModule {
  constructor(private logService: LogService) {
    logService.warn('AnimationModule is created');
  }
 }
