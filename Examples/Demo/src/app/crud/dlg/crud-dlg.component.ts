import { Component, AfterContentInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { NotifyService } from '../../services/notify.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CurrencyService } from '../../services/currency.service';
import { ICrudDlgModel } from './iCrudDlgModel';
import { DlgActionEnum } from './dlg-action.enum';
import { ICurrency } from '../iCurrency';

@Component({
    selector: 'app-crud-dlg',
    templateUrl: './crud-dlg.component.html',
    styleUrls: ['./crud-dlg.component.css'],
    providers: [CurrencyService]
})
export class CrudDlgComponent extends DialogComponent<ICrudDlgModel,  ICrudDlgModel>
    implements ICrudDlgModel, AfterContentInit {

    DlgActionEnum = DlgActionEnum; // for access from template
    action: DlgActionEnum;
    id: number;
    code: string;
    strcode: string;
    name: string;
    country: string;

    title: string;
    okButtonText: string;
    dictTitle = 'Справочник валют';

    dlgForm: FormGroup;

    currencySubscription: Subscription;

    constructor(dialogService: DialogService, private currencyService: CurrencyService,
        private notifyService: NotifyService, private loadingService: Ng4LoadingSpinnerService) {

        super(dialogService);
        this.createDlg();
    }

    ngAfterContentInit() {
        this.configure();
    }

    configure() {
        switch (this.action) {
            case DlgActionEnum.New:
                this.title = 'Новая запись';
                this.okButtonText = 'Создать';
                return;
            case DlgActionEnum.Edit:
                this.title = 'Править запись';
                this.okButtonText = 'Править';
                break;
            case DlgActionEnum.Delete:
                this.title = 'Удалить запись';
                this.okButtonText = 'Удалить';
                break;
            case DlgActionEnum.View:
                this.title = 'Просмотр';
                break;
        }

        this.dlgForm.setValue({
            code: this.code,
            strcode: this.strcode,
            name: this.name,
            country: this.country
        });

        this.setControlsDisabled();
    }

    createDlg() {
        this.dlgForm = new FormGroup({
            'code': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('[0-9]{3}')]),
            'strcode': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('[A-Z]{3}')]),
            'name': new FormControl(null, [Validators.required]),
            'country': new FormControl(null, [Validators.required])
        });
    }

    setControlsDisabled() {
        if (this.action === DlgActionEnum.Delete || this.action === DlgActionEnum.View) {
            this.dlgForm.controls.code.disable();
            this.dlgForm.controls.strcode.disable();
            this.dlgForm.controls.name.disable();
            this.dlgForm.controls.country.disable();
        }
    }

    ok() {
        this.loadingService.show();
        this.dispose();

        const currency: ICurrency = {
            id: this.id,
            code: this.dlgForm.controls.code.value,
            strcode: this.dlgForm.controls.strcode.value,
            name: this.dlgForm.controls.name.value,
            country: this.dlgForm.controls.country.value
        };

        switch (this.action) {
            case DlgActionEnum.New:
                this.currencySubscription = this.currencyService.add(currency)
                    .subscribe(value => this.okResult(value),
                    error => this.showError(error));
                break;
            case DlgActionEnum.Edit:
                this.currencySubscription = this.currencyService.edit(currency)
                    .subscribe(value => this.okResult(value),
                    error => this.showError(error));
                break;
            case DlgActionEnum.Delete:
                this.currencySubscription = this.currencyService.delete(currency)
                    .subscribe(value => this.okResult(currency), // value returns []
                    error => this.showError(error));
                break;
        }
    }

    cancel() {
        const model: ICrudDlgModel = {
            action: this.action,
            done: false
        };
        this.result = model;
        this.close();
        this.dispose();
    }

    okResult(value: ICurrency) {
        const model: ICrudDlgModel = {
            action: this.action,
            done: true,
            id: value.id,
            code: value.code,
            strcode: value.strcode,
            name: value.name,
            country: value.country
        };

        this.result = model;
        this.close();
        this.dispose();

        this.loadingService.hide();
    }

    showError(err: HttpErrorResponse) {
        this.loadingService.hide();

        let msg: string;
        if (err instanceof Error) {
            msg = err.message;
        } else if (err.error instanceof Error) {
            msg = err.error.message;
            console.log('Client-side error occured: ', msg);
          } else {
            msg = 'Ошибка на сервере. См. лог';
            console.log(`Server-side error occured. Code ${err.status}, body was: ${err.error}`);
          }

        this.notifyService.Instance.error(this.dictTitle, msg);
    }

    dispose() {
        if (this.currencySubscription) {
            this.currencySubscription.unsubscribe();
        }
    }
}
