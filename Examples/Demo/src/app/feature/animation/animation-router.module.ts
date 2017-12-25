import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimationComponent } from './animation.component';
import { LogService } from '../../services/log.service';
import { ExitPageGuard } from '../../guards/exit.guard';

export const animationRoutes: Routes = [
   {path: '', component: AnimationComponent, canDeactivate: [ExitPageGuard]} // guard
];

@NgModule({
  imports: [RouterModule.forChild(animationRoutes)],
  exports: [RouterModule]
})
export class AnimationRouterModule {
   constructor(private logService: LogService) {
     logService.warn('AnimationRouterModule is created');
   }
}
