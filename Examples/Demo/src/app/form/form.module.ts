import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { LogService } from '../services/log.service';
import { FormRouterModule } from './form-router.module';

import { TemplateDrivenFormComponent } from './template-driven/template-driven.component';
import { ReactiveFormComponent } from './reactive/reactive.component';

import { DynamicFormComponent } from './dynamic/dynamic.component';
import { DynamicHostDirective } from './dynamic/directive/dynamic-host-directive';
import { ItemAComponent } from './dynamic/content/item-a/item-a.component';
import { ItemBComponent } from './dynamic/content/item-b/item-b.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormRouterModule
  ],
  declarations: [
    FormComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,  // reactive forms
    DynamicFormComponent,    // dynamics
    DynamicHostDirective,
    ItemAComponent,
    ItemBComponent
  ],
  entryComponents: [ItemAComponent, ItemBComponent] // ComponentFactory
})
export class FormModule {
  constructor(private logService: LogService) {
    logService.warn('FormModule is created');
  }
 }
