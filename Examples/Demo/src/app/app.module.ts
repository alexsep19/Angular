import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Nonifications
import {SimpleNotificationsModule} from 'angular4-simple-notifications';
// DataTable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// Loading spinner
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
// Modal
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// Components
import { AppComponent } from './app.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { PipeDemoComponent } from './pipe-demo/pipe-demo.component';
import { CliComponent } from './cli/cli.component';
import { LinksComponent } from './links/links.component';
import { CrudComponent } from './crud/crud.component';
import { CrudDlgComponent } from './crud/dlg/crud-dlg.component';
import { TradeComponent } from './trade/trade.component';

// Services
import { TimeService } from './services/time.service';
import { LogService } from './services/log.service';
import { NotifyService } from './services/notify.service';

// Pipes
import { RepeaterPipe } from './pipes/repeater.pipe';
import { PureJoinPipe } from './pipes/pure-join.pipe';
import { ImpureJoinPipe } from './pipes/impure-join.pipe';

// Module
 import { DirectiveModule } from './feature/directive-demo/directive.module'; // eager loading
 import { AppRouterModule } from './app.router.module';


@NgModule({
  declarations: [
    AppComponent,
    ArchitectureComponent,
    PipeDemoComponent,
    CliComponent,
    RepeaterPipe,
    PureJoinPipe,
    ImpureJoinPipe,
    LinksComponent,
    CrudComponent,
    CrudDlgComponent,
    TradeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DirectiveModule, // eager loading
    AppRouterModule,
    SimpleNotificationsModule.forRoot(),
    NgxDatatableModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [TimeService, LogService, NotifyService],
  entryComponents: [CrudDlgComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private logger: LogService) {
      logger.log('AppModule is created');
  }
}
