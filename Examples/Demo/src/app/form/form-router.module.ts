import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogService } from '../services/log.service';
import { FormComponent } from './form.component';
import { TemplateDrivenFormComponent } from './template-driven/template-driven.component';
import { ReactiveFormComponent } from './reactive/reactive.component';
import { DynamicFormComponent } from './dynamic/dynamic.component';


const formRoutes: Routes = [
   {
     path: '', component: FormComponent,
     children: [
          { path: 'reactive', component: ReactiveFormComponent },
          { path: 'dynamic', component: DynamicFormComponent },
          { path: '', component: TemplateDrivenFormComponent }
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule]
})
export class FormRouterModule {
  constructor(private logService: LogService) {
    logService.warn('FormRouterModule is created');
  }
}
