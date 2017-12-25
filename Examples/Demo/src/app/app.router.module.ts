import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchitectureComponent } from './architecture/architecture.component';
import { PipeDemoComponent } from './pipe-demo/pipe-demo.component';
import { CliComponent } from './cli/cli.component';
import { LinksComponent } from './links/links.component';
import { DirectiveComponent } from './feature/directive-demo/directive.component'; // eager loading
import { CrudComponent } from './crud/crud.component';
import { TradeComponent } from './trade/trade.component';

import { LogService } from './services/log.service';

import { EnterPageGuard } from './guards/enter.guard';
import { ExitPageGuard } from './guards/exit.guard';

const appRoutes: Routes = [
    {path: 'cli', component: CliComponent},
    {path: 'pipe', component: PipeDemoComponent},
    {path: 'link', component: LinksComponent},
    {path: 'directive', component: DirectiveComponent}, // eager loading
    {path: 'animation', canActivate: [EnterPageGuard], // guard
            loadChildren: 'app/feature/animation/animation.module#AnimationModule'}, // lazy loading
    {path: 'form', loadChildren: 'app/form/form.module#FormModule'}, // lazy loading
    {path: 'crud', component: CrudComponent},
    {path: 'trade', component: TradeComponent},
    {path: '', component: ArchitectureComponent},
    {path: '**', redirectTo: ''}
 ];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [EnterPageGuard, ExitPageGuard]
  })
  export class AppRouterModule {
     constructor(private logService: LogService) {
       logService.log('AppRouterModule is created');
     }
  }
